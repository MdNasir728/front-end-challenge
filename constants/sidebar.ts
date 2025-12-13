import { MenuItem } from "@/types/menu";

export const sidebarMenu: MenuItem[] = [
  {
    id: "home",
    label: "Home",
    icon: "Home",
    href: "/home",
  },
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "LayoutGrid",
    href: "/dashboard",
  },
  {
    id: "store",
    label: "Store",
    icon: "Store",
    children: [
      { id: "product", label: "Product", icon: "Package", href: "/products" },
      { id: "add-product", label: "Add Product", icon: "PlusCircle", href: "/products/add" },
    ],
  },
  {
    id: "analytics",
    label: "Analytic",
    icon: "BarChart3",
    children: [
      { id: "analytic-overview", label: "Analytic", icon: "LineChart", href: "/analytics/overview" },
      { id: "traffic", label: "Traffic", icon: "Activity", href: "/analytics/traffic" },
      { id: "earning", label: "Earning", icon: "TrendingUp", href: "/analytics/earning" },
    ],
  },
  {
    id: "finances",
    label: "Finances",
    icon: "Wallet",
    children: [
      { id: "payment", label: "Payment", icon: "CreditCard", href: "/finances/payment" },
      { id: "payout", label: "Payout", icon: "Banknote", href: "/finances/payout" },
    ],
  },
  {
    id: "account",
    label: "Account Setting",
    icon: "Settings",
    children: [
      { id: "profile", label: "My Profile", icon: "User", href: "/account/profile" },
      { id: "security", label: "Security", icon: "Shield", href: "/account/security" },
    ],
  },
  {
    id: "support",
    label: "Help And Support",
    icon: "LifeBuoy",
    href: "/support",
  },
];

