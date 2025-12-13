import DashboardLayout from "@/app/dashboard/layout";
import React from "react";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

