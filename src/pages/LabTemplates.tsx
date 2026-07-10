import { FlaskConical, Search, ArrowRight, BookOpen } from "lucide-react";
import { useState } from "react";
import ClinicalDisclaimer from "@/components/ClinicalDisclaimer";

const templates = [
  {
    name: "Comprehensive Thyroid Panel",
    markers: "TSH, Free T3, Free T4, Reverse T3, TPO Ab, TG Ab",
    useCase: "Suspected hypothyroidism, autoimmune thyroiditis, T4→T3 conversion issues",
    evidence: "AACE/ATA 2022 guidelines · IFM clinical framework",
  },
  {
    name: "GI-MAP Stool Analysis",
    markers: "Pathogens, commensals, opportunists, zonulin, calprotectin, secretory IgA",
    useCase: "Dysbiosis, SIBO screening, intestinal permeability, chronic GI symptoms",
    evidence: "Diagnostic Solutions clinical guide · IFM GI module",
  },
  {
    name: "Cardiometabolic Advanced",
    markers: "ApoB, Lp(a), fasting insulin, HOMA-IR, hs-CRP, homocysteine, HbA1c",
    useCase: "Insulin resistance workup, cardiovascular risk stratification beyond standard lipids",
    evidence: "AHA/ACC 2019 · Cleveland HeartLab interpretive frameworks",
  },
  {
    name: "HPA Axis (4-Point Cortisol + DHEA)",
    markers: "Salivary cortisol x4, DHEA-S, cortisol awakening response",
    useCase: "Chronic fatigue, burnout presentation, sleep disruption, stress-mediated symptoms",
    evidence: "Endocrine Society · DUTCH clinical reference",
  },
  {
    name: "Micronutrient & Methylation",
    markers: "RBC magnesium, zinc, copper, B12, folate, MTHFR, homocysteine",
    useCase: "Fatigue, mood, methylation dysfunction, suspected nutrient depletion",
    evidence: "SpectraCell interpretive guide · IFM nutrition module",
  },
  {
    name: "Female Hormone Panel (Cycle-Timed)",
    markers: "Estradiol, progesterone, testosterone, SHBG, FSH, LH (day 19-22)",
    useCase: "Cycle irregularities, PMS/PMDD, perimenopause, fertility workup",
    evidence: "ACOG · Precision Analytical DUTCH clinical guide",
  },
];

export default function LabTemplates() {
  const [search, setSearch] = useState("");
  const filtered = templates.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.useCase.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-display text-foreground">Lab Templates</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Evidence-based lab panels with interpretive frameworks to inform your clinical workup
        </p>
      </div>

      <ClinicalDisclaimer
        context="Templates are curated from published functional medicine literature and clinical guidelines to assist panel selection and interpretation."
      />

      <div className="flex items-center gap-2 flex-1 max-w-sm bg-card border border-border rounded-lg px-3 py-2">
        <Search className="w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search templates…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
        />
      </div>

      <div className="grid gap-4">
        {filtered.map((t) => (
          <div
            key={t.name}
            className="p-5 bg-card rounded-xl border border-border shadow-card hover:shadow-elevated transition-shadow animate-fade-in"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 min-w-0">
                <div className="p-2 rounded-lg bg-accent/10 shrink-0">
                  <FlaskConical className="w-4 h-4 text-accent" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-card-foreground">{t.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{t.markers}</p>
                  <div className="mt-3 space-y-1.5">
                    <p className="text-xs text-card-foreground">
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">
                        Clinical context ·{" "}
                      </span>
                      {t.useCase}
                    </p>
                    <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <BookOpen className="w-3 h-3" />
                      {t.evidence}
                    </p>
                  </div>
                </div>
              </div>
              <button className="flex items-center gap-1.5 text-xs text-accent font-medium shrink-0 hover:opacity-80 transition-opacity">
                Use template
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
