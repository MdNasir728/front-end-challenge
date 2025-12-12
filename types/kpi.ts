import type * as Icons from "lucide-react";

export type KpiItem = {
  id: string;
  title: string;
  value: string;
  trendLabel: string;
  trendValue: string;
  icon: keyof typeof Icons;
};

