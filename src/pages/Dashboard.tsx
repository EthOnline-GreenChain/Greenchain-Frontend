import { Cloud, DollarSign, Leaf, TrendingDown } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { EmissionChart } from "@/components/dashboard/EmissionChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Monitor your carbon footprint and offset progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Monthly Emissions"
          value="25.0"
          suffix="tCO₂e"
          icon={Cloud}
          trend={{ value: "8% from last month", positive: false }}
        />
        
        <StatCard
          title="Offsets Purchased"
          value="25.0"
          suffix="tCO₂e"
          icon={Leaf}
        >
          <Progress value={100} className="h-2 mt-2" />
        </StatCard>
        
        <StatCard
          title="Coverage"
          value="100"
          suffix="%"
          icon={TrendingDown}
          trend={{ value: "Carbon neutral", positive: true }}
        />
        
        <StatCard
          title="PYUSD Spent"
          value="25.00"
          suffix="PYUSD"
          icon={DollarSign}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EmissionChart />
        <RecentActivity />
      </div>
    </div>
  );
}
