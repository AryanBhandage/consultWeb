import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Network, Boxes, Truck, Leaf, Gauge, ClipboardList } from "lucide-react";
import { Section, Pill } from "../components/UI";
import { services } from "../lib/content";

const iconMap = {
  network: Network,
  clipboard: ClipboardList,
  boxes: Boxes,
  truck: Truck,
  gauge: Gauge,
  leaf: Leaf,
};

export default function Services() {
  return (
    <div data-testid="page-services">
      <section className="relative">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="section relative pt-16 pb-12">
          <Pill>Services</Pill>
          <h1 className="mt-6 font-display text-5xl md:text-6xl font-bold tracking-tighter leading-[1] max-w-4xl">
            A practice for every <span className="text-volt">P&L lever</span> in your supply chain.
          </h1>
          <p className="mt-6 max-w-3xl text-ink-700 text-lg">
            Every engagement follows the same spine: diagnose in weeks, design
            with data, deploy with your teams, and leave a capability behind.
          </p>
        </div>
      </section>

      {services.map((s, i) => {
        const Icon = iconMap[s.icon] || Network;
        const reverse = i % 2 === 1;

        return (
          <section
            key={s.id}
            id={s.id}
            className="border-t border-ink-300"
          >
            <div className="section py-20 md:py-28 grid lg:grid-cols-12 gap-10 items-start">

              {/* LEFT */}
              <div className={`lg:col-span-5 ${reverse ? "lg:order-2" : ""}`}>
                
                <div className="flex items-center gap-3 text-ink-600 font-mono text-xs tracking-[0.2em] uppercase">
                  <span>Practice</span>
                  <span>0{i + 1}</span>
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <Icon className="w-8 h-8 text-volt" />
                  <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">
                    {s.title}
                  </h2>
                </div>

                <div className="mt-8 h-px bg-ink-300" />

                {/* 🔥 BUSINESS VALUE */}
                <p className="mt-6 text-sm text-ink-500">
                  Typical impact: 15–30% cost reduction, faster delivery cycles
                </p>

                {/* 🔥 TARGET USERS */}
                <p className="text-xs text-ink-500 mt-2">
                  Ideal for: Manufacturing, FMCG, logistics-heavy businesses
                </p>

                {/* 🔥 IMPROVED CTA */}
                <Link
                  to={`/contact?service=${s.id}`}
                  className="btn-primary mt-8 inline-flex items-center gap-2"
                >
                  Get consultation for this
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <p className="text-xs text-ink-500 mt-2">
                  Pre-fills consultation form for this service
                </p>
              </div>

              {/* RIGHT */}
              <div className={`lg:col-span-7 grid md:grid-cols-3 gap-4 ${reverse ? "lg:order-1" : ""}`}>
                
                <div className="card hover:-translate-y-1 transition duration-300">
                  <div className="overline text-danger">Problem</div>
                  <p className="mt-4 text-base text-white leading-relaxed">
                    {s.problem}
                  </p>
                </div>

                <div className="card hover:-translate-y-1 transition duration-300">
                  <div className="overline text-amber-accent">Solution</div>
                  <p className="mt-4 text-base text-white leading-relaxed">
                    {s.solution}
                  </p>
                </div>

                <div className="card relative overflow-hidden group hover:-translate-y-1 transition duration-300">
                  <div className="glow-ring" />
                  <div className="overline">Outcome</div>
                  <p className="mt-4 text-base text-white leading-relaxed">
                    {s.outcome}
                  </p>
                </div>

              </div>
            </div>
          </section>
        );
      })}

      {/* FINAL CTA */}
      <Section>
        <div className="card">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <div className="overline">Not sure where to start?</div>
              <h3 className="mt-3 font-display text-3xl font-semibold">
                Take the diagnostic. Get a prioritized impact map.
              </h3>
            </div>
            <div className="md:justify-self-end">
              <Link
                to="/calculators"
                className="btn-ghost"
              >
                Try the calculators
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}