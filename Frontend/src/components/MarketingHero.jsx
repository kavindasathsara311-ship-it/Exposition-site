import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "../data/carouselData";

export default function MarketingHero() {
  const baseCards = heroSlides.slice(0, 8); // Base 8 slides
  // Duplicate array multiple times to create a virtually infinite seamless loop
  const cards = Array(20).fill(baseCards).flat();

  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-play interval
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cards.length);
    }, 4000); // changes every 4 seconds
    return () => clearInterval(interval);
  }, [cards.length]);

  return (
    <div className="relative w-full min-h-screen bg-transparent flex items-center pt-24 pb-12 overflow-hidden font-sans">
      
      <div className="w-full max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

        {/* Left Column - Dynamic Text and CTA */}
        <div className="lg:col-span-5 flex flex-col z-10 pt-10 lg:pt-0 min-h-[350px] justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
                {cards[activeIndex].title}
              </h1>
              <p className="mt-6 text-gray-400 text-lg md:text-xl max-w-md leading-relaxed">
                {cards[activeIndex].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Action Buttons & Controls */}
          <div className="mt-10 flex flex-col items-start gap-6">
            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button className="bg-white hover:bg-gray-200 text-black font-semibold px-12 py-3.5 rounded-xl transition-colors whitespace-nowrap shadow-[0_0_20px_rgba(255,255,255,0.1)] min-w-[180px]">
                Get Started
              </button>
              <button className="bg-transparent hover:bg-white/10 text-white font-semibold px-12 py-3.5 rounded-xl border border-gray-600 transition-colors whitespace-nowrap min-w-[180px]">
                Explore
              </button>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length)}
                className="p-3 rounded-full bg-[#111] border border-[#D4AF37] hover:bg-[#222] hover:border-yellow-400 text-white transition-all shadow-[0_0_15px_rgba(212,175,55,0.15)]"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setActiveIndex((prev) => (prev + 1) % cards.length)}
                className="p-3 rounded-full bg-[#111] border border-[#D4AF37] hover:bg-[#222] hover:border-yellow-400 text-white transition-all shadow-[0_0_15px_rgba(212,175,55,0.15)]"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - State-Driven Carousel with Blurry Edges */}
        <div className="lg:col-span-7 w-full relative z-10 flex items-center mt-12 lg:mt-0">

          {/* Mask container to blur left and right edges */}
          <div
            className="w-full overflow-hidden py-16"
            style={{
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
              maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
            }}
          >
            <motion.div
              className="flex items-center"
              style={{ paddingLeft: '50%' }} // Center of the container
              animate={{ x: -(activeIndex * 200 + 220) }} // 160px inactive width + 40px gap = 200px step. 220px is half of active 440px width.
              transition={{ type: "spring", stiffness: 70, damping: 20, mass: 1 }}
            >
              {cards.map((card, index) => {
                const isActive = index === activeIndex;

                return (
                  <motion.div
                    key={index}
                    className="flex-shrink-0 cursor-pointer mx-[20px] rounded-2xl overflow-hidden flex items-center justify-center bg-transparent"
                    animate={{
                      width: isActive ? 440 : 160,
                      height: isActive ? 380 : 220,
                      opacity: isActive ? 1 : 0.3,
                      filter: isActive ? "blur(0px)" : "blur(3px)"
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    onClick={() => setActiveIndex(index)}
                  >
                    <div className="relative w-full h-full bg-transparent flex items-center justify-center">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover rounded-2xl shadow-2xl"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

        </div>

      </div>
    </div>
  );
}
