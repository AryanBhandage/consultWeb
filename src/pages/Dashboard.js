import React, { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell,
  Legend, Line, LineChart, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import {
  TrendingUp, Leaf, Activity, Package, Truck, Cpu,
  LogOut, Download, AlertTriangle, CheckCircle2, Clock,
  Home, Settings, FileText, Bell, ChevronRight,
} from "lucide-react";

// ── Mock data (no backend required) ─────────────────────────────────────────
const MOCK_METRICS = {
  cost_savings_ytd_usd: 3_420_000,
  efficiency_score: 84,
  esg_score: 71,
  on_time_delivery_pct: 97.2,
  inventory_turns: 8.4,
  co2_tons_reduced: 1_240,
  projects_active: 4,
  projects_completed: 11,
  monthly_series: [
    { month: "Jan", savings: 180000, efficiency: 72, esg: 61 },
    { month: "Feb", savings: 210000, efficiency: 74, esg: 63 },
    { month: "Mar", savings: 245000, efficiency: 75, esg: 64 },
    { month: "Apr", savings: 220000, efficiency: 76, esg: 64 },
    { month: "May", savings: 280000, efficiency: 77, esg: 65 },
    { month: "Jun", savings: 310000, efficiency: 79, esg: 67 },
    { month: "Jul", savings: 295000, efficiency: 80, esg: 68 },
    { month: "Aug", savings: 340000, efficiency: 81, esg: 69 },
    { month: "Sep", savings: 320000, efficiency: 82, esg: 69 },
    { month: "Oct", savings: 355000, efficiency: 83, esg: 70 },
    { month: "Nov", savings: 375000, efficiency: 84, esg: 71 },
    { month: "Dec", savings: 290000, efficiency: 84, esg: 71 },
  ],
  category_spend: [
    { name: "Logistics", value: 38 },
    { name: "Raw Material", value: 27 },
    { name: "Warehousing", value: 18 },
    { name: "Indirect", value: 11 },
    { name: "Other", value: 6 },
  ],
};

const COLORS = ["#CCFF00", "#FF9900", "#66D9EF", "#A1A1AA", "#3F3F46"];

function useSession() {
  const raw = typeof window !== "undefined" ? localStorage.getItem("logiveda_session") : null;
  return raw ? JSON.parse(raw) : null;
}

function currencyK(n) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

const ALERTS = [
  { t: "Stockout risk", c: "SKU-22841 · Mumbai DC · Cover 3.2d", icon: AlertTriangle, level: "text-red-400" },
  { t: "OEE below target", c: "Plant B · Line 4 · 71% vs target 82%", icon: AlertTriangle, level: "text-amber-400" },
  { t: "Savings milestone", c: "Q4 target of $3.2M crossed", icon: CheckCircle2, level: "text-volt" },
  { t: "Quality SPC", c: "CPK restored to 1.42 on Line 2", icon: CheckCircle2, level: "text-volt" },
];

const PROJECTS = [
  { name: "Altura · S&OP transformation", owner: "Anaya R.", status: "On track", pct: 72 },
  { name: "Northline · DMAIC wave 2", owner: "Rohan M.", status: "At risk", pct: 54 },
  { name: "Verdera · Scope 3 baseline", owner: "Priya V.", status: "On track", pct: 88 },
  { name: "Kairos · Network redesign", owner: "Daniel K.", status: "Kick-off", pct: 12 },
];

// Sidebar nav items
const SIDEBAR = [
  { icon: Home, label: "Overview", active: true },
  { icon: TrendingUp, label: "Savings", active: false },
  { icon: Activity, label: "Efficiency", active: false },
  { icon: Leaf, label: "ESG", active: false },
  { icon: FileText, label: "Reports", active: false },
  { icon: Settings, label: "Settings", active: false },
];

export default function Dashboard() {
  const session = useSession();
  const navigate = useNavigate();
  const metrics = MOCK_METRICS;
  const [activeNav, setActiveNav] = useState("Overview");

  if (!session) return <Navigate to="/login" replace />;

  const logout = () => {
    localStorage.removeItem("logiveda_session");
    navigate("/login");
  };

  const kpis = [
    { icon: TrendingUp, label: "Cost savings YTD", value: currencyK(metrics.cost_savings_ytd_usd), delta: "+18.4% MoM", color: "text-volt" },
    { icon: Activity, label: "Efficiency score", value: `${metrics.efficiency_score}`, delta: "+3.2 pts", color: "text-white" },
    { icon: Leaf, label: "ESG score", value: `${metrics.esg_score}`, delta: "+5.9 pts", color: "text-white" },
    { icon: Truck, label: "On-time delivery", value: `${metrics.on_time_delivery_pct}%`, delta: "SLA met", color: "text-white" },
    { icon: Package, label: "Inventory turns", value: `${metrics.inventory_turns}`, delta: "+2.1 vs LY", color: "text-white" },
    { icon: Cpu, label: "CO₂ tons reduced", value: `${metrics.co2_tons_reduced.toLocaleString()}`, delta: "Scope 1+2", color: "text-white" },
  ];

  return (
    <div data-testid="page-dashboard" className="bg-ink-0 min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 border-r border-ink-300 bg-ink-50/40 min-h-screen fixed left-0 top-0 z-40">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 px-6 py-5 border-b border-ink-300">
          <span className="w-2.5 h-2.5 bg-volt animate-pulseDot inline-block" />
          <span className="font-display font-bold text-base">Logiveda</span>
        </Link>

        {/* Nav */}
        <nav className="flex-1 py-6 px-3 space-y-1">
          {SIDEBAR.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveNav(item.label)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors ${
                activeNav === item.label
                  ? "bg-volt/10 text-volt"
                  : "text-ink-700 hover:text-white hover:bg-ink-300/30"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
              {activeNav === item.label && (
                <ChevronRight className="w-3 h-3 ml-auto" />
              )}
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="border-t border-ink-300 p-4">
          <div className="text-xs font-mono text-ink-600 truncate">{session.email}</div>
          <div className="text-sm font-semibold text-white mt-0.5 truncate">{session.name}</div>
          <button
            onClick={logout}
            className="mt-3 w-full flex items-center gap-2 text-xs text-ink-700 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign out
          </button>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-ink-50/95 backdrop-blur border-t border-ink-300 flex items-center justify-around px-2 py-2">
        {SIDEBAR.slice(0, 5).map((item) => (
          <button
            key={item.label}
            onClick={() => setActiveNav(item.label)}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 text-[10px] font-medium transition-colors ${
              activeNav === item.label
                ? "text-volt"
                : "text-ink-700"
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Main content */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        {/* Top bar */}
        <div className="border-b border-ink-300 bg-ink-50/60 backdrop-blur sticky top-0 z-30">
          <div className="px-4 py-3 md:px-6 md:py-4 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-xs font-mono uppercase tracking-widest text-ink-600">
                Client workspace
              </div>
              <div className="mt-0.5 font-display text-base md:text-xl font-semibold truncate">
                {session.company} · Engagement dashboard
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button className="relative p-2 text-ink-700 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-volt rounded-full" />
              </button>
              <button
                className="btn-ghost text-sm hidden md:inline-flex"
                data-testid="dashboard-export"
              >
                <Download className="w-4 h-4" /> Export
              </button>
              <button
                onClick={logout}
                data-testid="dashboard-logout"
                className="lg:hidden btn-primary text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard body */}
        <div className="flex-1 p-4 md:p-6 pb-24 lg:pb-6 space-y-6">
          {/* KPI row */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {kpis.map((k) => (
              <div
                key={k.label}
                className="bg-ink-100 border border-ink-300 p-5 hover:border-volt/40 transition-colors"
                data-testid={`kpi-${k.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="flex items-center justify-between">
                  <k.icon className={`w-5 h-5 ${k.color}`} />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-ink-600">
                    {k.delta}
                  </span>
                </div>
                <div className={`kpi text-2xl lg:text-3xl mt-6 ${k.color}`}>
                  {k.value}
                </div>
                <div className="text-ink-700 text-xs mt-2 uppercase tracking-widest font-mono">
                  {k.label}
                </div>
              </div>
            ))}
          </div>

          {/* Charts row 1 */}
          <div className="grid lg:grid-cols-12 gap-3">
            <div className="card lg:col-span-8 h-[360px]" data-testid="chart-savings">
              <div className="flex items-center justify-between">
                <div className="overline">Savings trajectory · 12M</div>
                <div className="text-xs font-mono text-ink-600">USD</div>
              </div>
              <div className="h-[280px] mt-4">
                <ResponsiveContainer>
                  <AreaChart data={metrics.monthly_series}>
                    <defs>
                      <linearGradient id="vg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#CCFF00" stopOpacity={0.6} />
                        <stop offset="100%" stopColor="#CCFF00" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#27272A" vertical={false} />
                    <XAxis dataKey="month" stroke="#71717A" tickLine={false} axisLine={false} style={{ fontFamily: "JetBrains Mono", fontSize: 11 }} />
                    <YAxis stroke="#71717A" tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}K`} style={{ fontFamily: "JetBrains Mono", fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: "#121214", border: "1px solid #27272A", borderRadius: 0 }} labelStyle={{ color: "#CCFF00" }} />
                    <Area type="monotone" dataKey="savings" stroke="#CCFF00" strokeWidth={2} fill="url(#vg)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card lg:col-span-4 h-[360px]" data-testid="chart-spend">
              <div className="overline">Category spend mix</div>
              <div className="h-[280px] mt-4">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={metrics.category_spend} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} stroke="#050505" strokeWidth={2}>
                      {metrics.category_spend.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ background: "#121214", border: "1px solid #27272A", borderRadius: 0 }}
                      labelStyle={{ color: "#ffffff" }}
                      formatter={(value, name, props) => {
                        const color = COLORS[metrics.category_spend.findIndex(d => d.name === name) % COLORS.length];
                        return [<span style={{ color }}>{value}%</span>, <span style={{ color }}>{name}</span>];
                      }}
                    />
                    <Legend wrapperStyle={{ fontFamily: "JetBrains Mono", fontSize: 10, color: "#A1A1AA" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Charts row 2 */}
          <div className="grid lg:grid-cols-12 gap-3">
            <div className="card lg:col-span-6 h-[340px]" data-testid="chart-efficiency">
              <div className="overline">Efficiency & ESG trajectory</div>
              <div className="h-[260px] mt-4">
                <ResponsiveContainer>
                  <LineChart data={metrics.monthly_series}>
                    <CartesianGrid stroke="#27272A" vertical={false} />
                    <XAxis dataKey="month" stroke="#71717A" tickLine={false} axisLine={false} style={{ fontFamily: "JetBrains Mono", fontSize: 11 }} />
                    <YAxis stroke="#71717A" tickLine={false} axisLine={false} style={{ fontFamily: "JetBrains Mono", fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: "#121214", border: "1px solid #27272A", borderRadius: 0 }} />
                    <Legend wrapperStyle={{ fontFamily: "JetBrains Mono", fontSize: 10, color: "#A1A1AA" }} />
                    <Line type="monotone" dataKey="efficiency" stroke="#CCFF00" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="esg" stroke="#FF9900" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card lg:col-span-6 h-[340px]" data-testid="chart-savings-bars">
              <div className="overline">Monthly savings · last 12</div>
              <div className="h-[260px] mt-4">
                <ResponsiveContainer>
                  <BarChart data={metrics.monthly_series}>
                    <CartesianGrid stroke="#27272A" vertical={false} />
                    <XAxis dataKey="month" stroke="#71717A" tickLine={false} axisLine={false} style={{ fontFamily: "JetBrains Mono", fontSize: 11 }} />
                    <YAxis stroke="#71717A" tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}K`} style={{ fontFamily: "JetBrains Mono", fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: "#121214", border: "1px solid #27272A", borderRadius: 0 }} />
                    <Bar dataKey="savings" fill="#CCFF00" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Alerts + Projects */}
          <div className="grid lg:grid-cols-12 gap-3">
            <div className="card lg:col-span-5" data-testid="alerts-panel">
              <div className="overline">Operational alerts</div>
              <div className="mt-6 divide-y divide-ink-300">
                {ALERTS.map((a, i) => (
                  <div key={i} className="flex items-start gap-3 py-4">
                    <a.icon className={`w-5 h-5 ${a.level} shrink-0 mt-0.5`} />
                    <div>
                      <div className="text-white text-sm font-semibold">{a.t}</div>
                      <div className="text-ink-700 text-xs font-mono">{a.c}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card lg:col-span-7" data-testid="projects-panel">
              <div className="flex items-center justify-between">
                <div className="overline">Active engagements</div>
                <div className="text-xs font-mono text-ink-600">
                  {metrics.projects_active} active · {metrics.projects_completed} completed
                </div>
              </div>
              <div className="mt-6 space-y-5">
                {PROJECTS.map((p) => (
                  <div key={p.name}>
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <div className="text-white font-medium">{p.name}</div>
                        <div className="text-ink-600 text-xs font-mono">
                          Lead {p.owner} ·{" "}
                          <span className={
                            p.status === "At risk" ? "text-amber-400"
                            : p.status === "Kick-off" ? "text-ink-700"
                            : "text-volt"
                          }>
                            {p.status}
                          </span>
                        </div>
                      </div>
                      <div className="font-mono text-sm text-white flex items-center gap-2">
                        <Clock className="w-3 h-3 text-ink-600" />
                        {p.pct}%
                      </div>
                    </div>
                    <div className="mt-2 h-1.5 bg-ink-300">
                      <div
                        className={`h-1.5 ${p.status === "At risk" ? "bg-amber-400" : "bg-volt"}`}
                        style={{ width: `${p.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
