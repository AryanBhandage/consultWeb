import React from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function ESGTab({ metrics }) {
  return (
    <div className="space-y-6 animate-slideUp">
      <div className="grid lg:grid-cols-2 gap-3">
        <div className="card">
          <div className="overline">ESG Impact Score</div>
          <div className="text-3xl font-mono font-bold text-volt mt-2">{metrics.esg_score}</div>
          <div className="text-sm text-ink-600 mt-1">Industry benchmark: 65. You are ahead of the curve.</div>
        </div>
        <div className="card">
          <div className="overline">Carbon Reduced (Tons)</div>
          <div className="text-3xl font-mono font-bold text-white mt-2">{metrics.co2_tons_reduced.toLocaleString()}</div>
          <div className="text-sm text-ink-600 mt-1">Scope 1 & 2 targets met for this quarter.</div>
        </div>
      </div>
      <div className="card h-[340px]">
        <div className="overline">ESG trajectory</div>
        <div className="h-[260px] mt-4">
          <ResponsiveContainer>
            <LineChart data={metrics.monthly_series}>
              <CartesianGrid stroke="#27272A" vertical={false} />
              <XAxis dataKey="month" stroke="#71717A" tickLine={false} axisLine={false} style={{ fontFamily: "JetBrains Mono", fontSize: 11 }} />
              <YAxis stroke="#71717A" tickLine={false} axisLine={false} style={{ fontFamily: "JetBrains Mono", fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "#121214", border: "1px solid #27272A", borderRadius: 0 }} />
              <Legend wrapperStyle={{ fontFamily: "JetBrains Mono", fontSize: 10, color: "#A1A1AA" }} />
              <Line type="monotone" dataKey="esg" stroke="#FF9900" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
