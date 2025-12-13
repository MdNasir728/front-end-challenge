"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRole } from "@/contexts/RoleContext";
import { Dashboard } from "@/components/dashboard/Dashboard";
import Stats1 from "@/components/dashboard/Stats1";
import Stats2 from "@/components/dashboard/Stats2";

export default function DashboardPage() {
  const { role } = useRole();
  const router = useRouter();

  useEffect(() => {
    // Redirect Store Keeper away from dashboard
    if (role === "Store Keeper") {
      router.push("/products");
    }
  }, [role, router]);

  // Don't render dashboard for Store Keeper
  if (role === "Store Keeper") {
    return null;
  }

  return (
    <div className="space-y-12">
      <Dashboard />
      <Stats1 />
      <Stats2 />
    </div>
  );
}
