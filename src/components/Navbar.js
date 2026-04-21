import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, ArrowUpRight, LayoutDashboard, LogOut } from "lucide-react";
import { brand } from "../lib/content";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/industries", label: "Industries" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/calculators", label: "Calculators" },
  { to: "/insights", label: "Insights" },
  { to: "/about", label: "About" },
];

function useSession() {
  const [session, setSession] = useState(() => {
    try { const r = localStorage.getItem("logiveda_session"); return r ? JSON.parse(r) : null; } catch { return null; }
  });
  useEffect(() => {
    const sync = () => {
      try { const r = localStorage.getItem("logiveda_session"); setSession(r ? JSON.parse(r) : null); } catch { setSession(null); }
    };
    const id = setInterval(sync, 1000);
    return () => clearInterval(id);
  }, []);
  return session;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const session = useSession();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("logiveda_session");
    navigate("/login");
  };

  return (
    <header data-testid="site-navbar" className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-ink-0/70 border-b border-white/5">
      <div className="section flex items-center justify-between h-16">
        <Link to="/" data-testid="brand-logo" className="flex items-center gap-2 group">
          <span className="relative inline-flex w-2.5 h-2.5 bg-volt animate-pulseDot" />
          <span className="font-display font-bold text-lg tracking-tight">{brand.name}</span>
          <span className="hidden sm:inline-block text-ink-600 text-xs font-mono uppercase tracking-[0.2em] ml-2">/ops-intelligence</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"}
              className={({ isActive }) => "px-3 py-2 text-sm font-medium transition-colors " + (isActive ? "text-volt" : "text-ink-700 hover:text-white")}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          {session ? (
            <>
              <Link to="/dashboard" className="btn-ghost text-sm"><LayoutDashboard className="w-4 h-4" /> Dashboard</Link>
              <button onClick={logout} className="btn-primary text-sm"><LogOut className="w-4 h-4" /> Sign out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-ink-700 hover:text-white px-3 py-2">Client Login</Link>
              <Link to="/contact" className="btn-primary text-sm">Book Consultation <ArrowUpRight className="w-4 h-4" /></Link>
            </>
          )}
        </div>

        <button onClick={() => setOpen((v) => !v)} className="lg:hidden text-white p-2" aria-label="menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/5 bg-ink-0/95">
          <div className="section py-4 flex flex-col gap-1">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === "/"} onClick={() => setOpen(false)}
                className={({ isActive }) => "px-2 py-3 text-sm border-b border-ink-300 " + (isActive ? "text-volt" : "text-ink-700")}>
                {l.label}
              </NavLink>
            ))}
            {session ? (
              <>
                <Link to="/dashboard" onClick={() => setOpen(false)} className="btn-ghost mt-3 text-sm"><LayoutDashboard className="w-4 h-4" /> Dashboard</Link>
                <button onClick={() => { setOpen(false); logout(); }} className="btn-primary text-sm"><LogOut className="w-4 h-4" /> Sign out</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="btn-ghost mt-3 text-sm">Client Login</Link>
                <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary text-sm">Book Consultation</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
