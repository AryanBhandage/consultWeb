import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { brand } from "../lib/content";

export default function Footer() {
  return (
    <footer data-testid="site-footer" className="border-t border-ink-300 bg-ink-0 mt-32">
      <div className="section py-16 grid md:grid-cols-5 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-volt inline-block" />
            <span className="font-display font-bold text-xl">{brand.name}</span>
          </div>
          <p className="mt-4 text-ink-700 text-sm max-w-sm">{brand.tagline}</p>
          <div className="mt-6 text-ink-600 text-xs font-mono tracking-widest uppercase">
            {brand.locations.join(" - ")}
          </div>
        </div>
        <div>
          <div className="overline mb-4">Company</div>
          <ul className="space-y-2 text-sm text-ink-700">
            <li><Link className="hover:text-white" to="/about">About</Link></li>
            <li><Link className="hover:text-white" to="/case-studies">Case Studies</Link></li>
            <li><Link className="hover:text-white" to="/insights">Insights</Link></li>
            <li><Link className="hover:text-white" to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="overline mb-4">Services</div>
          <ul className="space-y-2 text-sm text-ink-700">
            <li><Link className="hover:text-white" to="/services#supply-chain-optimization">Supply Chain</Link></li>
            <li><Link className="hover:text-white" to="/services#procurement-strategy">Procurement</Link></li>
            <li><Link className="hover:text-white" to="/services#inventory-management">Inventory</Link></li>
            <li><Link className="hover:text-white" to="/services#esg-consulting">ESG</Link></li>
          </ul>
        </div>
        <div>
          <div className="overline mb-4">Get in touch</div>
          <ul className="space-y-2 text-sm text-ink-700">
            <li>{brand.contact.email}</li>
            <li>{brand.contact.phone}</li>
          </ul>
          <Link to="/contact" data-testid="footer-cta" className="btn-primary text-sm mt-5">
            Book Consultation <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
      <div className="border-t border-ink-300">
        <div className="section py-6 flex flex-col md:flex-row gap-3 items-start md:items-center justify-between text-xs text-ink-600 font-mono uppercase tracking-widest">
          <span>2026 {brand.name} Advisory Pvt. Ltd.</span>
          <span>v1.0 - Built for operators</span>
        </div>
      </div>
    </footer>
  );
}
