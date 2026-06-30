import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, Phone, Globe, User } from "lucide-react";
import { heroSlides } from "../data/carouselData";

export default function SlantedHeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play logic
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handleNext = () => {
    setIsAutoPlaying(false); // Stop autoplay when user manually interacts
    setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const currentSlide = heroSlides[currentIndex];

  return (
    <div className="relative w-full h-[600px] md:h-[800px] lg:h-screen bg-black overflow-hidden font-sans text-white">
      
      {/* Right Side Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.image}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img 
            src={currentSlide.image} 
            alt={currentSlide.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>



      {/* Left Slanted Panel */}
      <div 
        className="absolute top-0 left-0 bottom-0 w-[95%] md:w-[75%] lg:w-[65%] bg-[#0d0d0d] z-10 flex flex-col justify-between py-8 md:py-12 px-12 md:px-20 lg:px-28"
        style={{ clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)" }}
      >


        {/* Center Content with Animation */}
        <div className="max-w-lg mt-10 md:mt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white mb-6">
                {currentSlide.title}
              </h1>
              <div className="h-1.5 w-24 bg-white mb-6"></div>
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
                {currentSlide.subtitle}
              </p>
              
              <button className="text-white font-bold tracking-[0.15em] text-sm uppercase hover:text-gray-300 transition-colors">
                JOIN US TO EXPLORE
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Footer Info */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-white" />
            <span>exposition.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-white" />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-white" />
            <span>20 Fieldstone Dr, Roswell, GA</span>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute inset-y-0 left-4 z-20 flex items-center">
        <button 
          onClick={handlePrev}
          className="w-10 h-10 md:w-12 md:h-12 bg-black hover:bg-gray-900 rounded-md flex items-center justify-center text-white transition-colors shadow-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>
      
      <div className="absolute inset-y-0 right-4 z-20 flex items-center">
        <button 
          onClick={handleNext}
          className="w-10 h-10 md:w-12 md:h-12 bg-black hover:bg-gray-900 rounded-md flex items-center justify-center text-white transition-colors shadow-lg"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

    </div>
  );
}
