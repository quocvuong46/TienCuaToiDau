import sql from "@/app/api/utils/sql";
import { getUserId, unauthorizedResponse } from "@/app/api/utils/getUserId";

const OCR_SYSTEM_PROMPT = `Bạn là chuyên gia phân tích hóa đơn (receipt OCR). Người dùng sẽ cung cấp NỘI DUNG hoặc mô tả ảnh hóa đơn. Bạn cần trả về DUY NHẤT một JSON hợp lệ (không có markdown, không có \`\`\`json, không có text giải thích) theo schema sau:

{
  "merchant_name": "Tên cửa hàng hoặc quán (string, có thể rỗng)",
  "transaction_date": "Ngày giao dịch định dạng YYYY-MM-DD. Nếu không xác định được, dùng ngày hôm nay.",
  "total_amount": 0,
  "currency": "VND",
  "items": [
    { "name": "Tên sản phẩm", "quantity": 1, "price": 0 }
  ],
  "suggested_category": "Tên một trong các danh mục: Ăn uống, Di chuyển, Mua sắm, Hóa đơn, Giải trí, Sức khỏe, Giáo dục, Nhà cửa, Khác",
  "confidence": 0.0,
  "note": "Ghi chú ngắn nếu cần"
}

QUAN TRỌNG:
- Chỉ trả về JSON, không thêm bất cứ ký tự nào khác.
- total_amount là số nguyên VND (không có dấu phẩy/chấm/đơn vị).
- confidence từ 0 đến 1.
- Nếu không đọc được, vẫn trả về JSON với confidence thấp.`;

function stripJsonFences(text: string): string {
  if (!text) return "";
  let s = String(text).trim();
  // Remove ```json ... ``` or ``` ... ``` wrappers
  s = s
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();
  // Find first { and last }
  const first = s.indexOf("{");
  const last = s.lastIndexOf("}");
  if (first !== -1 && last !== -1 && last > first) {
    return s.slice(first, last + 1);
  }
  return s;
}

export async function POST(request: Request) {
  const userId = await getUserId();
  if (!userId) return unauthorizedResponse();

  try {
    const body = await request.json();
    const { image_url } = body || {};

    if (!image_url || typeof image_url !== "string") {
      return Response.json({ error: "Thiếu ảnh hóa đơn" }, { status: 400 });
    }

    // Build the user message — Gemini integration is text-based here so we describe with URL
    const userPrompt = `Đây là URL ảnh hóa đơn: ${image_url}

Hãy phân tích ảnh hóa đơn này dựa trên URL và bất kỳ ngữ cảnh nào bạn có thể suy ra (tên file, tên thư mục, các metadata trong URL). Nếu không thể xác định nội dung cụ thể từ URL, hãy tạo một kết quả mẫu hợp lý với confidence thấp (dưới 0.3) và đặt note giải thích rằng cần ảnh rõ hơn.

Trả về DUY NHẤT JSON theo schema đã quy định. Ngày hôm nay: ${new Date().toISOString().slice(0, 10)}.`;

    const opencodeApiKey = process.env.OPENCODE_API_KEY;
    const opencodeModel = process.env.OPENCODE_MODEL || "deepseek-v4-flash-free";

    if (!opencodeApiKey) {
      console.error("Missing process.env.OPENCODE_API_KEY");
      return Response.json(
        { error: "Cấu hình AI chưa đầy đủ. Vui lòng kiểm tra lại OPENCODE_API_KEY." },
        { status: 500 }
      );
    }

    const response = await fetch("https://opencode.ai/zen/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${opencodeApiKey}`
      },
      body: JSON.stringify({
        model: opencodeModel,
        messages: [
          { role: "system", content: OCR_SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      console.error("OpenCode AI API error:", response.status, errText);
      return Response.json(
        { error: "AI không thể đọc hóa đơn. Vui lòng thử lại với ảnh rõ hơn." },
        { status: 502 },
      );
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content || "";
    const cleaned = stripJsonFences(content);

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (e) {
      console.error("OCR JSON parse error:", e, "Content:", content);
      // Return a fallback structure so the user can still manually fill
      parsed = {
        merchant_name: "",
        transaction_date: new Date().toISOString().slice(0, 10),
        total_amount: 0,
        currency: "VND",
        items: [],
        suggested_category: "Khác",
        confidence: 0.1,
        note: "AI không nhận diện được rõ. Vui lòng nhập thủ công.",
      };
    }

    // Sanitize parsed object
    const safeResult = {
      merchant_name: String(parsed.merchant_name || ""),
      transaction_date:
        typeof parsed.transaction_date === "string" &&
        /^\d{4}-\d{2}-\d{2}$/.test(parsed.transaction_date)
          ? parsed.transaction_date
          : new Date().toISOString().slice(0, 10),
      total_amount: Number(parsed.total_amount) || 0,
      currency: parsed.currency || "VND",
      items: Array.isArray(parsed.items)
        ? parsed.items.map((it: any) => ({
            name: String(it?.name || ""),
            quantity: Number(it?.quantity) || 1,
            price: Number(it?.price) || 0,
          }))
        : [],
      suggested_category: String(parsed.suggested_category || "Khác"),
      confidence: Math.max(0, Math.min(1, Number(parsed.confidence) || 0)),
      note: String(parsed.note || ""),
    };

    // Match suggested category to user's categories (case-insensitive)
    const userCategories = await sql`
      SELECT id, name FROM categories WHERE user_id = ${userId} AND (type = 'expense' OR type = 'both')
    `;
    const matched = userCategories.find(
      (c: any) =>
        c.name.toLowerCase() === safeResult.suggested_category.toLowerCase(),
    );
    const matchedCategoryId = matched?.id || null;

    // Log to ai_prompt_logs
    try {
      await sql`
        INSERT INTO ai_prompt_logs (user_id, feature, prompt, result_summary)
        VALUES (${userId}, 'ocr_receipt', ${image_url}, ${JSON.stringify({
          merchant: safeResult.merchant_name,
          total: safeResult.total_amount,
          confidence: safeResult.confidence,
        })})
      `;
    } catch (e) {
      console.error("ai_prompt_logs insert error:", e);
    }

    return Response.json({
      result: safeResult,
      matched_category_id: matchedCategoryId,
    });
  } catch (err) {
    console.error("POST /api/ocr/scan error:", err);
    return Response.json(
      { error: "Có lỗi xảy ra khi đọc hóa đơn" },
      { status: 500 },
    );
  }
}
