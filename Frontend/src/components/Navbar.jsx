import React, { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [isScrollDown, setIsScrollDown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    let ticking = false;
    const THRESHOLD = 6; // ignore tiny scroll deltas so the bar doesn't flicker

    const evaluate = () => {
      const currentScrollY = window.pageYOffset;
      if (currentScrollY <= 0) {
        setIsScrollDown(false);
        lastScrollY = currentScrollY;
        ticking = false;
        return;
      }
      const delta = currentScrollY - lastScrollY;
      if (Math.abs(delta) > THRESHOLD) {
        setIsScrollDown(delta > 0);
        lastScrollY = currentScrollY;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(evaluate);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav ref={navRef} className={`navbar ${isScrollDown ? "scroll-down" : ""}`}>
      <img src="/Resources/ExpoLogo.png" className="nav-logo" alt="expo logo" />
      <div 
        className="nav-toggle" 
        id="navToggle" 
        onClick={(e) => {
          e.stopPropagation();
          setIsMenuOpen((prev) => !prev);
        }}
      >
        <i className="fa-solid fa-bars"></i>
      </div>
      <div className={`nav-links ${isMenuOpen ? "open" : ""}`} id="navLinks">
        <a className="navLink" href="#home" onClick={() => setIsMenuOpen(false)}>Home</a>
        <a className="navLink" href="#time-line" onClick={() => setIsMenuOpen(false)}>Event Structure</a>
        <a className="navLink" href="#cylinder" onClick={() => setIsMenuOpen(false)}>Highlights</a>
        <a className="navLink" href="#key-note" onClick={() => setIsMenuOpen(false)}>Community voices</a>
        <a className="navLink" href="#partner-card" onClick={() => setIsMenuOpen(false)}>partnerships</a>
        <a className="navLink" href="#Oc-Team" onClick={() => setIsMenuOpen(false)}>Our Team</a>
        <a className="navLink" href="#contact" onClick={() => setIsMenuOpen(false)}>Contact us</a>
      </div>
    </nav>
  );
}
