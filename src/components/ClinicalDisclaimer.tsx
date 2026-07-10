import { ShieldAlert } from "lucide-react";

interface ClinicalDisclaimerProps {
  variant?: "default" | "compact";
  context?: string;
}

/**
 * Practitioner-facing clinical disclaimer.
 * Reinforces that Protocol Pad assists decisions and does not diagnose,
 * treat, or prescribe. Required across clinical surfaces.
 */
export default function ClinicalDisclaimer({
  variant = "default",
  context,
}: ClinicalDisclaimerProps) {
  if (variant === "compact") {
    return (
      <div className="flex items-start gap-2 text-[11px] text-muted-foreground leading-relaxed">
        <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5 text-accent" />
        <p>
          <span className="font-semibold text-foreground">Decision-support only.</span>{" "}
          Outputs assist licensed practitioner judgment and are not medical advice,
          diagnosis, treatment, or a prescription.
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 bg-accent/5 border border-accent/20 rounded-lg px-4 py-3">
      <ShieldAlert className="w-4 h-4 text-accent shrink-0 mt-0.5" />
      <div className="space-y-1">
        <p className="text-xs font-semibold text-foreground">
          Clinical Decision-Support Tool — Practitioner Use Only
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {context ??
            "Protocol Pad surfaces evidence-informed suggestions to assist your clinical reasoning. It does not diagnose, treat, prescribe, or replace practitioner judgment."}{" "}
          All outputs must be reviewed against the full clinical picture and applied
          within your scope of practice.
        </p>
      </div>
    </div>
  );
}
