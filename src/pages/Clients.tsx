import { Search, Plus, Filter, MoreHorizontal } from "lucide-react";
import { useState } from "react";

const clients = [
  { id: 1, name: "Sarah Mitchell", age: 42, conditions: ["Hypothyroid", "Gut Dysbiosis"], lastVisit: "Feb 22, 2026", protocols: 3, status: "active" },
  { id: 2, name: "James Kim", age: 38, conditions: ["Adrenal Fatigue", "HPA Axis Dysfunction"], lastVisit: "Feb 21, 2026", protocols: 2, status: "active" },
  { id: 3, name: "Emily Roberts", age: 35, conditions: ["SIBO", "Histamine Intolerance"], lastVisit: "Feb 20, 2026", protocols: 4, status: "active" },
  { id: 4, name: "Michael Torres", age: 51, conditions: ["Insulin Resistance", "Metabolic Syndrome"], lastVisit: "Feb 19, 2026", protocols: 1, status: "new" },
  { id: 5, name: "Ava Leung", age: 29, conditions: ["Methylation SNPs", "Detox Support"], lastVisit: "Feb 18, 2026", protocols: 2, status: "active" },
  { id: 6, name: "David Patel", age: 45, conditions: ["Chronic Fatigue", "Lyme Co-infections"], lastVisit: "Feb 15, 2026", protocols: 5, status: "active" },
  { id: 7, name: "Olivia Chen", age: 33, conditions: ["PCOS", "Blood Sugar Dysregulation"], lastVisit: "Feb 10, 2026", protocols: 2, status: "inactive" },
];

export default function Clients() {
  const [search, setSearch] = useState("");
  const filtered = clients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.conditions.some((cond) => cond.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display text-foreground">Clients</h1>
          <p className="text-sm text-muted-foreground mt-1">{clients.length} total clients</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" />
          Add Client
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 flex-1 max-w-sm bg-card border border-border rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or condition…"
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

      {/* Table */}
      <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden animate-fade-in">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Client</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Conditions</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Last Visit</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Protocols</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Status</th>
              <th className="w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-muted/40 transition-colors cursor-pointer">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <span className="text-xs font-semibold text-primary-foreground">
                        {c.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-card-foreground">{c.name}</p>
                      <p className="text-xs text-muted-foreground">Age {c.age}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-1.5">
                    {c.conditions.map((cond) => (
                      <span key={cond} className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
                        {cond}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-muted-foreground">{c.lastVisit}</td>
                <td className="px-5 py-4 text-sm text-card-foreground">{c.protocols}</td>
                <td className="px-5 py-4">
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                    c.status === "active" ? "bg-success/10 text-success" :
                    c.status === "new" ? "bg-info/10 text-info" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                  </span>
                </td>
                <td className="px-3 py-4">
                  <button className="p-1 rounded hover:bg-muted transition-colors">
                    <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
