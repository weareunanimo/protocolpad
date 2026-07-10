import { TrendingUp, TrendingDown, Users, Activity, Pill } from "lucide-react";
import ClinicalDisclaimer from "@/components/ClinicalDisclaimer";

const metrics = [
  { label: "Active protocols", value: "47", delta: "+8", trend: "up" as const, icon: Activity },
  { label: "Clients tracked", value: "132", delta: "+12", trend: "up" as const, icon: Users },
  { label: "Avg. supplements / protocol", value: "7.4", delta: "-0.6", trend: "down" as const, icon: Pill },
  { label: "Reported symptom improvement", value: "68%", delta: "+4%", trend: "up" as const, icon: TrendingUp },
];

const topStacks = [
  { stack: "Selenium + Zinc + Vit D3/K2", pattern: "Hashimoto's / low Free T3", n: 18, improvement: "72%" },
  { stack: "L-Glutamine + S. boulardii + DGL", pattern: "Elevated zonulin, low sIgA", n: 14, improvement: "69%" },
  { stack: "Berberine + Alpha-lipoic acid + Chromium", pattern: "HOMA-IR > 2.5", n: 11, improvement: "64%" },
  { stack: "Ashwagandha + Phosphatidylserine + Magnesium glycinate", pattern: "Flat cortisol curve", n: 9, improvement: "61%" },
];

export default function Insights() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-display text-foreground">Insights</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Aggregated, de-identified patterns across your practice to inform protocol design
        </p>
      </div>

      <ClinicalDisclaimer
        context="Aggregated outcomes describe patterns observed across de-identified client data. They are hypothesis-generating signals for practitioner review, not evidence of efficacy or a basis for prescribing."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="p-5 bg-card rounded-xl border border-border shadow-card">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <m.icon className="w-4 h-4 text-accent" />
              </div>
              <span
                className={`flex items-center gap-1 text-xs font-medium ${
                  m.trend === "up" ? "text-success" : "text-muted-foreground"
                }`}
              >
                {m.trend === "up" ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {m.delta}
              </span>
            </div>
            <p className="text-2xl font-display text-card-foreground">{m.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
        <div className="p-5 border-b border-border">
          <h3 className="font-display text-lg text-card-foreground">
            Supplement stacks by clinical pattern
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Stacks most frequently associated with self-reported symptom improvement in matching lab profiles
          </p>
        </div>
        <div className="divide-y divide-border">
          {topStacks.map((s) => (
            <div key={s.stack} className="flex items-center justify-between px-5 py-4 gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium text-card-foreground truncate">{s.stack}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Pattern: {s.pattern} · n = {s.n}
                </p>
              </div>
              <span className="text-sm font-semibold text-success shrink-0">{s.improvement}</span>
            </div>
          ))}
        </div>
        <div className="px-5 py-3 border-t border-border bg-muted/30">
          <p className="text-[11px] text-muted-foreground">
            Correlational only. Not adjusted for confounders. Do not interpret as a treatment
            recommendation for any individual client.
          </p>
        </div>
      </div>
    </div>
  );
}
