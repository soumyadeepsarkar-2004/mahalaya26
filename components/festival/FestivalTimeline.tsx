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
  const isPlayerExpanded = useFestivalStore((s) => s.isPlayerExpanded);

  const desktopContainerRef = useRef<HTMLDivElement | null>(null);
  const mobileContainerRef = useRef<HTMLDivElement | null>(null);
  const activeCardRef = useRef<HTMLButtonElement | null>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextFestival();
      if (e.key === "ArrowLeft") prevFestival();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextFestival, prevFestival]);

  // Auto-scroll active card into view on mobile
  useEffect(() => {
    if (activeCardRef.current && mobileContainerRef.current) {
      activeCardRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [currentFestivalId]);

  return (
    <>
      {/* =========================================================================
          DESKTOP TIMELINE (hidden md:block)
          Floating pill centered at bottom-[28px]
          ========================================================================= */}
      <div
        ref={desktopContainerRef}
        className="hidden md:block fixed left-1/2 -translate-x-1/2 bottom-[28px] z-30 pointer-events-auto"
      >
        <div className="flex items-center gap-2 p-2 rounded-full backdrop-blur-2xl bg-white/[0.07] border border-white/10 shadow-2xl">
          {FESTIVAL_SCENES.map((scene) => {
            const isActive = scene.id === currentFestivalId;

            return (
              <button
                key={scene.id}
                onClick={() => setFestival(scene.id)}
                className={cn(
                  "relative group flex items-center gap-2 px-3.5 py-1.5 rounded-full transition-all duration-300 outline-none select-none cursor-pointer shrink-0",
                  isActive
                    ? "text-white bg-white/15 shadow-sm"
                    : "text-white/50 hover:text-white/80 hover:bg-white/5"
                )}
              >
                <div
                  className={cn(
                    "w-4 h-4 rounded-full bg-cover bg-center border transition-all duration-300",
                    isActive
                      ? "border-white scale-110 shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                      : "border-white/20 opacity-60 group-hover:opacity-100"
                  )}
                  style={{
                    backgroundImage: `url(/scenes/${scene.imageBasename}-480.webp)`,
                  }}
                />

                <span className="text-[11px] font-mono tracking-wider uppercase font-medium">
                  {scene.label}
                </span>

                {isActive && (
                  <motion.div
                    layoutId="desktop-active-pill"
                    className="absolute inset-0 border border-white/25 rounded-full pointer-events-none"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          MOBILE TIMELINE (md:hidden)
          Dedicated compact horizontal scroll at bottom
          ========================================================================= */}
      <div
        className="md:hidden fixed left-3 right-3 bottom-[calc(12px+env(safe-area-inset-bottom,0px))] z-30 pointer-events-auto"
      >
        <div
          ref={mobileContainerRef}
          className="flex items-center gap-2.5 overflow-x-auto no-scrollbar scroll-smooth py-1 px-1"
        >
          {FESTIVAL_SCENES.map((scene) => {
            const isActive = scene.id === currentFestivalId;

            return (
              <button
                key={scene.id}
                ref={isActive ? activeCardRef : null}
                onClick={() => setFestival(scene.id)}
                className={cn(
                  "relative flex flex-col items-center gap-1 shrink-0 p-1 rounded-xl transition-all duration-300 outline-none select-none cursor-pointer",
                  isActive
                    ? "opacity-100 scale-105"
                    : "opacity-45 hover:opacity-75"
                )}
                style={{ width: "70px" }}
              >
                {/* Thumbnail card */}
                <div
                  className={cn(
                    "w-full h-[38px] rounded-lg bg-cover bg-center border transition-all duration-300 shadow-md",
                    isActive
                      ? "border-white/80 shadow-[0_0_10px_rgba(255,255,255,0.3)] ring-1 ring-white/40"
                      : "border-white/15"
                  )}
                  style={{
                    backgroundImage: `url(/scenes/${scene.imageBasename}-480.webp)`,
                    backgroundPosition: scene.mobilePosition || "center",
                  }}
                />

                {/* Day name */}
                <span
                  className={cn(
                    "text-[8.5px] font-mono tracking-wider uppercase truncate w-full text-center",
                    isActive ? "text-white font-medium" : "text-white/70"
                  )}
                >
                  {scene.label}
                </span>

                {/* Active indicator dot */}
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-white shadow-[0_0_4px_#fff]" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
