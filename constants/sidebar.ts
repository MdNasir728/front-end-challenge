import { MenuItem } from "@/types/menu";

export const sidebarMenu: MenuItem[] = [
  {
    id: "home",
    label: "Home",
    icon: "Home",
    href: "#",
    active: true,
  },
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "LayoutGrid",
    href: "#",
  },
  {
    id: "store",
    label: "Store",
    icon: "Store",
    children: [
      { id: "product", label: "Product", icon: "Package", href: "#", active: true },
      { id: "add-product", label: "Add Product", icon: "PlusCircle", href: "#" },
    ],
  },
  {
    id: "analytics",
    label: "Analytic",
    icon: "BarChart3",
    children: [
      { id: "analytic-overview", label: "Analytic", icon: "LineChart", href: "#" },
      { id: "traffic", label: "Traffic", icon: "Activity", href: "#" },
      { id: "earning", label: "Earning", icon: "TrendingUp", href: "#" },
    ],
  },
  {
    id: "finances",
    label: "Finances",
    icon: "Wallet",
    children: [
      { id: "payment", label: "Payment", icon: "CreditCard", href: "#" },
      { id: "payout", label: "Payout", icon: "Banknote", href: "#" },
    ],
  },
  {
    id: "account",
    label: "Account Setting",
    icon: "Settings",
    children: [
      { id: "profile", label: "My Profile", icon: "User", href: "#" },
      { id: "security", label: "Security", icon: "Shield", href: "#" },
    ],
  },
  {
    id: "support",
    label: "Help And Support",
    icon: "LifeBuoy",
    href: "#",
  },
];

