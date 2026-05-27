import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";
import { formatVND } from "@/utils/formatCurrency";

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-xl border border-white/15 bg-[#202020]/95 px-3 py-2 backdrop-blur-xl shadow-lg">
      <p className="text-xs font-medium text-white">{label}</p>
      <p className="mt-0.5 text-xs text-[#FFD100]">
        Số dư lũy kế:{" "}
        <span className="font-semibold">{formatVND(payload[0].value)}</span>
      </p>
    </div>
  );
}

interface BalanceLineChartProps {
  data?: any[];
  height?: number;
  startingBalance?: number;
}

export default function BalanceLineChart({
  data = [],
  height = 240,
  startingBalance = 0,
}: BalanceLineChartProps) {
  // Build cumulative balance from daily income - expense
  let running = Number(startingBalance) || 0;
  const series = data.map((d) => {
    running += Number(d.income || 0) - Number(d.expense || 0);
    return {
      label: d.day ? format(parseISO(d.day), "dd/MM") : "",
      balance: running,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart
        data={series}
        margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
      >
        <defs>
          <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFD100" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#FFD100" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fill: "#D6D6D6", fontSize: 11 }}
          axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "#D6D6D6", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => {
            if (Math.abs(v) >= 1_000_000)
              return `${(v / 1_000_000).toFixed(1)}M`;
            if (Math.abs(v) >= 1_000) return `${(v / 1_000).toFixed(0)}K`;
            return v;
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="balance"
          stroke="#FFD100"
          strokeWidth={2.5}
          fill="url(#balanceGrad)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
