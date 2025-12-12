"use client";

import { DashboardCard } from "@/components/ui/dashboard-card";
import { subscriptionsPerformers } from "@/constants/stats";
import { useTheme } from "next-themes";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

export const SubscriptionsPerformersCard = () => {
  const { theme } = useTheme();
  // Light mode: solid orange bars
  // Dark mode: teal-to-light-blue gradient (darker teal at bottom, lighter teal/cyan at top)
  const barColorLight = "#f97316"; // Orange
  const barGradientStartDark = "#0d9488"; // Darker teal
  const barGradientEndDark = "#2dd4bf"; // Lighter teal/cyan

  return (
    <DashboardCard className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Subscriptions Performers
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Follower This Years
          </p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">+500</span>
          <ArrowUp className="h-5 w-5 text-gray-900 dark:text-white" />
        </div>
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={subscriptionsPerformers} barSize={35} barCategoryGap="10%">
              <defs>
                <linearGradient id="subsGradientDark" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor={barGradientStartDark} stopOpacity={1} />
                  <stop offset="100%" stopColor={barGradientEndDark} stopOpacity={1} />
                </linearGradient>
              </defs>
              <XAxis dataKey="label" hide />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                  color: "red",
                }}
                wrapperStyle={{
                  zIndex: 1000,
                }}
                position={{ y: -10 }}
                cursor={{ fill: "transparent" }}
              />
              <Bar
                dataKey="value"
                fill={theme === "dark" ? "url(#subsGradientDark)" : barColorLight}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <Button className="w-full bg-green-600 hover:bg-green-700 dark:bg-black dark:border dark:border-gray-400 dark:hover:bg-gray-900 text-white">
          Get Started
        </Button>
      </div>
    </DashboardCard>
  );
};

