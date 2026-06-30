import React, { useState } from "react";
import Navbar from "./components/Navbar";

import Timeline from "./components/Timeline";
import KeynoteSpeakers from "./components/KeynoteSpeakers";
import InterviewHighlights from "./components/InterviewHighlights";
import WantToBeFeaturied from "./components/WantToBeFeaturied";
import CommunityVoices from "./components/CommunityVoices";
import Partners from "./components/Partners";
import OCTeamStack from "./components/OCTeamStack";
import MarketingHero from "./components/MarketingHero";
import DeckGallery from "./components/DeckGallery";
import ContactModal from "./components/ContactModal";
import Footer from "./components/Footer";
import { BackgroundPaths } from "./components/ui/background-paths";

export default function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const openModal = () => setIsContactModalOpen(true);
  const closeModal = () => setIsContactModalOpen(false);

  return (
    <>
      {/* Background layer stays completely fixed behind the UI flow */}
      <BackgroundPaths />

      {/* Home Hero Screen Layout Section */}
      <section className="homePage" id="home">
        <MarketingHero />
        <Navbar />
      </section>

      {/* Main Feature Sections Grid Flow - Centered & Reduced Spacing */}
      <main className="w-full max-w-[1200px] mx-auto px-6 space-y-16 lg:space-y-20 pb-20 pt-12 overflow-hidden">
        <Timeline />
        <KeynoteSpeakers />
        <InterviewHighlights />
        <WantToBeFeaturied type="featured" onOpenModal={openModal} />
        <CommunityVoices />
        <Partners />
        <OCTeamStack />
        <WantToBeFeaturied type="partner" onOpenModal={openModal} />
        <DeckGallery />
      </main>

      <Footer />

      {/* Overlays / Portals */}
      <ContactModal isOpen={isContactModalOpen} onClose={closeModal} />
    </>
  );
}