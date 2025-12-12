import { Dashboard } from "@/components/dashboard/Dashboard";
import Stats1 from "@/components/dashboard/Stats1";
import Stats2 from "@/components/dashboard/Stats2";
export default function DashboardPage() {
  return (
    <div className="space-y-12">
      <Dashboard />
      <Stats1 />
      <Stats2 />
    </div>
  );
}