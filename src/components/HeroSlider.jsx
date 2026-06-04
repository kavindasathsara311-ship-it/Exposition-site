import React, { useState, useEffect } from "react";
import { heroSlides } from "../data/carouselData";

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [resetTimer, setResetTimer] = useState(0); // Trigger to restart autoplay interval

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(id);
  }, [resetTimer]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
    setResetTimer((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + heroSlides.length) % heroSlides.length);
    setResetTimer((prev) => prev + 1);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    setResetTimer((prev) => prev + 1);
  };

  return (
    <div className="hero-slider" id="heroSlider">
      {heroSlides.map((slide, idx) => (
        <div
          key={idx}
          className={`hero-slide ${idx === currentIndex ? "active" : ""}`}
          style={{ backgroundImage: `url("${slide.image}")` }}
        >
          <div className="slide-content">
            <h2 className="slide-title">{slide.title}</h2>
            <p className="slide-subtitle">{slide.subtitle}</p>
          </div>
        </div>
      ))}

      <button className="hero-nav-arrow prev-slide" id="heroPrev" onClick={handlePrev}>
        <i className="fa-solid fa-chevron-left"></i>
      </button>
      <button className="hero-nav-arrow next-slide" id="heroNext" onClick={handleNext}>
        <i className="fa-solid fa-chevron-right"></i>
      </button>

      <div className="hero-nav-dots" id="heroDots">
        {heroSlides.map((_, idx) => (
          <span
            key={idx}
            className={`hero-dot ${idx === currentIndex ? "active" : ""}`}
            data-index={idx}
            onClick={() => handleDotClick(idx)}
          ></span>
        ))}
      </div>
    </div>
  );
}
