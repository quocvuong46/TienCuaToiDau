import sql from "@/app/api/utils/sql";
import { getUserId, unauthorizedResponse } from "@/app/api/utils/getUserId";

export async function GET() {
  const userId = await getUserId();
  if (!userId) return unauthorizedResponse();
  try {
    const rows = await sql`
      SELECT * FROM saving_goals WHERE user_id = ${userId} ORDER BY created_at DESC
    `;
    return Response.json({ goals: rows });
  } catch (err) {
    console.error("GET /api/goals error:", err);
    return Response.json({ error: "Lỗi tải mục tiêu" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const userId = await getUserId();
  if (!userId) return unauthorizedResponse();
  try {
    const body = await request.json();
    const { name, target_amount, current_amount, deadline, description } =
      body || {};
    if (!name || !target_amount || Number(target_amount) <= 0) {
      return Response.json(
        { error: "Thiếu thông tin bắt buộc" },
        { status: 400 },
      );
    }
    const rows = await sql`
      INSERT INTO saving_goals (user_id, name, target_amount, current_amount, deadline, description)
      VALUES (${userId}, ${name.trim()}, ${Number(target_amount)}, ${Number(current_amount) || 0}, ${deadline || null}, ${description || null})
      RETURNING *
    `;
    return Response.json({ goal: rows[0] });
  } catch (err) {
    console.error("POST /api/goals error:", err);
    return Response.json({ error: "Không thể tạo mục tiêu" }, { status: 500 });
  }
}
