import React, { useRef, useState, useLayoutEffect, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const items = [
  {
    id: "01",
    icon: "fa-book-open",
    category: "Publication",
    title: "Exposition Magazine",
    desc: "A publication that brings together industry insights, innovation, and academic excellence.",
    image: "/Resources/Exposition - University Magazine_files/magazine.png",
  },
  {
    id: "02",
    icon: "fa-microphone-lines",
    category: "Content",
    title: "Interviews",
    desc: "Exclusive insights, executive perspectives, and dialogues with industry pioneers and tech leaders.",
    image: "/Resources/Exposition - University Magazine_files/Interviews.png",
  },
  {
    id: "03",
    icon: "fa-industry",
    category: "Event",
    title: "Industrial Week",
    desc: "Inspiring careers through meaningful connections, industry insights, and real-world opportunities.",
    image: "/Resources/Exposition - University Magazine_files/pexels-photo-3183197.jpeg",
  },
  {
    id: "04",
    icon: "fa-podcast",
    category: "Media",
    title: "Exposition Podcast Series",
    desc: "Inspiring the next generation through meaningful conversations with industry leaders and innovators.",
    image: "/Resources/Exposition - University Magazine_files/pexels-photo-1181376.jpg",
  },
  {
    id: "05",
    icon: "fa-lightbulb",
    category: "Platform",
    title: "University Tech Events Hub",
    desc: "A centralized digital platform showcasing technology-focused events from universities across Sri Lanka.",
    image: "/Resources/Exposition - University Magazine_files/pexels-photo-5989933.jpg",
  },
  {
    id: "06",
    icon: "fa-chalkboard-user",
    category: "Forum",
    title: "Industrial Forum",
    desc: "Empowering future professionals through meaningful conversations and real-world industry perspectives.",
    image: "/Resources/Exposition - University Magazine_files/forum.png",
  },
  {
    id: "07",
    icon: "fa-comments",
    category: "Opportunity",
    title: "Career Fair",
    desc: "Connecting emerging undergraduate talent directly with premier tech enterprises and corporate recruiters.",
    image: "/Resources/Exposition - University Magazine_files/pexels-photo-5989933.jpg",
  },
  {
    id: "08",
    icon: "fa-handshake",
    category: "Partnership",
    title: "Partner with Us",
    desc: "Connect with tomorrow's talent while strengthening your presence within a future-focused community.",
    image: "/Resources/Exposition - University Magazine_files/pexels-photo-3183197.jpeg",
  },
];

function TlCard({ item, onOpen }) {
  return (
    <div className="tl-card">
      <span className="tl-card-date">{item.category}</span>
      <div
        className="tl-card-box"
        role="button"
        tabIndex={0}
        style={{ cursor: "pointer" }}
        onClick={() => onOpen(item)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen(item);
          }
        }}
      >
        <h3 className="tl-card-title">{item.title}</h3>
        <p className="tl-card-desc">{item.desc}</p>
        <span className="tl-card-cta">Click to explore →</span>
      </div>
    </div>
  );
}

function TlItem({ item, index, onOpen }) {
  const ref = useRef(null);
  useScrollAnimation(ref, "tl-visible");
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className={`tl-item ${isLeft ? "tl-left" : "tl-right"}`}>
      <div className="tl-slot tl-slot-left">
        {isLeft && <TlCard item={item} onOpen={onOpen} />}
      </div>

      <div className="tl-node-area">
        <div className="tl-node">
          <span className="tl-node-dot"></span>
        </div>
      </div>

      <div className="tl-slot tl-slot-right">
        {!isLeft && <TlCard item={item} onOpen={onOpen} />}
      </div>
    </div>
  );
}

export default function Timeline() {
  const headerRef = useRef(null);
  useScrollAnimation(headerRef, "tl-visible");

  const [activeModalData, setActiveModalData] = useState(null);

  // Lock body scroll while the explore modal is open.
  useEffect(() => {
    document.body.style.overflow = activeModalData ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [activeModalData]);

  const containerRef = useRef(null);
  const pathRef = useRef(null);   // base spine path — used for getPointAtLength()
  const trailRef = useRef(null);  // bright fill revealed behind the ball
  const ballRef = useRef(null);
  const lenRef = useRef(0);

  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [pathD, setPathD] = useState("");

  // Build a serpentine path that threads through every node centre.
  const buildPath = useCallback(() => {
    const cont = containerRef.current;
    if (!cont) return;
    const nodes = Array.from(cont.querySelectorAll(".tl-node-area"));
    if (!nodes.length) return;

    const cRect = cont.getBoundingClientRect();
    const w = cont.clientWidth;
    const h = cont.clientHeight;

    // Spine x comes from the actual node position (centre on desktop, left rail on mobile).
    const first = nodes[0].getBoundingClientRect();
    const sx = first.left - cRect.left + first.width / 2;

    const mobile = w <= 768;
    const amp = mobile ? 16 : Math.min(46, w * 0.045 + 14);

    const ys = nodes.map((n) => {
      const r = n.getBoundingClientRect();
      return r.top - cRect.top + r.height / 2;
    });

    // Straight tail from the top edge down to the first node.
    let d = `M ${sx} 0 L ${sx} ${ys[0]}`;

    // Smooth cubic bows weaving left / right between consecutive nodes.
    for (let i = 0; i < ys.length - 1; i++) {
      const y0 = ys[i];
      const y1 = ys[i + 1];
      const seg = y1 - y0;
      const s = i % 2 === 0 ? -1 : 1; // alternate the bow direction
      const cx = sx + s * amp;
      d += ` C ${cx} ${y0 + seg * 0.35}, ${cx} ${y0 + seg * 0.65}, ${sx} ${y1}`;
    }

    // Straight tail from the last node to the bottom edge.
    d += ` L ${sx} ${h}`;

    setDims({ w, h });
    setPathD(d);
  }, []);

  // Map scroll position -> a point on the path, and move the ball there.
  const updateBall = useCallback(() => {
    const cont = containerRef.current;
    const path = pathRef.current;
    const ball = ballRef.current;
    if (!cont || !path) return;

    const len = lenRef.current;
    if (!len) return;

    const cRect = cont.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;

    // 0 when the timeline top hits mid-screen, 1 when the bottom reaches mid-screen.
    let p = (vh * 0.5 - cRect.top) / cRect.height;
    p = Math.max(0, Math.min(1, p));

    const pt = path.getPointAtLength(p * len);
    if (ball) {
      ball.style.left = `${pt.x}px`;
      ball.style.top = `${pt.y}px`;
    }
    if (trailRef.current) {
      trailRef.current.style.strokeDashoffset = `${len * (1 - p)}`;
    }
  }, []);

  // Rebuild the path on mount, on resize, and whenever the layout changes.
  useLayoutEffect(() => {
    buildPath();
    const cont = containerRef.current;
    if (!cont) return;

    const ro = new ResizeObserver(() => buildPath());
    ro.observe(cont);
    window.addEventListener("resize", buildPath);

    // Fonts / images can shift node positions slightly after first paint.
    const t = setTimeout(buildPath, 400);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", buildPath);
      clearTimeout(t);
    };
  }, [buildPath]);

  // Once the path string is set, measure it and refresh the ball.
  useLayoutEffect(() => {
    if (pathRef.current) {
      lenRef.current = pathRef.current.getTotalLength();
      if (trailRef.current) {
        trailRef.current.style.strokeDasharray = `${lenRef.current}`;
        trailRef.current.style.strokeDashoffset = `${lenRef.current}`;
      }
      updateBall();
    }
  }, [pathD, updateBall]);

  // Drive the ball from scroll, throttled with rAF.
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateBall();
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [updateBall]);

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

      <div className="tl-container" ref={containerRef}>
        {/* Curved spine + scroll-driven ball */}
        <svg
          className="tl-spine-svg"
          width={dims.w}
          height={dims.h}
          viewBox={`0 0 ${dims.w} ${dims.h}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="tlSpineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="6%" stopColor="rgba(255,255,255,0.45)" />
              <stop offset="94%" stopColor="rgba(255,255,255,0.45)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
          <path ref={pathRef} className="tl-spine-path" d={pathD} />
          <path ref={trailRef} className="tl-spine-trail" d={pathD} />
        </svg>

        <div ref={ballRef} className="tl-ball" aria-hidden="true">
          <span className="tl-ball-core"></span>
        </div>

        {items.map((item, i) => (
          <TlItem key={item.id} item={item} index={i} onOpen={setActiveModalData} />
        ))}
      </div>

      {activeModalData && createPortal(
        <div className="explore-modal-backdrop" onClick={() => setActiveModalData(null)}>
          <div className="explore-modal-scroll-wrapper" onClick={() => setActiveModalData(null)}>
            <div className="explore-modal-card" onClick={(e) => e.stopPropagation()}>
              <button className="explore-modal-close" onClick={() => setActiveModalData(null)}>&times;</button>
              <div className="explore-modal-banner" style={{ backgroundImage: `url("${activeModalData.image}")` }} />
              <div className="explore-modal-body">
                <span className="explore-modal-badge">Exposition Hub Event</span>
                <h2>{activeModalData.title}</h2>
                <p className="explore-modal-desc">{activeModalData.desc}</p>
                <div className="explore-modal-info-grid">
                  <div className="info-item">
                    <span className="info-label">Access Pass</span>
                    <span className="info-val">University Delegation / Open Invitation</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Ecosystem Focus</span>
                    <span className="info-val">Synergy between Academic Research &amp; Industry Tech</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
