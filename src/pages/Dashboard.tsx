import { Users, FileText, FlaskConical, TrendingUp, ArrowRight, Clock } from "lucide-react";
import MetricCard from "@/components/MetricCard";
import { Link } from "react-router-dom";

const recentProtocols = [
  { id: 1, client: "Mariana A.", condition: "Hipotireoidismo + Disbiose Intestinal", status: "active", date: "22 fev" },
  { id: 2, client: "Thiago R.", condition: "Fadiga Adrenal, Eixo HPA", status: "draft", date: "21 fev" },
  { id: 3, client: "Camila F.", condition: "SIBO + Intolerância à Histamina", status: "review", date: "20 fev" },
  { id: 4, client: "Rafael C.", condition: "Resistência à Insulina", status: "active", date: "19 fev" },
  { id: 5, client: "Ana Beatriz S.", condition: "SNPs de Metilação, Suporte à Detox", status: "active", date: "18 fev" },
];

const statusConfig = {
  active: { label: "Ativo", className: "bg-success/10 text-success" },
  draft: { label: "Rascunho", className: "bg-muted text-muted-foreground" },
  review: { label: "Em Revisão", className: "bg-warning/10 text-warning" },
};

const upcomingFollowUps = [
  { client: "Mariana A.", type: "Reteste: Painel Tireoidiano + GI-MAP", daysUntil: 3 },
  { client: "Rafael C.", type: "Insulina em Jejum + HbA1c", daysUntil: 7 },
  { client: "Ana Beatriz S.", type: "Painel OAT + Metilação", daysUntil: 12 },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-2xl font-display text-foreground">Painel</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Visão geral do suporte à decisão clínica
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Clientes Ativos"
          value="48"
          change="+3 este mês"
          changeType="positive"
          icon={<Users className="w-4 h-4 text-muted-foreground" />}
        />
        <MetricCard
          label="Protocolos Ativos"
          value="32"
          change="+5 esta semana"
          changeType="positive"
          icon={<FileText className="w-4 h-4 text-muted-foreground" />}
        />
        <MetricCard
          label="Exames Aguardando Revisão"
          value="7"
          change="2 urgentes"
          changeType="negative"
          icon={<FlaskConical className="w-4 h-4 text-muted-foreground" />}
        />
        <MetricCard
          label="Índice de Desfechos"
          value="87%"
          change="+4% vs último trimestre"
          changeType="positive"
          icon={<TrendingUp className="w-4 h-4 text-muted-foreground" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-xl border border-border shadow-card animate-fade-in">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <h2 className="font-display text-lg text-card-foreground">Protocolos Recentes</h2>
            <Link to="/app/protocols" className="text-xs text-accent hover:underline flex items-center gap-1">
              Ver todos <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {recentProtocols.map((p) => {
              const st = statusConfig[p.status as keyof typeof statusConfig];
              return (
                <div key={p.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-muted/40 transition-colors">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-card-foreground">{p.client}</p>
                    <p className="text-xs text-muted-foreground truncate">{p.condition}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${st.className}`}>
                      {st.label}
                    </span>
                    <span className="text-xs text-muted-foreground">{p.date}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border shadow-card animate-fade-in">
          <div className="p-5 border-b border-border">
            <h2 className="font-display text-lg text-card-foreground">Próximos Retornos</h2>
          </div>
          <div className="p-4 space-y-3">
            {upcomingFollowUps.map((f, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <Clock className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-card-foreground">{f.client}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{f.type}</p>
                  <p className="text-xs text-accent mt-1">Em {f.daysUntil} dias</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to="/app/protocols"
          className="flex items-center gap-4 p-5 bg-card rounded-xl border border-border shadow-card hover:shadow-elevated transition-shadow group"
        >
          <div className="p-3 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
            <FileText className="w-5 h-5 text-accent" />
          </div>
          <div>
            <p className="text-sm font-semibold text-card-foreground">Novo Protocolo</p>
            <p className="text-xs text-muted-foreground">Gerar a partir dos dados do cliente</p>
          </div>
        </Link>
        <Link
          to="/app/clients"
          className="flex items-center gap-4 p-5 bg-card rounded-xl border border-border shadow-card hover:shadow-elevated transition-shadow group"
        >
          <div className="p-3 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
            <Users className="w-5 h-5 text-accent" />
          </div>
          <div>
            <p className="text-sm font-semibold text-card-foreground">Adicionar Cliente</p>
            <p className="text-xs text-muted-foreground">Enviar exames e anamnese</p>
          </div>
        </Link>
        <Link
          to="/app/templates"
          className="flex items-center gap-4 p-5 bg-card rounded-xl border border-border shadow-card hover:shadow-elevated transition-shadow group"
        >
          <div className="p-3 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
            <FlaskConical className="w-5 h-5 text-accent" />
          </div>
          <div>
            <p className="text-sm font-semibold text-card-foreground">Modelos de Exames</p>
            <p className="text-xs text-muted-foreground">Painéis baseados em evidência</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
