import { useState } from "react";
import { Check, ExternalLink, Save, ShieldCheck } from "lucide-react";
import ClinicalDisclaimer from "@/components/ClinicalDisclaimer";

type Integration = "fullscript" | "emerson";

interface IntegrationState {
  connected: boolean;
  accountEmail: string;
  dispensaryId: string;
  defaultMarkup: string;
}

const integrationMeta: Record<
  Integration,
  { name: string; description: string; url: string; brandInitials: string }
> = {
  fullscript: {
    name: "Fullscript",
    description:
      "Send supplement recommendations directly to your Fullscript dispensary for client ordering and adherence tracking.",
    url: "https://fullscript.com",
    brandInitials: "FS",
  },
  emerson: {
    name: "Emerson Ecologics",
    description:
      "Push protocols to Wellevate / Emerson Ecologics for professional-grade supplement fulfillment.",
    url: "https://emersonecologics.com",
    brandInitials: "EE",
  },
};

export default function Settings() {
  const [profile, setProfile] = useState({
    name: "Dr. Danielle Reyes",
    credentials: "ND, IFMCP",
    email: "danielle@northpineclinic.com",
    practice: "North Pine Functional Health",
    licenseState: "OR",
    licenseNumber: "ND-104-882",
    scope:
      "Naturopathic primary care with a focus on thyroid, GI, and metabolic health.",
  });

  const [integrations, setIntegrations] = useState<Record<Integration, IntegrationState>>({
    fullscript: {
      connected: true,
      accountEmail: "danielle@northpineclinic.com",
      dispensaryId: "np-clinic-2451",
      defaultMarkup: "15",
    },
    emerson: {
      connected: false,
      accountEmail: "",
      dispensaryId: "",
      defaultMarkup: "20",
    },
  });

  const [prefs, setPrefs] = useState({
    includeDisclaimerOnPdf: true,
    requireReviewBeforeSend: true,
    defaultProtocolDuration: "12",
  });

  const [saved, setSaved] = useState<null | "profile" | "integrations" | "prefs">(null);

  const flashSaved = (section: "profile" | "integrations" | "prefs") => {
    setSaved(section);
    setTimeout(() => setSaved(null), 1800);
  };

  const toggleIntegration = (key: Integration) => {
    setIntegrations((prev) => ({
      ...prev,
      [key]: { ...prev[key], connected: !prev[key].connected },
    }));
  };

  const updateIntegration = (
    key: Integration,
    field: keyof IntegrationState,
    value: string
  ) => {
    setIntegrations((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: value },
    }));
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-display text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Practitioner profile, integrations, and clinical preferences
        </p>
      </div>

      <ClinicalDisclaimer variant="compact" />

      {/* Practitioner profile */}
      <section className="bg-card rounded-xl border border-border shadow-card">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <h2 className="font-display text-lg text-card-foreground">Practitioner profile</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Appears on generated protocols and client-facing exports
            </p>
          </div>
          <button
            onClick={() => flashSaved("profile")}
            className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            {saved === "profile" ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saved === "profile" ? "Saved" : "Save"}
          </button>
        </div>

        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field
            label="Full name"
            value={profile.name}
            onChange={(v) => setProfile({ ...profile, name: v })}
          />
          <Field
            label="Credentials"
            value={profile.credentials}
            onChange={(v) => setProfile({ ...profile, credentials: v })}
          />
          <Field
            label="Email"
            type="email"
            value={profile.email}
            onChange={(v) => setProfile({ ...profile, email: v })}
          />
          <Field
            label="Practice name"
            value={profile.practice}
            onChange={(v) => setProfile({ ...profile, practice: v })}
          />
          <Field
            label="License state"
            value={profile.licenseState}
            onChange={(v) => setProfile({ ...profile, licenseState: v })}
          />
          <Field
            label="License number"
            value={profile.licenseNumber}
            onChange={(v) => setProfile({ ...profile, licenseNumber: v })}
          />
          <div className="sm:col-span-2">
            <label className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
              Scope of practice
            </label>
            <textarea
              value={profile.scope}
              onChange={(e) => setProfile({ ...profile, scope: e.target.value })}
              rows={3}
              className="mt-1.5 w-full text-sm bg-background border border-border rounded-lg px-3 py-2 outline-none focus:border-accent transition-colors"
            />
            <p className="text-[11px] text-muted-foreground mt-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-accent" />
              Used to constrain protocol recommendations to your licensed scope.
            </p>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="bg-card rounded-xl border border-border shadow-card">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <h2 className="font-display text-lg text-card-foreground">Supplement dispensary</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Connect a dispensary to send protocols directly for client ordering
            </p>
          </div>
          {saved === "integrations" && (
            <span className="flex items-center gap-1.5 text-xs text-success font-medium">
              <Check className="w-3.5 h-3.5" />
              Saved
            </span>
          )}
        </div>

        <div className="divide-y divide-border">
          {(Object.keys(integrationMeta) as Integration[]).map((key) => {
            const meta = integrationMeta[key];
            const state = integrations[key];
            return (
              <div key={key} className="p-5 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center text-xs font-bold shrink-0">
                      {meta.brandInitials}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-card-foreground">
                          {meta.name}
                        </h3>
                        {state.connected ? (
                          <span className="text-[11px] px-2 py-0.5 rounded-full font-medium bg-success/10 text-success">
                            Connected
                          </span>
                        ) : (
                          <span className="text-[11px] px-2 py-0.5 rounded-full font-medium bg-muted text-muted-foreground">
                            Not connected
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{meta.description}</p>
                      <a
                        href={meta.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-accent mt-1.5 hover:underline"
                      >
                        Open {meta.name} <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      toggleIntegration(key);
                      flashSaved("integrations");
                    }}
                    className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors shrink-0 ${
                      state.connected
                        ? "border-border text-muted-foreground hover:bg-muted"
                        : "border-accent bg-accent text-accent-foreground hover:opacity-90"
                    }`}
                  >
                    {state.connected ? "Disconnect" : "Connect"}
                  </button>
                </div>

                {state.connected && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pl-13">
                    <Field
                      label="Account email"
                      value={state.accountEmail}
                      onChange={(v) => updateIntegration(key, "accountEmail", v)}
                    />
                    <Field
                      label="Dispensary ID"
                      value={state.dispensaryId}
                      onChange={(v) => updateIntegration(key, "dispensaryId", v)}
                    />
                    <Field
                      label="Default markup (%)"
                      value={state.defaultMarkup}
                      onChange={(v) => updateIntegration(key, "defaultMarkup", v)}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Clinical preferences */}
      <section className="bg-card rounded-xl border border-border shadow-card">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <h2 className="font-display text-lg text-card-foreground">Clinical preferences</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Defaults applied to new protocols
            </p>
          </div>
          <button
            onClick={() => flashSaved("prefs")}
            className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            {saved === "prefs" ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saved === "prefs" ? "Saved" : "Save"}
          </button>
        </div>

        <div className="p-5 space-y-4">
          <Toggle
            label="Include clinical disclaimer on exported PDFs"
            description="Reinforces the decision-support nature of the tool on every client-facing document."
            checked={prefs.includeDisclaimerOnPdf}
            onChange={(v) => setPrefs({ ...prefs, includeDisclaimerOnPdf: v })}
          />
          <Toggle
            label="Require practitioner review before sending to dispensary"
            description="Recommended. Prevents un-reviewed protocol suggestions from reaching clients."
            checked={prefs.requireReviewBeforeSend}
            onChange={(v) => setPrefs({ ...prefs, requireReviewBeforeSend: v })}
          />
          <div>
            <label className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
              Default protocol duration (weeks)
            </label>
            <input
              type="number"
              value={prefs.defaultProtocolDuration}
              onChange={(e) =>
                setPrefs({ ...prefs, defaultProtocolDuration: e.target.value })
              }
              className="mt-1.5 w-32 text-sm bg-background border border-border rounded-lg px-3 py-2 outline-none focus:border-accent transition-colors"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full text-sm bg-background border border-border rounded-lg px-3 py-2 outline-none focus:border-accent transition-colors"
      />
    </div>
  );
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm font-medium text-card-foreground">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-10 h-6 rounded-full transition-colors shrink-0 ${
          checked ? "bg-accent" : "bg-muted"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-card shadow transition-transform ${
            checked ? "translate-x-4" : ""
          }`}
        />
      </button>
    </div>
  );
}
