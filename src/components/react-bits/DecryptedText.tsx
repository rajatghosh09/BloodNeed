"use client";

import { useEffect, useState, useRef } from "react";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  className?: string;
    parentClassName?: string;
    animateOn?: "view" | "hover";
}

export default function DecryptedText({
  text,
  speed = 30, // Defaulted to faster
  maxIterations = 5, // Reduced for a snappier reveal
  className = "",
  parentClassName = "",
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [hasAnimated, setHasAnimated] = useState(false); // One-time check
  const [isIntersecting, setIsIntersecting] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  // Intersection Observer to detect when it enters the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsIntersecting(true);
        }
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    let iteration = 0;
    let interval: any;

    // Only start if it's in view AND hasn't finished yet
    if (isIntersecting && !hasAnimated) {
      interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              const threshold = text.length - iteration;
              if (index >= threshold) return text[index];
              
              return "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
          setHasAnimated(true);
        }
        
        iteration += 1 / maxIterations;
      }, speed);
    }

    return () => clearInterval(interval);
  }, [isIntersecting, text, speed, maxIterations, hasAnimated]);

  return (
    <span ref={containerRef} className={parentClassName}>
      <span className={className}>{displayText}</span>
    </span>
  );
}