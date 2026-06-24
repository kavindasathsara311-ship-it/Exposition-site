import React, { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSlider from "./components/HeroSlider";
import Timeline from "./components/Timeline";
import EventCarousel from "./components/EventCarousel";
import KeynoteSpeakers from "./components/KeynoteSpeakers";
import InterviewHighlights from "./components/InterviewHighlights";
import WantToBeFeaturied from "./components/WantToBeFeaturied";
import CommunityVoices from "./components/CommunityVoices";
import Partners from "./components/Partners";
import OCTeamStack from "./components/OCTeamStack";
import DeckGallery from "./components/DeckGallery";
import ContactModal from "./components/ContactModal";
import Footer from "./components/Footer";
import GlobalCanvasBackground from "./components/GlobalCanvasBackground";

export default function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const openModal = () => setIsContactModalOpen(true);
  const closeModal = () => setIsContactModalOpen(false);

  return (
    <>
      {/* Background layer stays completely fixed behind the UI flow */}
      <GlobalCanvasBackground />

      {/* Home Hero Screen Layout Section */}
      <section className="homePage" id="home">
        <HeroSlider />
        <Navbar />
      </section>

      {/* Main Feature Sections Grid Flow */}
      <Timeline />
      
      <EventCarousel />
      
      <KeynoteSpeakers />
      
      <InterviewHighlights />
      
      <WantToBeFeaturied type="featured" onOpenModal={openModal} />
      
      <CommunityVoices />
      
      <Partners />
      
      <OCTeamStack />
      
      <WantToBeFeaturied type="partner" onOpenModal={openModal} />
      
      <DeckGallery />

      <Footer />

      {/* Overlays / Portals */}
      <ContactModal isOpen={isContactModalOpen} onClose={closeModal} />
    </>
  );
}