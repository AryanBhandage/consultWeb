import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/PageTransition";
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
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  const isSurvey = location.pathname.startsWith("/survey");
  const isFullScreen = isDashboard || isSurvey;
  
  return (
    <div className="min-h-screen bg-ink-0 text-white">
      <ScrollToTop />
      {!isFullScreen && <Navbar />}
      <main className={isFullScreen ? "" : "pt-16"}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
            <Route path="/industries" element={<PageTransition><Industries /></PageTransition>} />
            <Route path="/case-studies" element={<PageTransition><CaseStudies /></PageTransition>} />
            <Route path="/insights" element={<PageTransition><Insights /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="/calculators" element={<PageTransition><Calculators /></PageTransition>} />
            <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
            <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
            <Route path="/survey" element={<PageTransition><InteractiveSurvey /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </AnimatePresence>
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
