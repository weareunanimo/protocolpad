import { Plus, Search, Filter, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const protocols = [
  { id: "1", client: "Sarah Mitchell", title: "Thyroid + GI Restoration Protocol", status: "active", updated: "Feb 22", supplements: 8, duration: "12 weeks" },
  { id: "2", client: "James Kim", title: "HPA Axis Recovery Protocol", status: "draft", updated: "Feb 21", supplements: 5, duration: "8 weeks" },
  { id: "3", client: "Emily Roberts", title: "SIBO Eradication + Histamine Stabilization", status: "review", updated: "Feb 20", supplements: 11, duration: "16 weeks" },
  { id: "4", client: "Michael Torres", title: "Metabolic Reset Protocol", status: "active", updated: "Feb 19", supplements: 6, duration: "10 weeks" },
  { id: "5", client: "Ava Leung", title: "Methylation & Detox Support Protocol", status: "active", updated: "Feb 18", supplements: 7, duration: "12 weeks" },
  { id: "6", client: "David Patel", title: "Lyme + Co-infection Comprehensive Protocol", status: "active", updated: "Feb 15", supplements: 14, duration: "24 weeks" },
];

const statusConfig = {
  active: { label: "Active", className: "bg-success/10 text-success" },
  draft: { label: "Draft", className: "bg-muted text-muted-foreground" },
  review: { label: "In Review", className: "bg-warning/10 text-warning" },
};

export default function Protocols() {
  const [search, setSearch] = useState("");
  const filtered = protocols.filter((p) =>
    p.client.toLowerCase().includes(search.toLowerCase()) ||
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display text-foreground">Protocols</h1>
          <p className="text-sm text-muted-foreground mt-1">Treatment protocols across all clients</p>
        </div>
        <Link
          to="/protocols/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          New Protocol
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 flex-1 max-w-sm bg-card border border-border rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search protocols…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
          />
        </div>
        <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-sm text-muted-foreground hover:bg-muted transition-colors">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      <div className="grid gap-4">
        {filtered.map((p) => {
          const st = statusConfig[p.status as keyof typeof statusConfig];
          return (
            <Link
              key={p.id}
              to={`/protocols/${p.id}`}
              className="flex items-center justify-between p-5 bg-card rounded-xl border border-border shadow-card hover:shadow-elevated transition-shadow animate-fade-in group"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-sm font-semibold text-card-foreground truncate">{p.title}</h3>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium shrink-0 ${st.className}`}>
                    {st.label}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {p.client} · {p.supplements} supplements · {p.duration} · Updated {p.updated}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors shrink-0 ml-4" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
