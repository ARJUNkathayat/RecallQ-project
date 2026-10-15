import React from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import TrustLogos from "@/components/landing/TrustLogos";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import ImpactSection from "@/components/landing/ImpactSection";
import MetricsBanner from "@/components/landing/MetricsBanner";
import Testimonials from "@/components/landing/Testimonials";
import CtaBanner from "@/components/landing/CtaBanner";
import Faq from "@/components/landing/Faq";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-indigo-500 selection:text-white font-sans antialiased">
      {/* Floating Island Navigation */}
      <Navbar />

      {/* Hero with Interactive Mock Dashboard */}
      <Hero />

      {/* Partner Logos */}
      <TrustLogos />

      {/* 4 Core Features (Double-Bezel) */}
      <Features />

      {/* 5-Step Visual Loop */}
      <HowItWorks />

      {/* Real Impact: Split Dark Navy Dashboard & Checkpoints */}
      <ImpactSection />

      {/* Numerical Metrics Banner */}
      <MetricsBanner />

      {/* Testimonials */}
      <Testimonials />

      {/* Luxury Dark CTA Banner */}
      <CtaBanner />

      {/* FAQ Accordion */}
      <Faq />

      {/* Footer */}
      <Footer />
    </main>
  );
}
