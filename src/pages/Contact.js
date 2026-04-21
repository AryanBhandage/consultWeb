import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Section, Pill } from "../components/UI";
import { CheckCircle2, Loader2, Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import { brand, services } from "../lib/content";

export default function Contact() {
  const location = useLocation();

  // ✅ Derive service title directly from the services array using s.id
  // This is the single source of truth and will never go out of sync.
  const getServiceFromURL = () => {
    const params = new URLSearchParams(location.search);
    const serviceId = params.get("service");
    if (!serviceId) return "General Inquiry";
    const matched = services.find((s) => s.id === serviceId);
    return matched ? matched.title : "General Inquiry";
  };

  // 🧠 Form state (UPDATED)
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: getServiceFromURL(),
    problem: ""
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(null);

  const upd = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  // 🔥 THIS FIXES YOUR BUG
  useEffect(() => {
    setForm((f) => ({
      ...f,
      service: getServiceFromURL()
    }));
  }, [location.search]);

  const submit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      const booking = {
        id: "LGV-" + Math.random().toString(36).slice(2, 10).toUpperCase(),
        ...form,
        submitted_at: new Date().toISOString()
      };

      setSubmitted(booking);

      toast.success("Booking received. We will be in touch within 1 business day.");

      setForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        service: getServiceFromURL(),
        problem: ""
      });

      setSubmitting(false);
    }, 800);
  };

  return (
    <div data-testid="page-contact">
      <section className="relative">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="section relative pt-16 pb-12">
          <Pill>Book a consultation</Pill>

          {/* 🔥 Dynamic heading */}
          <h1 className="mt-6 font-display text-5xl md:text-6xl font-bold tracking-tighter leading-[1] max-w-4xl">
            30 minutes.{" "}
            <span className="text-volt">
              {form.service === "General Inquiry"
                ? "One honest answer"
                : `Focus on ${form.service}`}
            </span>.
          </h1>

          <p className="mt-6 max-w-3xl text-ink-700 text-lg">
            Tell us where it hurts. A partner will call you within one business day.
          </p>
        </div>
      </section>

      <section className="section pb-24">
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <form onSubmit={submit} className="card">
              <div className="grid md:grid-cols-2 gap-6">

                <div>
                  <label className="label">Your name</label>
                  <input required value={form.name} onChange={(e) => upd("name", e.target.value)} placeholder="Jane Doe" className="input-field" />
                </div>

                <div>
                  <label className="label">Company</label>
                  <input required value={form.company} onChange={(e) => upd("company", e.target.value)} placeholder="Acme Industries" className="input-field" />
                </div>

                <div>
                  <label className="label">Work email</label>
                  <input required type="email" value={form.email} onChange={(e) => upd("email", e.target.value)} placeholder="jane@acme.com" className="input-field" />
                </div>

                <div>
                  <label className="label">Phone (optional)</label>
                  <input value={form.phone} onChange={(e) => upd("phone", e.target.value)} placeholder="+91 98xxxxxxxx" className="input-field" />
                </div>

                {/* 🔥 FIXED DROPDOWN */}
                <div className="md:col-span-2">
                  <label className="label">Area of interest</label>
                  <select
                    value={form.service}
                    onChange={(e) => upd("service", e.target.value)}
                    className="input-field appearance-none"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="label">Tell us the problem</label>
                  <textarea
                    required
                    minLength={10}
                    rows={5}
                    value={form.problem}
                    onChange={(e) => upd("problem", e.target.value)}
                    placeholder="Where does it hurt? Cost, service, inventory, ESG? Be specific."
                    className="input-field resize-none"
                  />
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
                <div className="text-xs font-mono uppercase tracking-widest text-ink-600">
                  We reply within one business day - NDA available on request
                </div>

                <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-60">
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Submitting
                    </>
                  ) : (
                    <>Request consultation</>
                  )}
                </button>
              </div>

              {submitted && (
                <div className="mt-8 border border-volt/50 bg-volt/10 p-5 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-volt mt-0.5 shrink-0" />
                  <div>
                    <div className="text-white font-semibold">
                      Booking {submitted.id} received
                    </div>
                    <div className="text-ink-700 text-sm mt-1">
                      Thanks {submitted.name.split(" ")[0]} - a partner will reach out at{" "}
                      <span className="text-white">{submitted.email}</span> within 24 hours.
                    </div>
                    <div className="text-ink-600 text-xs font-mono mt-2 uppercase tracking-widest">
                      Area: {submitted.service}
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* RIGHT SIDE (unchanged) */}
          <aside className="lg:col-span-4 space-y-4">
            <div className="card">
              <div className="overline">Direct</div>
              <div className="mt-5 space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-volt" />
                  <span>{brand.contact.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-volt" />
                  <span>{brand.contact.phone}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-volt mt-0.5" />
                  <span>{brand.locations.join(" - ")}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}