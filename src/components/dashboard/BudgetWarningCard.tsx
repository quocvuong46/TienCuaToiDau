import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { formatVND } from "@/utils/formatCurrency";
import Link from "next/link";

interface BudgetWarningCardProps {
  budgets?: any[];
}

export default function BudgetWarningCard({ budgets = [] }: BudgetWarningCardProps) {
  const warnings = budgets
    .map((b) => ({
      ...b,
      percent:
        Number(b.limit_amount) > 0
          ? Math.round((Number(b.spent_amount) / Number(b.limit_amount)) * 100)
          : 0,
    }))
    .filter((b) => b.percent >= 80)
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 3);

  if (warnings.length === 0) {
    return (
      <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5 backdrop-blur-xl">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-green-500/15 text-green-400">
            <CheckCircle2 size={18} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-green-400">
              Ngân sách an toàn
            </p>
            <p className="mt-1 text-sm text-white">
              Bạn đang chi tiêu trong mức ngân sách đã đặt.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-orange-500/30 bg-orange-500/5 p-5 backdrop-blur-xl">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/15 text-orange-400">
          <AlertTriangle size={16} />
        </div>
        <p className="text-xs font-semibold uppercase tracking-wider text-orange-300">
          Cảnh báo ngân sách
        </p>
      </div>
      <div className="space-y-2.5">
        {warnings.map((b) => {
          const over = b.percent >= 100;
          return (
            <Link
              href="/budgets"
              key={b.id}
              className="block space-y-1 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-white">
                  {b.category_name}
                </span>
                <span className={over ? "text-red-400" : "text-orange-300"}>
                  {b.percent}%
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full ${
                    over ? "bg-red-500" : "bg-orange-400"
                  }`}
                  style={{ width: `${Math.min(b.percent, 100)}%` }}
                />
              </div>
              <p className="text-[10px] text-[#D6D6D6]/50">
                {formatVND(b.spent_amount)} / {formatVND(b.limit_amount)}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
