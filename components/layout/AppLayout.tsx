"use client";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useFooterVisibility } from "@/hooks/useFooterVisibility";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: React.ReactNode;
}

/**
 * Universal layout component for all authenticated pages
 * 
 * Features:
 * - Sidebar: Fixed when footer not visible, sticky when footer is in view
 * - Header: Always visible at top of main content
 * - Footer: Detected via IntersectionObserver to adjust sidebar behavior
 * - Main content: Scrollable independently when footer not visible
 */
export default function AppLayout({ children }: AppLayoutProps) {
  const { footerRef, isVisible: isFooterVisible } = useFooterVisibility();

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 text-gray-900 dark:bg-black dark:text-white">
      <div className="flex flex-1">
        <aside
          className={cn(
            "hidden w-64 bg-white dark:border-gray-800 dark:bg-gray-950 md:block z-10 h-screen",
            isFooterVisible
              ? "sticky top-0 self-start"
              : "fixed left-0 top-0"
          )}
        >
          <Sidebar />
        </aside>

        <div className={cn("flex flex-1 flex-col min-h-[90vh]", !isFooterVisible && "md:ml-64")}>
          <Header />
          <main className={cn("flex-1 px-4 py-6 md:px-8 pt-16", !isFooterVisible && "overflow-y-auto min-h-0")}>
            {children}
          </main>
        </div>
      </div>

      <footer ref={footerRef} className="shrink-0 relative z-20">
        <Footer />
      </footer>
    </div>
  );
}
