import type * as Icons from "lucide-react";

export type MenuItem = {
  id: string;
  label: string;
  icon: keyof typeof Icons;
  href?: string;
  disabled?: boolean;
  active?: boolean;
  children?: MenuItem[];
};

