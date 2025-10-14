import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, CheckCircle2 } from "lucide-react";

const activities = [
  {
    id: 1,
    action: "Retired Credits",
    amount: "25 tCO₂e",
    txHash: "0x742d...3a4f",
    time: "2 hours ago",
    status: "success"
  },
  {
    id: 2,
    action: "Procured Credits",
    amount: "25 tCO₂e",
    txHash: "0x891c...7b2d",
    time: "2 hours ago",
    status: "success"
  },
  {
    id: 3,
    action: "PYUSD Payment",
    amount: "25.00 PYUSD",
    txHash: "0x34fa...9c1e",
    time: "2 hours ago",
    status: "success"
  },
];

export function RecentActivity() {
  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-success" />
              </div>
              <div>
                <p className="font-medium text-sm">{activity.action}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="mono text-xs">
                {activity.amount}
              </Badge>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
