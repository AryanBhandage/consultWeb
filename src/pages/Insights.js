import React from "react";
import { Section, Pill } from "../components/UI";
import { articles } from "../lib/content";
import { ArrowUpRight, Clock } from "lucide-react";

export default function Insights() {
  const [feature, ...rest] = articles;
  return (
    <div data-testid="page-insights">
      <section className="relative">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="section relative pt-16 pb-12">
          <Pill>Insights</Pill>
          <h1 className="mt-6 font-display text-5xl md:text-6xl font-bold tracking-tighter leading-[1] max-w-4xl">
            Field notes from the <span className="text-volt">control tower</span>.
          </h1>
          <p className="mt-6 max-w-3xl text-ink-700 text-lg">
            Writing from the front lines of supply chain, procurement, and ESG.
            No generic takes — only what we've seen work (and fail) on the ground.
          </p>
        </div>
      </section>

      <Section>
        <article
          data-testid={`article-${feature.id}`}
          className="card relative overflow-hidden group grid md:grid-cols-12 gap-8 items-stretch"
        >
          <div className="glow-ring" />
          <div className="md:col-span-5 border-r border-ink-300 pr-6 flex flex-col justify-between">
            <div>
              <div className="overline">{feature.category}</div>
              <h2 className="mt-4 font-display text-3xl md:text-4xl font-semibold tracking-tight">
                {feature.title}
              </h2>
            </div>
            <div className="mt-8 flex items-center gap-4 text-xs text-ink-600 font-mono uppercase tracking-widest">
              <span>{feature.date}</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {feature.read}
              </span>
            </div>
          </div>
          <div className="md:col-span-7">
            <p className="text-ink-700 text-base md:text-lg leading-relaxed">
              {feature.excerpt}
            </p>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              data-testid={`read-${feature.id}`}
              className="inline-flex items-center gap-2 text-volt font-medium mt-8"
            >
              Read the full note <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </article>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
          {rest.map((a) => (
            <a
              key={a.id}
              href="#"
              onClick={(e) => e.preventDefault()}
              data-testid={`article-${a.id}`}
              className="card-interactive group block"
            >
              <div className="glow-ring" />
              <div className="overline">{a.category}</div>
              <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight">
                {a.title}
              </h3>
              <p className="mt-3 text-ink-700 text-sm leading-relaxed">
                {a.excerpt}
              </p>
              <div className="mt-8 flex items-center justify-between text-xs text-ink-600 font-mono uppercase tracking-widest">
                <span>{a.date}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {a.read}
                </span>
              </div>
            </a>
          ))}
        </div>
      </Section>
    </div>
  );
}
