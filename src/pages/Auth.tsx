import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { z } from "zod";
import { FlaskConical, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logoAsset from "@/assets/protocolpad-logo.png.asset.json";

const emailSchema = z.string().trim().email({ message: "E-mail inválido" }).max(255);
const passwordSchema = z.string().min(8, { message: "Mínimo de 8 caracteres" }).max(72);
const nameSchema = z.string().trim().min(1, { message: "Informe seu nome" }).max(100);

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { session, loading: authLoading } = useAuth();
  const from = (location.state as { from?: string } | null)?.from ?? "/app";

  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const [signUpName, setSignUpName] = useState("");
  const [signUpCreds, setSignUpCreds] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  useEffect(() => {
    if (!authLoading && session) navigate(from, { replace: true });
  }, [authLoading, session, navigate, from]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailSchema.safeParse(signInEmail);
    const password = passwordSchema.safeParse(signInPassword);
    if (!email.success) return toast({ title: email.error.issues[0].message, variant: "destructive" });
    if (!password.success) return toast({ title: password.error.issues[0].message, variant: "destructive" });

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.data,
      password: password.data,
    });
    setLoading(false);
    if (error) {
      const msg = error.message.includes("Invalid login")
        ? "E-mail ou senha incorretos"
        : error.message;
      return toast({ title: "Não foi possível entrar", description: msg, variant: "destructive" });
    }
    navigate(from, { replace: true });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = nameSchema.safeParse(signUpName);
    const email = emailSchema.safeParse(signUpEmail);
    const password = passwordSchema.safeParse(signUpPassword);
    if (!name.success) return toast({ title: name.error.issues[0].message, variant: "destructive" });
    if (!email.success) return toast({ title: email.error.issues[0].message, variant: "destructive" });
    if (!password.success) return toast({ title: password.error.issues[0].message, variant: "destructive" });

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email.data,
      password: password.data,
      options: {
        emailRedirectTo: `${window.location.origin}/app`,
        data: {
          full_name: name.data,
          credentials: signUpCreds.trim() || null,
        },
      },
    });
    setLoading(false);
    if (error) {
      const msg = error.message.includes("already registered")
        ? "Este e-mail já está cadastrado. Faça login."
        : error.message;
      return toast({ title: "Não foi possível cadastrar", description: msg, variant: "destructive" });
    }
    toast({
      title: "Conta criada",
      description: "Enviamos um e-mail de confirmação. Verifique sua caixa de entrada.",
    });
    setTab("signin");
  };

  const handleGoogle = async () => {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setLoading(false);
      return toast({
        title: "Falha no login com Google",
        description: result.error.message,
        variant: "destructive",
      });
    }
    if (result.redirected) return;
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-0 justify-center mb-8">
          <img src={logoAsset.url} alt="Protocol Pad" className="w-14 h-14 object-contain" />
          <span className="font-display text-xl text-foreground">Protocol Pad</span>
        </Link>

        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
          <Tabs value={tab} onValueChange={(v) => setTab(v as "signin" | "signup")}>
            <TabsList className="grid grid-cols-2 w-full mb-6">
              <TabsTrigger value="signin">Entrar</TabsTrigger>
              <TabsTrigger value="signup">Criar conta</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">E-mail</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    autoComplete="email"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Senha</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    autoComplete="current-password"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Entrar"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Nome completo</Label>
                  <Input
                    id="signup-name"
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-creds">Credenciais (opcional)</Label>
                  <Input
                    id="signup-creds"
                    placeholder="Ex.: Nutricionista, CRN 12345"
                    value={signUpCreds}
                    onChange={(e) => setSignUpCreds(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">E-mail profissional</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    autoComplete="email"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Senha</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    autoComplete="new-password"
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">Mínimo de 8 caracteres.</p>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Criar conta"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">ou</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogle}
            disabled={loading}
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.56c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.77c-.98.66-2.24 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.07H2.18a11 11 0 0 0 0 9.87l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.2 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z"/>
            </svg>
            Continuar com Google
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          <Link to="/" className="hover:text-foreground">← Voltar para o site</Link>
        </p>
      </div>
    </div>
  );
}
