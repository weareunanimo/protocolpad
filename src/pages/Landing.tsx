import { Link } from "react-router-dom";
import {
  FlaskConical,
  ArrowRight,
  Check,
  ShieldCheck,
  Pill,
  FileText,
  BarChart3,
  Sparkles,
  Users,
  Clock,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import logoAsset from "@/assets/protocolpad-logo.png.asset.json";

const features = [
  {
    icon: FileText,
    title: "Protocolos em minutos, não horas",
    description:
      "Gere planos personalizados de suplementação, dieta, estilo de vida e retestes a partir do quadro do cliente — com espaço para o seu julgamento clínico.",
  },
  {
    icon: FlaskConical,
    title: "Painéis laboratoriais curados",
    description:
      "Modelos baseados em evidência (Tireoide, GI-MAP, HPA, Cardiometabólico, Hormonal Feminino) prontos para solicitar e interpretar.",
  },
  {
    icon: Pill,
    title: "Integração com dispensários",
    description:
      "Envie o protocolo direto para Fullscript ou Emerson Ecologics. Adesão do cliente e pedidos em um só fluxo.",
  },
  {
    icon: BarChart3,
    title: "Inteligência da sua prática",
    description:
      "Descubra quais stacks funcionam melhor para cada padrão clínico com base em dados anonimizados dos seus próprios atendimentos.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance por padrão",
    description:
      "Linguagem não prescritiva, avisos de apoio à decisão em toda tela e PDF. Ferramenta pensada para o escopo do profissional licenciado.",
  },
  {
    icon: Sparkles,
    title: "Sugestões inteligentes",
    description:
      "Combinações de suplementos, doses e horários sugeridos a partir de literatura e frameworks de medicina funcional.",
  },
];

const plans = [
  {
    name: "Solo",
    price: "R$ 197",
    period: "/mês",
    description: "Para profissionais autônomos começando a estruturar a prática.",
    features: [
      "Até 30 clientes ativos",
      "Protocolos ilimitados",
      "Modelos de exames curados",
      "1 dispensário conectado",
      "Suporte por e-mail",
    ],
    cta: "Começar agora",
    highlight: false,
  },
  {
    name: "Clínica",
    price: "R$ 397",
    period: "/mês",
    description: "Para práticas em crescimento com múltiplos protocolos ativos.",
    features: [
      "Clientes ilimitados",
      "Insights e inteligência de dados",
      "Fullscript + Emerson Ecologics",
      "Exportação de PDF com marca",
      "Suporte prioritário",
    ],
    cta: "Testar 14 dias grátis",
    highlight: true,
  },
  {
    name: "Equipe",
    price: "Sob consulta",
    period: "",
    description: "Para clínicas multiprofissionais e programas de formação.",
    features: [
      "Múltiplos profissionais",
      "Governança e permissões",
      "Onboarding dedicado",
      "Integrações personalizadas",
      "SLA e suporte por WhatsApp",
    ],
    cta: "Falar com vendas",
    highlight: false,
  },
];

const testimonials = [
  {
    quote:
      "Reduzi o tempo de montagem de protocolo de 90 para 15 minutos. Consigo focar no raciocínio clínico, não em formatação.",
    author: "Dra. Camila Ferraz",
    role: "Nutricionista funcional · São Paulo",
  },
  {
    quote:
      "Os painéis já vêm com contexto interpretativo. Meus estagiários aprendem mais rápido e os laudos ficam padronizados.",
    author: "Dr. Rafael Toledo",
    role: "Médico integrativo · Belo Horizonte",
  },
];

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 h-16">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={logoAsset.url} alt="Protocol Pad" className="w-9 h-9 object-contain" />
            <span className="font-display text-lg tracking-tight">Protocol Pad</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#recursos" className="hover:text-foreground transition-colors">Recursos</a>
            <a href="#como-funciona" className="hover:text-foreground transition-colors">Como funciona</a>
            <a href="#planos" className="hover:text-foreground transition-colors">Planos</a>
            <a href="#depoimentos" className="hover:text-foreground transition-colors">Depoimentos</a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/auth" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Entrar
            </Link>
            <Link
              to="/auth"
              className="flex items-center gap-1.5 px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Testar grátis <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <nav className="flex flex-col p-4 gap-1 text-sm">
              <a href="#recursos" onClick={() => setMenuOpen(false)} className="py-2 text-muted-foreground">Recursos</a>
              <a href="#como-funciona" onClick={() => setMenuOpen(false)} className="py-2 text-muted-foreground">Como funciona</a>
              <a href="#planos" onClick={() => setMenuOpen(false)} className="py-2 text-muted-foreground">Planos</a>
              <a href="#depoimentos" onClick={() => setMenuOpen(false)} className="py-2 text-muted-foreground">Depoimentos</a>
              <Link
                to="/auth"
                className="mt-2 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-accent text-accent-foreground rounded-lg text-sm font-medium"
              >
                Testar grátis <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-16 sm:pb-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium mb-6">
              <ShieldCheck className="w-3.5 h-3.5" />
              Apoio à decisão clínica para profissionais licenciados
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display leading-[1.05] tracking-tight text-foreground">
              Protocolos funcionais que respeitam o seu raciocínio clínico.
            </h1>
            <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              O Protocol Pad ajuda nutricionistas, médicos e profissionais da saúde funcional a montar,
              revisar e entregar protocolos baseados em evidência — do exame ao dispensário — em minutos.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                to="/auth"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Testar 14 dias grátis <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#como-funciona"
                className="flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-lg text-sm font-semibold hover:bg-muted transition-colors"
              >
                Ver como funciona
              </a>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Sem cartão de crédito. Cancele quando quiser.
            </p>
          </div>

          {/* Product preview */}
          <div className="mt-12 sm:mt-16 relative">
            <div className="rounded-2xl border border-border shadow-elevated bg-card overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-muted/40">
                <span className="w-2.5 h-2.5 rounded-full bg-destructive/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-warning/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-success/40" />
                <span className="ml-4 text-xs text-muted-foreground">protocolpad.app / protocolos</span>
              </div>
              <div className="p-4 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: Users, label: "Clientes Ativos", value: "48" },
                  { icon: FileText, label: "Protocolos Ativos", value: "32" },
                  { icon: FlaskConical, label: "Exames a Revisar", value: "7" },
                ].map((s) => (
                  <div key={s.label} className="p-4 rounded-xl border border-border bg-background">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 rounded-lg bg-accent/10">
                        <s.icon className="w-4 h-4 text-accent" />
                      </div>
                    </div>
                    <p className="text-2xl font-display">{s.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                  </div>
                ))}
                <div className="md:col-span-3 p-4 rounded-xl border border-border bg-background">
                  <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-3">Protocolo · Sara M.</p>
                  {["Selênio · 200 mcg · Manhã", "Zinco Picolinato · 30 mg · Noite", "L-Glutamina · 5 g · Em jejum"].map((r) => (
                    <div key={r} className="flex items-center gap-2 py-2 text-sm border-t border-border first:border-t-0">
                      <Check className="w-3.5 h-3.5 text-accent" /> {r}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof strip */}
      <section className="border-y border-border bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { value: "+800", label: "Profissionais" },
            { value: "12k", label: "Protocolos gerados" },
            { value: "72%", label: "Melhora relatada" },
            { value: "15 min", label: "Tempo médio" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl sm:text-3xl font-display text-foreground">{s.value}</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="recursos" className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-wider text-accent font-semibold">Recursos</p>
            <h2 className="text-3xl sm:text-4xl font-display mt-2 tracking-tight">
              Tudo que a sua prática funcional precisa em um só lugar.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Da anamnese ao acompanhamento, com integrações e inteligência de dados nativas.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-6 bg-card rounded-xl border border-border shadow-card hover:shadow-elevated transition-shadow"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-display text-lg">{f.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="como-funciona" className="py-16 sm:py-24 bg-muted/30 border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-wider text-accent font-semibold">Como funciona</p>
            <h2 className="text-3xl sm:text-4xl font-display mt-2 tracking-tight">
              Do exame ao protocolo em 3 passos.
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Cadastre o cliente e os exames",
                description: "Escolha um dos painéis curados ou faça upload dos laudos existentes.",
              },
              {
                step: "02",
                title: "Revise a sugestão de protocolo",
                description: "Suplementos, doses, dieta, estilo de vida e retestes — sugeridos e editáveis.",
              },
              {
                step: "03",
                title: "Envie ao dispensário ou exporte PDF",
                description: "Fullscript, Emerson Ecologics ou PDF com sua marca, tudo com aviso clínico.",
              },
            ].map((s) => (
              <div key={s.step} className="p-6 bg-card rounded-xl border border-border shadow-card">
                <div className="text-4xl font-display text-accent/40">{s.step}</div>
                <h3 className="font-display text-lg mt-3">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="depoimentos" className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-wider text-accent font-semibold">Quem usa</p>
            <h2 className="text-3xl sm:text-4xl font-display mt-2 tracking-tight">
              Profissionais que reconquistaram o tempo clínico.
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <figure key={t.author} className="p-6 sm:p-8 bg-card rounded-xl border border-border shadow-card">
                <blockquote className="text-base sm:text-lg text-foreground leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-xs font-semibold text-primary-foreground">
                      {t.author.split(" ").slice(-2).map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.author}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="planos" className="py-16 sm:py-24 bg-muted/30 border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs uppercase tracking-wider text-accent font-semibold">Planos</p>
            <h2 className="text-3xl sm:text-4xl font-display mt-2 tracking-tight">
              Preços transparentes. Cancele quando quiser.
            </h2>
            <p className="mt-4 text-muted-foreground">
              14 dias grátis em todos os planos. Sem cartão de crédito.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`p-6 sm:p-8 rounded-xl border shadow-card flex flex-col ${
                  p.highlight
                    ? "bg-primary text-primary-foreground border-primary shadow-elevated md:-translate-y-2"
                    : "bg-card border-border"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl">{p.name}</h3>
                  {p.highlight && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-accent text-accent-foreground font-semibold">
                      Mais popular
                    </span>
                  )}
                </div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-display">{p.price}</span>
                  <span className={`text-sm ${p.highlight ? "opacity-70" : "text-muted-foreground"}`}>{p.period}</span>
                </div>
                <p className={`mt-3 text-sm ${p.highlight ? "opacity-80" : "text-muted-foreground"}`}>
                  {p.description}
                </p>

                <ul className="mt-6 space-y-2.5 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className={`w-4 h-4 mt-0.5 shrink-0 ${p.highlight ? "text-accent" : "text-accent"}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/auth"
                  className={`mt-8 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90 ${
                    p.highlight
                      ? "bg-accent text-accent-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-display tracking-tight">
            Recupere o seu tempo clínico hoje.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Comece grátis por 14 dias. Monte seu primeiro protocolo em menos de 15 minutos.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/auth"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Começar teste grátis <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="mailto:contato@protocolpad.app"
              className="flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-lg text-sm font-semibold hover:bg-muted transition-colors"
            >
              Falar com vendas
            </a>
          </div>
          <p className="mt-6 text-xs text-muted-foreground flex items-center justify-center gap-1.5">
            <Clock className="w-3 h-3" /> Setup em menos de 5 minutos
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <img src={logoAsset.url} alt="Protocol Pad" className="w-8 h-8 object-contain" />
            <div>
              <p className="font-display">Protocol Pad</p>
              <p className="text-xs text-muted-foreground">Apoio à decisão clínica para saúde funcional.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <a href="#recursos" className="hover:text-foreground">Recursos</a>
            <a href="#planos" className="hover:text-foreground">Planos</a>
            <Link to="/auth" className="hover:text-foreground">Entrar</Link>
            <a href="mailto:contato@protocolpad.app" className="hover:text-foreground">Contato</a>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 text-[11px] text-muted-foreground leading-relaxed">
            Protocol Pad é uma ferramenta de apoio à decisão clínica para profissionais licenciados. Não diagnostica, não trata e não prescreve. Uso restrito ao escopo profissional do usuário.
          </div>
        </div>
      </footer>
    </div>
  );
}
