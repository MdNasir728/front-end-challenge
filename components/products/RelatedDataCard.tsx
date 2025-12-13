"use client";

import { DashboardCard } from "@/components/ui/dashboard-card";
import { StatsHeader } from "@/components/dashboard/StatsHeader";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { useTheme } from "next-themes";

interface RelatedDataCardProps {
  title: string;
  amount: string;
  trend: string;
  data: { date: string; primary: number; secondary: number }[];
  primaryColor: string;
  className?: string;
}

export const RelatedDataCard = ({
  title,
  amount,
  trend,
  data,
  primaryColor,
  className,
}: RelatedDataCardProps) => {
  const { theme } = useTheme();
  const secondary = theme === "dark" ? "#9ca3af" : "#9ca3af";

  return (
    <DashboardCard className={className ? `p-6 ${className}` : "p-6"}>
      <StatsHeader
        title={title}
        amount={amount}
        trend={trend}
        trendLabel="trend"
        showFilter={false}
      />
      <div className="mt-6 h-[120px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis
              dataKey="date"
              tick={{ fill: "rgb(107, 114, 128)" }}
              className="dark:[&_text]:fill-gray-400"
              stroke="transparent"
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              hide
              domain={[0, "dataMax"]}
            />
            <ReferenceLine
              y={0}
              stroke={theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"}
              strokeWidth={1}
              label={{
                value: "0",
                position: "left",
                fill: theme === "dark" ? "rgb(156, 163, 175)" : "rgb(107, 114, 128)",
                fontSize: 12,
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
                color: "hsl(var(--card-foreground))",
              }}
              labelStyle={{
                color: "hsl(var(--card-foreground))",
              }}
            />
            <Line
              type="monotone"
              dataKey="secondary"
              stroke={secondary}
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="primary"
              stroke={primaryColor}
              strokeWidth={3}
              dot={{ fill: primaryColor, r: 4, strokeWidth: 2, stroke: theme === "dark" ? "white" : "black" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
};

