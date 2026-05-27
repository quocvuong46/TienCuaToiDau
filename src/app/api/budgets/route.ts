import sql from "@/app/api/utils/sql";
import { getUserId, unauthorizedResponse } from "@/app/api/utils/getUserId";

export async function GET(request: Request) {
  const userId = await getUserId();
  if (!userId) return unauthorizedResponse();

  try {
    const { searchParams } = new URL(request.url);
    const month =
      Number(searchParams.get("month")) || new Date().getMonth() + 1;
    const year = Number(searchParams.get("year")) || new Date().getFullYear();

    const rows = await sql`
      SELECT b.*,
             c.name AS category_name, c.icon AS category_icon, c.color AS category_color,
             COALESCE((
               SELECT SUM(t.amount) FROM transactions t
               WHERE t.user_id = b.user_id
                 AND t.category_id = b.category_id
                 AND t.type = 'expense'
                 AND EXTRACT(MONTH FROM t.transaction_date) = b.month
                 AND EXTRACT(YEAR FROM t.transaction_date) = b.year
             ), 0) AS spent_amount
      FROM budgets b
      LEFT JOIN categories c ON c.id = b.category_id
      WHERE b.user_id = ${userId}
        AND b.month = ${month}
        AND b.year = ${year}
      ORDER BY b.created_at DESC
    `;
    return Response.json({ budgets: rows });
  } catch (err) {
    console.error("GET /api/budgets error:", err);
    return Response.json({ error: "Lỗi tải ngân sách" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const userId = await getUserId();
  if (!userId) return unauthorizedResponse();

  try {
    const body = await request.json();
    const { category_id, month, year, limit_amount } = body || {};

    if (!category_id || !month || !year || !limit_amount) {
      return Response.json(
        { error: "Thiếu thông tin bắt buộc" },
        { status: 400 },
      );
    }
    if (Number(limit_amount) <= 0) {
      return Response.json({ error: "Số tiền không hợp lệ" }, { status: 400 });
    }

    // Verify category belongs to user
    const c = await sql`SELECT id FROM categories WHERE id = ${category_id} AND user_id = ${userId}`;
    if (c.length === 0) {
      return Response.json({ error: "Danh mục không hợp lệ" }, { status: 400 });
    }

    // Check duplicate budget for same category/month/year
    const dup = await sql`
      SELECT id FROM budgets
      WHERE user_id = ${userId} AND category_id = ${category_id}
        AND month = ${month} AND year = ${year}
    `;
    if (dup.length > 0) {
      return Response.json(
        { error: "Đã có ngân sách cho danh mục này trong tháng" },
        { status: 400 },
      );
    }

    const rows = await sql`
      INSERT INTO budgets (user_id, category_id, month, year, limit_amount)
      VALUES (${userId}, ${category_id}, ${month}, ${year}, ${Number(limit_amount)})
      RETURNING *
    `;
    return Response.json({ budget: rows[0] });
  } catch (err) {
    console.error("POST /api/budgets error:", err);
    return Response.json({ error: "Không thể tạo ngân sách" }, { status: 500 });
  }
}
