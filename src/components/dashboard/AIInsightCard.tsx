import { Sparkles } from "lucide-react";

interface AIInsightCardProps {
  insight: string;
}

export default function AIInsightCard({ insight }: AIInsightCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#FFD100]/25 bg-gradient-to-br from-[#FFD100]/10 via-[#FFEE32]/5 to-transparent p-5 backdrop-blur-xl shadow-[0_0_40px_-15px_rgba(255,209,0,0.4)]">
      <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[#FFD100]/20 blur-2xl" />
      <div className="relative flex items-start gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFD100] to-[#FFEE32] text-[#202020] shadow-[0_0_20px_-4px_rgba(255,209,0,0.7)]">
          <Sparkles size={18} strokeWidth={2.5} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#FFD100]">
              AI Insight
            </p>
            <span className="rounded-full bg-[#FFD100]/15 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-[#FFD100]">
              Mới
            </span>
          </div>
          <p className="mt-2 text-sm font-medium leading-relaxed text-white">
            {insight}
          </p>
        </div>
      </div>
    </div>
  );
}
