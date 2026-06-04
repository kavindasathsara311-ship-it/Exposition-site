import React, { useState, useEffect, useRef } from "react";
import { deckCards } from "../data/interviewData";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function DeckGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [isTextChanging, setIsTextChanging] = useState(false);
  const [coordinates, setCoordinates] = useState([]);
  const [resetTimer, setResetTimer] = useState(0);

  const sectionRef = useRef(null);
  useScrollAnimation(sectionRef, "animate-in");

  const generatePeripheralCoordinates = (index) => {
    const angleRotation = Math.random() * 60 - 30;
    const polarDirection = index % 2 === 0 ? -1 : 1;
    const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;
    const baseDisplacement = isMobile ? 80 : 220;
    const randomDisplacement = isMobile ? 40 : 80;
    const horizontalDisplacement = (Math.random() * randomDisplacement + baseDisplacement) * polarDirection;
    const verticalDisplacement = isMobile ? Math.random() * 100 - 50 : Math.random() * 200 - 100;

    return {
      x: `${horizontalDisplacement}px`,
      y: `${verticalDisplacement}px`,
      r: `${angleRotation}deg`
    };
  };

  const scrambleCoordinates = () => {
    const coords = deckCards.map((_, index) => generatePeripheralCoordinates(index));
    setCoordinates(coords);
  };

  // Scramble coordinates on mount
  useEffect(() => {
    scrambleCoordinates();
  }, []);

  // Handle panel text shift transition delay
  useEffect(() => {
    setIsTextChanging(true);
    const id = setTimeout(() => {
      setDisplayedIndex(activeIndex);
      setIsTextChanging(false);
    }, 200);
    return () => clearTimeout(id);
  }, [activeIndex]);

  // Autoplay interval
  useEffect(() => {
    if (deckCards.length === 0) return;
    const interval = setInterval(() => {
      stepNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [activeIndex, resetTimer]);

  const stepNext = () => {
    setActiveIndex((prev) => {
      const nextIdx = prev + 1;
      if (nextIdx >= deckCards.length) {
        scrambleCoordinates(); // Re-scramble coordinates on loop reset
        return 0;
      }
      return nextIdx;
    });
    setResetTimer((prev) => prev + 1);
  };

  const stepPrev = () => {
    setActiveIndex((prev) => {
      if (prev === 0) {
        return deckCards.length - 1;
      }
      return prev - 1;
    });
    setResetTimer((prev) => prev + 1);
  };

  if (deckCards.length === 0) return null;

  const activeCardInfo = deckCards[displayedIndex] || deckCards[0];
  const totalCardsString = String(deckCards.length).padStart(2, "0");
  const counterString = `${displayedIndex + 1}/${totalCardsString}`;

  return (
    <section>
      <svg style={{ position: "absolute", width: 0, height: 0, ariaHidden: "true" }}>
        <filter id="deck-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.04 0" />
        </filter>
      </svg>

      <section ref={sectionRef} className="deck-gallery-section animate-on-scroll fade-up">
        <div className="deck-container-frame">
          <div className="deck-workspace">
            <div className="deck-pile" id="deckPile">
              {deckCards.map((card, i) => {
                let stateClass = "";
                const styleProps = {};

                if (i === activeIndex) {
                  stateClass = "state-active";
                } else if (i < activeIndex) {
                  stateClass = "state-scattered";
                  const coord = coordinates[i] || { x: "0px", y: "0px", r: "0deg" };
                  styleProps["--scatter-x"] = coord.x;
                  styleProps["--scatter-y"] = coord.y;
                  styleProps["--scatter-r"] = coord.r;
                  styleProps["--scatter-idx"] = i;
                } else {
                  stateClass = "state-bundled";
                  styleProps["--stack-offset"] = i - activeIndex;
                }

                return (
                  <div
                    key={card.index}
                    className={`deck-card ${stateClass}`}
                    style={styleProps}
                    data-index={card.index}
                    data-title={card.title}
                    data-category={card.category}
                    data-tag={card.tag}
                  >
                    <img src={card.image} alt={card.title} />
                  </div>
                );
              })}
            </div>
          </div>

          <div className={`deck-info-panel ${isTextChanging ? "text-changing" : ""}`}>
            <div className="info-meta-block">
              <div className="info-counter" id="infoCounter">
                {counterString}
              </div>
              <div className="info-tag" id="infoTag">
                {activeCardInfo.tag}
              </div>
              <h2 className="info-title" id="infoTitle">
                {activeCardInfo.title}
              </h2>
              <span className="info-category" id="infoCategory">
                {activeCardInfo.category}
              </span>
            </div>

            <div className="info-controls">
              <button
                className="control-btn"
                id="deckPrev"
                onClick={stepPrev}
                aria-label="Previous Asset"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                className="control-btn"
                id="deckNext"
                onClick={stepNext}
                aria-label="Next Asset"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
