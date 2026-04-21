import React, { useState } from "react";
import { Section, Pill } from "../components/UI";
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { DollarSign, Leaf, TrendingUp, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

function currency(n) {
  if (!n && n !== 0) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

// ── Local cost calculation (no backend) ─────────────────────────────────────
function computeCost({ current_cost, inefficiency_pct, horizon_months }) {
  const capture_rate = 0.65;
  const monthly_savings = current_cost * (inefficiency_pct / 100) * capture_rate;
  return {
    monthly_savings,
    annual_savings: monthly_savings * 12,
    projected_savings: monthly_savings * horizon_months,
    new_run_rate: current_cost - monthly_savings,
  };
}

// ── Local ESG scoring (no backend) ──────────────────────────────────────────
function computeEsg(inputs) {
  const weights = {
    renewable_energy_pct: 0.25,
    co2_reduction_pct: 0.30,
    recycled_materials_pct: 0.15,
    waste_reduction_pct: 0.15,
    supplier_diversity_pct: 0.15,
  };
  const score = Math.round(
    Object.entries(weights).reduce(
      (sum, [key, w]) => sum + inputs[key] * w,
      0
    )
  );
  const band =
    score >= 80 ? "Leader"
    : score >= 60 ? "Progressing"
    : score >= 40 ? "Developing"
    : "Laggard";
  return { score, band };
}

function CostCalculator() {
  const [inputs, setInputs] = useState({
    current_cost: 500000,
    inefficiency_pct: 18,
    horizon_months: 12,
  });
  const [res, setRes] = useState(null);

  const calc = () => setRes(computeCost(inputs));

  return (
    <div className="grid lg:grid-cols-2 gap-4" data-testid="cost-calculator">
      <div className="card">
        <div className="flex items-center gap-3">
          <DollarSign className="w-5 h-5 text-volt" />
          <div className="overline">Cost Reduction Calculator</div>
        </div>
        <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight">
          Find the savings buried in your run-rate.
        </h3>
        <div className="mt-8 space-y-6">
          <div>
            <label className="label">Current monthly ops cost (USD)</label>
            <input
              type="number"
              min="0"
              value={inputs.current_cost}
              onChange={(e) => setInputs({ ...inputs, current_cost: Number(e.target.value) })}
              data-testid="cost-input-current"
              className="input-field"
            />
          </div>
          <div>
            <label className="label">
              Estimated inefficiency % —{" "}
              <span className="text-volt font-mono">{inputs.inefficiency_pct}%</span>
            </label>
            <input
              type="range" min="0" max="60"
              value={inputs.inefficiency_pct}
              onChange={(e) => setInputs({ ...inputs, inefficiency_pct: Number(e.target.value) })}
              data-testid="cost-input-ineff"
              className="w-full accent-volt mt-2"
            />
            <div className="flex justify-between text-xs font-mono text-ink-600 mt-1">
              <span>0%</span><span>60%</span>
            </div>
          </div>
          <div>
            <label className="label">
              Planning horizon —{" "}
              <span className="text-volt font-mono">{inputs.horizon_months} months</span>
            </label>
            <input
              type="range" min="3" max="36"
              value={inputs.horizon_months}
              onChange={(e) => setInputs({ ...inputs, horizon_months: Number(e.target.value) })}
              data-testid="cost-input-horizon"
              className="w-full accent-volt mt-2"
            />
            <div className="flex justify-between text-xs font-mono text-ink-600 mt-1">
              <span>3 mo</span><span>36 mo</span>
            </div>
          </div>
          <button
            onClick={calc}
            data-testid="cost-calc-btn"
            className="btn-primary w-full"
          >
            Run savings model
          </button>
        </div>
      </div>

      <div className="card relative overflow-hidden">
        <div className="glow-ring" />
        <div className="overline">Projected impact</div>

        {res ? (
          <>
            <div className="mt-6 grid grid-cols-2 gap-4" data-testid="cost-result">
              {[
                { label: "Monthly savings", value: currency(res.monthly_savings), highlight: true },
                { label: "Annualized", value: currency(res.annual_savings) },
                { label: `Over ${inputs.horizon_months} months`, value: currency(res.projected_savings) },
                { label: "New monthly run-rate", value: currency(res.new_run_rate) },
              ].map((item) => (
                <div key={item.label} className="border border-ink-300 p-4">
                  <div className="text-ink-700 text-xs uppercase tracking-widest">{item.label}</div>
                  <div className={`kpi text-2xl mt-2 ${item.highlight ? "text-volt" : "text-white"}`}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Visual savings bar */}
            <div className="mt-6">
              <div className="text-xs font-mono text-ink-600 mb-2 uppercase tracking-widest">
                Savings capture rate
              </div>
              <div className="h-2 bg-ink-300">
                <div
                  className="h-2 bg-volt transition-all duration-700"
                  style={{ width: `${inputs.inefficiency_pct * 0.65}%` }}
                />
              </div>
              <div className="flex justify-between text-xs font-mono text-ink-600 mt-1">
                <span>0%</span>
                <span className="text-volt">{(inputs.inefficiency_pct * 0.65).toFixed(1)}% captured</span>
              </div>
            </div>
          </>
        ) : (
          <div className="mt-6 flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 border border-ink-300 flex items-center justify-center mb-4">
              <TrendingUp className="w-7 h-7 text-ink-600" />
            </div>
            <div className="text-ink-700 text-sm">
              Adjust inputs and run the model to see your projected savings.
            </div>
          </div>
        )}

        <p className="mt-6 text-ink-600 text-xs font-mono uppercase tracking-widest">
          Model assumes 65% efficiency capture. Real deployments range 45–80%.
        </p>
      </div>
    </div>
  );
}

function EsgCalculator() {
  const [inputs, setInputs] = useState({
    renewable_energy_pct: 40,
    recycled_materials_pct: 30,
    co2_reduction_pct: 25,
    supplier_diversity_pct: 35,
    waste_reduction_pct: 45,
  });
  const [res, setRes] = useState(null);

  const calc = () => setRes(computeEsg(inputs));

  const factors = [
    { key: "renewable_energy_pct", label: "Renewable Energy", weight: "25%" },
    { key: "co2_reduction_pct", label: "CO₂ Reduction", weight: "30%" },
    { key: "recycled_materials_pct", label: "Recycled Materials", weight: "15%" },
    { key: "waste_reduction_pct", label: "Waste Reduction", weight: "15%" },
    { key: "supplier_diversity_pct", label: "Supplier Diversity", weight: "15%" },
  ];

  // Interpolate hue: 0 (red) → 77° (volt green) based on score 0–100
  const scoreColor = res
    ? `hsl(${Math.round((res.score / 100) * 77)}, 100%, ${res.score < 20 ? 45 : 55}%)`
    : "#27272A";
  const chartData = res ? [{ name: "score", value: res.score, fill: scoreColor }] : [];

  const bandColor = res
    ? res.band === "Leader" ? "text-volt"
    : res.band === "Progressing" ? "text-amber-400"
    : "text-red-400"
    : "text-ink-700";

  return (
    <div className="grid lg:grid-cols-2 gap-4" data-testid="esg-calculator">
      <div className="card">
        <div className="flex items-center gap-3">
          <Leaf className="w-5 h-5 text-volt" />
          <div className="overline">ESG Score Calculator</div>
        </div>
        <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight">
          See your sustainability posture at a glance.
        </h3>
        <div className="mt-8 space-y-5">
          {factors.map((f) => (
            <div key={f.key}>
              <div className="flex items-center justify-between mb-1">
                <label className="label mb-0">{f.label}</label>
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="text-ink-600">weight {f.weight}</span>
                  <span className="text-volt">{inputs[f.key]}%</span>
                </div>
              </div>
              <input
                type="range" min="0" max="100"
                value={inputs[f.key]}
                onChange={(e) => setInputs({ ...inputs, [f.key]: Number(e.target.value) })}
                data-testid={`esg-${f.key}`}
                className="w-full accent-volt"
              />
            </div>
          ))}
          <button
            onClick={calc}
            data-testid="esg-calc-btn"
            className="btn-primary w-full"
          >
            Score my ESG posture
          </button>
        </div>
      </div>

      <div className="card relative overflow-hidden">
        <div className="glow-ring" />
        <div className="overline">Your ESG score</div>
        <div className="mt-4 h-56 flex items-center justify-center" data-testid="esg-result-chart">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              innerRadius="70%"
              outerRadius="100%"
              data={chartData.length ? chartData : [{ name: "x", value: 0, fill: "#27272A" }]}
              startAngle={90}
              endAngle={-270}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialBar background={{ fill: "#27272A" }} dataKey="value" cornerRadius={0} />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-2 text-center">
          <div className="kpi text-6xl" data-testid="esg-score-value">
            {res ? res.score : "—"}
          </div>
          <div className={`mt-2 font-mono text-sm tracking-widest uppercase font-bold ${res ? bandColor : "text-ink-700"}`}>
            {res ? res.band : "Adjust sliders and run score"}
          </div>
          {res && (
            <div className="text-ink-600 text-xs font-mono mt-1">
              {res.band === "Leader" && "Top quartile · Audit-ready"}
              {res.band === "Progressing" && "On track · Key gaps remain"}
              {res.band === "Developing" && "Foundational work needed"}
              {res.band === "Laggard" && "Significant improvement required"}
            </div>
          )}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2 text-xs">
          {[
            { band: "Leader", range: "80–100", color: "text-volt" },
            { band: "Progressing", range: "60–79", color: "text-amber-400" },
            { band: "Developing", range: "40–59", color: "text-orange-400" },
            { band: "Laggard", range: "0–39", color: "text-red-400" },
          ].map((b) => (
            <div key={b.band} className={`border border-ink-300 px-3 py-2 flex items-center justify-between ${res?.band === b.band ? "border-volt/50 bg-volt/5" : ""}`}>
              <span className={b.color}>{b.band}</span>
              <span className="font-mono text-ink-600">{b.range}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Calculators() {
  return (
    <div data-testid="page-calculators">
      <section className="relative">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="section relative pt-16 pb-12">
          <Pill>Interactive tools</Pill>
          <h1 className="mt-6 font-display text-5xl md:text-6xl font-bold tracking-tighter leading-[1] max-w-4xl">
            Numbers, not <span className="text-volt">narratives</span>.
          </h1>
          <p className="mt-6 max-w-3xl text-ink-700 text-lg">
            Two quick models — cost savings and ESG posture — so you can see
            orders of magnitude before you book a call.
          </p>
        </div>
      </section>

      <Section eyebrow="Cost Reduction Calculator" title="How much of your run-rate is actually inefficiency?">
        <CostCalculator />
      </Section>

      <Section eyebrow="ESG Score Calculator" title="Where does your sustainability posture actually land?">
        <EsgCalculator />
      </Section>

      <Section>
        <div className="card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="overline">Next step</div>
            <p className="mt-3 text-ink-700 text-lg max-w-2xl">
              These calculators are directional. In a paid diagnostic, we
              replace every slider with your own data and model the real
              capture curve.
            </p>
          </div>
          <Link to="/contact" className="btn-primary shrink-0">
            Book a diagnostic <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </Section>
    </div>
  );
}
