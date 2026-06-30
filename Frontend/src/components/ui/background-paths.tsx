"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function BackgroundPaths() {
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    // Generate a beautiful, dense bundle of sweeping parametric curves
    // to match the "Background Paths" aesthetic from the Kokonut UI screenshot.
    const generatedPaths = Array.from({ length: 60 }).map((_, i) => {
      // Create sweeping, converging lines
      const yOffset = (i - 30) * 12; // Spread them vertically
      const controlY1 = 100 + yOffset * 1.5;
      const controlY2 = 700 - yOffset * 0.5;
      
      const d = `M -200,${500 + yOffset} C 400,${controlY1} 800,${controlY2} 1400,${300 + yOffset * 2}`;
      
      return {
        d,
        duration: 15 + Math.random() * 10, // 15s to 25s
        delay: -(Math.random() * 20), // Random starting point in the animation loop
        opacity: 0.05 + Math.random() * 0.15,
        strokeWidth: 0.5 + Math.random() * 1.5,
      };
    });
    setPaths(generatedPaths);
  }, []);

  return (
    <div className="fixed inset-0 z-[-10] pointer-events-none overflow-hidden bg-[#050505]">
      {/* Soft gradient overlay to blend the edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505] z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] z-10" />
      
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
      >
        {paths.map((path, i) => (
          <motion.path
            key={i}
            d={path.d}
            stroke="#ffffff"
            strokeWidth={path.strokeWidth}
            fill="none"
            opacity={path.opacity}
            initial={{ strokeDashoffset: 1000, strokeDasharray: "1000 1000" }}
            animate={{ strokeDashoffset: [1000, -1000] }}
            transition={{
              duration: path.duration,
              repeat: Infinity,
              ease: "linear",
              delay: path.delay,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
