import DashboardLayout from "@/app/dashboard/layout";
import React from "react";

export default function FinancesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

