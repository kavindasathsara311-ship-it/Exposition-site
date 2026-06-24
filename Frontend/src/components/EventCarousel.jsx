import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { eventCards } from "../data/carouselData";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const N = eventCards.length;
const INTERVAL = 3800;

const CORNER_SVG = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M1 11V1H11" stroke="rgba(0,255,200,0.6)" strokeWidth="1.5" />
  </svg>
);

const CARD_COLORS = [
  [0, 200, 160],
  [80, 120, 255],
  [255, 160, 40],
  [160, 80, 255],
  [0, 200, 100],
  [255, 80, 120],
  [40, 180, 255],
  [255, 200, 0],
];

function getLayout(offset, spread) {
  if (spread) {
    const x = offset * 90;
    const z = offset === 0 ? 0 : -Math.abs(offset) * 60;
    const scale = offset === 0 ? 1 : 0.82;
    const rotY = -((N - 1) / 2) * 22 + offset * 22;
    return { x, y: 0, z, scale, rotY, rotZ: 0, opacity: 1 };
  }
  if (offset === 0) return { x: 0, y: 0, z: 0, scale: 1, rotY: 0, rotZ: 0, opacity: 1 };

  const abs = Math.abs(offset);
  const sign = Math.sign(offset);
  if (abs > 4) return { x: sign * 600, y: 0, z: -400, scale: 0.5, rotY: sign * 55, rotZ: 0, opacity: 0 };

  const x = sign * (abs === 1 ? 300 : abs === 2 ? 480 : abs === 3 ? 580 : 600);
  const z = -abs * 120;
  const scale = abs === 1 ? 0.82 : abs === 2 ? 0.68 : abs === 3 ? 0.56 : 0.48;
  const rotY = sign * (abs === 1 ? 28 : abs === 2 ? 42 : 52);
  const rotZ = sign * (-abs * 1.5);
  const opacity = abs === 1 ? 0.9 : abs === 2 ? 0.6 : abs === 3 ? 0.35 : 0.15;
  return { x, y: abs * 8, z, scale, rotY, rotZ, opacity };
}

export default function EventCarousel() {
  const [current, setCurrent] = useState(0);
  const [autoOn, setAutoOn] = useState(true);
  const [spreadOn, setSpreadOn] = useState(false);
  const [activeModalData, setActiveModalData] = useState(null);
  const [tickKey, setTickKey] = useState(0);

  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const timerRef = useRef(null);
  const animFrameRef = useRef(null);
  const dragXRef = useRef(0);
  const draggingRef = useRef(false);
  const particlesRef = useRef([]);
  const scanYRef = useRef(0);

  useScrollAnimation(sectionRef, "animate-in");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    class Particle {
      constructor(init = false) { this.reset(init); }
      reset(init = false) {
        this.x = Math.random() * W;
        this.y = init ? Math.random() * H : H + 10;
        this.vy = -(0.2 + Math.random() * 0.5);
        this.vx = (Math.random() - 0.5) * 0.15;
        this.size = Math.random() * 1.5 + 0.3;
        this.alpha = Math.random() * 0.5 + 0.1;
        this.life = 1;
        this.decay = 0.002 + Math.random() * 0.003;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
        if (this.life <= 0 || this.y < -10) this.reset();
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha * this.life;
        ctx.fillStyle = "rgba(0,255,200,1)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    particlesRef.current = Array.from({ length: 120 }, () => new Particle(true));

    const drawGrid = () => {
      ctx.save();
      ctx.globalAlpha = 0.04;
      ctx.strokeStyle = "rgba(0,255,200,1)";
      ctx.lineWidth = 0.4;
      const spacing = 60;
      const vp = W / 2, vy = H * 0.55;
      const lines = 14;
      for (let i = -lines; i <= lines; i++) {
        ctx.beginPath();
        ctx.moveTo(vp + i * spacing * 3, H);
        ctx.lineTo(vp + (i / lines) * (W * 0.5 - vp), vy);
        ctx.stroke();
      }
      for (let r = 0; r <= 8; r++) {
        const t = r / 8;
        const y = vy + (H - vy) * t;
        const halfW = (W * 0.5) * (1 - t) + lines * spacing * 3 * t;
        ctx.beginPath();
        ctx.moveTo(vp - halfW, y);
        ctx.lineTo(vp + halfW, y);
        ctx.stroke();
      }
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#030712";
      ctx.fillRect(0, 0, W, H);
      drawGrid();
      particlesRef.current.forEach(p => { p.update(); p.draw(); });
      scanYRef.current = (scanYRef.current + 0.8) % H;
      ctx.save();
      ctx.globalAlpha = 0.025;
      ctx.fillStyle = "rgba(0,255,200,1)";
      ctx.fillRect(0, scanYRef.current, W, 1);
      ctx.restore();
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const resetAuto = useCallback((on = autoOn) => {
    clearInterval(timerRef.current);
    if (on && !activeModalData) {
      timerRef.current = setInterval(() => {
        setCurrent(c => (c + 1) % N);
        setTickKey(k => k + 1);
      }, INTERVAL);
    }
  }, [autoOn, activeModalData]);

  useEffect(() => {
    resetAuto(autoOn);
    return () => clearInterval(timerRef.current);
  }, [autoOn, activeModalData, resetAuto]);

  useEffect(() => {
    document.body.style.overflow = activeModalData ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [activeModalData]);

  const advance = (dir) => {
    setCurrent(c => ((c + dir) % N + N) % N);
    setTickKey(k => k + 1);
    resetAuto();
  };

  const goTo = (idx) => {
    setCurrent(idx);
    setTickKey(k => k + 1);
    resetAuto();
  };

  const handleMouseDown = (e) => { draggingRef.current = true; dragXRef.current = e.clientX; };
  const handleMouseUp = (e) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    const dx = e.clientX - dragXRef.current;
    if (Math.abs(dx) > 50) advance(dx < 0 ? 1 : -1);
  };
  const handleTouchStart = (e) => { dragXRef.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - dragXRef.current;
    if (Math.abs(dx) > 40) advance(dx < 0 ? 1 : -1);
  };

  const toggleAuto = () => {
    const next = !autoOn;
    setAutoOn(next);
    resetAuto(next);
  };

  return (
    <section ref={sectionRef} className="holo-section animate-on-scroll fade-up">
      <canvas ref={canvasRef} className="holo-canvas" />

      <div className="holo-root">
        <div className="holo-hud-bar">
          <span className="holo-hud-label">Event Matrix</span>
          <div className="holo-hud-line" />
          <span className="holo-hud-counter">
            {String(current + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
          </span>
        </div>

        <div
          className="holo-stage"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="holo-track">
            {eventCards.map((card, i) => {
              let offset = i - current;
              if (offset > N / 2) offset -= N;
              if (offset < -N / 2) offset += N;
              const l = getLayout(offset, spreadOn);
              const [r, g, b] = CARD_COLORS[i % CARD_COLORS.length];
              const isActive = offset === 0;

              return (
                <div
                  key={i}
                  className={`holo-card${isActive ? " active" : ""}`}
                  style={{
                    transform: `translate(-50%,-50%) translateX(${l.x}px) translateY(${l.y}px) translateZ(${l.z}px) rotateY(${l.rotY}deg) rotateZ(${l.rotZ}deg) scale(${l.scale})`,
                    opacity: l.opacity,
                    zIndex: 100 - Math.abs(offset) * 10,
                  }}
                  onClick={() => { if (!isActive) goTo(i); }}
                >
                  <div className="holo-active-glow" />
                  <div
                    className="holo-card-inner"
                    style={{
                      background: `linear-gradient(145deg,rgb(${Math.round(r*0.15+8)},${Math.round(g*0.15+8)},${Math.round(b*0.15+18)}),rgb(8,12,24))`
                    }}
                  >
                    {/* Real image fills the top 60% of the card */}
                    <div className="holo-card-media">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="holo-card-img"
                        draggable="false"
                        onError={(e) => { e.currentTarget.style.opacity = "0"; }}
                      />
                      {/* Colour-accent tint layer over image */}
                      <div
                        className="holo-card-img-tint"
                        style={{
                          background: `linear-gradient(160deg,rgba(${r},${g},${b},0.18) 0%,transparent 55%)`
                        }}
                      />
                    </div>

                    <div className="holo-card-scan" />
                    <div className="holo-card-glare" />
                    <div className="holo-card-border" />

                    <div className="holo-card-data">
                      <div className="holo-card-index">
                        <span className="holo-card-index-line" />
                        {String(i + 1).padStart(2, "0")}&nbsp;
                        {card.category || card.tag || "Event"}
                      </div>
                      <div className="holo-card-title">{card.title}</div>
                      <div className="holo-card-sub">{card.description}</div>
                      <button
                        className="holo-explore-btn"
                        onClick={(e) => { e.stopPropagation(); setActiveModalData(card); }}
                      >
                        Explore More
                      </button>
                    </div>

                    <div className="holo-corner holo-cc-tl">{CORNER_SVG}</div>
                    <div className="holo-corner holo-cc-tr">{CORNER_SVG}</div>
                    <div className="holo-corner holo-cc-bl">{CORNER_SVG}</div>
                    <div className="holo-corner holo-cc-br">{CORNER_SVG}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="holo-nav">
          <button className="holo-nav-btn" onClick={() => advance(-1)} aria-label="Previous">&#8592;</button>
          <div className="holo-ticker">
            {eventCards.map((_, i) => (
              <div
                key={i}
                className={`holo-tick${i === current ? " active" : ""}`}
                onClick={() => goTo(i)}
              >
                <div
                  key={i === current ? tickKey : i}
                  className={`holo-tick-fill${i === current ? " running" : ""}`}
                />
              </div>
            ))}
          </div>
          <button className="holo-nav-btn" onClick={() => advance(1)} aria-label="Next">&#8594;</button>
        </div>

        <div className="holo-info-strip">
          {[
            { val: String(current + 1).padStart(2, "0"), key: "Current" },
            { val: eventCards[current]?.category || eventCards[current]?.tag || "Event", key: "Category" },
            { val: eventCards[current]?.access || "Open", key: "Access" },
            { val: eventCards[current]?.format || "Live", key: "Format" },
          ].map((item, i) => (
            <div key={i} className={`holo-info-card${i === 0 ? " lit" : ""}`}>
              <div className="holo-info-num">{item.val}</div>
              <div className="holo-info-key">{item.key}</div>
            </div>
          ))}
        </div>

        <div className="holo-cmd-row">
          <div className={`holo-cmd${autoOn ? " on" : ""}`} onClick={toggleAuto}>
            {autoOn ? "⬤" : "○"} auto-advance
          </div>
          <div className={`holo-cmd${spreadOn ? " on" : ""}`} onClick={() => setSpreadOn(s => !s)}>
            spread view
          </div>
        </div>
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
                <p className="explore-modal-desc">{activeModalData.description}</p>
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
