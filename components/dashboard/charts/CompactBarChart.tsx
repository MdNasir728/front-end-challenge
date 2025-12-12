"use client";

import { DashboardCard } from "@/components/ui/dashboard-card";
import { StatsHeader } from "../StatsHeader";
import { compactBars } from "@/constants/stats";
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

export const CompactBarChart = () => {
  const { theme } = useTheme();
  const barGradientStart = theme === "dark" ? "#0d9488" : "#16a34a";
  const barGradientEnd = theme === "dark" ? "#2dd4bf" : "#4ade80";
  const gradientId = theme === "dark" ? "barBgDark" : "barBgLight";

  // Calculate max value for chart height calculation
  const maxValue = Math.max(...compactBars.map((item) => item.value));

  const CustomBar = ({ x, y, width, height, fill, payload }: BarProps & { payload?: { value: number } }) => {
    if (x == null || y == null || width == null || height == null) return null;
    
    // Ensure height is a number
    const barHeight = typeof height === 'number' ? height : Number(height) || 0;
    const currentValue = payload?.value || 0;
    
    // Calculate the full chart area height
    // For domain [0, maxValue], if bar height represents value v, then:
    // chartAreaHeight = barHeight * (maxValue / v)
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
          rx={6} 
          ry={6}
        />
      </g>
    );
  };

  return (
    <DashboardCard className="p-6">
      <StatsHeader title="Total Earning" amount="$ 112,893.00" />
      <div className="mt-6 h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={compactBars} barSize={28} barCategoryGap="15%">
            <defs>
              {/* Background gradient for bars */}
              <linearGradient id="barBgLight" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#f8fafc" stopOpacity={0} />
                <stop offset="100%" stopColor="#e5e7eb" stopOpacity={0.7} />
              </linearGradient>
              <linearGradient id="barBgDark" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.06)" stopOpacity={0} />
                <stop offset="100%" stopColor="rgba(0,0,0,0.35)" stopOpacity={0.8} />
              </linearGradient>
              {/* Bar gradient */}
              <linearGradient id="barGradientLight" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={barGradientStart} stopOpacity={0.6} />
                <stop offset="100%" stopColor={barGradientEnd} stopOpacity={1} />
              </linearGradient>
              <linearGradient id="barGradientDark" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={barGradientStart} stopOpacity={0.6} />
                <stop offset="100%" stopColor={barGradientEnd} stopOpacity={1} />
              </linearGradient>
            </defs>
            <XAxis dataKey="label" hide />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
                color: "hsl(var(--card-foreground))",
              }}
            />
            <Bar
              dataKey="value"
              fill={theme === "dark" ? "url(#barGradientDark)" : "url(#barGradientLight)"}
              radius={[6, 6, 0, 0]}
              shape={(props: BarProps & { payload?: { value: number } }) => (
                <CustomBar {...props} fill={theme === "dark" ? "url(#barGradientDark)" : "url(#barGradientLight)"} />
              )}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
};

