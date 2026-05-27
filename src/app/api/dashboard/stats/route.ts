import sql from "@/app/api/utils/sql";
import { getUserId, unauthorizedResponse } from "@/app/api/utils/getUserId";

export async function GET() {
  const userId = await getUserId();
  if (!userId) return unauthorizedResponse();

  try {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const todayStr = now.toISOString().slice(0, 10);

    // Start of week (Mon)
    const dayOfWeek = now.getDay(); // 0=Sun..6=Sat
    const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - diff);
    const weekStartStr = weekStart.toISOString().slice(0, 10);

    const monthStart = `${year}-${String(month).padStart(2, "0")}-01`;

    // Previous month boundaries
    const prevMonthDate = new Date(year, month - 2, 1);
    const prevYear = prevMonthDate.getFullYear();
    const prevMonth = prevMonthDate.getMonth() + 1;
    const prevMonthStart = `${prevYear}-${String(prevMonth).padStart(2, "0")}-01`;
    const prevMonthEnd = new Date(year, month - 1, 0)
      .toISOString()
      .slice(0, 10);

    // Run aggregations in parallel
    const [
      monthAgg,
      todayAgg,
      weekAgg,
      walletAgg,
      prevMonthAgg,
      categoryAgg,
      recentTx,
      dailyChart,
      categoryByMonth,
      prevCategoryAgg,
    ] = await Promise.all([
      sql`
        SELECT
          COALESCE(SUM(CASE WHEN type='income' THEN amount END), 0) AS income,
          COALESCE(SUM(CASE WHEN type='expense' THEN amount END), 0) AS expense
        FROM transactions
        WHERE user_id = ${userId}
          AND transaction_date >= ${monthStart}
      `,
      sql`
        SELECT
          COALESCE(SUM(CASE WHEN type='expense' THEN amount END), 0) AS expense
        FROM transactions
        WHERE user_id = ${userId} AND transaction_date = ${todayStr}
      `,
      sql`
        SELECT
          COALESCE(SUM(CASE WHEN type='expense' THEN amount END), 0) AS expense
        FROM transactions
        WHERE user_id = ${userId} AND transaction_date >= ${weekStartStr}
      `,
      sql`
        SELECT COALESCE(SUM(current_balance), 0) AS total_balance
        FROM wallets WHERE user_id = ${userId}
      `,
      sql`
        SELECT
          COALESCE(SUM(CASE WHEN type='expense' THEN amount END), 0) AS expense,
          COALESCE(SUM(CASE WHEN type='income' THEN amount END), 0) AS income
        FROM transactions
        WHERE user_id = ${userId}
          AND transaction_date >= ${prevMonthStart}
          AND transaction_date <= ${prevMonthEnd}
      `,
      sql`
        SELECT c.id, c.name, c.icon, c.color, COALESCE(SUM(t.amount), 0) AS total
        FROM categories c
        LEFT JOIN transactions t ON t.category_id = c.id AND t.type='expense'
          AND t.transaction_date >= ${monthStart} AND t.user_id = ${userId}
        WHERE c.user_id = ${userId}
        GROUP BY c.id
        HAVING COALESCE(SUM(t.amount), 0) > 0
        ORDER BY total DESC
        LIMIT 5
      `,
      sql`
        SELECT t.*, c.name AS category_name, c.icon AS category_icon, c.color AS category_color,
               w.name AS wallet_name
        FROM transactions t
        LEFT JOIN categories c ON c.id = t.category_id
        LEFT JOIN wallets w ON w.id = t.wallet_id
        WHERE t.user_id = ${userId}
        ORDER BY t.transaction_date DESC, t.id DESC
        LIMIT 8
      `,
      sql`
        SELECT
          transaction_date AS day,
          SUM(CASE WHEN type='income' THEN amount ELSE 0 END) AS income,
          SUM(CASE WHEN type='expense' THEN amount ELSE 0 END) AS expense
        FROM transactions
        WHERE user_id = ${userId}
          AND transaction_date >= ${monthStart}
        GROUP BY transaction_date
        ORDER BY transaction_date ASC
      `,
      sql`
        SELECT c.id, c.name, c.color, COALESCE(SUM(t.amount), 0) AS total
        FROM categories c
        LEFT JOIN transactions t ON t.category_id = c.id AND t.type='expense'
          AND t.transaction_date >= ${monthStart} AND t.user_id = ${userId}
        WHERE c.user_id = ${userId}
        GROUP BY c.id
        HAVING COALESCE(SUM(t.amount), 0) > 0
        ORDER BY total DESC
      `,
      sql`
        SELECT c.id, c.name, COALESCE(SUM(t.amount), 0) AS total
        FROM categories c
        LEFT JOIN transactions t ON t.category_id = c.id AND t.type='expense'
          AND t.transaction_date >= ${prevMonthStart} AND t.transaction_date <= ${prevMonthEnd}
          AND t.user_id = ${userId}
        WHERE c.user_id = ${userId}
        GROUP BY c.id
        HAVING COALESCE(SUM(t.amount), 0) > 0
      `,
    ]);

    const monthIncome = Number(monthAgg[0]?.income || 0);
    const monthExpense = Number(monthAgg[0]?.expense || 0);
    const balance = Number(walletAgg[0]?.total_balance || 0);
    const savingsRate =
      monthIncome > 0
        ? Math.round(((monthIncome - monthExpense) / monthIncome) * 100)
        : 0;

    // Generate AI-style insight (rule-based)
    let insight =
      "Hãy ghi chép giao dịch thường xuyên để có phân tích chi tiêu chính xác hơn.";
    if (categoryAgg.length > 0 && prevCategoryAgg.length > 0) {
      const top = categoryAgg[0];
      const prev = prevCategoryAgg.find((p: any) => p.id === top.id);
      if (prev && Number(prev.total) > 0) {
        const change =
          ((Number(top.total) - Number(prev.total)) / Number(prev.total)) * 100;
        if (Math.abs(change) >= 10) {
          const sign = change > 0 ? "cao hơn" : "thấp hơn";
          insight = `Tháng này bạn chi ${top.name.toLowerCase()} ${sign} ${Math.abs(Math.round(change))}% so với tháng trước.`;
        } else {
          insight = `Chi tiêu ${top.name.toLowerCase()} tháng này khá ổn định so với tháng trước.`;
        }
      } else if (categoryAgg.length > 0) {
        insight = `${categoryAgg[0].name} là danh mục bạn chi nhiều nhất tháng này.`;
      }
    } else if (monthIncome === 0 && monthExpense === 0) {
      insight =
        "Hãy bắt đầu ghi nhận giao dịch đầu tiên của bạn trong tháng này!";
    } else if (savingsRate >= 30) {
      insight = `Tuyệt vời! Tỷ lệ tiết kiệm ${savingsRate}% — bạn đang quản lý tài chính rất tốt.`;
    } else if (savingsRate < 0) {
      insight =
        "Cảnh báo: Chi tiêu tháng này đang vượt thu nhập. Hãy xem lại ngân sách.";
    }

    return Response.json({
      month: { income: monthIncome, expense: monthExpense },
      previous_month: {
        income: Number(prevMonthAgg[0]?.income || 0),
        expense: Number(prevMonthAgg[0]?.expense || 0),
      },
      today_expense: Number(todayAgg[0]?.expense || 0),
      week_expense: Number(weekAgg[0]?.expense || 0),
      balance,
      savings_rate: savingsRate,
      top_categories: categoryAgg.map((c: any) => ({
        id: c.id,
        name: c.name,
        icon: c.icon,
        color: c.color,
        total: Number(c.total),
      })),
      category_breakdown: categoryByMonth.map((c: any) => ({
        id: c.id,
        name: c.name,
        color: c.color,
        total: Number(c.total),
      })),
      recent_transactions: recentTx,
      daily_chart: dailyChart.map((d: any) => ({
        day: d.day,
        income: Number(d.income),
        expense: Number(d.expense),
      })),
      insight,
    });
  } catch (err) {
    console.error("GET /api/dashboard/stats error:", err);
    return Response.json({ error: "Lỗi tải dashboard" }, { status: 500 });
  }
}
