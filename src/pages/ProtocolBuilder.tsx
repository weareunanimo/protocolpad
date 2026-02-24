import { ArrowLeft, Save, Download, Clock, Pill, Utensils, Activity, FlaskConical, Plus, GripVertical, Trash2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

interface Supplement {
  id: number;
  name: string;
  dosage: string;
  timing: string;
  notes: string;
}

const initialSupplements: Supplement[] = [
  { id: 1, name: "Selenium (Selenomethionine)", dosage: "200 mcg", timing: "Morning, with food", notes: "Essential for T4→T3 conversion" },
  { id: 2, name: "Zinc Picolinate", dosage: "30 mg", timing: "Evening, with food", notes: "Supports thyroid hormone synthesis" },
  { id: 3, name: "Saccharomyces Boulardii", dosage: "5B CFU", timing: "Twice daily, between meals", notes: "GI restoration, biofilm disruption" },
  { id: 4, name: "L-Glutamine", dosage: "5g powder", timing: "Morning, empty stomach", notes: "Intestinal permeability support" },
  { id: 5, name: "Vitamin D3 + K2", dosage: "5000 IU / 100 mcg", timing: "Morning, with fat", notes: "Immune modulation, absorption cofactor" },
];

const dietRecommendations = [
  "Eliminate gluten & dairy for 8 weeks (autoimmune connection)",
  "Emphasize anti-inflammatory fats: wild salmon, sardines, olive oil",
  "Include selenium-rich foods: Brazil nuts (2-3/day), pastured eggs",
  "Bone broth 1 cup daily for gut lining repair",
  "Remove refined sugar and seed oils",
];

const lifestyleInterventions = [
  "Morning sunlight exposure: 10-15 min within first hour of waking",
  "Sleep hygiene: consistent 10pm bedtime, blue light blocking after sunset",
  "Moderate exercise only: walking, yoga, light resistance (no HIIT during recovery)",
  "Stress management: 10 min daily breathwork (4-7-8 pattern)",
  "Cold exposure: 30-second cold finish to showers (thyroid activation)",
];

const testingSchedule = [
  { test: "Comprehensive Thyroid Panel (TSH, Free T3, Free T4, RT3, TPO, TG Ab)", timing: "Week 8" },
  { test: "GI-MAP Stool Analysis", timing: "Week 12" },
  { test: "Vitamin D, 25-OH", timing: "Week 8" },
  { test: "Comprehensive Metabolic Panel + Iron Panel", timing: "Week 8" },
];

type Tab = "supplements" | "diet" | "lifestyle" | "testing";

export default function ProtocolBuilder() {
  const { id } = useParams();
  const isNew = id === "new";
  const [activeTab, setActiveTab] = useState<Tab>("supplements");
  const [supplements, setSupplements] = useState(initialSupplements);

  const tabs: { key: Tab; label: string; icon: typeof Pill }[] = [
    { key: "supplements", label: "Supplement Stack", icon: Pill },
    { key: "diet", label: "Diet", icon: Utensils },
    { key: "lifestyle", label: "Lifestyle", icon: Activity },
    { key: "testing", label: "Follow-Up Testing", icon: FlaskConical },
  ];

  const removeSupplement = (sid: number) => {
    setSupplements(supplements.filter((s) => s.id !== sid));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/protocols" className="p-2 rounded-lg hover:bg-muted transition-colors">
            <ArrowLeft className="w-4 h-4 text-muted-foreground" />
          </Link>
          <div>
            <h1 className="text-2xl font-display text-foreground">
              {isNew ? "New Protocol" : "Thyroid + GI Restoration Protocol"}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {isNew ? "Configure a new treatment protocol" : "Sarah Mitchell · 12 weeks · Started Feb 10, 2026"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-sm text-muted-foreground hover:bg-muted transition-colors">
            <Download className="w-4 h-4" />
            Export PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
            <Save className="w-4 h-4" />
            Save Protocol
          </button>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-muted/60 border border-border rounded-lg px-4 py-3">
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold">Clinical Decision-Support Tool.</span> This protocol is generated to assist practitioner decision-making. 
          It does not constitute medical advice, diagnosis, or treatment. All recommendations should be evaluated within the context of the patient's 
          complete clinical picture by a qualified practitioner.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-lg w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-card text-card-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in">
        {activeTab === "supplements" && (
          <div className="space-y-3">
            {supplements.map((s) => (
              <div key={s.id} className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border shadow-card group">
                <GripVertical className="w-4 h-4 text-muted-foreground/40 mt-1 cursor-grab shrink-0" />
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="sm:col-span-2">
                    <label className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Supplement</label>
                    <p className="text-sm font-medium text-card-foreground mt-0.5">{s.name}</p>
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Dosage</label>
                    <p className="text-sm text-card-foreground mt-0.5">{s.dosage}</p>
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Timing</label>
                    <p className="text-sm text-card-foreground mt-0.5">{s.timing}</p>
                  </div>
                  <div className="sm:col-span-4">
                    <label className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Clinical Notes</label>
                    <p className="text-xs text-muted-foreground mt-0.5">{s.notes}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeSupplement(s.id)}
                  className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-destructive/10 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5 text-destructive" />
                </button>
              </div>
            ))}
            <button className="flex items-center gap-2 px-4 py-3 border border-dashed border-border rounded-xl text-sm text-muted-foreground hover:text-foreground hover:border-accent transition-colors w-full justify-center">
              <Plus className="w-4 h-4" />
              Add Supplement
            </button>
          </div>
        )}

        {activeTab === "diet" && (
          <div className="bg-card rounded-xl border border-border shadow-card p-5 space-y-3">
            <h3 className="font-display text-lg text-card-foreground">Dietary Recommendations</h3>
            <ul className="space-y-2.5">
              {dietRecommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-card-foreground">
                  <span className="w-5 h-5 rounded-full bg-accent/10 text-accent text-xs flex items-center justify-center shrink-0 mt-0.5 font-semibold">
                    {i + 1}
                  </span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "lifestyle" && (
          <div className="bg-card rounded-xl border border-border shadow-card p-5 space-y-3">
            <h3 className="font-display text-lg text-card-foreground">Lifestyle Interventions</h3>
            <ul className="space-y-2.5">
              {lifestyleInterventions.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-card-foreground">
                  <Activity className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "testing" && (
          <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
            <div className="p-5 border-b border-border">
              <h3 className="font-display text-lg text-card-foreground">Follow-Up Testing Schedule</h3>
              <p className="text-xs text-muted-foreground mt-1">Recommended retesting to assess protocol efficacy</p>
            </div>
            <div className="divide-y divide-border">
              {testingSchedule.map((t, i) => (
                <div key={i} className="flex items-center justify-between px-5 py-4">
                  <div className="flex items-center gap-3">
                    <FlaskConical className="w-4 h-4 text-accent shrink-0" />
                    <p className="text-sm text-card-foreground">{t.test}</p>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0 ml-4">
                    <Clock className="w-3 h-3" />
                    {t.timing}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
