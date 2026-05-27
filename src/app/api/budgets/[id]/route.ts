import sql from "@/app/api/utils/sql";
import { getUserId, unauthorizedResponse } from "@/app/api/utils/getUserId";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const userId = await getUserId();
  if (!userId) return unauthorizedResponse();
  const id = params.id;

  try {
    const body = await request.json();
    const { limit_amount, category_id, month, year } = body || {};
    const setClauses: string[] = [];
    const values: any[] = [];
    if (limit_amount !== undefined && Number(limit_amount) > 0) {
      values.push(Number(limit_amount));
      setClauses.push(`limit_amount = $${values.length}`);
    }
    if (category_id !== undefined) {
      values.push(category_id);
      setClauses.push(`category_id = $${values.length}`);
    }
    if (month !== undefined) {
      values.push(month);
      setClauses.push(`month = $${values.length}`);
    }
    if (year !== undefined) {
      values.push(year);
      setClauses.push(`year = $${values.length}`);
    }
    if (setClauses.length === 0) {
      return Response.json(
        { error: "Không có gì để cập nhật" },
        { status: 400 },
      );
    }
    values.push(id);
    values.push(userId);
    const q = `UPDATE budgets SET ${setClauses.join(", ")} WHERE id = $${values.length - 1} AND user_id = $${values.length} RETURNING *`;
    const rows = await sql(q, values);
    return Response.json({ budget: rows[0] });
  } catch (err) {
    console.error("PATCH /api/budgets/[id] error:", err);
    return Response.json({ error: "Không thể cập nhật" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const userId = await getUserId();
  if (!userId) return unauthorizedResponse();
  const id = params.id;

  try {
    const rows = await sql`
      DELETE FROM budgets WHERE id = ${id} AND user_id = ${userId} RETURNING id
    `;
    if (rows.length === 0) {
      return Response.json({ error: "Không tìm thấy" }, { status: 404 });
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/budgets/[id] error:", err);
    return Response.json({ error: "Không thể xóa" }, { status: 500 });
  }
}
