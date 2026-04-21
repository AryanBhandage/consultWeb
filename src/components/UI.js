import React from "react";

export const Section = ({ id, eyebrow, title, sub, children, className = "" }) => (
  <section id={id} className={"section py-20 md:py-28 " + className}>
    {(eyebrow || title) && (
      <div className="max-w-3xl mb-12">
        {eyebrow && <div className="overline mb-3">{eyebrow}</div>}
        {title && <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight">{title}</h2>}
        {sub && <p className="mt-4 text-ink-700 text-base md:text-lg">{sub}</p>}
      </div>
    )}
    {children}
  </section>
);

export const StatBlock = ({ value, label, sub, testId }) => (
  <div data-testid={testId} className="border-l border-ink-300 pl-4 md:pl-6 py-2 min-w-0">
    <div className="kpi text-3xl sm:text-4xl md:text-5xl truncate">{value}</div>
    <div className="mt-2 text-white text-xs sm:text-sm font-medium truncate">{label}</div>
    {sub && <div className="text-ink-600 text-[10px] sm:text-xs mt-1 truncate">{sub}</div>}
  </div>
);

export const Pill = ({ children }) => (
  <span className="inline-flex items-center gap-2 border border-ink-300 px-3 py-1 text-xs font-mono tracking-widest uppercase text-ink-700">
    <span className="w-1.5 h-1.5 bg-volt inline-block" />
    {children}
  </span>
);
