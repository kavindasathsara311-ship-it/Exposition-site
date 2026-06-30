"use client";
import React, { useState, useEffect, useCallback } from "react";

export interface CardStackItem {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  href?: string;
}

interface CardStackProps {
  items: CardStackItem[];
  initialIndex?: number;
  autoAdvance?: boolean;
  intervalMs?: number;
  pauseOnHover?: boolean;
  showDots?: boolean;
}

export function CardStack({
  items,
  initialIndex = 0,
  autoAdvance = false,
  intervalMs = 2000,
  pauseOnHover = false,
  showDots = false,
}: CardStackProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (!autoAdvance || (pauseOnHover && isPaused)) return;
    const timer = setInterval(next, intervalMs);
    return () => clearInterval(timer);
  }, [autoAdvance, intervalMs, isPaused, pauseOnHover, next]);

  return (
    <div
      className="relative w-full h-[500px] flex items-center justify-center"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {items.map((item, index) => {
        let offset = (index - activeIndex) % items.length;
        if (offset > Math.floor(items.length / 2)) offset -= items.length;
        if (offset < -Math.floor(items.length / 2)) offset += items.length;

        const isActive = offset === 0;
        const zIndex = 50 - Math.abs(offset);
        const scale = 1 - Math.abs(offset) * 0.15;
        const translateY = Math.abs(offset) * 40;
        const translateX = offset * 180;
        const rotateZ = offset * 12;

        const CardInner = (
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[420px] rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
            style={{
              zIndex,
              transform: `translate(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px)) scale(${scale}) rotate(${rotateZ}deg)`,
              opacity: Math.abs(offset) > 2 ? 0 : 1,
              pointerEvents: isActive ? "auto" : "none",
            }}
          >
            <img
              src={item.imageSrc}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-bold mb-1">{item.title}</h3>
              <p className="text-sm text-white/80">{item.description}</p>
            </div>
          </div>
        );

        return item.href && isActive ? (
          <a key={item.id} href={item.href} target="_blank" rel="noopener noreferrer">
            {CardInner}
          </a>
        ) : (
          <div key={item.id}>{CardInner}</div>
        );
      })}

      {showDots && (
        <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2 z-50">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === activeIndex ? "w-6 bg-white" : "w-2 bg-white/40"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
