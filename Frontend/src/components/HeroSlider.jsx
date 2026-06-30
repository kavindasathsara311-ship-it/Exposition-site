import React, { useState, useEffect, useRef } from "react";
import { heroSlides } from "../data/carouselData";

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Track where the growth animation should start from dynamically
  const [originStyles, setOriginStyles] = useState({});
  const firstThumbRef = useRef(null);

  const startTimerRef = useRef(null);
  const endTimerRef = useRef(null);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      clearTimeout(startTimerRef.current);
      clearTimeout(endTimerRef.current);
    };
  }, []);

  // Automatic slide loop engine (Changes every 6 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex, isTransitioning]);

  const triggerTransition = (targetIndex) => {
    if (isTransitioning) return;

    // 1. Capture the exact location of the first small thumbnail box right now
    if (firstThumbRef.current) {
      const rect = firstThumbRef.current.getBoundingClientRect();
      setOriginStyles({
        top: `${rect.top}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        borderRadius: "14px"
      });
    }

    // 2. Queue the upcoming slide info
    setNextIndex(targetIndex);

    // 3. Let React render the element at the thumbnail's size first, then step into full-screen mode on the next frame
    startTimerRef.current = setTimeout(() => {
      setIsTransitioning(true);
    }, 50);

    // 4. Reset states once the 800ms transition finishes scaling out
    endTimerRef.current = setTimeout(() => {
      setCurrentIndex(targetIndex);
      setNextIndex(null);
      setIsTransitioning(false);
      setOriginStyles({});
    }, 800);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % heroSlides.length;
    triggerTransition(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + heroSlides.length) % heroSlides.length;
    triggerTransition(prevIdx);
  };

  const handleThumbnailClick = (targetIndex) => {
    if (targetIndex === currentIndex) return;
    triggerTransition(targetIndex);
  };

  const getThumbnailSlides = () => {
    const items = [];
    const maxThumbnails = Math.min(3, heroSlides.length - 1);
    for (let i = 1; i <= maxThumbnails; i++) {
      const idx = (currentIndex + i) % heroSlides.length;
      items.push({ slide: heroSlides[idx], originalIndex: idx });
    }
    return items;
  };

  const currentSlide = heroSlides[currentIndex];
  const upcomingSlide = nextIndex !== null ? heroSlides[nextIndex] : null;

  return (
    <div className={`lun-slider ${isTransitioning ? "is-animating" : ""}`}>
      
      {/* Underlying Static Base Background */}
      <div 
        className="lun-bg-viewport current-bg" 
        style={{ backgroundImage: `url("${currentSlide.image}")` }}
      />

      {/* The Dynamic Growing Element (Spreads out across the monitor screen) */}
      {upcomingSlide && (
        <div 
          className="lun-bg-viewport next-grow-bg" 
          style={{ 
            backgroundImage: `url("${upcomingSlide.image}")`,
            ...originStyles 
          }}
        />
      )}

      {/* Typography Copy Elements */}
      <div className="lun-content-layer">
        <div className="lun-content-wrapper">    
          <h1 className="lun-title">{upcomingSlide ? upcomingSlide.title : currentSlide.title}</h1>
          <p className="lun-desc">
            {upcomingSlide ? (upcomingSlide.subtitle || "Driving Innovation Forward") : (currentSlide.subtitle || "Driving Innovation Forward")}
          </p>
          <div className="lun-actions">
            <a href="#time-line"><button className="lun-btn primary">SEE MORE</button></a>
            <a href="#contact"><button className="lun-btn secondary">Be a Partner</button></a>
          </div>
        </div>
      </div>

      {/* Upcoming Preview Thumbs Row */}
      <div className="lun-thumbnails-strip">
        {getThumbnailSlides().map(({ slide, originalIndex }, idx) => (
          <div 
            key={originalIndex} 
            // Apply the reference hook exclusively to the first box (the one about to scale)
            ref={idx === 0 ? firstThumbRef : null}
            className="lun-thumb-card"
            style={{ backgroundImage: `url("${slide.image}")` }}
            onClick={() => handleThumbnailClick(originalIndex)}
          >
            <div className="lun-thumb-content">
              <div className="lun-thumb-title">{slide.title}</div>
              <div className="lun-thumb-desc">Description</div>
            </div>
          </div>
        ))}
      </div>

      {/* Manual Left Control Paddles */}
      <div className="lun-arrows-ctrl">
        <button className="lun-arrow-btn" onClick={handlePrev} aria-label="Previous Slide">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button className="lun-arrow-btn" onClick={handleNext} aria-label="Next Slide">
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}