import React from "react";
import { Link } from "react-router-dom";
import { Section, Pill } from "../components/UI";
import { caseStudies } from "../lib/content";
import { ArrowUpRight } from "lucide-react";

export default function CaseStudies() {
  return (
    <div data-testid="page-case-studies">
      <section className="relative">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="section relative pt-16 pb-12">
          <Pill>Case studies</Pill>
          <h1 className="mt-6 font-display text-5xl md:text-6xl font-bold tracking-tighter leading-[1] max-w-4xl">
            Receipts, not <span className="text-volt">slideware</span>.
          </h1>
          <p className="mt-6 max-w-3xl text-ink-700 text-lg">
            Three recent engagements, with the numbers their CFOs validated.
            Names lightly anonymized where required.
          </p>
        </div>
      </section>

      {caseStudies.map((c, i) => (
        <section
          key={c.id}
          data-testid={`case-${c.id}`}
          className="border-t border-ink-300"
        >
          <div className="section py-20 md:py-28 grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <div className="font-mono text-xs tracking-widest uppercase text-ink-600">
                Case 0{i + 1}
              </div>
              <h2 className="mt-4 font-display text-3xl md:text-4xl font-semibold tracking-tight">
                {c.client}
              </h2>
              <div className="mt-2 text-ink-700 text-sm font-mono uppercase tracking-widest">
                {c.industry}
              </div>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {c.results.map((r) => (
                  <div
                    key={r.k}
                    className="border border-ink-300 p-4 bg-ink-50"
                    data-testid={`case-${c.id}-kpi-${r.k}`}
                  >
                    <div className="text-ink-700 text-xs uppercase tracking-widest">
                      {r.k}
                    </div>
                    <div className="kpi text-xl mt-2">{r.v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8 grid md:grid-cols-3 gap-3">
              <div className="card">
                <div className="overline text-danger">Problem</div>
                <p className="mt-4 text-sm text-white leading-relaxed">
                  {c.problem}
                </p>
              </div>
              <div className="card">
                <div className="overline text-amber-accent">Approach</div>
                <p className="mt-4 text-sm text-white leading-relaxed">
                  {c.approach}
                </p>
              </div>
              <div className="card relative overflow-hidden group">
                <div className="glow-ring" />
                <div className="overline">Solution</div>
                <p className="mt-4 text-sm text-white leading-relaxed">
                  {c.solution}
                </p>
              </div>
            </div>
          </div>
        </section>
      ))}

      <Section>
        <div className="card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="overline">Your case study, next</div>
            <h3 className="mt-2 font-display text-3xl font-semibold">
              Let's find the $1M hiding in your chain.
            </h3>
          </div>
          <Link
            to="/contact"
            data-testid="case-studies-cta"
            className="btn-primary"
          >
            Book a diagnostic <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </Section>
    </div>
  );
}