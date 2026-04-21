import React, { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import {
  TrendingUp, Leaf, Activity, Package, Truck, Cpu,
  LogOut, Download, AlertTriangle, CheckCircle2, Clock,
  Home, Settings, FileText, Bell, ChevronRight,
} from "lucide-react";

import OverviewTab from "../components/dashboard/OverviewTab";
import SavingsTab from "../components/dashboard/SavingsTab";
import EfficiencyTab from "../components/dashboard/EfficiencyTab";
import ESGTab from "../components/dashboard/ESGTab";
import ReportsTab from "../components/dashboard/ReportsTab";
import SettingsTab from "../components/dashboard/SettingsTab";
import { currencyK } from "../components/dashboard/constants";

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

function useSession() {
  const raw = typeof window !== "undefined" ? localStorage.getItem("logiveda_session") : null;
  return raw ? JSON.parse(raw) : null;
}

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
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors ${activeNav === item.label
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
            className={`flex flex-col items-center gap-1 px-3 py-1.5 text-[10px] font-medium transition-colors ${activeNav === item.label
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
                {session.company} · {activeNav === "Overview" ? "Engagement dashboard" : activeNav}
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
          {activeNav === "Overview" && <OverviewTab metrics={metrics} kpis={kpis} />}
          {activeNav === "Savings" && <SavingsTab metrics={metrics} />}
          {activeNav === "Efficiency" && <EfficiencyTab metrics={metrics} />}
          {activeNav === "ESG" && <ESGTab metrics={metrics} />}
          {activeNav === "Reports" && <ReportsTab />}
          {activeNav === "Settings" && <SettingsTab session={session} />}
        </div>
      </div>
    </div>
  );
}
