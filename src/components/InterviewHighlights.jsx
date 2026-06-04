import React, { useEffect, useRef } from "react";
import { uniqueInterviewData } from "../data/interviewData";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function InterviewHighlights() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const animationRef = useRef(null);
  const posRef = useRef(0);

  const sectionRef = useRef(null);
  useScrollAnimation(sectionRef, "animate-in");

  const highlights = uniqueInterviewData.filter((person) => person.isHighlighted);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || highlights.length === 0) return;

    let originalWidth = 0;
    const calculateOriginalWidth = () => {
      const children = Array.from(track.children);
      if (children.length === 0) return;

      let sum = 0;
      const count = highlights.length;
      for (let i = 0; i < count; i++) {
        if (children[i]) {
          sum += children[i].getBoundingClientRect().width;
        }
      }
      const style = window.getComputedStyle(track);
      const gap = parseFloat(style.gap || 0);
      sum += gap * count;
      originalWidth = sum;
    };

    // Delay measurement to ensure DOM finishes rendering
    const initTimer = setTimeout(() => {
      calculateOriginalWidth();
    }, 100);

    let lastTime = null;
    const speed = 60; // Pixels per second

    const animate = (time) => {
      if (!lastTime) lastTime = time;
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (originalWidth > 0) {
        posRef.current += speed * delta;
        if (posRef.current >= originalWidth) {
          posRef.current -= originalWidth;
        }
        track.style.transform = `translateX(-${posRef.current}px)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      calculateOriginalWidth();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(initTimer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [highlights.length]);

  if (highlights.length === 0) return null;

  // Clone 5 times to cover screens of all widths for seamless scrolling
  const displayedCards = [
    ...highlights,
    ...highlights,
    ...highlights,
    ...highlights,
    ...highlights
  ];

  return (
    <section ref={sectionRef} className="section-allKeynoteSpeaker interview-highlights animate-on-scroll fade-up">
      <h2 className="section-title">Interview Highlights</h2>
      <p className="section-subtitle">Insights from industry pioneers shaping the future</p>
      <div ref={containerRef} className="highlights-row" id="highlightsRowContainer">
        <div ref={trackRef} className="continuous-track">
          {displayedCards.map((person, idx) => (
            <div key={idx} className="row-card">
              <img src={person.image} alt={person.name} className="row-card-img" />
              <div className="row-card-content">
                <span className="badge-tag">{person.issue}</span>
                <h3>{person.name}</h3>
                <span className="role-sub">{person.title}</span>
                <p className="short-quote">"{person.quote}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
