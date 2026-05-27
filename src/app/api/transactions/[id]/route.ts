import sql from "@/app/api/utils/sql";
import { getUserId, unauthorizedResponse } from "@/app/api/utils/getUserId";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const userId = await getUserId();
  if (!userId) return unauthorizedResponse();
  const id = params.id;

  try {
    const tx = await sql`
      SELECT t.*, c.name AS category_name, c.icon AS category_icon, c.color AS category_color,
             w.name AS wallet_name
      FROM transactions t
      LEFT JOIN categories c ON c.id = t.category_id
      LEFT JOIN wallets w ON w.id = t.wallet_id
      WHERE t.id = ${id} AND t.user_id = ${userId}
    `;
    if (tx.length === 0) {
      return Response.json({ error: "Không tìm thấy" }, { status: 404 });
    }
    const items = await sql`
      SELECT * FROM receipt_items WHERE transaction_id = ${id} ORDER BY id ASC
    `;
    return Response.json({ transaction: tx[0], items });
  } catch (err) {
    console.error("GET /api/transactions/[id] error:", err);
    return Response.json({ error: "Lỗi tải giao dịch" }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const userId = await getUserId();
  if (!userId) return unauthorizedResponse();
  const id = params.id;

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
    } = body || {};

    // Fetch original transaction
    const existing = await sql`
      SELECT * FROM transactions WHERE id = ${id} AND user_id = ${userId}
    `;
    if (existing.length === 0) {
      return Response.json({ error: "Không tìm thấy" }, { status: 404 });
    }
    const orig = existing[0];

    // Compute new values
    const newAmount =
      amount !== undefined ? Number(amount) : Number(orig.amount);
    const newType = type !== undefined ? type : orig.type;

    // Build update query (database trigger handles updating wallet balance automatically)
    const setClauses = ["updated_at = NOW()"];
    const values: any[] = [];
    if (wallet_id !== undefined) {
      values.push(wallet_id || null);
      setClauses.push(`wallet_id = $${values.length}`);
    }
    if (category_id !== undefined) {
      values.push(category_id || null);
      setClauses.push(`category_id = $${values.length}`);
    }
    if (amount !== undefined) {
      values.push(newAmount);
      setClauses.push(`amount = $${values.length}`);
    }
    if (type !== undefined) {
      values.push(newType);
      setClauses.push(`type = $${values.length}`);
    }
    if (description !== undefined) {
      values.push(description || null);
      setClauses.push(`description = $${values.length}`);
    }
    if (merchant_name !== undefined) {
      values.push(merchant_name || null);
      setClauses.push(`merchant_name = $${values.length}`);
    }
    if (image_url !== undefined) {
      values.push(image_url || null);
      setClauses.push(`image_url = $${values.length}`);
    }
    if (transaction_date !== undefined) {
      values.push(transaction_date);
      setClauses.push(`transaction_date = $${values.length}`);
    }

    values.push(id);
    values.push(userId);
    const q = `UPDATE transactions SET ${setClauses.join(", ")} WHERE id = $${values.length - 1} AND user_id = $${values.length} RETURNING *`;
    const result = await sql(q, values);

    return Response.json({ transaction: result[0] });
  } catch (err) {
    console.error("PATCH /api/transactions/[id] error:", err);
    return Response.json(
      { error: "Không thể cập nhật giao dịch" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const userId = await getUserId();
  if (!userId) return unauthorizedResponse();
  const id = params.id;

  try {
    const existing = await sql`
      SELECT id FROM transactions WHERE id = ${id} AND user_id = ${userId}
    `;
    if (existing.length === 0) {
      return Response.json({ error: "Không tìm thấy" }, { status: 404 });
    }

    // Delete transaction (database trigger handles updating wallet balance automatically)
    await sql`DELETE FROM transactions WHERE id = ${id} AND user_id = ${userId}`;
    return Response.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/transactions/[id] error:", err);
    return Response.json({ error: "Không thể xóa giao dịch" }, { status: 500 });
  }
}
