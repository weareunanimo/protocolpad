import { ReactNode } from "react";

interface MetricCardProps {
  label: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: ReactNode;
}

export default function MetricCard({ label, value, change, changeType = "neutral", icon }: MetricCardProps) {
  const changeColor = {
    positive: "text-success",
    negative: "text-destructive",
    neutral: "text-muted-foreground",
  }[changeType];

  return (
    <div className="bg-card rounded-xl border border-border p-5 shadow-card animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{label}</p>
          <p className="text-2xl font-semibold text-card-foreground mt-1 font-display">{value}</p>
          {change && (
            <p className={`text-xs mt-1 ${changeColor}`}>{change}</p>
          )}
        </div>
        <div className="p-2.5 rounded-lg bg-muted">
          {icon}
        </div>
      </div>
    </div>
  );
}
