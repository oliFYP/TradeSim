import React from "react";
import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/Hero/HeroSection";
import FeaturesSection from "../components/features/FeaturesSection";
import CTASection from "../components/cta/CTASection";
import Footer from "../components/footer/Footer";

const PresentationPage = () => {
  return (
    <div className="w-screen h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default PresentationPage;
