import sql from "@/app/api/utils/sql";
import { getUserId, unauthorizedResponse } from "@/app/api/utils/getUserId";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const userId = await getUserId();
  if (!userId) return unauthorizedResponse();
  const id = params.id;

  try {
    const body = await request.json();
    const { name, target_amount, current_amount, deadline, description } =
      body || {};
    const setClauses: string[] = [];
    const values: any[] = [];
    if (typeof name === "string" && name.trim()) {
      values.push(name.trim());
      setClauses.push(`name = $${values.length}`);
    }
    if (target_amount !== undefined && Number(target_amount) > 0) {
      values.push(Number(target_amount));
      setClauses.push(`target_amount = $${values.length}`);
    }
    if (current_amount !== undefined) {
      values.push(Number(current_amount));
      setClauses.push(`current_amount = $${values.length}`);
    }
    if (deadline !== undefined) {
      values.push(deadline || null);
      setClauses.push(`deadline = $${values.length}`);
    }
    if (description !== undefined) {
      values.push(description || null);
      setClauses.push(`description = $${values.length}`);
    }
    if (setClauses.length === 0) {
      return Response.json(
        { error: "Không có gì để cập nhật" },
        { status: 400 },
      );
    }
    values.push(id);
    values.push(userId);
    const q = `UPDATE saving_goals SET ${setClauses.join(", ")} WHERE id = $${values.length - 1} AND user_id = $${values.length} RETURNING *`;
    const rows = await sql(q, values);
    return Response.json({ goal: rows[0] });
  } catch (err) {
    console.error("PATCH /api/goals/[id] error:", err);
    return Response.json({ error: "Không thể cập nhật" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const userId = await getUserId();
  if (!userId) return unauthorizedResponse();
  const id = params.id;

  try {
    const rows = await sql`
      DELETE FROM saving_goals WHERE id = ${id} AND user_id = ${userId} RETURNING id
    `;
    if (rows.length === 0) {
      return Response.json({ error: "Không tìm thấy" }, { status: 404 });
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/goals/[id] error:", err);
    return Response.json({ error: "Không thể xóa" }, { status: 500 });
  }
}
