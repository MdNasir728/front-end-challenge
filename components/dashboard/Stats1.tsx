"use client";

import { StatsHeaderSection } from "./StatsHeaderSection";
import { MonthlyLineChart } from "./charts/MonthlyLineChart";
import { CompactBarChart } from "./charts/CompactBarChart";
import { WeeklyStackedBarChart } from "./charts/WeeklyStackedBarChart";
import { SubscriptionsLineChart } from "./charts/SubscriptionsLineChart";

const Stats1 = () => {
  return (
    <div className="space-y-6">
      <StatsHeaderSection />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <MonthlyLineChart />
        </div>
        <div className="lg:col-span-4">
          <CompactBarChart />
        </div>
        <div className="lg:col-span-8">
          <WeeklyStackedBarChart />
        </div>
        <div className="lg:col-span-4">
          <SubscriptionsLineChart />
        </div>
      </div>
    </div>
  );
};

export default Stats1;
