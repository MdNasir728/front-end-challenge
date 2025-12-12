"use client";

import { DashboardCard } from "@/components/ui/dashboard-card";
import { StatsHeader } from "../StatsHeader";
import { salesTrend } from "@/constants/stats";
import { useTheme } from "next-themes";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

export const TotalSalesLineChart = () => {
  const { theme } = useTheme();
  const primary = theme === "dark" ? "#a855f7" : "#a855f7";
  const secondary = theme === "dark" ? "#9ca3af" : "#9ca3af";

  return (
    <DashboardCard className="p-6">
      <StatsHeader title="Total Sales" amount="+ 112,893" showFilter={false} />
      <div className="mt-6 h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={salesTrend}>
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
              stroke={primary}
              strokeWidth={3}
              dot={{ fill: primary, r: 4, strokeWidth: 2, stroke: theme === "dark" ? "white" : "black" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
};

