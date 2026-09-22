"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useFestivalStore } from "@/store/festival-store";
import { FESTIVAL_SCENES } from "@/data/festival";
import { getSurroundingScenes, preloadImage } from "@/lib/preload";

export const SceneBackground: React.FC = () => {
  const currentFestivalId = useFestivalStore((s) => s.currentFestivalId);
  const setIsTransitioning = useFestivalStore((s) => s.setIsTransitioning);
  const scene = FESTIVAL_SCENES.find((s) => s.id === currentFestivalId) || FESTIVAL_SCENES[0];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Preload surrounding scenes
  useEffect(() => {
    const { prev, next } = getSurroundingScenes(currentFestivalId);
    preloadImage(prev);
    preloadImage(next);
  }, [currentFestivalId]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black select-none pointer-events-none">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={scene.id}
          initial={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={() => setIsTransitioning(false)}
          className="absolute inset-0 w-full h-full"
        >
          <picture className="w-full h-full block">
            <source
              media="(max-width: 480px)"
              srcSet={`/scenes/${scene.imageBasename}-480.webp`}
              type="image/webp"
            />
            <source
              media="(max-width: 768px)"
              srcSet={`/scenes/${scene.imageBasename}-768.webp`}
              type="image/webp"
            />
            <source
              media="(max-width: 1280px)"
              srcSet={`/scenes/${scene.imageBasename}-1280.webp`}
              type="image/webp"
            />
            <img
              src={`/scenes/${scene.imageBasename}.webp`}
              alt={scene.label}
              className="w-full h-full object-cover transform-gpu transition-all duration-700"
              style={{
                objectPosition: isMobile && scene.mobilePosition ? scene.mobilePosition : "center center",
              }}
              loading="eager"
              decoding="async"
            />
          </picture>
        </motion.div>
      </AnimatePresence>

      {/* Subtle Vignette Overlay */}
      <div className="absolute inset-0 bg-radial from-transparent via-black/15 to-black/60 pointer-events-none z-10" />

      {/* Film Grain Texture */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none z-10 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
