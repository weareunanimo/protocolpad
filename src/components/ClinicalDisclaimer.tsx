import { ShieldAlert } from "lucide-react";

interface ClinicalDisclaimerProps {
  variant?: "default" | "compact";
  context?: string;
}

const DEFAULT_CONTEXT =
  "As informações apresentadas apoiam o raciocínio clínico do profissional licenciado e devem ser avaliadas frente ao quadro completo do cliente, dentro do seu escopo de atuação.";

export default function ClinicalDisclaimer({
  variant = "default",
  context,
}: ClinicalDisclaimerProps) {
  if (variant === "compact") {
    return (
      <div className="flex items-start gap-2 text-[11px] text-muted-foreground leading-relaxed">
        <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5 text-accent" />
        <p>
          <span className="font-semibold text-foreground">Apoio à decisão clínica.</span>{" "}
          Não diagnostica, não trata e não prescreve. Uso restrito a profissionais licenciados, dentro do seu escopo de atuação.
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 bg-accent/5 border border-accent/20 rounded-lg px-4 py-3">
      <ShieldAlert className="w-4 h-4 text-accent shrink-0 mt-0.5" />
      <div className="space-y-1">
        <p className="text-xs font-semibold text-foreground">
          Ferramenta de apoio à decisão clínica — uso profissional
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {context ?? DEFAULT_CONTEXT} O Protocol Pad não diagnostica, não trata, não prescreve e não substitui o julgamento do profissional.
        </p>
      </div>
    </div>
  );
}
