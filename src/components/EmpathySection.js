import React, { useState, useEffect, useRef } from "react";
import {
  ArrowUpRight,
  MessageSquare,
  Users,
  BarChart3,
  CheckCircle2,
  ExternalLink,
  ClipboardCheck,
  TrendingUp,
  Shield,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const surveyStats = [
  { value: "50+", label: "Businesses surveyed", icon: Users },
  { value: "6", label: "Industry verticals", icon: BarChart3 },
  { value: "3 min", label: "To complete", icon: ClipboardCheck },
  { value: "100%", label: "Anonymous & free", icon: Shield },
];

const benefits = [
  {
    icon: TrendingUp,
    title: "Shape our roadmap",
    desc: "Your responses directly inform which consulting tools and frameworks we build next.",
  },
  {
    icon: MessageSquare,
    title: "Get a personalised insight",
    desc: "Top contributors receive a free 15-minute ops diagnostic summary — no pitch, no strings.",
  },
  {
    icon: CheckCircle2,
    title: "Benchmark your operations",
    desc: "See how your supply chain challenges compare to 50+ peer businesses in your sector.",
  },
];

// ── Animated counter hook ─────────────────────────────────────────────────────
function useCountUp(target, duration = 1200, inView = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const isNumeric = /^\d+$/.test(target);
    if (!isNumeric) { setCount(target); return; }
    const end = parseInt(target, 10);
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
}

function AnimatedStat({ value, label, icon: Icon, inView }) {
  // Extract numeric part and suffix
  const numeric = value.replace(/[^0-9]/g, "");
  const suffix = value.replace(/[0-9]/g, "");
  const counted = useCountUp(numeric, 1200, inView);

  return (
    <div className="flex flex-col items-center text-center px-4 py-6 border-r border-ink-300 last:border-r-0">
      <Icon className="w-5 h-5 text-volt mb-3" />
      <div className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight">
        {numeric ? `${counted}${suffix}` : value}
      </div>
      <div className="mt-1 text-ink-600 text-xs font-mono uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function EmpathySection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  // Trigger counter animation when section scrolls into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const navigate = useNavigate();
  const openForm = () => navigate("/survey");

  return (
    <>
      {/* ── EMPATHY SECTION ─────────────────────────────────────────────── */}
      <section
        ref={sectionRef}
        id="empathy"
        data-testid="empathy-section"
        className="relative overflow-hidden border-t border-ink-300"
        style={{ background: "linear-gradient(160deg, #0A0A0C 0%, #050505 60%, #0d120a 100%)" }}
      >
        {/* Subtle volt glow behind the card */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 80%, rgba(204,255,0,0.07) 0%, transparent 70%)",
          }}
        />

        <div className="section relative py-20 md:py-28">

          {/* ── Eyebrow ──────────────────────────────────────────────────── */}
          <div className="max-w-3xl mb-12">
            <div className="overline mb-3">Research · Empathy · Community</div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight">
              Help us understand{" "}
              <span className="text-volt">your business needs.</span>
            </h2>
            <p className="mt-4 text-ink-700 text-base md:text-lg max-w-2xl">
              We are building consulting tools rooted in real operator pain — not
              textbook assumptions. Take 3 minutes to share your supply chain
              challenges and help shape what we build next.
            </p>
          </div>

          {/* ── Stats Bar ────────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 bg-ink-100 border border-ink-300 mb-10">
            {surveyStats.map((s) => (
              <AnimatedStat key={s.label} {...s} inView={inView} />
            ))}
          </div>

          {/* ── Two-column layout ─────────────────────────────────────────── */}
          <div className="grid lg:grid-cols-5 gap-6">

            {/* ── Main CTA Card ─────────────────────────────────────────── */}
            <div className="lg:col-span-3 card group relative flex flex-col justify-between gap-8">
              <div className="glow-ring" />

              <div>
                <div className="inline-flex items-center gap-2 bg-volt/10 border border-volt/30 px-3 py-1 text-volt text-xs font-mono uppercase tracking-widest mb-6">
                  <span className="w-1.5 h-1.5 bg-volt rounded-full animate-pulse inline-block" />
                  Live survey · Open now
                </div>

                <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">
                  Tell us your challenges.
                </h3>
                <p className="mt-3 text-ink-700 text-sm md:text-base leading-relaxed">
                  Whether you manage a 10-person startup or a global logistics
                  network, your experience is valuable. Our 14-question survey
                  covers operations pain points, current tools, and what you
                  wish a consulting partner actually did.
                </p>

                <ul className="mt-6 space-y-2">
                  {[
                    "No email required · Fully anonymous",
                    "Results shared back with all participants",
                    "Top 10 respondents get a free ops snapshot",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm text-ink-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-volt shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={openForm}
                  data-testid="empathy-primary-cta"
                  className="btn-primary text-sm"
                >
                  Take the 3-min survey{" "}
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setModalOpen(true)}
                  className="btn-ghost text-sm"
                >
                  Preview questions <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ── Benefit Cards ─────────────────────────────────────────── */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {benefits.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="card-interactive flex items-start gap-4 !p-5 group"
                >
                  <div className="glow-ring" />
                  <div className="w-9 h-9 bg-volt/10 border border-volt/20 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-volt" />
                  </div>
                  <div>
                    <div className="font-display font-semibold text-sm text-white">
                      {title}
                    </div>
                    <p className="mt-1 text-ink-700 text-xs leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Bottom trust strip ───────────────────────────────────────── */}
          <div className="mt-10 flex flex-wrap items-center gap-6 text-xs font-mono text-ink-600 uppercase tracking-widest border-t border-ink-300 pt-6">
            <span>No spam · Ever</span>
            <span className="w-px h-3 bg-ink-400" />
            <span>Data used for research only</span>
            <span className="w-px h-3 bg-ink-400" />
            <span>Results published Q3 2026</span>
          </div>
        </div>
      </section>

      {/* ── QUESTION PREVIEW MODAL ───────────────────────────────────────── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Survey question preview"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-ink-0/80 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          />

          {/* Panel */}
          <div
            className="relative bg-ink-100 border border-ink-300 w-full max-w-lg max-h-[85vh] overflow-y-auto"
            style={{ scrollbarWidth: "thin" }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-ink-100 border-b border-ink-300 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <div className="overline text-[10px]">Survey preview</div>
                <div className="font-display font-semibold text-base mt-0.5">
                  Supply Chain Empathy Survey
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 border border-ink-400 flex items-center justify-center text-ink-700 hover:border-volt hover:text-volt transition-colors text-lg leading-none"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* Questions */}
            <div className="px-6 py-5 space-y-5">
              {SURVEY_PREVIEW.map((q, i) => (
                <div key={i} className="border-b border-ink-300 pb-5 last:border-b-0 last:pb-0">
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-xs text-volt mt-0.5 shrink-0">
                      Q{String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="text-sm font-medium text-white leading-snug">
                        {q.question}
                      </div>
                      {q.type && (
                        <div className="mt-0.5 text-xs text-ink-600 font-mono uppercase tracking-wider">
                          {q.type}
                        </div>
                      )}
                      {q.options && (
                        <ul className="mt-2 space-y-1">
                          {q.options.map((opt) => (
                            <li
                              key={opt}
                              className="flex items-center gap-2 text-xs text-ink-700"
                            >
                              <span className="w-3 h-3 border border-ink-400 inline-block shrink-0" />
                              {opt}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-ink-100 border-t border-ink-300 px-6 py-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={openForm}
                className="btn-primary text-sm flex-1 justify-center"
              >
                Open full survey <ExternalLink className="w-4 h-4" />
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="btn-ghost text-sm flex-1 justify-center"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ── Survey question previews ────────────────────────────────────────────────
const SURVEY_PREVIEW = [
  {
    question: "What is your role?",
    type: "Multiple choice",
    options: ["Business Owner", "Logistics Manager", "Supplier / Manufacturer", "Student", "Startup Founder", "Other"],
  },
  {
    question: "What major problems do you face in supply chain or operations?",
    type: "Checkboxes",
    options: ["Difficulty finding reliable suppliers", "High logistics cost", "Delivery delays", "Poor communication", "Inventory mismanagement", "Lack of insights", "Other"],
  },
  {
    question: "Do you currently use any tools or consultants for supply chain management?",
    type: "Multiple choice",
    options: ["Yes", "No"],
  },
  {
    question: "What stops you from hiring consultants or using advanced tools?",
    type: "Checkboxes",
    options: ["High cost", "Lack of trust", "Lack of awareness", "Difficult to use", "Not sure about ROI", "Other"],
  },
  {
    question: "What features would you like in a consulting platform?",
    type: "Checkboxes",
    options: ["Supplier recommendations", "Cost optimization insights", "Demand forecasting", "Logistics tracking", "Dashboard with analytics", "Other"],
  },
  {
    question: "Would you be willing to pay for a platform that improves your supply chain efficiency?",
    type: "Multiple choice",
    options: ["Yes", "No", "Maybe"],
  },
  {
    question: "What would make a consulting platform truly useful for you?",
    type: "Paragraph",
  },
];
