import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Section, Pill } from "../components/UI";
import { industries } from "../lib/content";
import { ArrowUpRight, Factory, ShoppingBag, Store, Rocket } from "lucide-react";

const iconByInd = {
  manufacturing: Factory,
  fmcg: ShoppingBag,
  retail: Store,
  startups: Rocket,
};

export default function Industries() {
  const [active, setActive] = useState(industries[0].id);
  const current = industries.find((i) => i.id === active) || industries[0];
  const ActiveIcon = iconByInd[current.id];

  return (
    <div data-testid="page-industries">
      <section className="relative">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="section relative pt-16 pb-12">
          <Pill>Industry solutions</Pill>
          <h1 className="mt-6 font-display text-5xl md:text-6xl font-bold tracking-tighter leading-[1] max-w-4xl">
            The playbook is <span className="text-volt">sharpened</span> for your sector.
          </h1>
          <p className="mt-6 max-w-3xl text-ink-700 text-lg">
            Sector-specific KPIs, data models and operating rhythms. We don't
            retrofit a template; we bring a pattern library that is already
            halfway to your answer.
          </p>
        </div>
      </section>

      <section className="section pb-24">
        <div className="grid lg:grid-cols-12 gap-4">
          <div className="lg:col-span-4 grid grid-cols-2 lg:flex lg:flex-col gap-2">
            {industries.map((ind) => {
              const Icon = iconByInd[ind.id];
              const isActive = active === ind.id;
              return (
                <button
                  key={ind.id}
                  id={ind.id}
                  onClick={() => setActive(ind.id)}
                  data-testid={`industry-tab-${ind.id}`}
                  className={`card-interactive flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 ${
                    isActive ? "border-volt" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-5 h-5 ${
                        isActive ? "text-volt" : "text-ink-700"
                      }`}
                    />
                    <span
                      className={`font-display text-lg font-semibold ${
                        isActive ? "text-white" : "text-ink-700"
                      }`}
                    >
                      {ind.label}
                    </span>
                  </div>
                  <ArrowUpRight
                    className={`w-4 h-4 ${
                      isActive ? "text-volt" : "text-ink-600"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-8">
            <div className="card relative overflow-hidden" data-testid="industry-detail">
              <div className="noise" />
              <div className="flex items-center gap-3">
                {ActiveIcon && <ActiveIcon className="w-6 h-6 text-volt" />}
                <div className="overline">{current.label}</div>
              </div>
              <h2 className="mt-6 font-display text-3xl md:text-4xl font-semibold tracking-tight">
                {current.headline}
              </h2>
              <p className="mt-4 text-ink-700 text-base md:text-lg max-w-2xl">
                {current.copy}
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {current.bullets.map((b) => (
                  <div
                    key={b}
                    className="border border-ink-300 p-4 sm:p-5 bg-ink-50"
                  >
                    <div className="kpi text-xl md:text-2xl">{b.split(" ")[0]}</div>
                    <div className="text-ink-700 text-sm mt-2">
                      {b.split(" ").slice(1).join(" ")}
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/contact"
                data-testid={`industry-cta-${current.id}`}
                className="btn-primary mt-10"
              >
                Get a {current.label.toLowerCase()} diagnostic <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
