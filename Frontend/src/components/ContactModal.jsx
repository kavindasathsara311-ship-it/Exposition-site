import React, { useEffect } from "react";

export default function ContactModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for reaching out! We will get back to you soon.");
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("contact-modal-overlay")) {
      onClose();
    }
  };

  return (
    <div
      className={`contact-modal-overlay ${isOpen ? "active" : ""}`}
      id="contactModal"
      onClick={handleOverlayClick}
    >
      <div className="contact-modal-container">
        <button
          className="contact-modal-close"
          id="closeContactModal"
          onClick={onClose}
          aria-label="Close modal"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="contact-modal-header">
          <h2>Get in Touch</h2>
          <p>We'd love to feature you in our interview series</p>
        </div>

        <form className="contact-modal-form" id="interviewForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="contactName">
              Your Name <span>*</span>
            </label>
            <input type="text" id="contactName" placeholder="Enter your full name" required />
          </div>

          <div className="form-group">
            <label htmlFor="contactDesignation">
              Your Designation <span>*</span>
            </label>
            <input
              type="text"
              id="contactDesignation"
              placeholder="e.g., CEO, Creative Director, Engineer, etc."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactLinkedin">LinkedIn/Personal Website</label>
            <input
              type="url"
              id="contactLinkedin"
              placeholder="LinkedIn profile or personal website URL"
            />
          </div>

          <div className="form-group-group">
            <div className="form-group half-width">
              <label htmlFor="contactPrimary">
                Contact Info <span>*</span>
              </label>
              <input
                type="text"
                id="contactPrimary"
                placeholder="Option 01 (Primary Contact)&#10;Email address or phone number"
                required
              />
            </div>
            <div className="form-group half-width">
              <label htmlFor="contactAlternative">&nbsp;</label>
              <input
                type="text"
                id="contactAlternative"
                placeholder="Option 02 (Alternative Contact)&#10;WhatsApp, Twitter, or additional contact"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="contactMessage">Message</label>
            <textarea
              id="contactMessage"
              rows="4"
              placeholder="Tell us about yourself, your expertise, and what insights you'd like to share in an interview..."
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
