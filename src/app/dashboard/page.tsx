"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Plus,
  ScanLine,
  Calendar,
  Sun,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import PageHeader from "@/components/layout/PageHeader";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import StatCard from "@/components/dashboard/StatCard";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import AIInsightCard from "@/components/dashboard/AIInsightCard";
import BudgetWarningCard from "@/components/dashboard/BudgetWarningCard";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import IncomeExpenseBarChart from "@/components/charts/IncomeExpenseBarChart";
import CategoryDonutChart from "@/components/charts/CategoryDonutChart";
import BalanceLineChart from "@/components/charts/BalanceLineChart";
import { formatMonthYearVN } from "@/utils/formatDate";
import { getIcon } from "@/utils/categoryIcons";
import { formatVND } from "@/utils/formatCurrency";
import Link from "next/link";

interface DashboardStats {
  balance?: number;
  month?: {
    income?: number;
    expense?: number;
  };
  previous_month?: {
    expense?: number;
  };
  savings_rate?: number;
  insight?: string;
  today_expense?: number;
  week_expense?: number;
  daily_chart?: Array<{ date: string; income: number; expense: number }>;
  category_breakdown?: Array<{ id: string; name: string; color: string; total: number }>;
  top_categories?: Array<{ id: string; name: string; icon: string; color: string; total: number }>;
  recent_transactions?: any[];
}

export default function DashboardPage() {
  const { data, isLoading } = useQuery<DashboardStats>({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard/stats");
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      return res.json();
    },
    refetchInterval: 60000,
  });

  const now = new Date();
  const { data: budgetsData } = useQuery({
    queryKey: ["budgets", now.getMonth() + 1, now.getFullYear()],
    queryFn: async () => {
      const res = await fetch(
        `/api/budgets?month=${now.getMonth() + 1}&year=${now.getFullYear()}`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    },
  });

  const stats = data || {};
  const trend = (() => {
    const cur = Number(stats?.month?.expense || 0);
    const prev = Number(stats?.previous_month?.expense || 0);
    if (prev === 0) return null;
    return Math.round(((cur - prev) / prev) * 100);
  })();

  return (
    <AppShell currentPath="/dashboard">
      <PageHeader
        title="Tổng quan"
        subtitle={`Tình hình tài chính của bạn — ${formatMonthYearVN(new Date())}`}
        actions={
          <div className="flex flex-wrap gap-2">
            <Button
              variant="secondary"
              size="md"
              onClick={() => (window.location.href = "/budgets")}
            >
              <PiggyBank size={16} /> Ngân sách
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => (window.location.href = "/ocr")}
            >
              <ScanLine size={16} /> Quét hóa đơn
            </Button>
            <Button
              size="md"
              onClick={() => (window.location.href = "/transactions?new=1")}
            >
              <Plus size={16} /> Thêm giao dịch
            </Button>
          </div>
        }
      />

      {isLoading ? (
        <DashboardSkeleton />
      ) : (
        <div className="space-y-6">
          {/* Stat row */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Số dư hiện tại"
              value={stats.balance || 0}
              icon={Wallet}
              highlight
            />
            <StatCard
              label="Thu nhập tháng"
              value={stats?.month?.income || 0}
              icon={TrendingUp}
            />
            <StatCard
              label="Chi tiêu tháng"
              value={stats?.month?.expense || 0}
              icon={TrendingDown}
              trend={trend !== null ? trend : undefined}
              trendLabel={trend !== null ? "so với tháng trước" : undefined}
            />
            <StatCard
              label="Tỷ lệ tiết kiệm"
              value={stats.savings_rate || 0}
              icon={PiggyBank}
              isCurrency={false}
              suffix="%"
            />
          </div>

          {/* Insight + budget warning */}
          <div className="grid gap-4 lg:grid-cols-2">
            <AIInsightCard
              insight={
                stats.insight ||
                "Hãy ghi chép giao dịch thường xuyên để có phân tích chính xác hơn."
              }
            />
            <BudgetWarningCard budgets={budgetsData?.budgets || []} />
          </div>

          {/* Secondary stats */}
          <div className="grid gap-4 sm:grid-cols-2">
            <GlassCard padding="p-5" hover>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-white/[0.04] p-2.5 text-[#D6D6D6]">
                    <Sun size={18} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#D6D6D6]/50">
                      Chi tiêu hôm nay
                    </p>
                    <p className="mt-0.5 text-xl font-bold text-white">
                      {formatVND(stats.today_expense || 0)}
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>
            <GlassCard padding="p-5" hover>
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-white/[0.04] p-2.5 text-[#D6D6D6]">
                  <Calendar size={18} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#D6D6D6]/50">
                    Chi tiêu tuần này
                  </p>
                  <p className="mt-0.5 text-xl font-bold text-white">
                    {formatVND(stats.week_expense || 0)}
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Charts row 1 */}
          <div className="grid gap-4 lg:grid-cols-3">
            <GlassCard className="lg:col-span-2" padding="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Thu & Chi theo ngày
                  </h3>
                  <p className="mt-0.5 text-xs text-[#D6D6D6]/50">
                    Trong tháng này
                  </p>
                </div>
              </div>
              <IncomeExpenseBarChart data={stats.daily_chart || []} />
            </GlassCard>

            <GlassCard padding="p-6">
              <div className="mb-2">
                <h3 className="text-base font-semibold text-white">
                  Phân bổ chi tiêu
                </h3>
                <p className="mt-0.5 text-xs text-[#D6D6D6]/50">
                  Theo danh mục
                </p>
              </div>
              <CategoryDonutChart data={stats.category_breakdown || []} />
              <div className="mt-4 space-y-1.5">
                {(stats.category_breakdown || []).slice(0, 4).map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: c.color }}
                      />
                      <span className="text-[#D6D6D6]">{c.name}</span>
                    </div>
                    <span className="font-medium text-white">
                      {formatVND(c.total)}
                    </span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Charts row 2 + Recent */}
          <div className="grid gap-4 lg:grid-cols-3">
            <GlassCard className="lg:col-span-2" padding="p-6">
              <div className="mb-4">
                <h3 className="text-base font-semibold text-white">
                  Xu hướng số dư lũy kế
                </h3>
                <p className="mt-0.5 text-xs text-[#D6D6D6]/50">
                  Dòng tiền tháng này
                </p>
              </div>
              <BalanceLineChart
                data={stats.daily_chart || []}
                startingBalance={
                  (stats.balance || 0) -
                  ((stats?.month?.income || 0) - (stats?.month?.expense || 0))
                }
              />
            </GlassCard>

            <GlassCard padding="p-6">
              <div className="mb-2">
                <h3 className="text-base font-semibold text-white">
                  Top danh mục
                </h3>
                <p className="mt-0.5 text-xs text-[#D6D6D6]/50">
                  Chi nhiều nhất tháng này
                </p>
              </div>
              <div className="mt-3 space-y-2">
                {(stats.top_categories || []).map((c) => {
                  const Icon = getIcon(c.icon);
                  const max = stats.top_categories?.[0]?.total || 1;
                  const pct = Math.round((c.total / max) * 100);
                  return (
                    <div key={c.id} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div
                            className="flex h-7 w-7 items-center justify-center rounded-lg"
                            style={{
                              backgroundColor: `${c.color}25`,
                              color: c.color,
                            }}
                          >
                            <Icon size={13} />
                          </div>
                          <span className="font-medium text-white">
                            {c.name}
                          </span>
                        </div>
                        <span className="text-[#D6D6D6]">
                          {formatVND(c.total)}
                        </span>
                      </div>
                      <div className="h-1 overflow-hidden rounded-full bg-white/5">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${pct}%`, backgroundColor: c.color }}
                        />
                      </div>
                    </div>
                  );
                })}
                {(!stats.top_categories ||
                  stats.top_categories.length === 0) && (
                  <p className="text-xs text-[#D6D6D6]/40">Chưa có dữ liệu.</p>
                )}
              </div>
            </GlassCard>
          </div>

          {/* Recent transactions */}
          <GlassCard padding="p-6">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-white">
                  Giao dịch gần đây
                </h3>
                <p className="mt-0.5 text-xs text-[#D6D6D6]/50">
                  8 giao dịch mới nhất
                </p>
              </div>
              <Link
                href="/transactions"
                className="text-xs font-medium text-[#FFD100] hover:text-[#FFEE32]"
              >
                Xem tất cả →
              </Link>
            </div>
            <RecentTransactions
              transactions={stats.recent_transactions || []}
            />
          </GlassCard>
        </div>
      )}
    </AppShell>
  );
}
