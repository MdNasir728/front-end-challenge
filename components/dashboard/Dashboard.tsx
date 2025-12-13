"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { kpiData } from "@/constants/dashboard";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { Overview } from "@/components/dashboard/Overview";
import { RecentSales } from "@/components/dashboard/RecentSales";

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <Link href="/products/add">
          <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700">
            <Plus className="mr-2 h-4 w-4" />
            Add New Product
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpiData.map((item) => (
          <KpiCard key={item.id} item={item} />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Overview />
        </div>
        <div className="lg:col-span-4">
          <RecentSales />
        </div>
      </div>
    </div>
  );
};

