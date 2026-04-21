import React from "react";
import { Section, Pill, StatBlock } from "../components/UI";
import { brand, stats } from "../lib/content";
import { Target, Compass, Flag, Users2, Award, ShieldCheck } from "lucide-react";

const pillars = [
  {
    icon: Target,
    title: "Outcome-obligated",
    copy:
      "We sign outcome-linked SOWs. If the savings don't land, neither does our full fee.",
  },
  {
    icon: Compass,
    title: "Data-native",
    copy:
      "Every recommendation is backed by the client's own data — instrumented, cleaned, and modeled in weeks.",
  },
  {
    icon: Flag,
    title: "Operator DNA",
    copy:
      "Our team has run plants, warehouses, and networks. We don't hand over a deck; we help you ship change.",
  },
  {
    icon: ShieldCheck,
    title: "ESG-embedded",
    copy:
      "Sustainability is not a side quest. It is a design constraint in every solution we deliver.",
  },
];

const leaders = [
  { name: "Aryan B.", role: "Managing Partner · Supply Chain", exp: "ex-McKinsey, ex-Flipkart" },
  { name: "Nimita S.", role: "Partner · Procurement & Sourcing", exp: "ex-Unilever, ex-Accenture" },
  { name: "Rudra K.", role: "Partner · ESG & Sustainability", exp: "ex-EY Climate, BRSR lead" },
  { name: "Atharva K.", role: "Head of Analytics", exp: "ex-ZS, ex-Palantir FDE" },
];

export default function About() {
  return (
    <div data-testid="page-about">
      <section className="relative">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="section relative pt-16 pb-12">
          <Pill>About {brand.name}</Pill>
          <h1 className="mt-6 font-display text-5xl md:text-6xl font-bold tracking-tighter leading-[1]">
            Built by operators.
            <br />
            <span className="text-volt">Armed</span> with data.
          </h1>
          <p className="mt-6 max-w-3xl text-ink-700 text-lg">
            {brand.name} is a new breed of consulting firm — a fusion of
            Six Sigma discipline, AI-driven analytics, and ESG engineering,
            built for operators who measure themselves in margin points,
            service levels, and carbon tonnes.
          </p>
        </div>
      </section>

      <Section eyebrow="Mission & Vision" title="Why we exist.">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="card">
            <div className="overline">Mission</div>
            <p className="mt-4 text-xl font-display leading-snug">
              {brand.mission}
            </p>
          </div>
          <div className="card">
            <div className="overline">Vision</div>
            <p className="mt-4 text-xl font-display leading-snug">
              {brand.vision}
            </p>
          </div>
        </div>
        <div className="mt-4 card">
          <div className="overline">Unique value proposition</div>
          <p className="mt-4 text-xl font-display leading-snug max-w-4xl">
            {brand.uvp}
          </p>
        </div>
      </Section>

      <Section eyebrow="Why choose us" title="Four principles. Zero negotiable.">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((p) => (
            <div key={p.title} className="card">
              <p.icon className="w-6 h-6 text-volt" />
              <h3 className="mt-6 font-display text-xl font-semibold">
                {p.title}
              </h3>
              <p className="mt-3 text-ink-700 text-sm">{p.copy}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Leadership" title="People who have run the lines they advise.">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {leaders.map((l) => (
            <div key={l.name} className="card" data-testid={`leader-${l.name}`}>
              <div className="h-40 border border-ink-300 flex items-center justify-center bg-gradient-to-br from-ink-100 to-ink-0">
                <Users2 className="w-10 h-10 text-ink-500" />
              </div>
              <div className="mt-5 font-display text-lg font-semibold">
                {l.name}
              </div>
              <div className="text-ink-700 text-sm">{l.role}</div>
              <div className="mt-1 text-ink-600 text-xs font-mono uppercase tracking-widest">
                {l.exp}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="By the numbers" title="What our work has added up to.">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8">
          {stats.map((s, i) => (
            <StatBlock
              key={s.label}
              value={s.value}
              label={s.label}
              sub={s.sub}
              testId={`about-stat-${i}`}
            />
          ))}
        </div>
        <div className="mt-16 card flex items-center gap-4">
          <Award className="w-6 h-6 text-volt" />
          <div className="text-ink-700 text-sm">
            Recognized by <span className="text-white font-semibold">Supply Chain World</span> as a
            2025 'Top 20 Emerging Consulting Firms to Watch'.
          </div>
        </div>
      </Section>
    </div>
  );
}