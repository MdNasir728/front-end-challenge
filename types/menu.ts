import type { IconName } from "lucide-react";

export type MenuItem = {
  id: string;
  label: string;
  icon: IconName;
  href?: string;
  disabled?: boolean;
  active?: boolean;
  children?: MenuItem[];
};

