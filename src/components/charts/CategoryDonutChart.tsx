import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { formatVND } from "@/utils/formatCurrency";
import { CHART_COLORS } from "@/utils/colors";

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  const p = payload[0];
  return (
    <div className="rounded-xl border border-white/15 bg-[#202020]/95 px-3 py-2 backdrop-blur-xl shadow-lg">
      <p className="text-xs font-medium text-white">{p.name}</p>
      <p className="mt-0.5 text-xs text-[#FFEE32]">{formatVND(p.value)}</p>
    </div>
  );
}

interface CategoryDonutChartProps {
  data?: any[];
  height?: number;
}

export default function CategoryDonutChart({
  data = [],
  height = 280,
}: CategoryDonutChartProps) {
  if (!data || data.length === 0) {
    return (
      <div
        className="flex items-center justify-center text-sm text-[#D6D6D6]/40"
        style={{ height }}
      >
        Chưa có dữ liệu
      </div>
    );
  }

  const formatted = data.map((d, i) => ({
    name: d.name,
    value: Number(d.total) || 0,
    color: d.color || CHART_COLORS[i % CHART_COLORS.length],
  }));

  const total = formatted.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={formatted}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="85%"
            paddingAngle={2}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={2}
          >
            {formatted.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-[10px] uppercase tracking-wider text-[#D6D6D6]/50">
          Tổng chi
        </p>
        <p className="mt-0.5 text-lg font-bold text-[#FFEE32]">
          {formatVND(total)}
        </p>
      </div>
    </div>
  );
}
