import React, { useRef } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

function AnimatedDiv({ className, children, animationClass = "animate-in" }) {
  const ref = useRef(null);
  useScrollAnimation(ref, animationClass);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

function AnimatedHeader({ className, children, animationClass = "animate-in" }) {
  const ref = useRef(null);
  useScrollAnimation(ref, animationClass);
  return (
    <header ref={ref} className={className}>
      {children}
    </header>
  );
}

export default function Timeline() {
  return (
    <section id="time-line">
      <h1 style={{ display: "none" }}>Time Line</h1>

      <AnimatedHeader className="timeline-header animate-on-scroll fade-up">
        <div className="header-subtitle">
          <span className="issue-tag">Event Universe</span>
          <span className="tagline">Navigate through our immersive event ecosystem</span>
        </div>

        <div className="header-main-title">
          <img src="/Resources/ExpoLogo.png" className="expo-logo" alt="expo logo" />
        </div>
      </AnimatedHeader>

      {/* Timeline Container */}
      <main className="timeline-container">
        {/* Golden Central Vertical Line */}
        <div className="spine-line"></div>

        {/* 1. Exposition Magazine (Left) */}
        <AnimatedDiv className="timeline-item left animate-on-scroll flip-3d-y">
          <div className="content-box">
            <div className="item-title">Exposition Magazine</div>
            <p className="description">
              A publication that brings together industry insights, innovation, and academic excellence.
            </p>
          </div>
          <div className="badge-container">
            <div className="horizontal-connector"></div>
            <div className="icon-badge">
              <i className="fa-solid fa-book-open"></i>
            </div>
          </div>
        </AnimatedDiv>

        {/* 2. Interviews (Right) */}
        <AnimatedDiv className="timeline-item right animate-on-scroll flip-3d-y">
          <div className="badge-container">
            <div className="icon-badge">
              <i className="fa-solid fa-microphone-lines"></i>
            </div>
            <div className="horizontal-connector"></div>
          </div>
          <div className="content-box">
            <div className="item-title">Interviews</div>
            <p className="description">
              Exclusive insights, executive perspectives, and dialogues with industry pioneers and tech leaders.
            </p>
          </div>
        </AnimatedDiv>

        {/* 3. Industrial Week (Left) */}
        <AnimatedDiv className="timeline-item left animate-on-scroll flip-3d-y">
          <div className="content-box">
            <div className="item-title">Industrial Week</div>
            <p className="description">
              Inspiring careers through meaningful connections, insights, and opportunities. 
            </p>
          </div>
          <div className="badge-container">
            <div className="horizontal-connector"></div>
            <div className="icon-badge">
              <i className="fa-solid fa-industry"></i>
            </div>
          </div>
        </AnimatedDiv>

        {/* 4. Edify (Right) */}
        <AnimatedDiv className="timeline-item right animate-on-scroll flip-3d-y">
          <div className="badge-container">
            <div className="icon-badge">
              <i className="fa-solid fa-graduation-cap"></i>
            </div>
            <div className="horizontal-connector"></div>
          </div>
          <div className="content-box">
            <div className="item-title">Exposition Podcast Series</div>
            <p className="description">
              Inspiring the next generation through meaningful conversations with industry leaders and innovators. 
            </p>
          </div>
        </AnimatedDiv>

        {/* 5. How You Did It (Left) */}
        <AnimatedDiv className="timeline-item left animate-on-scroll flip-3d-y">
          <div className="content-box">
            <div className="item-title">University Tech Events Hub</div>
            <p className="description">
              A centralized digital platform designed to showcase technology-focused events organized by universities across Sri Lanka.
            </p>
          </div>
          <div className="badge-container">
            <div className="horizontal-connector"></div>
            <div className="icon-badge">
              <i className="fa-solid fa-lightbulb"></i>
            </div>
          </div>
        </AnimatedDiv>

        {/* 6. Workshops (Right) */}
        <AnimatedDiv className="timeline-item right animate-on-scroll flip-3d-y">
          <div className="badge-container">
            <div className="icon-badge">
              <i className="fa-solid fa-chalkboard-user"></i>
            </div>
            <div className="horizontal-connector"></div>
          </div>
          <div className="content-box">
            <div className="item-title">Industrial Forum</div>
            <p className="description">
              Empowering future professionals through meaningful conversations, industry insights, and real-world perspectives. 
            </p>
          </div>
        </AnimatedDiv>

        {/* 7. Industrial Forum (Left) */}
        <AnimatedDiv className="timeline-item left animate-on-scroll flip-3d-y">
          <div className="content-box">
            <div className="item-title">Career Fair</div>
            <p className="description">
              Connecting emerging undergraduate talents directly with premier tech enterprises and corporate recruiters.
            </p>
          </div>
          <div className="badge-container">
            <div className="horizontal-connector"></div>
            <div className="icon-badge">
              <i className="fa-solid fa-comments"></i>
            </div>
          </div>
        </AnimatedDiv>

        {/* 8. Career Fair (Right) */}
        <AnimatedDiv className="timeline-item right animate-on-scroll flip-3d-y">
          <div className="badge-container">
            <div className="icon-badge">
              <i className="fa-solid fa-briefcase"></i>
            </div>
            <div className="horizontal-connector"></div>
          </div>
          <div className="content-box">
            <div className="item-title">Want to Partner with Us?</div>
            <p className="description">
              Connect with tomorrow’s talent while strengthening your presence within a futurefocused community. 
            </p>
          </div>
        </AnimatedDiv>
      </main>
    </section>
  );
}
