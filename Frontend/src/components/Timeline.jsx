import React, { useRef } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const items = [
  {
    id: "01",
    icon: "fa-book-open",
    category: "Publication",
    title: "Exposition Magazine",
    desc: "A publication that brings together industry insights, innovation, and academic excellence.",
  },
  {
    id: "02",
    icon: "fa-microphone-lines",
    category: "Content",
    title: "Interviews",
    desc: "Exclusive insights, executive perspectives, and dialogues with industry pioneers and tech leaders.",
  },
  {
    id: "03",
    icon: "fa-industry",
    category: "Event",
    title: "Industrial Week",
    desc: "Inspiring careers through meaningful connections, industry insights, and real-world opportunities.",
  },
  {
    id: "04",
    icon: "fa-podcast",
    category: "Media",
    title: "Exposition Podcast Series",
    desc: "Inspiring the next generation through meaningful conversations with industry leaders and innovators.",
  },
  {
    id: "05",
    icon: "fa-lightbulb",
    category: "Platform",
    title: "University Tech Events Hub",
    desc: "A centralized digital platform showcasing technology-focused events from universities across Sri Lanka.",
  },
  {
    id: "06",
    icon: "fa-chalkboard-user",
    category: "Forum",
    title: "Industrial Forum",
    desc: "Empowering future professionals through meaningful conversations and real-world industry perspectives.",
  },
  {
    id: "07",
    icon: "fa-comments",
    category: "Opportunity",
    title: "Career Fair",
    desc: "Connecting emerging undergraduate talent directly with premier tech enterprises and corporate recruiters.",
  },
  {
    id: "08",
    icon: "fa-handshake",
    category: "Partnership",
    title: "Partner with Us",
    desc: "Connect with tomorrow's talent while strengthening your presence within a future-focused community.",
  },
];

function TlCard({ item }) {
  return (
    <div className="tl-card">
      <span className="tl-card-bg-num">{item.id}</span>
      <div className="tl-card-top">
        <span className="tl-card-category">{item.category}</span>
      </div>
      <h3 className="tl-card-title">{item.title}</h3>
      <p className="tl-card-desc">{item.desc}</p>
      <div className="tl-card-bottom">
        <i className={`fa-solid ${item.icon} tl-card-icon`}></i>
        <span className="tl-card-num-label">{item.id}</span>
      </div>
    </div>
  );
}

function TlItem({ item, index }) {
  const ref = useRef(null);
  useScrollAnimation(ref, "tl-visible");
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className={`tl-item ${isLeft ? "tl-left" : "tl-right"}`}>
      <div className="tl-slot tl-slot-left">
        {isLeft && <TlCard item={item} />}
      </div>

      <div className="tl-node-area">
        <div className="tl-node">
          <div className="tl-node-outer-ring"></div>
          <div className="tl-node-inner">
            <i className={`fa-solid ${item.icon}`}></i>
          </div>
        </div>
      </div>

      <div className="tl-slot tl-slot-right">
        {!isLeft && <TlCard item={item} />}
      </div>
    </div>
  );
}

export default function Timeline() {
  const headerRef = useRef(null);
  useScrollAnimation(headerRef, "tl-visible");

  return (
    <section id="time-line" className="tl-section">
      <h1 style={{ display: "none" }}>Time Line</h1>

      <header ref={headerRef} className="tl-header">
        <div className="tl-header-eyebrow">
          <span className="tl-eyebrow-line"></span>
          <span className="tl-eyebrow-text">Event Universe</span>
          <span className="tl-eyebrow-line"></span>
        </div>
        <div className="tl-header-logo">
          <img src="/Resources/ExpoLogo.png" alt="Exposition" />
        </div>
        <p className="tl-header-sub">Navigate through our immersive event ecosystem</p>
      </header>

      <div className="tl-container">
        <div className="tl-spine">
          <div className="tl-spine-particle"></div>
        </div>
        {items.map((item, i) => (
          <TlItem key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
