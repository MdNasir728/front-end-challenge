
import { DashboardCard } from "@/components/ui/dashboard-card";
import { KpiItem } from "@/types/kpi";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const IconByName = ({ name, className }: { name: keyof typeof Icons; className?: string }) => {
  const IconComponent = Icons[name] as LucideIcon | undefined;
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
};

export const KpiCard = ({ item }: { item: KpiItem }) => {
  return (
    <DashboardCard className="p-4">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{item.title}</p>
          <p className="text-xl font-semibold text-gray-900 dark:text-white">{item.value}</p>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span>{item.trendLabel}</span>
            <span className="font-semibold text-green-500">{item.trendValue}</span>
          </div>
        </div>
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-md border",
            "border-gray-200 bg-gray-100 text-gray-600",
            "dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
          )}
        >
          <IconByName name={item.icon} className="h-4 w-4" />
        </div>
      </div>
    </DashboardCard>
  );
};

