"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  PiggyBank,
  Download,
  Printer,
} from "lucide-react";
import { toast } from "sonner";
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from "date-fns";
import AppShell from "@/components/layout/AppShell";
import PageHeader from "@/components/layout/PageHeader";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Skeleton from "@/components/ui/Skeleton";
import StatCard from "@/components/dashboard/StatCard";
import IncomeExpenseBarChart from "@/components/charts/IncomeExpenseBarChart";
import CategoryDonutChart from "@/components/charts/CategoryDonutChart";
import BalanceLineChart from "@/components/charts/BalanceLineChart";
import { getIcon } from "@/utils/categoryIcons";
import { formatVND } from "@/utils/formatCurrency";
import { formatDateVN, todayISO } from "@/utils/formatDate";
import { downloadCSV } from "@/utils/exportCSV";

const PRESETS = [
  { id: "today", label: "Hôm nay" },
  { id: "week", label: "Tuần này" },
  { id: "month", label: "Tháng này" },
  { id: "year", label: "Năm nay" },
  { id: "custom", label: "Tùy chỉnh" },
];

function getRange(preset: string) {
  const now = new Date();
  switch (preset) {
    case "today":
      return { from: todayISO(), to: todayISO() };
    case "week": {
      const s = startOfWeek(now, { weekStartsOn: 1 });
      const e = endOfWeek(now, { weekStartsOn: 1 });
      return {
        from: s.toISOString().slice(0, 10),
        to: e.toISOString().slice(0, 10),
      };
    }
    case "year": {
      const s = startOfYear(now);
      const e = endOfYear(now);
      return {
        from: s.toISOString().slice(0, 10),
        to: e.toISOString().slice(0, 10),
      };
    }
    case "month":
    default: {
      const s = startOfMonth(now);
      const e = endOfMonth(now);
      return {
        from: s.toISOString().slice(0, 10),
        to: e.toISOString().slice(0, 10),
      };
    }
  }
}

export default function ReportsPage() {
  const [preset, setPreset] = useState("month");
  const initialRange = getRange("month");
  const [dateFrom, setDateFrom] = useState(initialRange.from);
  const [dateTo, setDateTo] = useState(initialRange.to);

  const handlePreset = (p: string) => {
    setPreset(p);
    if (p !== "custom") {
      const r = getRange(p);
      setDateFrom(r.from);
      setDateTo(r.to);
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["reports", dateFrom, dateTo],
    queryFn: async () => {
      const res = await fetch(
        `/api/reports?date_from=${dateFrom}&date_to=${dateTo}`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    },
  });

  const totals = data?.totals || {
    income: 0,
    expense: 0,
    balance: 0,
    savings_rate: 0,
  };
  const previous = data?.previous || { income: 0, expense: 0 };
  const expenseTrend =
    previous.expense > 0
      ? Math.round(
          ((totals.expense - previous.expense) / previous.expense) * 100
        )
      : null;

  const handleExportCSV = () => {
    if (!data) return;
    const rows = (data.top_transactions || []).map((t: any) => [
      t.id,
      t.transaction_date,
      t.type === "income" ? "Thu" : "Chi",
      t.merchant_name || t.description || "",
      t.category_name || "",
      t.wallet_name || "",
      t.amount,
    ]);
    downloadCSV(
      `bao-cao-${dateFrom}-den-${dateTo}.csv`,
      ["ID", "Ngày", "Loại", "Mô tả", "Danh mục", "Ví", "Số tiền (VND)"],
      rows
    );
    toast.success("Đã xuất file CSV (Excel)");
  };

  const handleExportPDF = () => {
    if (typeof window !== "undefined") {
      window.print();
      toast.info("Sử dụng tính năng 'Save as PDF' của trình duyệt");
    }
  };

  return (
    <AppShell currentPath="/reports">
      <PageHeader
        title="Báo cáo & Thống kê"
        subtitle="Phân tích chi tiết thu chi theo khoảng thời gian"
        actions={
          <div className="flex gap-2">
            <Button variant="secondary" size="md" onClick={handleExportCSV}>
              <Download size={16} /> Xuất Excel
            </Button>
            <Button variant="secondary" size="md" onClick={handleExportPDF}>
              <Printer size={16} /> Xuất PDF
            </Button>
          </div>
        }
      />

      {/* Filters */}
      <GlassCard padding="p-4" className="mb-6 print:hidden">
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex flex-wrap gap-1.5">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => handlePreset(p.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  preset === p.id
                    ? "bg-[#FFD100] text-[#202020] shadow-[0_0_20px_-6px_rgba(255,209,0,0.6)]"
                    : "bg-white/5 text-[#D6D6D6] hover:bg-white/10"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="flex flex-1 flex-wrap items-end gap-3">
            <div className="flex-1 min-w-[140px]">
              <Input
                label="Từ ngày"
                type="date"
                value={dateFrom}
                onChange={(e: any) => {
                  setDateFrom(e.target.value);
                  setPreset("custom");
                }}
              />
            </div>
            <div className="flex-1 min-w-[140px]">
              <Input
                label="Đến ngày"
                type="date"
                value={dateTo}
                onChange={(e: any) => {
                  setDateTo(e.target.value);
                  setPreset("custom");
                }}
              />
            </div>
          </div>
        </div>
      </GlassCard>

      {isLoading ? (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32 rounded-2xl" />
            ))}
          </div>
          <Skeleton className="h-80 rounded-2xl" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Period info */}
          <div className="text-xs text-[#D6D6D6]/60 print:text-black">
            Báo cáo từ{" "}
            <span className="text-white print:text-black">
              {formatDateVN(dateFrom)}
            </span>{" "}
            đến{" "}
            <span className="text-white print:text-black">
              {formatDateVN(dateTo)}
            </span>
          </div>

          {/* Stat cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Tổng thu nhập"
              value={totals.income}
              icon={TrendingUp}
              highlight
            />
            <StatCard
              label="Tổng chi tiêu"
              value={totals.expense}
              icon={TrendingDown}
              trend={expenseTrend !== null ? expenseTrend : undefined}
              trendLabel="so với kỳ trước"
            />
            <StatCard label="Số dư" value={totals.balance} icon={Wallet} />
            <StatCard
              label="Tỷ lệ tiết kiệm"
              value={totals.savings_rate}
              icon={PiggyBank}
              isCurrency={false}
              suffix="%"
            />
          </div>

          {/* Comparison */}
          <GlassCard padding="p-5">
            <h3 className="text-sm font-semibold text-white">
              So sánh với kỳ trước
            </h3>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <ComparisonRow
                label="Thu nhập"
                current={totals.income}
                previous={previous.income}
                positive={true}
              />
              <ComparisonRow
                label="Chi tiêu"
                current={totals.expense}
                previous={previous.expense}
                positive={false}
              />
            </div>
          </GlassCard>

          {/* Charts */}
          <div className="grid gap-4 lg:grid-cols-3">
            <GlassCard className="lg:col-span-2" padding="p-6">
              <h3 className="mb-3 text-base font-semibold text-white">
                Thu chi theo ngày
              </h3>
              <IncomeExpenseBarChart data={data?.daily || []} />
            </GlassCard>
            <GlassCard padding="p-6">
              <h3 className="mb-2 text-base font-semibold text-white">
                Phân bổ chi tiêu
              </h3>
              <CategoryDonutChart
                data={(data?.by_category || []).map((c: any) => ({
                  ...c,
                  total: c.expense_total,
                }))}
              />
            </GlassCard>
          </div>

          <GlassCard padding="p-6">
            <h3 className="mb-3 text-base font-semibold text-white">
              Xu hướng số dư trong kỳ
            </h3>
            <BalanceLineChart data={data?.daily || []} startingBalance={0} />
          </GlassCard>

          {/* By category table */}
          <GlassCard padding="p-6">
            <h3 className="mb-3 text-base font-semibold text-white">
              Chi tiết theo danh mục
            </h3>
            {(data?.by_category || []).length === 0 ? (
              <p className="text-sm text-[#D6D6D6]/50">Chưa có dữ liệu</p>
            ) : (
              <div className="space-y-2">
                {(data.by_category || []).map((c: any) => {
                  const Icon = getIcon(c.icon);
                  const max = data.by_category[0]?.expense_total || 1;
                  const pct = Math.round((c.expense_total / max) * 100);
                  return (
                    <div key={c.id} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
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
                          {formatVND(c.expense_total)}
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${pct}%`, backgroundColor: c.color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </GlassCard>

          {/* Top transactions */}
          <GlassCard padding="p-6">
            <h3 className="mb-3 text-base font-semibold text-white">
              Top giao dịch lớn nhất
            </h3>
            {(data?.top_transactions || []).length === 0 ? (
              <p className="text-sm text-[#D6D6D6]/50">Chưa có dữ liệu</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-[#D6D6D6]/50">
                      <th className="py-2 pr-3">Ngày</th>
                      <th className="py-2 pr-3">Mô tả</th>
                      <th className="py-2 pr-3">Danh mục</th>
                      <th className="py-2 pr-3 text-right">Số tiền</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {data.top_transactions.map((tx: any) => (
                      <tr key={tx.id}>
                        <td className="py-2.5 pr-3 text-[#D6D6D6]/70">
                          {formatDateVN(tx.transaction_date)}
                        </td>
                        <td className="py-2.5 pr-3 text-white">
                          {tx.merchant_name || tx.description || "—"}
                        </td>
                        <td className="py-2.5 pr-3">
                          {tx.category_name && (
                            <span
                              className="rounded-full px-2 py-0.5 text-xs"
                              style={{
                                backgroundColor: `${tx.category_color || "#FFD100"}25`,
                                color: tx.category_color || "#FFD100",
                              }}
                            >
                              {tx.category_name}
                            </span>
                          )}
                        </td>
                        <td
                          className={`py-2.5 pr-3 text-right font-semibold ${
                            tx.type === "income"
                              ? "text-[#FFEE32]"
                              : "text-white"
                          }`}
                        >
                          {tx.type === "income" ? "+" : "-"}
                          {formatVND(tx.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </GlassCard>
        </div>
      )}
    </AppShell>
  );
}

interface ComparisonRowProps {
  label: string;
  current: number;
  previous: number;
  positive: boolean;
}

function ComparisonRow({ label, current, previous, positive }: ComparisonRowProps) {
  const diff = current - previous;
  const pct = previous > 0 ? Math.round((diff / previous) * 100) : null;
  const isGood = positive ? diff >= 0 : diff <= 0;
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <p className="text-xs uppercase tracking-wider text-[#D6D6D6]/50">
        {label}
      </p>
      <div className="mt-1 flex items-baseline justify-between">
        <p className="text-xl font-bold text-white">{formatVND(current)}</p>
        {pct !== null && (
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              isGood
                ? "bg-green-500/15 text-green-400"
                : "bg-red-500/15 text-red-400"
            }`}
          >
            {diff >= 0 ? "+" : ""}
            {pct}%
          </span>
        )}
      </div>
      <p className="mt-1 text-xs text-[#D6D6D6]/50">
        Kỳ trước: {formatVND(previous)}
      </p>
    </div>
  );
}
