import React, { useRef } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function Footer() {
  const footerRef = useRef(null);
  useScrollAnimation(footerRef, "animate-in");

  return (
    <footer ref={footerRef} className="site-footer animate-on-scroll fade-up">
      <div className="footer-content">
        <div className="footer-container-main">
          <img
            src="/Resources/Exposition - University Magazine_files/Expo logo.svg"
            alt="Exposition Magazine Logo"
            className="footer-logo"
          />
          <p className="footer-para">
            Celebrating academic excellence through compelling storytelling and meaningful
            partnerships.
          </p>
          <img
            src="/Resources/Exposition - University Magazine_files/unilogos.png"
            alt="University Logos"
            className="footer-unilogos"
          />
          <p>&copy; 2024 Exposition Magazine. All rights reserved.</p>
        </div>

        <div className="footer-container">
          <p className="footer-quick-link">Quick Links</p>
          <a href="#home">Events</a>
          <a href="#services">Event Structure</a>
          <a href="#portfolio">Partnerships</a>
          <a href="#contact">Contact Us</a>
        </div>

        <div className="footer-container">
          <p className="footer-quick-link">Get in Touch</p>
          <a href="#contact">
            <i className="fa fa-location"></i> University of Kelaniya, Sri Lanka
          </a>
          <a href="tel:+94716846120">
            <i className="fa-solid fa-phone"></i> +94 71 684 6120
          </a>
          <a href="mailto:exposition.uok@gmail.com">
            <i className="fa-solid fa-envelope"></i> exposition.uok@gmail.com
          </a>

          <p className="footer-quick-link">Follow Us</p>
          <div className="social_link-container">
            <a
              href="https://web.facebook.com/Exposition.MIT?_rdc=1&_rdr#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <i className="fa-brands fa-facebook social_link"></i>
            </a>
            <a href="#home" aria-label="LinkedIn">
              <i className="fa-brands fa-linkedin social_link"></i>
            </a>
            <a href="#home" aria-label="Instagram">
              <i className="fa-brands fa-instagram social_link"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
