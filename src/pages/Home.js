import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Network,
  Boxes,
  Truck,
  Leaf,
  Gauge,
  ClipboardList,
  Sparkles,
  Activity,
  Globe2,
  Cpu,
  MessageSquare,
} from "lucide-react";
import { Section, StatBlock, Pill } from "../components/UI";
import EmpathySection from "../components/EmpathySection";
import {
  brand,
  stats,
  services,
  industries,
  clientLogos,
  testimonials,
} from "../lib/content";

const iconMap = {
  network: Network,
  clipboard: ClipboardList,
  boxes: Boxes,
  truck: Truck,
  gauge: Gauge,
  leaf: Leaf,
};

export default function Home() {
  return (
    <div data-testid="page-home">
      {/* HERO */}
      <section className="relative overflow-hidden" data-testid="hero">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className="noise" />
        <div className="section relative pt-20 md:pt-28 pb-24 md:pb-32">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <Pill>Supply Chain · Ops · ESG</Pill>
              <h1
                data-testid="hero-title"
                className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tighter font-bold mt-6"
              >
                Operations intelligence
                <br />
                for the <span className="text-volt">next-decade</span>
                <br />
                supply chain.
              </h1>
              <p className="mt-6 max-w-2xl text-ink-700 text-lg">
                {brand.name} is a modern consulting firm that turns tangled
                supply chains into data-driven growth engines. We cut cost, lift
                service, and bake sustainability into every node — in weeks,
                not years.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link
                  to="/contact"
                  data-testid="hero-primary-cta"
                  className="btn-primary"
                >
                  Book a 30-min diagnostic <ArrowUpRight className="w-4 h-4" />
                </Link>
                {/* ── NEW: Tell Us Your Challenges CTA ── */}
                <Link
                  to="/survey"
                  data-testid="hero-empathy-cta"
                  className="btn-ghost"
                >
                  <MessageSquare className="w-4 h-4" />
                  Tell us your challenges
                </Link>
                <Link
                  to="/case-studies"
                  data-testid="hero-secondary-cta"
                  className="text-sm text-ink-700 hover:text-white px-3 py-3 inline-flex items-center gap-2 transition-colors"
                >
                  See client outcomes <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="card group relative">
                <div className="glow-ring" />
                <div className="overline">Live · Impact feed</div>
                <div className="mt-5 space-y-5 font-mono text-sm">
                  <div className="flex items-start gap-3">
                    <Activity className="w-4 h-4 text-volt mt-0.5" />
                    <div>
                      <div className="text-white">
                        Altura Foods · Fill rate 98.2%
                      </div>
                      <div className="text-ink-600 text-xs">
                        +9.2 pts vs. baseline
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-volt mt-0.5" />
                    <div>
                      <div className="text-white">
                        Northline Auto · OEE 79%
                      </div>
                      <div className="text-ink-600 text-xs">
                        +18 pts in 6 months
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe2 className="w-4 h-4 text-volt mt-0.5" />
                    <div>
                      <div className="text-white">
                        Verdera · Scope 1+2 −31%
                      </div>
                      <div className="text-ink-600 text-xs">
                        ESG rating BB → A
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Cpu className="w-4 h-4 text-volt mt-0.5" />
                    <div>
                      <div className="text-white">
                        Kairos · Forecast MAPE 18%
                      </div>
                      <div className="text-ink-600 text-xs">
                        from 43% at project start
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 text-[10px] tracking-widest uppercase text-ink-600">
                  Sampled from active engagements · Anonymized where required
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div
            data-testid="hero-stats"
            className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4"
          >
            {stats.map((s, i) => (
              <StatBlock
                key={s.label}
                value={s.value}
                label={s.label}
                sub={s.sub}
                testId={`stat-${i}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CLIENT LOGO TICKER */}
      <section className="border-y border-ink-300 bg-ink-50 py-8 overflow-hidden">
        <div className="flex gap-20 animate-marquee ticker-track">
          {[...clientLogos, ...clientLogos].map((l, i) => (
            <span
              key={i}
              className="text-ink-600 font-display font-semibold tracking-[0.3em] text-sm"
            >
              {l}
            </span>
          ))}
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <Section
        eyebrow="What we do"
        title="Six practices. One operating system for ops."
        sub="Pick a single lever or plug in the whole system. Either way, impact is measured in basis points, not buzzwords."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon] || Network;
            return (
              <Link
                to={`/services#${s.id}`}
                key={s.id}
                data-testid={`service-card-${s.id}`}
                className="card-interactive group"
              >
                <div className="glow-ring" />
                <div className="flex items-start justify-between">
                  <Icon className="w-7 h-7 text-volt" />
                  <span className="font-mono text-xs text-ink-600">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-8 font-display text-2xl font-semibold tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-3 text-ink-700 text-sm leading-relaxed">
                  {s.problem}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm text-volt font-medium">
                  Read the playbook <ArrowUpRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* INDUSTRY STRIP */}
      <Section
        eyebrow="Industries we operate in"
        title="Engineered for the messy realities of operations."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {industries.map((ind) => (
            <Link
              to={`/industries#${ind.id}`}
              key={ind.id}
              data-testid={`industry-tile-${ind.id}`}
              className="card-interactive"
            >
              <div className="overline">{ind.label}</div>
              <div className="mt-6 font-display text-xl font-semibold leading-tight">
                {ind.headline}
              </div>
              <ul className="mt-6 space-y-2">
                {ind.bullets.slice(0, 2).map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-ink-700">
                    <span className="w-1.5 h-1.5 bg-volt mt-2 inline-block shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section eyebrow="Operators say" title="The word on the shop floor.">
        <div className="grid md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <div key={i} className="card" data-testid={`testimonial-${i}`}>
              <div className="text-2xl font-display leading-snug">"{t.quote}"</div>
              <div className="mt-6 text-ink-600 text-xs font-mono tracking-widest uppercase">
                — {t.who}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── EMPATHY / FREE CONSULTATION SECTION (NEW) ──────────────────────── */}
      <EmpathySection />

      {/* CTA */}
      <Section>
        <div className="card relative overflow-hidden">
          <div className="glow-ring" />
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="overline">90-day diagnostic</div>
              <h3 className="mt-3 font-display text-3xl md:text-4xl font-semibold tracking-tight">
                Find $1M of savings in your supply chain — in 14 days.
              </h3>
              <p className="mt-4 text-ink-700">
                We run a structured diagnostic across your P&L, inventory, and
                logistics network. You get a ranked savings map — yours to
                keep, whether or not we work together.
              </p>
            </div>
            <div className="flex md:justify-end">
              <Link
                to="/contact"
                data-testid="home-bottom-cta"
                className="btn-primary text-base"
              >
                Start the diagnostic <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}