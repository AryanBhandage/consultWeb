export const brand = {
  name: "Logiveda",
  tagline: "Operations intelligence for the next-decade supply chain.",
  mission: "Give every operator a control tower from raw material to last mile, backed by data, engineered for margin, tuned for ESG.",
  vision: "A world where no supply chain bleeds cost, carbon, or time to avoidable friction.",
  uvp: "We combine Six Sigma rigor, AI-driven analytics, and sustainability engineering to unlock measurable P&L impact in 90 days, not 9 months.",
  locations: ["Pune, IN"],
  contact: { email: "hello@logiveda.io", phone: "+91 80 4618 2200" },
};

export const stats = [
  { label: "Avg. cost reduction", value: "32%", sub: "across 40+ engagements" },
  { label: "Inventory unlocked", value: "$180M", sub: "working capital freed" },
  { label: "Carbon tons reduced", value: "42K+", sub: "scope 1 & 3 combined" },
  { label: "Projects delivered on-time", value: "98%", sub: "last 24 months" },
];

export const services = [
  {
    id: "supply-chain-optimization",
    title: "Supply Chain Optimization",
    icon: "network",
    problem: "Fragmented networks, blind spots between tiers, and reactive firefighting that erodes OTIF and cash.",
    solution: "End-to-end digital twin of your network, scenario planning, and S&OP redesign with real-time KPI instrumentation.",
    outcome: "18-35% landed cost reduction, OTIF lifted to 96%+, demand sensing cycle cut from weeks to hours.",
  },
  {
    id: "procurement-strategy",
    title: "Procurement Strategy",
    icon: "clipboard",
    problem: "Spend leakage, maverick buying, and a supplier base that has not been rationalized in years.",
    solution: "Category deep-dives, should-cost modeling, supplier consolidation, and a digitized source-to-pay playbook.",
    outcome: "12-22% direct and indirect savings, 40% fewer suppliers, and a contract compliance rate above 95%.",
  },
  {
    id: "inventory-management",
    title: "Inventory Management",
    icon: "boxes",
    problem: "Cash trapped in the wrong SKUs, stockouts in the movers, and safety stock set by gut feel.",
    solution: "Segmented inventory policies, multi-echelon optimization, and AI-driven replenishment with exception workflows.",
    outcome: "25-40% inventory reduction, service levels held at 98%+, obsolescence write-offs cut in half.",
  },
  {
    id: "logistics-distribution",
    title: "Logistics and Distribution",
    icon: "truck",
    problem: "Rising freight, suboptimal lanes, and warehouse footprints designed for yesterday volumes.",
    solution: "Network redesign, mode and lane optimization, 3PL RFP orchestration, and warehouse slotting and automation roadmap.",
    outcome: "15-28% logistics cost reduction, delivery lead time down 30%, CO2 per shipment down 20%.",
  },
  {
    id: "six-sigma",
    title: "Six Sigma and Process Excellence",
    icon: "gauge",
    problem: "Chronic defects, long cycle times, and improvement programs that lose steam after month three.",
    solution: "DMAIC-led transformation, digitized control charts, and a Green Belt in every team capability build.",
    outcome: "Sigma level lifted 1.5+ points, 30-50% cycle time reduction, and a self-sustaining improvement cadence.",
  },
  {
    id: "esg-consulting",
    title: "ESG and Sustainability",
    icon: "leaf",
    problem: "Scope 3 is a black box, regulators are circling, and procurement still buys on unit price alone.",
    solution: "Carbon baseline, science-based target setting, sustainable sourcing criteria, and investor-ready disclosures.",
    outcome: "20-40% emissions reduction roadmap, ESG score above industry peer median, audit-ready BRSR/CSRD reporting.",
  },
];

export const industries = [
  {
    id: "manufacturing",
    label: "Manufacturing",
    headline: "From plant floor to boardroom in one signal.",
    copy: "Discrete and process manufacturers use Logiveda to stabilize production, cut changeover waste, and unlock capacity without capex.",
    bullets: ["OEE uplift of 12-18 points", "Changeover time reduced by 35%", "Quality rejects down by 40%"],
  },
  {
    id: "fmcg",
    label: "FMCG",
    headline: "Win the shelf without losing margin.",
    copy: "We help consumer brands run leaner promo-to-shelf cycles, sharpen demand sensing, and convert distribution depth into cash.",
    bullets: ["Forecast accuracy lifted to 82%+", "Promo ROI improved by 2.4x", "Secondary freight cost down 18%"],
  },
  {
    id: "retail",
    label: "Retail",
    headline: "Every store, every SKU, priced and stocked right.",
    copy: "Omni-channel retailers deploy our allocation and replenishment engines to protect availability while releasing working capital.",
    bullets: ["Stockouts down 45%", "Inventory weeks-of-cover cut by 30%", "Markdown depth reduced by 22%"],
  },
  {
    id: "startups",
    label: "Startups",
    headline: "Scale operations without scaling chaos.",
    copy: "Series A to C ventures use Logiveda to design supply chains that survive 10x volume before the next fundraise.",
    bullets: ["90-day operating backbone", "Unit economics modeled per SKU", "Investor-grade ops dashboard"],
  },
];

export const caseStudies = [
  {
    id: "altura-foods",
    client: "Altura Foods",
    industry: "FMCG - Dairy",
    problem: "Fill rates were collapsing during peak season while inventory costs were climbing. Forecasting ran on a spreadsheet owned by one planner.",
    approach: "We deployed a segmented forecasting model, rebuilt the S&OP rhythm, and moved 38 SKUs to VMI with top retailers.",
    solution: "Multi-echelon inventory optimization connected to a real-time S&OP cockpit, with exception-based alerts to planners and sales.",
    results: [
      { k: "Fill rate", v: "89% to 98.2%" },
      { k: "Inventory", v: "-34%" },
      { k: "Forecast accuracy", v: "62% to 84%" },
      { k: "Working capital freed", v: "$22M" },
    ],
  },
  {
    id: "northline-auto",
    client: "Northline Auto Components",
    industry: "Manufacturing - Tier-1 Auto",
    problem: "OEE stagnated at 61%, rejection rates were rising, and a key OEM threatened to delist the plant from its preferred vendor list.",
    approach: "DMAIC on the top-3 loss lines, digitized andon and SPC, operator capability build, and changeover SMED across all CNC cells.",
    solution: "A plant-wide operations control tower with real-time OEE, quality SPC, and a Kaizen tracker. 42 projects shipped in 6 months.",
    results: [
      { k: "OEE", v: "61% to 79%" },
      { k: "Rejection rate", v: "-58%" },
      { k: "Changeover time", v: "-41%" },
      { k: "Delisting risk", v: "Eliminated" },
    ],
  },
  {
    id: "verdera-retail",
    client: "Verdera Retail",
    industry: "Retail - Home and Living",
    problem: "Ambitious 2030 net-zero commitment with no credible roadmap, and investor pressure after a downgraded ESG rating.",
    approach: "Scope 1/2/3 baseline, supplier engagement on top-80% emissions, packaging redesign, and a science-based target submission.",
    solution: "Sustainability control tower tied to procurement and logistics data, with supplier scorecards and audit-ready disclosures.",
    results: [
      { k: "Scope 1+2 emissions", v: "-31%" },
      { k: "Packaging waste", v: "-46%" },
      { k: "ESG rating", v: "BB to A" },
      { k: "Sustainable SKUs", v: "12% to 58%" },
    ],
  },
];

export const articles = [
  {
    id: "control-tower-2026",
    title: "The Control Tower Is Dead. Long Live the Decision Engine.",
    category: "Supply Chain Strategy",
    read: "7 min",
    date: "Jan 12, 2026",
    excerpt: "Visibility was the 2010s story. The 2020s are about autonomous recommendations that close the loop in minutes, not meetings.",
  },
  {
    id: "scope-3-truth",
    title: "Scope 3 Is Mostly Fiction. Here Is How to Make It Real.",
    category: "ESG",
    read: "9 min",
    date: "Dec 28, 2025",
    excerpt: "Most scope 3 numbers are industry averages dressed as data. A playbook for getting to supplier-specific, audit-grade emissions.",
  },
  {
    id: "inventory-policy-segmentation",
    title: "Stop Averaging Your SKUs: A Field Guide to Inventory Segmentation.",
    category: "Inventory",
    read: "6 min",
    date: "Dec 14, 2025",
    excerpt: "One policy cannot serve fast movers, long-tail, promo SKUs and spares. How to run 6 inventory policies without exploding complexity.",
  },
  {
    id: "procurement-should-cost",
    title: "Should-Cost Modeling Without a PhD.",
    category: "Procurement",
    read: "5 min",
    date: "Nov 30, 2025",
    excerpt: "A pragmatic 4-step framework to build should-cost models that move price negotiations, even when your team is small.",
  },
  {
    id: "ai-sop-reality",
    title: "AI-Assisted S&OP: What Actually Works in 2026.",
    category: "AI and Analytics",
    read: "8 min",
    date: "Nov 18, 2025",
    excerpt: "We ran 11 pilots. Here is where LLMs genuinely move the needle in S&OP and where they are still a very expensive chatbot.",
  },
];

export const testimonials = [
  {
    quote: "Logiveda compressed what we thought was an 18-month transformation into 90 days of impact. Board-level believers now.",
    who: "COO - Global FMCG",
  },
  {
    quote: "Their Six Sigma team did not just fix a plant. They left a culture of data-driven decisions behind.",
    who: "VP Manufacturing - Tier-1 Auto",
  },
  {
    quote: "For the first time, our ESG numbers can survive an auditor without panic.",
    who: "Chief Sustainability Officer - Retail",
  },
];

export const clientLogos = ["ALTURA", "NORTHLINE", "VERDERA", "KAIROS", "HELIX", "ORBIT", "MERIDIAN", "ATLAS", "VECTRA"];
