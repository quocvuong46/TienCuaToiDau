import sql from "@/app/api/utils/sql";
import { getUserId, unauthorizedResponse } from "@/app/api/utils/getUserId";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const userId = await getUserId();
  if (!userId) return unauthorizedResponse();
  const id = params.id;

  try {
    const body = await request.json();
    const { name, type, icon, color, initial_balance } = body || {};

    const setClauses: string[] = [];
    const values: any[] = [];
    if (typeof name === "string" && name.trim()) {
      values.push(name.trim());
      setClauses.push(`name = $${values.length}`);
    }
    if (typeof type === "string") {
      values.push(type);
      setClauses.push(`type = $${values.length}`);
    }
    if (typeof icon === "string") {
      values.push(icon);
      setClauses.push(`icon = $${values.length}`);
    }
    if (typeof color === "string") {
      values.push(color);
      setClauses.push(`color = $${values.length}`);
    }
    if (initial_balance !== undefined) {
      const existing = await sql`
        SELECT initial_balance, current_balance FROM wallets
        WHERE id = ${id} AND user_id = ${userId}
      `;
      if (existing.length === 0) {
        return Response.json({ error: "Không tìm thấy ví" }, { status: 404 });
      }
      const newInit = Number(initial_balance) || 0;
      const oldInit = Number(existing[0].initial_balance) || 0;
      const oldCurr = Number(existing[0].current_balance) || 0;
      const newCurr = oldCurr + (newInit - oldInit);
      values.push(newInit);
      setClauses.push(`initial_balance = $${values.length}`);
      values.push(newCurr);
      setClauses.push(`current_balance = $${values.length}`);
    }

    if (setClauses.length === 0) {
      return Response.json(
        { error: "Không có gì để cập nhật" },
        { status: 400 },
      );
    }

    values.push(id);
    values.push(userId);
    const q = `UPDATE wallets SET ${setClauses.join(", ")} WHERE id = $${values.length - 1} AND user_id = $${values.length} RETURNING *`;
    const rows = await sql(q, values);

    return Response.json({ wallet: rows[0] });
  } catch (err) {
    console.error("PATCH /api/wallets/[id] error:", err);
    return Response.json({ error: "Không thể cập nhật ví" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const userId = await getUserId();
  if (!userId) return unauthorizedResponse();
  const id = params.id;

  try {
    const rows = await sql`
      DELETE FROM wallets WHERE id = ${id} AND user_id = ${userId} RETURNING id
    `;
    if (rows.length === 0) {
      return Response.json({ error: "Không tìm thấy ví" }, { status: 404 });
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/wallets/[id] error:", err);
    return Response.json({ error: "Không thể xóa ví" }, { status: 500 });
  }
}
