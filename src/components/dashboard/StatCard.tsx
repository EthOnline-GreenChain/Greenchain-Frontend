import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  suffix?: string;
  className?: string;
  children?: ReactNode;
}

export function StatCard({ title, value, icon: Icon, trend, suffix, className, children }: StatCardProps) {
  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 hover:border-primary/50 ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-bold mono">{value}</h3>
              {suffix && <span className="text-muted-foreground text-sm">{suffix}</span>}
            </div>
            {trend && (
              <p className={`text-xs mt-2 ${trend.positive ? 'text-success' : 'text-destructive'}`}>
                {trend.positive ? '↗' : '↘'} {trend.value}
              </p>
            )}
          </div>
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Icon className="w-6 h-6 text-primary transition-transform group-hover:scale-110" />
          </div>
        </div>
        {children}
      </CardContent>
    </Card>
  );
}
