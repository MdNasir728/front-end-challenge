"use client";

import { DashboardCard } from "@/components/ui/dashboard-card";
import { StatsHeader } from "../StatsHeader";
import { subscriptionTrend } from "@/constants/stats";
import { useTheme } from "next-themes";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const SubscriptionsLineChart = () => {
  const { theme } = useTheme();
  const subscriptionColor = theme === "dark" ? "#f59e0b" : "#f59e0b";

  return (
    <DashboardCard className="p-6">
      <StatsHeader title="Subscriptions" amount="+ 112,893" />
      <div className="mt-6 h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={subscriptionTrend}>
            <XAxis
              dataKey="label"
              hide
            />
            <YAxis
              hide
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
              dataKey="value"
              stroke={subscriptionColor}
              strokeWidth={3}
              dot={{ fill: subscriptionColor, r: 4, strokeWidth: 2, stroke: theme === "dark" ? "white" : "black" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
};

