"use client";

import React, { useRef } from "react";
import { useFestivalStore } from "@/store/festival-store";

interface SwipeGestureProps {
  children: React.ReactNode;
}

export const SwipeGesture: React.FC<SwipeGestureProps> = ({ children }) => {
  const nextFestival = useFestivalStore((s) => s.nextFestival);
  const prevFestival = useFestivalStore((s) => s.prevFestival);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    // Ignore touches on sliders or timeline
    const target = e.target as HTMLElement;
    if (
      target.closest("input[type='range']") ||
      target.closest(".timeline-container-pos") ||
      target.closest(".radio-card") ||
      target.closest("button")
    ) {
      touchStartX.current = null;
      touchStartY.current = null;
      return;
    }

    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const diffX = touchEndX - touchStartX.current;
    const diffY = touchEndY - touchStartY.current;

    // Check if horizontal swipe dominates and exceeds threshold of 50px
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX < 0) {
        // Swiped Left -> Next Festival
        nextFestival();
      } else {
        // Swiped Right -> Previous Festival
        prevFestival();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="w-full h-full"
    >
      {children}
    </div>
  );
};
