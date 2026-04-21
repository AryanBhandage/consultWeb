import React from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Clock } from "lucide-react";
import { COLORS, ALERTS, PROJECTS } from "./constants";

export default function OverviewTab({ metrics, kpis }) {
  return (
    <div className="space-y-6 animate-slideUp">
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
  );
}
