"use client";

import { DashboardCard } from "@/components/ui/dashboard-card";
import { recentSalesData } from "@/constants/recent-sales";
import { User } from "lucide-react";

export const RecentSales = () => {
  const formatCurrency = (amount: number) => {
    return `+$${amount.toFixed(2)}`;
  };

  return (
    <DashboardCard className="p-6">
      <div className="">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Sales
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            You made 350 sales this month
          </p>
        </div>
        <div className="">
          {recentSalesData.map((sale) => (
            <div
              key={sale.id}
              className="flex items-center justify-between my-2"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                  <User className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {sale.name}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {sale.email}
                  </span>
                </div>
              </div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                {formatCurrency(sale.amount)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardCard>
  );
};

