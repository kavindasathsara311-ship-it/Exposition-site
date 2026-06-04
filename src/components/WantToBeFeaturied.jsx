import React, { useRef } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function WantToBeFeaturied({ onOpenModal, type = "featured" }) {
  const sectionRef = useRef(null);
  useScrollAnimation(sectionRef, "animate-in");

  if (type === "partner") {
    return (
      <section
        ref={sectionRef}
        className="want-to-be-featured-section be-a-partner-section animate-on-scroll fade-up"
      >
        <div className="be-a-partner-content">
          <h2 className="section-title">Want to Partner With Us?</h2>
          <p className="section-subtitle">
            Let's discuss how we can create a customized partnership that delivers
            exceptional value for your organization and our university community.
          </p>
          <button className="contactTeam-btn" onClick={onOpenModal}>
            <i className="fa-solid fa-envelope"></i> Contact Partnership Team
          </button>
          <a href="partnership-guide.pdf" target="_blank" rel="noopener noreferrer">
            <button className="downloadGuide-btn">
              <i className="fa-solid fa-envelope"></i> Download Partnership Guide
            </button>
          </a>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="want-to-be-featured-section animate-on-scroll fade-up"
    >
      <div className="want-to-be-featured-content">
        <h2 className="section-title">Want to be Featured?</h2>
        <p className="section-subtitle">
          Join our interview series and share your insights with our community of
          innovators and thought leaders.
        </p>
        <button className="contact-btn" onClick={onOpenModal}>
          <i className="fa-solid fa-envelope"></i> Contact Us
        </button>
      </div>
    </section>
  );
}
