import React, { useRef } from "react";
import { keynoteSpeakersData } from "../data/interviewData";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function KeynoteSpeakers() {
  const sectionRef = useRef(null);
  useScrollAnimation(sectionRef, "animate-in");

  if (keynoteSpeakersData.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="ks-section animate-on-scroll fade-up"
      id="cylinder"
    >
      <header className="ks-head">
        <h2 className="section-title community-voices-header">Keynote Speakers</h2>
        <p className="section-subtitle">Voices that fueled our vision</p>
      </header>

      <div className="ks-deck">
        {keynoteSpeakersData.map((person, idx) => (
          <article
            key={idx}
            className="ks-card"
            style={{ "--ks-delay": `${idx * 90}ms` }}
          >
            <span className="ks-card-frame" aria-hidden="true" />

            <div className="ks-card-media">
              <img src={person.image} alt={person.name} loading="lazy" />
              <div className="ks-card-shade" />
              {person.issue && <span className="ks-card-issue">{person.issue}</span>}
            </div>

            <div className="ks-card-body">
              <h3 className="ks-card-name">{person.name}</h3>
              <p className="ks-card-role">{person.title}</p>
              {person.company && <p className="ks-card-company">{person.company}</p>}

              {person.quote && (
                <p className="ks-card-quote">
                  <span className="ks-quote-mark">&ldquo;</span>
                  {person.quote}
                </p>
              )}

              {person.tags?.length > 0 && (
                <div className="ks-card-tags">
                  {person.tags.map((tag, i) => (
                    <span key={i} className="ks-tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
