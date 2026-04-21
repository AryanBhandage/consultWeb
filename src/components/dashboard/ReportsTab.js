import React from "react";
import { FileText, Download } from "lucide-react";

export default function ReportsTab() {
  const reports = [
    { name: "Q3 Executive Summary", date: "Oct 1, 2026", type: "PDF", size: "2.4 MB" },
    { name: "YTD Savings Analysis", date: "Oct 5, 2026", type: "XLSX", size: "1.1 MB" },
    { name: "ESG Compliance Report", date: "Sep 28, 2026", type: "PDF", size: "4.8 MB" },
    { name: "Network Optimization Model", date: "Sep 15, 2026", type: "CSV", size: "850 KB" }
  ];
  const handleDownload = (e, report) => {
    e.stopPropagation(); // Prevent any parent clicks
    const content = `This is a generated placeholder report for: ${report.name}\nDate: ${report.date}\nFormat: ${report.type}\n\n[Dummy Content for Demonstration]`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = `${report.name.toLowerCase().replace(/\s+/g, "_")}.${report.type.toLowerCase()}`;
    document.body.appendChild(a);
    a.click();
    
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-slideUp">
      <div className="card">
        <div className="overline mb-6">Generated Reports</div>
        <div className="divide-y divide-ink-300">
          {reports.map((r, i) => (
            <div 
              key={i} 
              className="flex items-center justify-between py-4 group hover:bg-ink-200/50 -mx-5 px-5 md:-mx-8 md:px-8 transition-colors cursor-pointer"
              onClick={(e) => handleDownload(e, r)}
            >
               <div className="flex items-start gap-4">
                 <div className="w-10 h-10 bg-ink-300 flex items-center justify-center shrink-0 mt-0.5">
                   <FileText className="w-5 h-5 text-ink-600 group-hover:text-volt transition-colors" />
                 </div>
                 <div>
                   <div className="text-white font-medium text-sm">{r.name}</div>
                   <div className="text-ink-600 font-mono text-xs mt-1">{r.date} · {r.size}</div>
                 </div>
               </div>
               <button 
                 className="btn-ghost px-4 py-2 text-xs hidden sm:inline-flex opacity-0 group-hover:opacity-100 transition-opacity"
                 onClick={(e) => handleDownload(e, r)}
               >
                 Download {r.type}
               </button>
               <button 
                 className="sm:hidden text-volt"
                 onClick={(e) => handleDownload(e, r)}
               >
                 <Download className="w-4 h-4" />
               </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
