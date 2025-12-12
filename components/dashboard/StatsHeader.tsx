"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface StatsHeaderProps {
  title: string;
  amount: string;
  trend?: string;
  trendLabel?: string;
  filterDefault?: string;
  showFilter?: boolean;
  className?: string;
}

export const StatsHeader = ({
  title,
  amount,
  trend = "+70.5%",
  trendLabel = "trend title",
  filterDefault = "This Week",
  showFilter = true,
  className,
}: StatsHeaderProps) => {
  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-gray-900 dark:text-white">
          {title}
        </p>
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
          {amount}
        </p>
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
          <div className="h-2 w-2 rounded bg-green-600 dark:bg-green-400"></div>
          <span>{trendLabel}</span>
          <span className="text-green-600 dark:text-green-400">{trend}</span>
        </div>
      </div>
      {showFilter && (
        <Select defaultValue={filterDefault}>
          <SelectTrigger className="h-8 w-28 bg-gray-100 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="text-sm">
            <SelectItem value="This Week">This Week</SelectItem>
            <SelectItem value="Last Week">Last Week</SelectItem>
            <SelectItem value="This Month">This Month</SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

