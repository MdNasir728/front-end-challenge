"use client";

import { useState, useMemo, useEffect, startTransition } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import * as Icons from "lucide-react";
import type {  LucideIcon } from "lucide-react";
import { sidebarMenu } from "@/constants/sidebar";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

function IconByName({ name, className }: { name: keyof typeof Icons; className?: string }) {
  const IconComponent = Icons[name] as LucideIcon | undefined;
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
}

export default function Sidebar() {
  const pathname = usePathname();
  
  // Determine which parent menu should be expanded based on current path
  const initialExpanded = useMemo(
    () =>
      sidebarMenu
        .filter((item) => item.children && item.children.length > 0)
        .reduce<Record<string, boolean>>((acc, item) => {
          // Check if any child's href matches current pathname
          const hasActiveChild = item.children?.some(
            (child) => child.href && pathname.startsWith(child.href)
          );
          acc[item.id] = hasActiveChild || false;
          return acc;
        }, {}),
    [pathname]
  );

  const [expanded, setExpanded] = useState<Record<string, boolean>>(initialExpanded);

  // Update expanded state when pathname changes
  useEffect(() => {
    const newExpanded = sidebarMenu
      .filter((item) => item.children && item.children.length > 0)
      .reduce<Record<string, boolean>>((acc, item) => {
        const hasActiveChild = item.children?.some(
          (child) => child.href && pathname.startsWith(child.href)
        );
        acc[item.id] = hasActiveChild || false;
        return acc;
      }, {});
    startTransition(() => {
      setExpanded(newExpanded);
    });
  }, [pathname]);

  const toggle = (id: string) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  // Check if a menu item is active based on pathname
  const isActive = (href?: string, isChild?: boolean) => {
    if (!href || href === "#") return false;
    // Exact match for dashboard/home
    if (href === "/dashboard") {
      return pathname === "/dashboard" || pathname === "/";
    }
    // For child items, use exact match
    if (isChild) {
      return pathname === href;
    }
    // For parent routes, check if pathname starts with href but ensure it's not a more specific child route
    // For example, /products should not be active when on /products/add
    if (href === "/products") {
      return pathname === "/products" || pathname.startsWith("/products/edit");
    }
    // For other routes, check if pathname starts with href
    return pathname.startsWith(href);
  };

  return (
    <div className="flex h-full flex-col gap-4 bg-gray-100 px-3 py-6 text-sm text-gray-800 dark:bg-black dark:text-gray-100">
      {/* User */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border dark:border-gray-200 border-gray-800 text-gray-700 dark:text-gray-100">
          <span className="text-sm font-medium">B</span>
        </div>
        <div>
          <p className="text-sm font-semibold">Bitstore</p>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-1">
        {sidebarMenu.map((item) =>
          item.children && item.children.length > 0 ? (
            <div key={item.id} className="mb-1">
              <button
                onClick={() => toggle(item.id)}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition",
                  "hover:bg-gray-200 dark:hover:bg-gray-800",
                  (expanded[item.id] || item.children?.some((child) => isActive(child.href))) && "bg-white shadow-sm dark:bg-gray-900"
                )}
              >
                <div className="flex items-center gap-2">
                  <IconByName name={item.icon} className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition",
                    expanded[item.id] ? "rotate-180" : "rotate-0"
                  )}
                />
              </button>
              {expanded[item.id] && (
                <div className="ml-4 mt-2 flex flex-col gap-1 border-l border-gray-200 pl-3 dark:border-gray-800">
                  {item.children.map((child) => (
                    <Link
                      key={child.id}
                      href={child.href ?? "#"}
                      className={cn(
                        "flex items-center gap-2 rounded-lg px-2 py-2 text-sm transition",
                        "hover:bg-gray-200 dark:hover:bg-gray-800",
                        isActive(child.href, true)
                          ? "bg-white font-medium shadow-sm dark:bg-gray-900"
                          : "text-gray-700 dark:text-gray-300"
                      )}
                    >
                      <IconByName name={child.icon} className="h-4 w-4" />
                      <span>{child.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              key={item.id}
              href={item.href ?? "#"}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 transition",
                "hover:bg-gray-200 dark:hover:bg-gray-800",
                isActive(item.href)
                  ? "bg-white font-medium shadow-sm dark:bg-gray-900"
                  : "text-gray-700 dark:text-gray-300"
              )}
            >
              <IconByName name={item.icon} className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          )
        )}
      </nav>
    </div>
  );
}

