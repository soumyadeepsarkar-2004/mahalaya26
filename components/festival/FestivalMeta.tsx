"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useFestivalStore } from "@/store/festival-store";
import { FESTIVAL_SCENES } from "@/data/festival";
import { textVariants } from "@/lib/motion";
import { cn } from "@/lib/utils";

export const FestivalMeta: React.FC = () => {
  const currentFestivalId = useFestivalStore((s) => s.currentFestivalId);
  const isPlayerExpanded = useFestivalStore((s) => s.isPlayerExpanded);
  const scene = FESTIVAL_SCENES.find((s) => s.id === currentFestivalId) || FESTIVAL_SCENES[0];

  return (
    <div
      className={cn(
        "fixed left-4 right-4 md:right-auto md:left-[clamp(24px,4vw,64px)] pointer-events-none z-20 transition-all duration-300",
        "bottom-[calc(265px+env(safe-area-inset-bottom,0px))] md:bottom-[clamp(240px,28vh,360px)] md:max-w-[460px]"
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={scene.id}
          variants={textVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-1.5 md:gap-2"
        >
          {/* Chapter & Numeral */}
          <div className="flex items-center gap-2 md:gap-3">
            <span className="text-[8px] md:text-[9px] font-mono tracking-[0.3em] text-white/50 uppercase">
              CHAPTER · {scene.numeral}. {scene.label}
            </span>
            <span className="w-6 md:w-8 h-px bg-white/20" />
            <span className="text-[10px] md:text-[11px] font-serif text-white/40 italic">
              {scene.bengaliLabel}
            </span>
          </div>

          {/* Subtitle / Theme */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif tracking-tight text-white/95 font-light leading-tight">
            {scene.subtitle}
          </h2>

          {/* Description (clamped on mobile) */}
          <p className="text-[11px] md:text-sm text-white/60 font-serif leading-relaxed max-w-md pt-0.5 line-clamp-2 md:line-clamp-none">
            {scene.description}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
