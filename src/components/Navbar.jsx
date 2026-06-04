import React, { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [isScrollDown, setIsScrollDown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      if (currentScrollY <= 0) {
        setIsScrollDown(false);
        return;
      }
      if (currentScrollY > lastScrollY) {
        setIsScrollDown(true);
      } else {
        setIsScrollDown(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
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
        <a className="navLink" href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
        <a className="navLink" href="#services" onClick={() => setIsMenuOpen(false)}>Services</a>
        <a className="navLink" href="#portfolio" onClick={() => setIsMenuOpen(false)}>Portfolio</a>
        <a className="navLink" href="#portfolio" onClick={() => setIsMenuOpen(false)}>Highlights</a>
        <a className="navLink" href="#portfolio" onClick={() => setIsMenuOpen(false)}>CommunityVoice</a>
        <a className="navLink" href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
      </div>
    </nav>
  );
}
