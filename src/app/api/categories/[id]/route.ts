import sql from "@/app/api/utils/sql";
import { getUserId, unauthorizedResponse } from "@/app/api/utils/getUserId";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const userId = await getUserId();
  if (!userId) return unauthorizedResponse();
  const id = params.id;

  try {
    const body = await request.json();
    const { name, icon, color, type } = body || {};

    const setClauses: string[] = [];
    const values: any[] = [];
    if (typeof name === "string" && name.trim()) {
      values.push(name.trim());
      setClauses.push(`name = $${values.length}`);
    }
    if (typeof icon === "string") {
      values.push(icon);
      setClauses.push(`icon = $${values.length}`);
    }
    if (typeof color === "string") {
      values.push(color);
      setClauses.push(`color = $${values.length}`);
    }
    if (["income", "expense", "both"].includes(type)) {
      values.push(type);
      setClauses.push(`type = $${values.length}`);
    }
    if (setClauses.length === 0) {
      return Response.json(
        { error: "Không có gì để cập nhật" },
        { status: 400 },
      );
    }
    values.push(id);
    values.push(userId);
    const q = `UPDATE categories SET ${setClauses.join(", ")} WHERE id = $${values.length - 1} AND user_id = $${values.length} RETURNING *`;
    const rows = await sql(q, values);
    if (rows.length === 0) {
      return Response.json(
        { error: "Không tìm thấy danh mục" },
        { status: 404 },
      );
    }
    return Response.json({ category: rows[0] });
  } catch (err) {
    console.error("PATCH /api/categories/[id] error:", err);
    return Response.json({ error: "Không thể cập nhật" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const userId = await getUserId();
  if (!userId) return unauthorizedResponse();
  const id = params.id;

  try {
    const rows = await sql`
      DELETE FROM categories
      WHERE id = ${id} AND user_id = ${userId}
      RETURNING id
    `;
    if (rows.length === 0) {
      return Response.json(
        { error: "Không tìm thấy danh mục" },
        { status: 404 },
      );
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/categories/[id] error:", err);
    return Response.json({ error: "Không thể xóa" }, { status: 500 });
  }
}
