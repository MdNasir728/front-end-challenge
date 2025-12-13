"use client";

import { RelatedDataCard } from "./RelatedDataCard";
import { viewsTrend, salesTrend, earningTrend } from "@/constants/stats";

export const RelatedDataSection = () => {
  return (
    <div className="space-y-6">
      <h2 className="hidden dark:block text-lg font-semibold text-gray-900 dark:text-white">
        Relate Data
      </h2>
      <div className="space-y-4">
        <RelatedDataCard
          title="Total Views"
          amount="+112,893"
          trend="15.5%"
          data={viewsTrend}
          primaryColor="#f97316"
        />
        <RelatedDataCard
          title="Total Sales"
          amount="+112,893"
          trend="15.5%"
          data={salesTrend}
          primaryColor="#a855f7"
          className="hidden dark:block"
        />
        <RelatedDataCard
          title="Total Earning"
          amount="+112,893"
          trend="15.5%"
          data={earningTrend}
          primaryColor="#22c55e"
          className="hidden dark:block"
        />
      </div>
    </div>
  );
};

