import React, { useEffect, useRef } from "react";

export default function GlobalCanvasBackground() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H;

    const resize = () => {
      // Scale to match the absolute viewport boundaries
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      initGlows();
    };
    window.addEventListener("resize", resize);

    // Interactive mouse state
    const mouse = { x: -1000, y: -1000, active: false };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const handleMouseLeave = () => {
      mouse.active = false;
    };
    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.active = true;
      }
    };
    const handleTouchEnd = () => {
      mouse.active = false;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    // Inertial scroll physics
    let lastScrollY = window.scrollY;
    let scrollDelta = 0;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollDelta += (currentScrollY - lastScrollY) * 0.003;
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Click sparks system
    const sparks = [];
    class Spark {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1.5;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.size = Math.random() * 2 + 0.8;
        this.alpha = 1.0;
        this.decay = Math.random() * 0.04 + 0.02;
        this.type = Math.random() > 0.4 ? "cyan" : "gold";
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.97;
        this.vy *= 0.97;
        this.alpha -= this.decay;
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.type === "cyan" ? "rgba(0, 255, 200, 1)" : "rgba(234, 161, 27, 1)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.shadowColor = this.type === "cyan" ? "rgba(0, 255, 200, 0.8)" : "rgba(234, 161, 27, 0.8)";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      }
    }
    const handleMouseDown = (e) => {
      const count = 12;
      for (let i = 0; i < count; i++) {
        sparks.push(new Spark(e.clientX, e.clientY));
      }
    };
    const handleTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) {
        const count = 10;
        const x = e.touches[0].clientX;
        const y = e.touches[0].clientY;
        for (let i = 0; i < count; i++) {
          sparks.push(new Spark(x, y));
        }
      }
    };
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });

    // Drifting ambient glow sources
    const glows = [];
    class GlowSource {
      constructor(type) {
        this.type = type;
        this.reset();
      }
      reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 250 + 200;
        this.alpha = Math.random() * 0.03 + 0.015;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < -this.radius) this.x = W + this.radius;
        if (this.x > W + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = H + this.radius;
        if (this.y > H + this.radius) this.y = -this.radius;
      }
      draw() {
        ctx.save();
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        const colorStr = this.type === "cyan" ? "0, 255, 200" : "234, 161, 27";
        grad.addColorStop(0, `rgba(${colorStr}, ${this.alpha})`);
        grad.addColorStop(0.5, `rgba(${colorStr}, ${this.alpha * 0.4})`);
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
    const initGlows = () => {
      glows.length = 0;
      glows.push(new GlowSource("cyan"));
      glows.push(new GlowSource("gold"));
      glows.push(new GlowSource("cyan"));
      glows.push(new GlowSource("gold"));
    };

    resize(); // Call resize to initial W/H and call initGlows

    class Particle {
      constructor(init = false) { this.reset(init); }
      reset(init = false) {
        this.x = Math.random() * W;
        this.y = init ? Math.random() * H : H + 10;
        this.vy = -(0.2 + Math.random() * 0.6);
        this.vx = (Math.random() - 0.5) * 0.25;
        this.size = Math.random() * 1.8 + 0.4;
        this.alpha = Math.random() * 0.5 + 0.15;
        this.life = 1;
        this.decay = 0.001 + Math.random() * 0.002;
        this.type = Math.random() > 0.35 ? "cyan" : "gold";
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;

        // Particle mouse repulsion logic
        if (mouse.active) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 150) {
            const force = (150 - dist) / 150;
            const angle = Math.atan2(dy, dx);
            this.x += Math.cos(angle) * force * 2.2;
            this.y += Math.sin(angle) * force * 2.2;
          }
        }

        if (this.life <= 0 || this.y < -10 || this.x < -10 || this.x > W + 10) this.reset();
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha * this.life;
        ctx.fillStyle = this.type === "cyan" ? "rgba(0, 255, 200, 0.8)" : "rgba(234, 161, 27, 0.7)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        if (this.size > 1.2) {
          ctx.shadowColor = this.type === "cyan" ? "rgba(0, 255, 200, 0.5)" : "rgba(234, 161, 27, 0.5)";
          ctx.shadowBlur = 4;
        }
        ctx.fill();
        ctx.restore();
      }
    }

    particlesRef.current = Array.from({ length: 120 }, (_, i) => new Particle(true));

    let gridOffset = 0;
    const drawGrid = () => {
      ctx.save();
      const vp = W / 2;
      const vy = H * 0.55;
      const lines = 14;
      const spacing = 60;
      
      // Draw vertical lines radiating from vanishing point
      for (let i = -lines; i <= lines; i++) {
        const xBottom = vp + i * spacing * 3;
        const xTop = vp + (i / lines) * (W * 0.5 - vp);
        
        const lineGrad = ctx.createLinearGradient(vp, vy, vp, H);
        lineGrad.addColorStop(0, "rgba(0, 255, 200, 0.0)");
        lineGrad.addColorStop(0.2, "rgba(0, 255, 200, 0.02)");
        lineGrad.addColorStop(0.6, "rgba(0, 255, 200, 0.07)");
        lineGrad.addColorStop(1, "rgba(0, 255, 200, 0.03)");
        
        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(xBottom, H);
        ctx.lineTo(xTop, vy);
        ctx.stroke();
      }
      
      // Draw horizontal lines scrolling in 3D perspective
      const horizLines = 10;
      for (let r = 0; r <= horizLines; r++) {
        const t = (r + gridOffset) / horizLines;
        if (t < 0 || t > 1) continue;
        
        const tScale = Math.pow(t, 2.2);
        const y = vy + (H - vy) * tScale;
        const halfW = (W * 0.5) * (1 - tScale) + lines * spacing * 3 * tScale;
        
        const horizGrad = ctx.createLinearGradient(vp - halfW, y, vp + halfW, y);
        const alpha = 0.06 * tScale;
        
        horizGrad.addColorStop(0, "rgba(0, 255, 200, 0)");
        horizGrad.addColorStop(0.25, `rgba(0, 255, 200, ${alpha * 0.3})`);
        horizGrad.addColorStop(0.5, `rgba(0, 255, 200, ${alpha})`);
        horizGrad.addColorStop(0.75, `rgba(0, 255, 200, ${alpha * 0.3})`);
        horizGrad.addColorStop(1, "rgba(0, 255, 200, 0)");
        
        ctx.strokeStyle = horizGrad;
        ctx.lineWidth = 0.5;
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
      
      // Update and draw ambient drifting glow nebulae
      glows.forEach(g => {
        g.update();
        g.draw();
      });
      
      // Draw grid
      drawGrid();
      
      // Update gridOffset using time base + scroll momentum
      scrollDelta *= 0.95; // decay scroll delta momentum
      gridOffset = (gridOffset + 0.0018 + scrollDelta) % 1;
      if (gridOffset < 0) gridOffset += 1;


      // Update and draw drifting interactive particles
      particlesRef.current.forEach(p => {
        p.update();
        p.draw();
      });

      // Update and draw interactive click sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.update();
        if (s.alpha <= 0) {
          sparks.splice(i, 1);
        } else {
          s.draw();
        }
      }

      // Draw subtle mouse cursor halo spotlight if active
      if (mouse.active) {
        ctx.save();
        const mouseGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 120);
        mouseGrad.addColorStop(0, "rgba(0, 255, 200, 0.04)");
        mouseGrad.addColorStop(0.5, "rgba(0, 255, 200, 0.01)");
        mouseGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = mouseGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 120, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("touchstart", handleTouchStart);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="global-holo-canvas" />;
}