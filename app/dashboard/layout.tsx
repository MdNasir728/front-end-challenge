import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900 dark:bg-black dark:text-white">
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950 md:block">
          <Sidebar />
        </aside>

        <main className="flex-1 overflow-y-auto bg-white px-4 py-6 md:px-8 dark:bg-gray-900">
          <div className="mb-6">
            <Header />
          </div>
          {children}
        </main>
      </div>

      <footer className="w-full border-t border-gray-200 bg-white px-4 py-4 dark:border-gray-800 dark:bg-gray-950">
        <Footer />
      </footer>
    </div>
  );
}

