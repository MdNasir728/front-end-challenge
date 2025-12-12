"use client";

import { DashboardCard } from "@/components/ui/dashboard-card";
import { StatsHeader } from "../StatsHeader";
import { monthlyEarnings } from "@/constants/stats";
import { useTheme } from "next-themes";
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Bar,
  type BarProps,
} from "recharts";

export const MonthlyLineChart = () => {
  const { theme } = useTheme();
  const primary = theme === "dark" ? "#2dd4bf" : "#22c55e";
  const secondary = theme === "dark" ? "#14b8a6" : "#86efac";
  const bandId = theme === "dark" ? "bandDark" : "bandLight";

  // Use only first 6 months for 6 bars
  const sixMonthsData = monthlyEarnings.slice(0, 6);
  
  const chartData = sixMonthsData.map((item) => ({
    ...item,
    background: Math.max(
      ...sixMonthsData.map((entry) => Math.max(entry.primary, entry.secondary))
    ),
  }));

  return (
    <DashboardCard className="p-6">
      <StatsHeader title="Total Earning" amount="$ 112,893.00" filterDefault="This Week" />
      <div className="mt-6 h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} barCategoryGap="20%" barGap={0}>
            <defs>
              <linearGradient id="bandLight" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#f8fafc" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#e5e7eb" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="bandDark" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.55)" />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              tick={{ fill: "rgb(107, 114, 128)" }}
              className="dark:[&_text]:fill-gray-400"
              stroke="transparent"
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fill: "rgb(107, 114, 128)" }}
              className="dark:[&_text]:fill-gray-400"
              stroke="transparent"
              domain={[0, "dataMax"]}
              tickLine={false}
              axisLine={false}
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
            <Bar
              dataKey="background"
              fill={`url(#${bandId})`}
              barSize={60}
              radius={[0, 0, 0, 0]}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="primary"
              stroke={primary}
              strokeWidth={3}
              dot={{ fill: primary, r: 4, strokeWidth: 2, stroke: "white" }}
              className="dark:[&_dot]:stroke-gray-800"
            />
            <Line
              type="monotone"
              dataKey="secondary"
              stroke={secondary}
              strokeWidth={2}
              dot={{ fill: secondary, r: 3, strokeWidth: 2, stroke: "white" }}
              className="dark:[&_dot]:stroke-gray-800"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
};

