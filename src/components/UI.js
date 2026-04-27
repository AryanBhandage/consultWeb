import React from "react";
import { motion } from "framer-motion";

export const Section = ({ id, eyebrow, title, sub, children, className = "" }) => (
  <motion.section
    id={id}
    className={"section py-20 md:py-28 " + className}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    {(eyebrow || title) && (
      <div className="max-w-3xl mb-12">
        {eyebrow && <div className="overline mb-3">{eyebrow}</div>}
        {title && <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight">{title}</h2>}
        {sub && <p className="mt-4 text-ink-700 text-base md:text-lg">{sub}</p>}
      </div>
    )}
    {children}
  </motion.section>
);

export const StatBlock = ({ value, label, sub, testId }) => (
  <motion.div
    data-testid={testId}
    className="border-l border-ink-300 pl-4 md:pl-6 py-2 min-w-0"
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5 }}
  >
    <div className="kpi text-3xl sm:text-4xl md:text-5xl truncate">{value}</div>
    <div className="mt-2 text-white text-xs sm:text-sm font-medium truncate">{label}</div>
    {sub && <div className="text-ink-600 text-[10px] sm:text-xs mt-1 truncate">{sub}</div>}
  </motion.div>
);

export const Pill = ({ children }) => (
  <span className="inline-flex items-center gap-2 border border-ink-300 px-3 py-1 text-xs font-mono tracking-widest uppercase text-ink-700">
    <span className="w-1.5 h-1.5 bg-volt inline-block" />
    {children}
  </span>
);
