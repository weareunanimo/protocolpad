import { Plus, Search, Filter, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const protocols = [
  { id: "1", client: "Sara Mitchell", title: "Protocolo de Restauração Tireoidiana + Intestinal", status: "active", updated: "22 fev", supplements: 8, duration: "12 semanas" },
  { id: "2", client: "Tiago Kim", title: "Protocolo de Recuperação do Eixo HPA", status: "draft", updated: "21 fev", supplements: 5, duration: "8 semanas" },
  { id: "3", client: "Emília Roberts", title: "Erradicação de SIBO + Estabilização de Histamina", status: "review", updated: "20 fev", supplements: 11, duration: "16 semanas" },
  { id: "4", client: "Michel Torres", title: "Protocolo de Reset Metabólico", status: "active", updated: "19 fev", supplements: 6, duration: "10 semanas" },
  { id: "5", client: "Ava Leung", title: "Suporte à Metilação e Detoxificação", status: "active", updated: "18 fev", supplements: 7, duration: "12 semanas" },
  { id: "6", client: "David Patel", title: "Protocolo Abrangente para Lyme + Coinfecções", status: "active", updated: "15 fev", supplements: 14, duration: "24 semanas" },
];

const statusConfig = {
  active: { label: "Ativo", className: "bg-success/10 text-success" },
  draft: { label: "Rascunho", className: "bg-muted text-muted-foreground" },
  review: { label: "Em Revisão", className: "bg-warning/10 text-warning" },
};

export default function Protocols() {
  const [search, setSearch] = useState("");
  const filtered = protocols.filter((p) =>
    p.client.toLowerCase().includes(search.toLowerCase()) ||
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-display text-foreground">Protocolos</h1>
          <p className="text-sm text-muted-foreground mt-1">Protocolos de tratamento de todos os clientes</p>
        </div>
        <Link
          to="/app/protocols/new"
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          Novo Protocolo
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 flex-1 max-w-sm bg-card border border-border rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar protocolos…"
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

      <div className="grid gap-4">
        {filtered.map((p) => {
          const st = statusConfig[p.status as keyof typeof statusConfig];
          return (
            <Link
              key={p.id}
              to={`/app/protocols/${p.id}`}
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
                  {p.client} · {p.supplements} suplementos · {p.duration} · Atualizado em {p.updated}
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
