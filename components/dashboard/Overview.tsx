"use client";

import { DashboardCard } from "@/components/ui/dashboard-card";
import { overviewData } from "@/constants/overview";
import { useTheme } from "next-themes";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  type BarProps,
} from "recharts";

export const Overview = () => {
  const { theme } = useTheme();
  const barColor = theme === "dark" ? "#f97316" : "#3b82f6";
  const gradientId = theme === "dark" ? "barBgDark" : "barBgLight";

  const CustomBar = ({ x, y, width, height, fill, payload }: BarProps & { payload?: { value: number } }) => {
    if (x == null || y == null || width == null || height == null) return null;

    // Ensure height is a number
    const barHeight = typeof height === 'number' ? height : Number(height) || 0;
    const currentValue = payload?.value || 0;
    const maxValue = 6000;

    // Calculate the full chart area height
    // For domain [0, 6000], if bar height represents value v, then:
    // chartAreaHeight = barHeight * (6000 / v)
    // Also account for the y position - the bottom of chart is at y + barHeight for value 0
    // So full chart height from top (y=0) to bottom is: y + barHeight (for max value bar)
    // For any bar: chartHeight = y + (barHeight * 6000 / currentValue)
    const chartHeight = currentValue > 0
      ? (barHeight * maxValue) / currentValue
      : (typeof y === 'number' ? y : Number(y) || 0) + barHeight;

    return (
      <g>
        {/* Background gradient rectangle extending from top (y=0) to bottom of chart */}
        <rect
          x={x}
          y={0}
          width={width}
          height={chartHeight}
          fill={`url(#${gradientId})`}
        />
        {/* Actual bar on top */}
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={fill}
          rx={4}
          ry={4}
        />
      </g>
    );
  };

  return (
    <DashboardCard className="p-6">
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Overview
          </h2>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={overviewData.data} barSize={34} barCategoryGap="10%">
              <defs>
                <linearGradient id="barBgLight" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#f8fafc" stopOpacity={0} />
                  <stop offset="100%" stopColor="#e5e7eb" stopOpacity={0.7} />
                </linearGradient>
                <linearGradient id="barBgDark" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.06)" stopOpacity={0} />
                  <stop offset="100%" stopColor="rgba(0,0,0,0.35)" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
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
                domain={[0, 6000]}
                ticks={[0, 1500, 3000, 4500, 6000]}
                tickFormatter={(value) => `$${value}`}
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
                formatter={(value: number) => [`$${value}`, "Value"]}
              />
              {/* Combined bar with background gradient and actual bar on top */}
              <Bar
                dataKey="value"
                fill={barColor}
                radius={[4, 4, 0, 0]}
                shape={(props: BarProps & { payload?: { value: number } }) => (
                  <CustomBar {...props} fill={barColor} />
                )}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardCard>
  );
};

