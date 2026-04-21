import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader2, LogIn, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Pill } from "../components/UI";

const DEMO_USERS = [
  { email: "demo@logiveda.io", password: "Demo@2026", name: "Demo Operator", company: "Altura Foods" },
  { email: "ops@altura.com", password: "Altura#1", name: "Rahul Sharma", company: "Altura Foods" },
];

export default function Login() {
  const [email, setEmail] = useState("demo@logiveda.io");
  const [password, setPassword] = useState("Demo@2026");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const doLogin = (user) => {
    const session = { email: user.email, name: user.name, company: user.company, token: "sim_" + Math.random().toString(36).slice(2), issued_at: new Date().toISOString() };
    localStorage.setItem("logiveda_session", JSON.stringify(session));
    toast.success("Welcome back, " + user.name.split(" ")[0] + ".");
    navigate("/dashboard");
  };

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const user = DEMO_USERS.find((u) => u.email === email.trim() && u.password === password);
      setLoading(false);
      if (!user) { toast.error("Invalid credentials. Try the demo account below."); return; }
      doLogin(user);
    }, 650);
  };

  const googleSignIn = () => {
    setGoogleLoading(true);
    setTimeout(() => {
      setGoogleLoading(false);
      doLogin({ email: "demo@logiveda.io", name: "Demo Operator", company: "Altura Foods" });
    }, 900);
  };

  return (
    <div data-testid="page-login" className="min-h-[calc(100vh-4rem)] relative">
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="section relative py-20 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-6 flex flex-col justify-center">
          <Pill>Client Portal</Pill>
          <h1 className="mt-6 font-display text-5xl md:text-6xl font-bold tracking-tighter leading-[1]">
            Your ops <span className="text-volt">command center</span>.
          </h1>
          <p className="mt-6 max-w-xl text-ink-700 text-lg">
            Sign in to access your live engagement dashboard, savings tracker, efficiency score, ESG pulse, and the working papers behind every number.
          </p>
          <div className="mt-10 flex items-center gap-3 text-ink-700 text-sm">
            <ShieldCheck className="w-4 h-4 text-volt" />
            <span>Demo mode - Simulated authentication for preview</span>
          </div>
          <div className="mt-8 space-y-3">
            {["Real-time cost savings tracker","Efficiency and ESG score dashboards","Active engagement progress view","Operational alerts feed"].map((f) => (
              <div key={f} className="flex items-center gap-3 text-sm text-ink-700">
                <span className="w-1.5 h-1.5 bg-volt inline-block shrink-0" />{f}
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6">
          <form onSubmit={submit} className="card max-w-md ml-auto" data-testid="login-form">
            <div className="overline">Sign in</div>
            <h3 className="mt-3 font-display text-2xl font-semibold">Access the client dashboard</h3>

            <button type="button" onClick={googleSignIn} disabled={googleLoading} data-testid="google-signin-btn"
              className="mt-6 w-full flex items-center justify-center gap-3 border border-ink-300 bg-ink-100 hover:border-volt/60 text-white text-sm font-medium px-4 py-3 transition-colors disabled:opacity-60">
              {googleLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              Continue with Google
            </button>

            <div className="mt-5 flex items-center gap-3">
              <div className="flex-1 h-px bg-ink-300" />
              <span className="text-xs font-mono text-ink-600 uppercase tracking-widest">or</span>
              <div className="flex-1 h-px bg-ink-300" />
            </div>

            <div className="mt-5 space-y-5">
              <div>
                <label className="label">Work email</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} data-testid="login-email" className="input-field" />
              </div>
              <div>
                <label className="label">Password</label>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} data-testid="login-password" className="input-field" />
              </div>
              <button type="submit" disabled={loading} data-testid="login-submit" className="btn-primary w-full">
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in</> : <>Sign in <LogIn className="w-4 h-4" /></>}
              </button>
            </div>

            <div className="mt-8 border-t border-ink-300 pt-6">
              <div className="text-xs font-mono uppercase tracking-widest text-ink-600 mb-3">Demo credentials</div>
              <div className="bg-ink-50 border border-ink-300 p-4 text-xs font-mono text-ink-700 space-y-1" data-testid="demo-creds">
                <div>demo@logiveda.io - Demo@2026</div>
                <div>ops@altura.com - Altura#1</div>
              </div>
            </div>
            <div className="mt-6 text-xs text-ink-600">
              No account? <Link to="/contact" className="text-volt">Book a diagnostic</Link> to get one.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
