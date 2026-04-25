import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Industries from "./pages/Industries";
import CaseStudies from "./pages/CaseStudies";
import Insights from "./pages/Insights";
import Contact from "./pages/Contact";
import Calculators from "./pages/Calculators";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import InteractiveSurvey from "./pages/InteractiveSurvey";
import { Toaster } from "sonner";

function Layout() {
  const { pathname } = useLocation();
  const isDashboard = pathname.startsWith("/dashboard");
  const isSurvey = pathname.startsWith("/survey");
  const isFullScreen = isDashboard || isSurvey;
  
  return (
    <div className="min-h-screen bg-ink-0 text-white">
      <ScrollToTop />
      {!isFullScreen && <Navbar />}
      <main className={isFullScreen ? "" : "pt-16"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/survey" element={<InteractiveSurvey />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isFullScreen && <Footer />}
      <Toaster theme="dark" position="bottom-right"
        toastOptions={{ style: { background: "#121214", border: "1px solid #27272A", color: "#fff", borderRadius: 0 } }} />
    </div>
  );
}

export default function App() {
  return <Layout />;
}
