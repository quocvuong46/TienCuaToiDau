import sql from "@/app/api/utils/sql";
import { getUserId, unauthorizedResponse } from "@/app/api/utils/getUserId";

export async function GET() {
  const userId = await getUserId();
  if (!userId) return unauthorizedResponse();

  try {
    const rows = await sql`
      SELECT * FROM wallets WHERE user_id = ${userId} ORDER BY created_at ASC
    `;
    return Response.json({ wallets: rows });
  } catch (err) {
    console.error("GET /api/wallets error:", err);
    return Response.json({ error: "Lỗi tải ví" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const userId = await getUserId();
  if (!userId) return unauthorizedResponse();

  try {
    const body = await request.json();
    const { name, type, icon, color, initial_balance } = body || {};

    if (!name || typeof name !== "string" || !name.trim()) {
      return Response.json({ error: "Tên ví là bắt buộc" }, { status: 400 });
    }
    const initBal = Number(initial_balance) || 0;

    const rows = await sql`
      INSERT INTO wallets (user_id, name, type, icon, color, initial_balance, current_balance)
      VALUES (${userId}, ${name.trim()}, ${type || "cash"}, ${icon || "Wallet"}, ${color || "#FFD100"}, ${initBal}, ${initBal})
      RETURNING *
    `;
    return Response.json({ wallet: rows[0] });
  } catch (err) {
    console.error("POST /api/wallets error:", err);
    return Response.json({ error: "Không thể tạo ví" }, { status: 500 });
  }
}
