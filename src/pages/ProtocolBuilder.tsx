import { ArrowLeft, Save, Download, Clock, Pill, Utensils, Activity, FlaskConical, Plus, GripVertical, Trash2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import ClinicalDisclaimer from "@/components/ClinicalDisclaimer";

interface Supplement {
  id: number;
  name: string;
  dosage: string;
  timing: string;
  notes: string;
}

const initialSupplements: Supplement[] = [
  { id: 1, name: "Selênio (Selenometionina)", dosage: "200 mcg", timing: "Manhã, com alimento", notes: "Essencial para a conversão T4→T3" },
  { id: 2, name: "Zinco Picolinato", dosage: "30 mg", timing: "Noite, com alimento", notes: "Apoia a síntese de hormônios tireoidianos" },
  { id: 3, name: "Saccharomyces Boulardii", dosage: "5 bi UFC", timing: "2x ao dia, entre refeições", notes: "Restauração GI, ruptura de biofilme" },
  { id: 4, name: "L-Glutamina", dosage: "5 g em pó", timing: "Manhã, em jejum", notes: "Suporte à permeabilidade intestinal" },
  { id: 5, name: "Vitamina D3 + K2", dosage: "5000 UI / 100 mcg", timing: "Manhã, com gordura", notes: "Modulação imune, cofator de absorção" },
];

const dietRecommendations = [
  "Eliminar glúten e laticínios por 8 semanas (conexão autoimune)",
  "Priorizar gorduras anti-inflamatórias: salmão selvagem, sardinha, azeite",
  "Incluir alimentos ricos em selênio: castanha-do-pará (2-3/dia), ovos caipiras",
  "Caldo de ossos: 1 xícara por dia para reparo da mucosa intestinal",
  "Remover açúcar refinado e óleos de sementes",
];

const lifestyleInterventions = [
  "Exposição à luz solar matinal: 10-15 min na primeira hora ao acordar",
  "Higiene do sono: dormir consistentemente às 22h, bloquear luz azul após o pôr do sol",
  "Exercícios moderados: caminhada, ioga, resistência leve (sem HIIT durante recuperação)",
  "Manejo de estresse: 10 min diários de respiração (padrão 4-7-8)",
  "Exposição ao frio: finalizar banho com 30s de água fria (ativação tireoidiana)",
];

const testingSchedule = [
  { test: "Painel Tireoidiano Completo (TSH, T3 Livre, T4 Livre, T3 Reverso, Anti-TPO, Anti-TG)", timing: "Semana 8" },
  { test: "Análise de Fezes GI-MAP", timing: "Semana 12" },
  { test: "Vitamina D, 25-OH", timing: "Semana 8" },
  { test: "Painel Metabólico Completo + Perfil de Ferro", timing: "Semana 8" },
];

type Tab = "supplements" | "diet" | "lifestyle" | "testing";

export default function ProtocolBuilder() {
  const { id } = useParams();
  const isNew = id === "new";
  const [activeTab, setActiveTab] = useState<Tab>("supplements");
  const [supplements, setSupplements] = useState(initialSupplements);

  const tabs: { key: Tab; label: string; icon: typeof Pill }[] = [
    { key: "supplements", label: "Suplementação", icon: Pill },
    { key: "diet", label: "Dieta", icon: Utensils },
    { key: "lifestyle", label: "Estilo de Vida", icon: Activity },
    { key: "testing", label: "Retestes", icon: FlaskConical },
  ];

  const removeSupplement = (sid: number) => {
    setSupplements(supplements.filter((s) => s.id !== sid));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/protocols" className="p-2 rounded-lg hover:bg-muted transition-colors">
            <ArrowLeft className="w-4 h-4 text-muted-foreground" />
          </Link>
          <div>
            <h1 className="text-2xl font-display text-foreground">
              {isNew ? "Novo Protocolo" : "Protocolo de Restauração Tireoidiana + Intestinal"}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {isNew ? "Configure um novo protocolo de tratamento" : "Sara Mitchell · 12 semanas · Iniciado em 10 fev 2026"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-sm text-muted-foreground hover:bg-muted transition-colors">
            <Download className="w-4 h-4" />
            Exportar PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
            <Save className="w-4 h-4" />
            Salvar Protocolo
          </button>
        </div>
      </div>

      <ClinicalDisclaimer
        context="Este protocolo é uma sugestão baseada em evidência para apoiar a decisão do profissional licenciado. Revise cada item frente ao quadro clínico completo, contraindicações e interações antes de compartilhar com o cliente."
      />

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

      <div className="animate-fade-in">
        {activeTab === "supplements" && (
          <div className="space-y-3">
            {supplements.map((s) => (
              <div key={s.id} className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border shadow-card group">
                <GripVertical className="w-4 h-4 text-muted-foreground/40 mt-1 cursor-grab shrink-0" />
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="sm:col-span-2">
                    <label className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Suplemento</label>
                    <p className="text-sm font-medium text-card-foreground mt-0.5">{s.name}</p>
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Dose</label>
                    <p className="text-sm text-card-foreground mt-0.5">{s.dosage}</p>
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Horário</label>
                    <p className="text-sm text-card-foreground mt-0.5">{s.timing}</p>
                  </div>
                  <div className="sm:col-span-4">
                    <label className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Notas Clínicas</label>
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
              Adicionar Suplemento
            </button>
          </div>
        )}

        {activeTab === "diet" && (
          <div className="bg-card rounded-xl border border-border shadow-card p-5 space-y-3">
            <h3 className="font-display text-lg text-card-foreground">Recomendações Alimentares</h3>
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
            <h3 className="font-display text-lg text-card-foreground">Intervenções de Estilo de Vida</h3>
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
              <h3 className="font-display text-lg text-card-foreground">Cronograma de Retestes</h3>
              <p className="text-xs text-muted-foreground mt-1">Retestes recomendados para avaliar a eficácia do protocolo</p>
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
