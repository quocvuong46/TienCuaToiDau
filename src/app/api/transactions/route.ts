import sql from "@/app/api/utils/sql";
import { getUserId, unauthorizedResponse } from "@/app/api/utils/getUserId";

export async function GET(request: Request) {
  const userId = await getUserId();
  if (!userId) return unauthorizedResponse();

  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const type = searchParams.get("type");
    const categoryId = searchParams.get("category_id");
    const walletId = searchParams.get("wallet_id");
    const dateFrom = searchParams.get("date_from");
    const dateTo = searchParams.get("date_to");
    const minAmount = searchParams.get("min_amount");
    const maxAmount = searchParams.get("max_amount");
    const limit = Math.min(Number(searchParams.get("limit")) || 500, 1000);

    const conditions = ["t.user_id = $1"];
    const values: any[] = [userId];

    if (search && search.trim()) {
      values.push(`%${search.trim()}%`);
      conditions.push(
        `(t.description ILIKE $${values.length} OR t.merchant_name ILIKE $${values.length})`,
      );
    }
    if (type === "income" || type === "expense") {
      values.push(type);
      conditions.push(`t.type = $${values.length}`);
    }
    if (categoryId) {
      values.push(categoryId);
      conditions.push(`t.category_id = $${values.length}`);
    }
    if (walletId) {
      values.push(walletId);
      conditions.push(`t.wallet_id = $${values.length}`);
    }
    if (dateFrom) {
      values.push(dateFrom);
      conditions.push(`t.transaction_date >= $${values.length}`);
    }
    if (dateTo) {
      values.push(dateTo);
      conditions.push(`t.transaction_date <= $${values.length}`);
    }
    if (minAmount) {
      values.push(Number(minAmount));
      conditions.push(`t.amount >= $${values.length}`);
    }
    if (maxAmount) {
      values.push(Number(maxAmount));
      conditions.push(`t.amount <= $${values.length}`);
    }

    values.push(limit);
    const q = `
      SELECT t.*, c.name AS category_name, c.icon AS category_icon, c.color AS category_color,
             w.name AS wallet_name, w.icon AS wallet_icon, w.color AS wallet_color
      FROM transactions t
      LEFT JOIN categories c ON c.id = t.category_id
      LEFT JOIN wallets w ON w.id = t.wallet_id
      WHERE ${conditions.join(" AND ")}
      ORDER BY t.transaction_date DESC, t.id DESC
      LIMIT $${values.length}
    `;
    const rows = await sql(q, values);

    return Response.json({ transactions: rows });
  } catch (err) {
    console.error("GET /api/transactions error:", err);
    return Response.json({ error: "Lỗi tải giao dịch" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const userId = await getUserId();
  if (!userId) return unauthorizedResponse();

  try {
    const body = await request.json();
    const {
      wallet_id,
      category_id,
      amount,
      type,
      description,
      merchant_name,
      image_url,
      transaction_date,
      ocr_confidence,
      receipt_items,
    } = body || {};

    if (!amount || Number(amount) <= 0) {
      return Response.json({ error: "Số tiền không hợp lệ" }, { status: 400 });
    }
    if (!["income", "expense"].includes(type)) {
      return Response.json(
        { error: "Loại giao dịch không hợp lệ" },
        { status: 400 },
      );
    }

    const amt = Number(amount);
    const txDate = transaction_date || new Date().toISOString().slice(0, 10);

    if (!wallet_id) {
      return Response.json(
        { error: "Vui lòng chọn ví/tài khoản cho giao dịch" },
        { status: 400 },
      );
    }

    const w = await sql`SELECT id FROM wallets WHERE id = ${wallet_id} AND user_id = ${userId}`;
    if (w.length === 0) {
      return Response.json({ error: "Ví không hợp lệ" }, { status: 400 });
    }
    if (category_id) {
      const c = await sql`SELECT id FROM categories WHERE id = ${category_id} AND user_id = ${userId}`;
      if (c.length === 0) {
        return Response.json(
          { error: "Danh mục không hợp lệ" },
          { status: 400 },
        );
      }
    }

    // Insert transaction (database trigger handles updating wallet balance automatically)
    const rows = await sql`
      INSERT INTO transactions (user_id, wallet_id, category_id, amount, type, description, merchant_name, image_url, transaction_date, ocr_confidence)
      VALUES (${userId}, ${wallet_id || null}, ${category_id || null}, ${amt}, ${type}, ${description || null}, ${merchant_name || null}, ${image_url || null}, ${txDate}, ${ocr_confidence || null})
      RETURNING *
    `;
    const created = rows[0];

    // Insert receipt items if any
    if (
      Array.isArray(receipt_items) &&
      receipt_items.length > 0 &&
      created?.id
    ) {
      for (const item of receipt_items) {
        if (!item || !item.name) continue;
        await sql`
          INSERT INTO receipt_items (transaction_id, name, quantity, price)
          VALUES (${created.id}, ${item.name}, ${Number(item.quantity) || 1}, ${Number(item.price) || 0})
        `;
      }
    }

    return Response.json({ transaction: created });
  } catch (err) {
    console.error("POST /api/transactions error:", err);
    return Response.json({ error: "Không thể tạo giao dịch" }, { status: 500 });
  }
}
