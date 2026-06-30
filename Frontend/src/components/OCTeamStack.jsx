import React, { useState, useEffect, useRef, useCallback } from "react";
import { teamMembers } from "../data/teamData";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function OCTeamStack() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const sectionRef = useRef(null);
  useScrollAnimation(sectionRef, "animate-in");

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % teamMembers.length);
  }, []);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  }, []);

  // Autoplay interval
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(next, 2000);
    return () => clearInterval(timer);
  }, [isPlaying, next]);

  const activeCard = teamMembers[activeIndex];

  return (
    <section ref={sectionRef} className="py-24 animate-on-scroll fade-up overflow-hidden" id="Oc-Team">
      <div className="flex flex-col items-center max-w-6xl mx-auto px-4">
        {/* Fanned Out Cards Container */}
        <div
          className="relative w-full h-[450px] flex items-center justify-center mb-12"
          id="teamStack"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          {teamMembers.map((card, index) => {
            // Calculate relative offset for the fan effect
            let offset = (index - activeIndex) % teamMembers.length;
            if (offset > Math.floor(teamMembers.length / 2)) offset -= teamMembers.length;
            if (offset < -Math.floor(teamMembers.length / 2)) offset += teamMembers.length;

            const isActive = offset === 0;
            const zIndex = 50 - Math.abs(offset);
            const scale = 1 - Math.abs(offset) * 0.15;
            const translateY = Math.abs(offset) * 30; // Push down the side cards
            const translateX = offset * 160; // Spread out left and right
            const rotateZ = offset * 10; // Tilt the side cards

            return (
              <div
                key={card.index}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[400px] rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
                style={{
                  zIndex,
                  transform: `translate(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px)) scale(${scale}) rotate(${rotateZ}deg)`,
                  opacity: Math.abs(offset) > 2 ? 0 : 1, // Only show 5 cards max (active + 2 left + 2 right)
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                <div className="absolute inset-0 bg-gray-900 flex items-center justify-center text-4xl font-bold text-gray-700">
                  {card.fallback}
                </div>
                <img
                  src={card.image}
                  alt={card.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* Member Details & Controls Centered Below */}
        {activeCard && (
          <div className="flex flex-col items-center text-center transition-all duration-300 w-full max-w-md">
            <div className="font-mono text-gray-500 mb-2 tracking-widest text-sm">
              {activeCard.index}
            </div>
            <h2 className="text-4xl font-bold text-white mb-2">
              {activeCard.name}
            </h2>
            <p className="text-yellow-500 font-medium text-lg mb-6 tracking-wide">
              {activeCard.role}
            </p>

            <div className="flex items-center gap-4 mb-8">
              <a href={activeCard.email} className="p-3 rounded-full bg-gray-900/50 border border-gray-800 hover:border-yellow-500 hover:text-yellow-500 text-gray-400 transition-all">
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M22 6l-10 7L2 6" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </a>
              <a href={activeCard.phone} className="p-3 rounded-full bg-gray-900/50 border border-gray-800 hover:border-yellow-500 hover:text-yellow-500 text-gray-400 transition-all">
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </a>
              <a href={activeCard.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-gray-900/50 border border-gray-800 hover:border-yellow-500 hover:text-yellow-500 text-gray-400 transition-all">
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" fill="none" stroke="currentColor" strokeWidth="2" />
                  <rect x="2" y="9" width="4" height="12" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="4" cy="4" r="2" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </a>
            </div>

            <div className="flex items-center gap-6">
              <button className="p-4 rounded-full bg-transparent border border-gray-600 text-white hover:bg-white hover:text-black transition-all" onClick={prev} aria-label="Previous">
                <svg viewBox="0 0 24 24" className="w-6 h-6">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </button>
              <button className="p-4 rounded-full bg-transparent border border-gray-600 text-white hover:bg-white hover:text-black transition-all" onClick={next} aria-label="Next">
                <svg viewBox="0 0 24 24" className="w-6 h-6">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
