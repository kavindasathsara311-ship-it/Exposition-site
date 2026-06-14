import React, { useState, useEffect, useRef } from "react";
import { teamMembers } from "../data/teamData";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function OCTeamStack() {
  const [cards, setCards] = useState(teamMembers);
  const [isAnimating, setIsAnimating] = useState(false);
  const [exitCardId, setExitCardId] = useState(null);
  const [enterCardId, setEnterCardId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const sectionRef = useRef(null);
  useScrollAnimation(sectionRef, "animate-in");

  // Autoplay interval
  useEffect(() => {
    if (!isPlaying || isAnimating) return;
    const timer = setInterval(() => {
      moveNext();
    }, 2000);
    return () => clearInterval(timer);
  }, [isPlaying, isAnimating, cards]);

  const moveNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const len = cards.length;
    if (len === 0) return;
    const topCard = cards[len - 1];

    setExitCardId(topCard.index);

    setTimeout(() => {
      setCards((prev) => {
        const copy = [...prev];
        const popped = copy.pop();
        copy.unshift(popped);
        return copy;
      });
      setExitCardId(null);
      setIsAnimating(false);
    }, 400);
  };

  const movePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const len = cards.length;
    if (len === 0) return;
    const bottomCard = cards[0];

    // Append to end of stack immediately
    setCards((prev) => {
      const copy = [...prev];
      const shifted = copy.shift();
      copy.push(shifted);
      return copy;
    });

    // Slide in from left
    setEnterCardId(bottomCard.index);

    setTimeout(() => {
      setEnterCardId(null);
    }, 20);

    setTimeout(() => {
      setIsAnimating(false);
    }, 400);
  };

  const len = cards.length;
  // If in next transition, show metadata for the upcoming card (len - 2)
  const activeIndexToShow = isAnimating && exitCardId !== null ? len - 2 : len - 1;
  const activeCard = cards[activeIndexToShow] || cards[len - 1];

  return (
    <section ref={sectionRef} className="shuffle-section animate-on-scroll fade-up" id="Oc-Team">
      <div className="shuffle-container">
        <div
          className="card-stack"
          id="teamStack"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          {cards.map((card, index) => {
            let positionClass = "pos-hidden";
            if (index === len - 1) positionClass = "pos-1";
            else if (index === len - 2) positionClass = "pos-2";
            else if (index === len - 3) positionClass = "pos-3";

            const isExitCard = exitCardId === card.index;
            const isEnterCard = enterCardId === card.index;

            return (
              <div
                key={card.index}
                className={`s-card ${positionClass} ${isExitCard ? "slide-out-right" : ""} ${
                  isEnterCard ? "slide-out-left" : ""
                }`}
                data-index={card.index}
                data-name={card.name}
                data-role={card.role}
              >
                <div className="s-avatar-fallback">{card.fallback}</div>
                <img
                  src={card.image}
                  alt={card.name}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            );
          })}
        </div>

        {activeCard && (
          <div className="stack-info">
            <div className="s-counter" id="sCounter">
              {activeCard.index}
            </div>
            <h2 className="s-name" id="sName">
              {activeCard.name}
            </h2>
            <p className="s-role" id="sRole">
              {activeCard.role}
            </p>

            <div className="s-socials">
              <a href={activeCard.email} className="s-link mail" id="sEmail" aria-label="Email">
                <svg viewBox="0 0 24 24">
                  <path
                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path d="M22 6l-10 7L2 6" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </a>
              <a href={activeCard.phone} className="s-link phone" id="sPhone" aria-label="Phone">
                <svg viewBox="0 0 24 24">
                  <path
                    d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </a>
              <a
                href={activeCard.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="s-link linkedin"
                id="sLinkedin"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24">
                  <path
                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <rect
                    x="2"
                    y="9"
                    width="4"
                    height="12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle
                    cx="4"
                    cy="4"
                    r="2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </a>
            </div>

            <div className="s-controls">
              <button className="s-btn" id="btnPrev" onClick={movePrev} aria-label="Previous">
                <svg viewBox="0 0 24 24">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" fill="none" />
                </svg>
              </button>
              <button className="s-btn" id="btnNext" onClick={moveNext} aria-label="Next">
                <svg viewBox="0 0 24 24">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" fill="none" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
