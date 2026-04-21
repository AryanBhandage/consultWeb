import React from "react";
import { Area, AreaChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { COLORS, currencyK } from "./constants";

export default function SavingsTab({ metrics }) {
  return (
    <div className="space-y-6 animate-slideUp">
      <div className="card">
        <div className="overline">YTD Savings Breakdown</div>
        <div className="text-3xl font-mono font-bold text-volt mt-2">{currencyK(metrics.cost_savings_ytd_usd)}</div>
        <div className="text-sm text-ink-600 mt-1">On track to exceed target by Q4.</div>
      </div>
      <div className="grid lg:grid-cols-12 gap-3">
        <div className="card lg:col-span-8 h-[360px]">
          <div className="flex items-center justify-between">
            <div className="overline">Savings trajectory · 12M</div>
            <div className="text-xs font-mono text-ink-600">USD</div>
          </div>
          <div className="h-[280px] mt-4">
            <ResponsiveContainer>
              <AreaChart data={metrics.monthly_series}>
                <defs>
                  <linearGradient id="vg-savings-tab" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#CCFF00" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#CCFF00" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#27272A" vertical={false} />
                <XAxis dataKey="month" stroke="#71717A" tickLine={false} axisLine={false} style={{ fontFamily: "JetBrains Mono", fontSize: 11 }} />
                <YAxis stroke="#71717A" tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}K`} style={{ fontFamily: "JetBrains Mono", fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "#121214", border: "1px solid #27272A", borderRadius: 0 }} labelStyle={{ color: "#CCFF00" }} />
                <Area type="monotone" dataKey="savings" stroke="#CCFF00" strokeWidth={2} fill="url(#vg-savings-tab)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card lg:col-span-4 h-[360px]">
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
                  formatter={(value, name) => {
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
    </div>
  );
}
