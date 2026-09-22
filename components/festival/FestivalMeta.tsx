"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useFestivalStore } from "@/store/festival-store";
import { FESTIVAL_SCENES } from "@/data/festival";
import { textVariants } from "@/lib/motion";

export const FestivalMeta: React.FC = () => {
  const currentFestivalId = useFestivalStore((s) => s.currentFestivalId);
  const scene = FESTIVAL_SCENES.find((s) => s.id === currentFestivalId) || FESTIVAL_SCENES[0];

  return (
    <div className="absolute left-[clamp(24px,4vw,64px)] bottom-[clamp(280px,36vh,420px)] md:bottom-[clamp(200px,26vh,320px)] max-w-[min(480px,88vw)] pointer-events-none z-20">
      <AnimatePresence mode="wait">
        <motion.div
          key={scene.id}
          variants={textVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-2"
        >
          {/* Chapter & Numeral */}
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-mono tracking-[0.35em] text-white/50 uppercase">
              CHAPTER · {scene.numeral}. {scene.label}
            </span>
            <span className="w-8 h-px bg-white/20" />
            <span className="text-[11px] font-serif text-white/40 italic">
              {scene.bengaliLabel}
            </span>
          </div>

          {/* Subtitle / Theme */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif tracking-tight text-white/95 font-light leading-snug">
            {scene.subtitle}
          </h2>

          {/* Description */}
          <p className="text-xs md:text-sm text-white/60 font-serif leading-relaxed max-w-md pt-1">
            {scene.description}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
