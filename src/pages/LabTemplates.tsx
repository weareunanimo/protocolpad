import { FlaskConical, Search, ArrowRight, BookOpen } from "lucide-react";
import { useState } from "react";
import ClinicalDisclaimer from "@/components/ClinicalDisclaimer";

const templates = [
  {
    name: "Painel Tireoidiano Completo",
    markers: "TSH, T3 Livre, T4 Livre, T3 Reverso, Anti-TPO, Anti-TG",
    useCase: "Suspeita de hipotireoidismo, tireoidite autoimune, falhas na conversão T4→T3",
    evidence: "Diretrizes AACE/ATA 2022 · Framework clínico IFM",
  },
  {
    name: "Análise de Fezes GI-MAP",
    markers: "Patógenos, comensais, oportunistas, zonulina, calprotectina, IgA secretora",
    useCase: "Disbiose, rastreio de SIBO, permeabilidade intestinal, sintomas GI crônicos",
    evidence: "Guia clínico Diagnostic Solutions · Módulo GI do IFM",
  },
  {
    name: "Cardiometabólico Avançado",
    markers: "ApoB, Lp(a), insulina em jejum, HOMA-IR, PCR-us, homocisteína, HbA1c",
    useCase: "Investigação de resistência à insulina, risco cardiovascular além do perfil lipídico padrão",
    evidence: "AHA/ACC 2019 · Frameworks interpretativos Cleveland HeartLab",
  },
  {
    name: "Eixo HPA (Cortisol 4 pontos + DHEA)",
    markers: "Cortisol salivar x4, DHEA-S, resposta de despertar do cortisol",
    useCase: "Fadiga crônica, quadro de burnout, distúrbios do sono, sintomas mediados por estresse",
    evidence: "Endocrine Society · Referência clínica DUTCH",
  },
  {
    name: "Micronutrientes e Metilação",
    markers: "Magnésio (eritrocitário), zinco, cobre, B12, folato, MTHFR, homocisteína",
    useCase: "Fadiga, humor, disfunção de metilação, suspeita de depleção nutricional",
    evidence: "Guia interpretativo SpectraCell · Módulo de nutrição do IFM",
  },
  {
    name: "Painel Hormonal Feminino (por fase do ciclo)",
    markers: "Estradiol, progesterona, testosterona, SHBG, FSH, LH (dia 19-22)",
    useCase: "Irregularidades do ciclo, TPM/TDPM, perimenopausa, avaliação de fertilidade",
    evidence: "ACOG · Guia clínico DUTCH (Precision Analytical)",
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
        <h1 className="text-2xl font-display text-foreground">Modelos de Exames</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Painéis laboratoriais baseados em evidência com frameworks interpretativos para apoiar sua investigação clínica
        </p>
      </div>

      <ClinicalDisclaimer
        context="Modelos curados a partir de literatura de medicina funcional e diretrizes clínicas para apoiar a seleção e interpretação de painéis laboratoriais pelo profissional licenciado."
      />

      <div className="flex items-center gap-2 flex-1 max-w-sm bg-card border border-border rounded-lg px-3 py-2">
        <Search className="w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar modelos…"
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
                        Contexto clínico ·{" "}
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
                Usar modelo
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
