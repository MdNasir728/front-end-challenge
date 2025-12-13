"use client";

import { usePathname } from "next/navigation";
import AppLayout from "./AppLayout";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

/**
 * Wrapper component that conditionally applies AppLayout
 * Excludes /login route which has its own layout
 */
export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isLoginRoute = pathname === "/login";

  // Don't wrap login route with AppLayout (it has its own layout)
  if (isLoginRoute) {
    return <>{children}</>;
  }

  // Wrap all other routes with AppLayout
  return <AppLayout>{children}</AppLayout>;
}

