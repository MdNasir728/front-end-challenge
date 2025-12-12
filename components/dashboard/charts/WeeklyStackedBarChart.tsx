"use client";

import { DashboardCard } from "@/components/ui/dashboard-card";
import { StatsHeader } from "../StatsHeader";
import { weeklyEarnings } from "@/constants/stats";
import { useTheme } from "next-themes";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  type BarProps,
} from "recharts";

export const WeeklyStackedBarChart = () => {
  const { theme } = useTheme();
  // Light mode: Green bars, Dark mode: Orange bars
  const stackedBase = theme === "dark" ? "#ea580c" : "#16a34a";
  const stackedOverlay = theme === "dark" ? "#fb923c" : "#4ade80";

  const gapSize = 8; // Gap between base and overlay bars in pixels

  return (
    <DashboardCard className="p-6">
      <StatsHeader title="Total Earning" amount="$ 112,893.00" filterDefault="This Week" />
      <div className="mt-6 h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyEarnings} barSize={30} barCategoryGap="20%">
            <CartesianGrid 
              strokeDasharray="3 3" 
              horizontal={true} 
              vertical={false}
              stroke={theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}
            />
            <XAxis
              dataKey="day"
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
              domain={[0, 500]}
              ticks={[100, 200, 300, 400, 500]}
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
            {/* Render base bar with custom shape that includes overlay bar with gap */}
            <Bar 
              dataKey="base" 
              fill={stackedBase} 
              radius={[0, 0, 0, 0]}
              shape={(props: BarProps & { payload?: { base: number; overlay: number } }) => {
                const { x, y, width, height, payload } = props;
                if (x == null || y == null || width == null || height == null || !payload) return null;
                
                const baseY = typeof y === 'number' ? y : Number(y) || 0;
                const baseHeight = typeof height === 'number' ? height : Number(height) || 0;
                
                // Calculate overlay bar position and height
                // The overlay value needs to be scaled to match the chart's scale
                // Since we're in a BarChart with domain [0, 500], the scale is chartHeight / 500
                // But we can use the base bar's height to determine the scale
                const baseValue = payload.base;
                const overlayValue = payload.overlay;
                const scale = baseHeight / baseValue; // Scale factor
                const overlayHeight = overlayValue * scale;
                const overlayY = baseY - gapSize - overlayHeight;
                
                return (
                  <g>
                    {/* Base bar (bottom) */}
                    <rect
                      x={x}
                      y={baseY}
                      width={width}
                      height={baseHeight}
                      fill={stackedBase}
                    />
                    {/* Overlay bar (top) with gap and rounded top corners */}
                    <rect
                      x={x}
                      y={overlayY}
                      width={width}
                      height={overlayHeight}
                      fill={stackedOverlay}
                      rx={6}
                      ry={6}
                    />
                  </g>
                );
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
};

