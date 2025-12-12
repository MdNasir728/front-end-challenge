"use client";

import { StatsHeaderSection } from "./StatsHeaderSection";
import { TotalEarningLineChart } from "./charts/TotalEarningLineChart";
import { TotalSalesLineChart } from "./charts/TotalSalesLineChart";
import { TotalViewsLineChart } from "./charts/TotalViewsLineChart";
import { SubscriptionsPerformersCard } from "./charts/SubscriptionsPerformersCard";
import { TopSalesProductCard } from "./charts/TopSalesProductCard";
import { PaymentHistoryCard } from "./charts/PaymentHistoryCard";

const Stats2 = () => {
  return (
    <div className="space-y-6">
      <StatsHeaderSection />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <TotalEarningLineChart />
        <TotalSalesLineChart />
        <TotalViewsLineChart />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <SubscriptionsPerformersCard />
        <TopSalesProductCard />
        <PaymentHistoryCard />
      </div>
    </div>
  );
};

export default Stats2;
