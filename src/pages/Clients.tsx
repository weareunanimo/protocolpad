import { Search, Plus, Filter, MoreHorizontal } from "lucide-react";
import { useState } from "react";

const clients = [
  { id: 1, name: "Sara Mitchell", age: 42, conditions: ["Hipotireoidismo", "Disbiose Intestinal"], lastVisit: "22 fev 2026", protocols: 3, status: "active" },
  { id: 2, name: "Tiago Kim", age: 38, conditions: ["Fadiga Adrenal", "Disfunção do Eixo HPA"], lastVisit: "21 fev 2026", protocols: 2, status: "active" },
  { id: 3, name: "Emília Roberts", age: 35, conditions: ["SIBO", "Intolerância à Histamina"], lastVisit: "20 fev 2026", protocols: 4, status: "active" },
  { id: 4, name: "Michel Torres", age: 51, conditions: ["Resistência à Insulina", "Síndrome Metabólica"], lastVisit: "19 fev 2026", protocols: 1, status: "new" },
  { id: 5, name: "Ava Leung", age: 29, conditions: ["SNPs de Metilação", "Suporte à Detox"], lastVisit: "18 fev 2026", protocols: 2, status: "active" },
  { id: 6, name: "David Patel", age: 45, conditions: ["Fadiga Crônica", "Coinfecções por Lyme"], lastVisit: "15 fev 2026", protocols: 5, status: "active" },
  { id: 7, name: "Olívia Chen", age: 33, conditions: ["SOP", "Desregulação Glicêmica"], lastVisit: "10 fev 2026", protocols: 2, status: "inactive" },
];

const statusLabels: Record<string, string> = {
  active: "Ativo",
  new: "Novo",
  inactive: "Inativo",
};

export default function Clients() {
  const [search, setSearch] = useState("");
  const filtered = clients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.conditions.some((cond) => cond.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-display text-foreground">Clientes</h1>
          <p className="text-sm text-muted-foreground mt-1">{clients.length} clientes no total</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity w-full sm:w-auto">
          <Plus className="w-4 h-4" />
          Adicionar Cliente
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 flex-1 max-w-sm bg-card border border-border rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por nome ou condição…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
          />
        </div>
        <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-sm text-muted-foreground hover:bg-muted transition-colors">
          <Filter className="w-4 h-4" />
          Filtrar
        </button>
      </div>

      <div className="bg-card rounded-xl border border-border shadow-card overflow-x-auto animate-fade-in">
        <table className="w-full min-w-[720px]">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Cliente</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Condições</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Última Consulta</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Protocolos</th>
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
                      <p className="text-xs text-muted-foreground">{c.age} anos</p>
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
                    {statusLabels[c.status]}
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
