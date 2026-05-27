import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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
      {payload.map((p) => (
        <p key={p.dataKey} className="mt-1 text-xs" style={{ color: p.color }}>
          {p.name}: <span className="font-semibold">{formatVND(p.value)}</span>
        </p>
      ))}
    </div>
  );
}

interface IncomeExpenseBarChartProps {
  data?: any[];
  height?: number;
}

export default function IncomeExpenseBarChart({
  data = [],
  height = 280,
}: IncomeExpenseBarChartProps) {
  const formatted = data.map((d) => ({
    ...d,
    label: d.day ? format(parseISO(d.day), "dd/MM") : "",
  }));

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={formatted}
        margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
      >
        <defs>
          <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFD100" stopOpacity={1} />
            <stop offset="100%" stopColor="#FFD100" stopOpacity={0.4} />
          </linearGradient>
          <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D6D6D6" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#D6D6D6" stopOpacity={0.15} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
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
            if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
            if (v >= 1_000) return `${(v / 1_000).toFixed(0)}K`;
            return v;
          }}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ fill: "rgba(255,209,0,0.05)" }}
        />
        <Legend
          wrapperStyle={{ fontSize: 11, color: "#D6D6D6", paddingTop: 8 }}
          iconType="circle"
        />
        <Bar
          dataKey="income"
          name="Thu"
          fill="url(#incomeGrad)"
          radius={[6, 6, 0, 0]}
          maxBarSize={36}
        />
        <Bar
          dataKey="expense"
          name="Chi"
          fill="url(#expenseGrad)"
          radius={[6, 6, 0, 0]}
          maxBarSize={36}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
