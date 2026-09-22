"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { useFestivalStore } from "@/store/festival-store";
import { FESTIVAL_SCENES, type FestivalId } from "@/data/festival";
import { cn } from "@/lib/utils";

export const FestivalTimeline: React.FC = () => {
  const currentFestivalId = useFestivalStore((s) => s.currentFestivalId);
  const setFestival = useFestivalStore((s) => s.setFestival);
  const nextFestival = useFestivalStore((s) => s.nextFestival);
  const prevFestival = useFestivalStore((s) => s.prevFestival);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextFestival();
      if (e.key === "ArrowLeft") prevFestival();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextFestival, prevFestival]);

  return (
    <div
      ref={containerRef}
      className="timeline-container-pos absolute left-1/2 -translate-x-1/2 bottom-[140px] md:bottom-[28px] w-[calc(100%-32px)] md:w-auto max-w-[min(1000px,85vw)] z-30 pointer-events-auto"
    >
      <div className="flex items-center gap-1.5 md:gap-2 p-1.5 md:p-2 rounded-2xl md:rounded-full backdrop-blur-2xl bg-white/[0.07] border border-white/10 shadow-2xl overflow-x-auto no-scrollbar">
        {FESTIVAL_SCENES.map((scene) => {
          const isActive = scene.id === currentFestivalId;

          return (
            <button
              key={scene.id}
              onClick={() => setFestival(scene.id)}
              className={cn(
                "relative group flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 outline-none select-none cursor-pointer shrink-0",
                isActive
                  ? "text-white bg-white/15 shadow-sm"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
              )}
            >
              {/* Thumbnail on hover / active (desktop) */}
              <div
                className={cn(
                  "hidden md:block w-4 h-4 rounded-full bg-cover bg-center border transition-all duration-300",
                  isActive
                    ? "border-white scale-110 shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                    : "border-white/20 opacity-60 group-hover:opacity-100"
                )}
                style={{
                  backgroundImage: `url(/scenes/${scene.imageBasename}-480.webp)`,
                }}
              />

              <div className="flex flex-col text-left">
                <span className="text-[10px] md:text-[11px] font-mono tracking-wider uppercase font-medium">
                  {scene.label}
                </span>
              </div>

              {/* Active Spring Indicator */}
              {isActive && (
                <motion.div
                  layoutId="timeline-active-pill"
                  className="absolute inset-0 border border-white/25 rounded-full pointer-events-none"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
