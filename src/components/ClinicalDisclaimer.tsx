import { ShieldAlert } from "lucide-react";

interface ClinicalDisclaimerProps {
  variant?: "default" | "compact";
  context?: string;
}

export default function ClinicalDisclaimer({
  variant = "default",
  context,
}: ClinicalDisclaimerProps) {
  if (variant === "compact") {
    return (
      <div className="flex items-start gap-2 text-[11px] text-muted-foreground leading-relaxed">
        <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5 text-accent" />
        <p>
          <span className="font-semibold text-foreground">Apenas apoio à decisão.</span>{" "}
          As saídas apoiam o julgamento clínico do profissional licenciado e não constituem aconselhamento médico, diagnóstico, tratamento ou prescrição.
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 bg-accent/5 border border-accent/20 rounded-lg px-4 py-3">
      <ShieldAlert className="w-4 h-4 text-accent shrink-0 mt-0.5" />
      <div className="space-y-1">
        <p className="text-xs font-semibold text-foreground">
          Ferramenta de Apoio à Decisão Clínica — Uso Profissional
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {context ??
            "O Protocol Pad apresenta sugestões baseadas em evidência para apoiar seu raciocínio clínico. Não diagnostica, trata, prescreve nem substitui o julgamento do profissional."}{" "}
          Todas as saídas devem ser avaliadas frente ao quadro clínico completo e aplicadas dentro do seu escopo de atuação.
        </p>
      </div>
    </div>
  );
}
