import * as React from "react";
import { cn } from "@/lib/utils";

type DashboardCardProps = React.HTMLAttributes<HTMLDivElement>;

export function DashboardCard({ className, ...props }: DashboardCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800",
        className
      )}
      {...props}
    />
  );
}

