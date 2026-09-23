"use client";

import React, { useState, useEffect } from "react";

const SKILLS_ARRAY: string[] = [
  "Web Development",
  "Backend Development",
  "API Development",
  "Full Stack Web Development",
  "System Design",
  "Payment Gateway",
];

interface TypingEffectProps {
  skills?: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export default function TypingEffect({
  skills = SKILLS_ARRAY,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 1500,
}: TypingEffectProps) {
  const [arrayIndex, setArrayIndex] = useState<number>(0);
  const [textIndex, setTextIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    const currentWord = skills[arrayIndex];

    // Determine delay based on typing, deleting, or pausing phases
    let timeoutDelay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && textIndex === currentWord.length) {
      // Pause at the end of typing before deleting
      timeoutDelay = pauseDuration;
    } else if (isDeleting && textIndex === 0) {
      // Small pause after completely clearing a word
      timeoutDelay = 300;
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (textIndex < currentWord.length) {
          setTextIndex((prev) => prev + 1);
        } else {
          setIsDeleting(true);
        }
      } else {
        if (textIndex > 0) {
          setTextIndex((prev) => prev - 1);
        } else {
          setIsDeleting(false);
          setArrayIndex((prev) => (prev + 1) % skills.length);
        }
      }
    }, timeoutDelay);

    // Clean up timeout to prevent memory leaks on unmount/re-render
    return () => clearTimeout(timer);
  }, [textIndex, isDeleting, arrayIndex, skills, typingSpeed, deletingSpeed, pauseDuration]);

  const currentDisplayedText = skills[arrayIndex].substring(0, textIndex);

  return (
    <div className="inline-flex items-center font-mono text-2xl font-bold sm:text-4xl">
      <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-500 bg-clip-text text-transparent">
        {currentDisplayedText}
      </span>
      {/* Blinking Cursor */}
      <span className="ml-1 inline-block h-7 w-1 animate-pulse bg-purple-400 sm:h-9" />
    </div>
  );
}