import { TrendingUp, TrendingDown } from "lucide-react";
import { formatVND } from "@/utils/formatCurrency";
import GlassCard from "@/components/ui/GlassCard";

interface StatCardProps {
  label: string;
  value: number;
  icon?: React.ComponentType<any>;
  trend?: number;
  trendLabel?: string;
  highlight?: boolean;
  isCurrency?: boolean;
  suffix?: string;
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  trendLabel,
  highlight = false,
  isCurrency = true,
  suffix = "",
}: StatCardProps) {
  const trendUp = typeof trend === "number" && trend > 0;
  const trendDown = typeof trend === "number" && trend < 0;
  const TrendIcon = trendUp ? TrendingUp : trendDown ? TrendingDown : null;

  return (
    <GlassCard
      hover
      glow={highlight}
      padding="p-5"
      className={highlight ? "border-[#FFD100]/20" : ""}
    >
      <div className="flex items-center justify-between">
        {Icon && (
          <div
            className={`rounded-xl p-2.5 ring-1 ${
              highlight
                ? "bg-gradient-to-br from-[#FFD100]/30 to-[#FFEE32]/10 text-[#FFD100] ring-[#FFD100]/30"
                : "bg-white/[0.04] text-[#D6D6D6]/80 ring-white/10"
            }`}
          >
            <Icon size={18} />
          </div>
        )}
        {TrendIcon && (
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
              trendUp
                ? "bg-green-500/15 text-green-400"
                : "bg-red-500/15 text-red-400"
            }`}
          >
            <TrendIcon size={11} />
            {Math.abs(trend || 0)}%
          </span>
        )}
      </div>
      <p className="mt-4 text-xs font-medium uppercase tracking-wider text-[#D6D6D6]/50">
        {label}
      </p>
      <p
        className={`mt-1 text-2xl font-bold tracking-tight ${
          highlight ? "text-[#FFEE32]" : "text-white"
        }`}
      >
        {isCurrency ? formatVND(value) : `${value}${suffix}`}
      </p>
      {trendLabel && (
        <p className="mt-1 text-xs text-[#D6D6D6]/50">{trendLabel}</p>
      )}
    </GlassCard>
  );
}
