import Link from "next/link";
import { getIcon } from "@/utils/categoryIcons";
import { formatVND } from "@/utils/formatCurrency";
import { formatDateVN } from "@/utils/formatDate";
import EmptyState from "@/components/ui/EmptyState";
import { ArrowLeftRight, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface RecentTransactionsProps {
  transactions?: any[];
}

export default function RecentTransactions({ transactions = [] }: RecentTransactionsProps) {
  if (!transactions || transactions.length === 0) {
    return (
      <EmptyState
        icon={ArrowLeftRight}
        title="Chưa có giao dịch"
        description="Hãy thêm giao dịch đầu tiên hoặc quét hóa đơn để bắt đầu."
      />
    );
  }

  return (
    <div className="divide-y divide-white/5">
      {transactions.map((tx) => {
        const Icon = getIcon(tx.category_icon);
        const isIncome = tx.type === "income";
        return (
          <Link
            key={tx.id}
            href={`/transactions?focus=${tx.id}`}
            className="flex items-center gap-3 py-3 transition-colors hover:bg-white/[0.02] -mx-2 px-2 rounded-lg"
          >
            <div
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
              style={{
                backgroundColor: `${tx.category_color || "#FFD100"}25`,
                color: tx.category_color || "#FFD100",
              }}
            >
              <Icon size={18} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">
                {tx.merchant_name ||
                  tx.description ||
                  tx.category_name ||
                  "Giao dịch"}
              </p>
              <p className="truncate text-xs text-[#D6D6D6]/50">
                {tx.category_name || "Không phân loại"}
                {tx.wallet_name && ` • ${tx.wallet_name}`}
                {" • "}
                {formatDateVN(tx.transaction_date)}
              </p>
            </div>
            <div className="flex flex-shrink-0 flex-col items-end">
              <span
                className={`flex items-center gap-1 text-sm font-semibold ${
                  isIncome ? "text-[#FFEE32]" : "text-white"
                }`}
              >
                {isIncome ? (
                  <ArrowUpRight size={14} className="text-[#FFEE32]" />
                ) : (
                  <ArrowDownRight size={14} className="text-red-400" />
                )}
                {isIncome ? "+" : "-"}
                {formatVND(tx.amount)}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
