import sql from "@/app/api/utils/sql";
import { getUserId, unauthorizedResponse } from "@/app/api/utils/getUserId";

export async function GET(request: Request) {
  const userId = await getUserId();
  if (!userId) return unauthorizedResponse();

  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // 'income' | 'expense' | null

    let rows;
    if (type === "income" || type === "expense") {
      rows = await sql`
        SELECT * FROM categories
        WHERE user_id = ${userId} AND (type = ${type} OR type = 'both')
        ORDER BY is_default DESC, name ASC
      `;
    } else {
      rows = await sql`
        SELECT * FROM categories
        WHERE user_id = ${userId}
        ORDER BY is_default DESC, name ASC
      `;
    }

    return Response.json({ categories: rows });
  } catch (err) {
    console.error("GET /api/categories error:", err);
    return Response.json({ error: "Lỗi tải danh mục" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const userId = await getUserId();
  if (!userId) return unauthorizedResponse();

  try {
    const body = await request.json();
    const { name, icon, color, type } = body || {};

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return Response.json(
        { error: "Tên danh mục là bắt buộc" },
        { status: 400 },
      );
    }
    const validType = ["income", "expense", "both"].includes(type)
      ? type
      : "expense";

    const rows = await sql`
      INSERT INTO categories (user_id, name, icon, color, type, is_default)
      VALUES (${userId}, ${name.trim()}, ${icon || "Tag"}, ${color || "#FFD100"}, ${validType}, false)
      RETURNING *
    `;

    return Response.json({ category: rows[0] });
  } catch (err) {
    console.error("POST /api/categories error:", err);
    return Response.json({ error: "Không thể tạo danh mục" }, { status: 500 });
  }
}
