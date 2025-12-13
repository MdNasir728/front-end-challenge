import { useState, useMemo, useEffect, startTransition } from "react";
import { usePathname } from "next/navigation";
import { useRole } from "@/contexts/RoleContext";
import { sidebarMenu } from "@/constants/sidebar";

/**
 * Custom hook for managing sidebar menu state
 * Handles:
 * - Role-based menu filtering
 * - Expanded/collapsed state for parent menus
 * - Active route detection
 */
export function useSidebarMenu() {
  const pathname = usePathname();
  const { role } = useRole();

  // Filter menu items based on role
  const filteredMenu = useMemo(() => {
    if (role === "Store Keeper") {
      return sidebarMenu.filter((item) => item.id !== "dashboard");
    }
    return sidebarMenu;
  }, [role]);

  // Calculate which parent menus should be expanded based on active route
  const calculateExpanded = useMemo(() => {
    return filteredMenu
      .filter((item) => item.children && item.children.length > 0)
      .reduce<Record<string, boolean>>((acc, item) => {
        const hasActiveChild = item.children?.some(
          (child) => child.href && pathname.startsWith(child.href)
        );
        acc[item.id] = hasActiveChild || false;
        return acc;
      }, {});
  }, [pathname, filteredMenu]);

  const [expanded, setExpanded] = useState<Record<string, boolean>>(calculateExpanded);

  // Update expanded state when pathname or filtered menu changes
  useEffect(() => {
    startTransition(() => {
      setExpanded(calculateExpanded);
    });
  }, [calculateExpanded]);

  const toggle = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Check if a menu item is active based on current pathname
  const isActive = (href?: string, isChild = false): boolean => {
    if (!href || href === "#") return false;

    // Exact matches for specific routes
    if (href === "/home") return pathname === "/home" || pathname === "/";
    if (href === "/dashboard") return pathname === "/dashboard";

    // Child items use exact match
    if (isChild) return pathname === href;

    // Special handling for /products to avoid activating on /products/add
    if (href === "/products") {
      return pathname === "/products" || pathname.startsWith("/products/edit");
    }

    // Default: check if pathname starts with href
    return pathname.startsWith(href);
  };

  return {
    filteredMenu,
    expanded,
    toggle,
    isActive,
  };
}
