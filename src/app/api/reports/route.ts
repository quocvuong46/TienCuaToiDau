import sql from "@/app/api/utils/sql";
import { getUserId, unauthorizedResponse } from "@/app/api/utils/getUserId";

export async function GET(request: Request) {
  const userId = await getUserId();
  if (!userId) return unauthorizedResponse();

  try {
    const { searchParams } = new URL(request.url);
    let dateFrom = searchParams.get("date_from");
    let dateTo = searchParams.get("date_to");

    if (!dateFrom || !dateTo) {
      const now = new Date();
      dateFrom = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;
      dateTo = now.toISOString().slice(0, 10);
    }

    // Compute previous period of same length
    const fromDate = new Date(dateFrom);
    const toDate = new Date(dateTo);
    const lengthMs = toDate.getTime() - fromDate.getTime();
    const prevToDate = new Date(fromDate.getTime() - 24 * 3600 * 1000);
    const prevFromDate = new Date(prevToDate.getTime() - lengthMs);
    const prevFrom = prevFromDate.toISOString().slice(0, 10);
    const prevTo = prevToDate.toISOString().slice(0, 10);

    const [totals, daily, byCategory, topTx, prevTotals] = await Promise.all([
      sql`
        SELECT
          COALESCE(SUM(CASE WHEN type='income' THEN amount END), 0) AS income,
          COALESCE(SUM(CASE WHEN type='expense' THEN amount END), 0) AS expense
        FROM transactions
        WHERE user_id = ${userId}
          AND transaction_date >= ${dateFrom}
          AND transaction_date <= ${dateTo}
      `,
      sql`
        SELECT
          transaction_date AS day,
          SUM(CASE WHEN type='income' THEN amount ELSE 0 END) AS income,
          SUM(CASE WHEN type='expense' THEN amount ELSE 0 END) AS expense
        FROM transactions
        WHERE user_id = ${userId}
          AND transaction_date >= ${dateFrom}
          AND transaction_date <= ${dateTo}
        GROUP BY transaction_date
        ORDER BY transaction_date ASC
      `,
      sql`
        SELECT c.id, c.name, c.color, c.icon,
               COALESCE(SUM(CASE WHEN t.type='expense' THEN t.amount END), 0) AS expense_total,
               COALESCE(SUM(CASE WHEN t.type='income' THEN t.amount END), 0) AS income_total
        FROM categories c
        LEFT JOIN transactions t ON t.category_id = c.id AND t.user_id = ${userId}
          AND t.transaction_date >= ${dateFrom}
          AND t.transaction_date <= ${dateTo}
        WHERE c.user_id = ${userId}
        GROUP BY c.id
        HAVING COALESCE(SUM(t.amount), 0) > 0
        ORDER BY expense_total DESC
      `,
      sql`
        SELECT t.*, c.name AS category_name, c.icon AS category_icon, c.color AS category_color,
               w.name AS wallet_name
        FROM transactions t
        LEFT JOIN categories c ON c.id = t.category_id
        LEFT JOIN wallets w ON w.id = t.wallet_id
        WHERE t.user_id = ${userId}
          AND t.transaction_date >= ${dateFrom}
          AND t.transaction_date <= ${dateTo}
        ORDER BY t.amount DESC
        LIMIT 10
      `,
      sql`
        SELECT
          COALESCE(SUM(CASE WHEN type='income' THEN amount END), 0) AS income,
          COALESCE(SUM(CASE WHEN type='expense' THEN amount END), 0) AS expense
        FROM transactions
        WHERE user_id = ${userId}
          AND transaction_date >= ${prevFrom}
          AND transaction_date <= ${prevTo}
      `,
    ]);

    const income = Number(totals[0]?.income || 0);
    const expense = Number(totals[0]?.expense || 0);
    const balance = income - expense;
    const savingsRate =
      income > 0 ? Math.round(((income - expense) / income) * 100) : 0;

    return Response.json({
      range: { from: dateFrom, to: dateTo },
      totals: { income, expense, balance, savings_rate: savingsRate },
      previous: {
        income: Number(prevTotals[0]?.income || 0),
        expense: Number(prevTotals[0]?.expense || 0),
      },
      daily: daily.map((d: any) => ({
        day: d.day,
        income: Number(d.income),
        expense: Number(d.expense),
      })),
      by_category: byCategory.map((c: any) => ({
        id: c.id,
        name: c.name,
        color: c.color,
        icon: c.icon,
        expense_total: Number(c.expense_total),
        income_total: Number(c.income_total),
      })),
      top_transactions: topTx,
    });
  } catch (err) {
    console.error("GET /api/reports error:", err);
    return Response.json({ error: "Lỗi tải báo cáo" }, { status: 500 });
  }
}
