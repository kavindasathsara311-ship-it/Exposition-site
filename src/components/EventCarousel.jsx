import React, { useState, useEffect, useRef } from "react";
import { eventCards } from "../data/carouselData";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const totalCards = eventCards.length;
const degreesPerStep = 360 / totalCards;
const dotLabels = ["Exposition", "Interviews", "Industrial", "Edify", "How", "Student", "Forum", "Career"];

export default function EventCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const cylinderRef = useRef(null);
  const stageRef = useRef(null);
  const sectionRef = useRef(null);

  useScrollAnimation(sectionRef, "animate-in");

  // Autoplay handler
  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 3500);
    return () => clearInterval(id);
  }, [isPlaying]);

  const dragInfo = useRef({ isDragging: false, startX: 0, deltaX: 0 });

  const getPointerX = (event) => {
    if (event.type.startsWith("touch")) {
      return event.touches[0]?.clientX ?? event.changedTouches[0]?.clientX;
    }
    return event.clientX;
  };

  const handleDragStart = (e) => {
    dragInfo.current.isDragging = true;
    dragInfo.current.startX = getPointerX(e);
    dragInfo.current.deltaX = 0;
    if (stageRef.current) {
      stageRef.current.classList.add("dragging");
    }
  };

  const handleDragMove = (e) => {
    if (!dragInfo.current.isDragging) return;
    const x = getPointerX(e);
    dragInfo.current.deltaX = x - dragInfo.current.startX;
  };

  const handleDragEnd = () => {
    if (!dragInfo.current.isDragging) return;
    dragInfo.current.isDragging = false;
    if (stageRef.current) {
      stageRef.current.classList.remove("dragging");
    }

    if (Math.abs(dragInfo.current.deltaX) >= 40) {
      const direction = dragInfo.current.deltaX > 0 ? -1 : 1;
      setCurrentIndex((prev) => prev + direction);
    }
  };

  const rotateCarousel = (direction) => {
    setCurrentIndex((prev) => prev + direction);
  };

  const jumpToCard = (index) => {
    const activeIdx = ((currentIndex % totalCards) + totalCards) % totalCards;
    let diff = index - activeIdx;
    if (diff > totalCards / 2) diff -= totalCards;
    if (diff < -totalCards / 2) diff += totalCards;
    setCurrentIndex((prev) => prev + diff);
  };

  const togglePlayback = () => {
    setIsPlaying((prev) => !prev);
  };

  const activeIndexNormalized = ((currentIndex % totalCards) + totalCards) % totalCards;
  const currentRotation = currentIndex * -degreesPerStep;

  return (
    <section ref={sectionRef} className="gallery-section animate-on-scroll fade-up">
      <div
        ref={stageRef}
        className="carousel-stage"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        onTouchCancel={handleDragEnd}
      >
        <div
          ref={cylinderRef}
          className="carousel-cylinder"
          id="cylinder"
          style={{ transform: `rotateY(${currentRotation}deg)` }}
        >
          {eventCards.map((card, idx) => (
            <div
              key={idx}
              className="carousel-card"
              style={{
                "--card-index": idx,
                backgroundImage: `url("${card.image}")`
              }}
            >
              <div className="card-overlay">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <button className="explore-btn">Explore More</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Control indicators */}
      <div className="carousel-nav-dots">
        <button className="nav-arrow left-arrow" onClick={() => rotateCarousel(-1)}>
          &#10094;
        </button>
        {dotLabels.map((label, idx) => (
          <span
            key={idx}
            className={`dot ${idx === activeIndexNormalized ? "active" : ""}`}
            onClick={() => jumpToCard(idx)}
          >
            {label}
          </span>
        ))}
        <button className="nav-arrow right-arrow" onClick={() => rotateCarousel(1)}>
          &#10095;
        </button>
      </div>

      <div className="autoplay-controls">
        <button
          id="togglePlaybackBtn"
          className={`playback-btn ${!isPlaying ? "paused-state" : ""}`}
          onClick={togglePlayback}
        >
          <span className="control-icon" id="playbackIcon">
            {isPlaying ? "⏸" : "▶"}
          </span>
          <span id="playbackText">{isPlaying ? "Pause" : "Play"}</span>
        </button>
        <span className="status-indicator-dot"></span>
      </div>
    </section>
  );
}
