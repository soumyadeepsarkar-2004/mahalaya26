"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, BookOpen, Image as ImageIcon, Info } from "lucide-react";
import { useFestivalStore } from "@/store/festival-store";
import { FESTIVAL_SCENES } from "@/data/festival";

export const MobileSheets: React.FC = () => {
  const activeSheet = useFestivalStore((s) => s.activeSheet);
  const setActiveSheet = useFestivalStore((s) => s.setActiveSheet);
  const setFestival = useFestivalStore((s) => s.setFestival);

  const close = () => setActiveSheet(null);

  return (
    <AnimatePresence>
      {activeSheet && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 pointer-events-auto"
          />

          {/* Bottom Sheet Container */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 w-full max-w-lg md:left-1/2 md:-translate-x-1/2 rounded-t-[28px] p-6 pb-[calc(24px+env(safe-area-inset-bottom,0px))] z-50 backdrop-blur-3xl bg-neutral-900/90 border-t border-white/10 shadow-2xl text-white pointer-events-auto"
          >
            {/* Grab handle */}
            <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-6" />

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-mono tracking-[0.25em] text-white/50 uppercase">
                {activeSheet}
              </h3>
              <button
                onClick={close}
                aria-label="Close sheet"
                className="p-1 rounded-full text-white/40 hover:text-white transition-colors cursor-pointer outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sheet Content: MENU */}
            {activeSheet === "menu" && (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setActiveSheet("archive")}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 text-white/60" />
                    <div>
                      <div className="text-sm font-serif text-white/90">Archive</div>
                      <div className="text-[10px] font-mono text-white/40">
                        Explore all 9 festival chapters
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-white/40">&rarr;</span>
                </button>

                <button
                  onClick={() => setActiveSheet("about")}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <Info className="w-4 h-4 text-white/60" />
                    <div>
                      <div className="text-sm font-serif text-white/90">About</div>
                      <div className="text-[10px] font-mono text-white/40">
                        The philosophy and creative vision
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-white/40">&rarr;</span>
                </button>
              </div>
            )}

            {/* Sheet Content: ABOUT */}
            {activeSheet === "about" && (
              <div className="flex flex-col gap-4 text-xs text-white/70 font-serif leading-relaxed">
                <p>
                  <strong>Mahalaya &apos;26</strong> is an ambient digital installation
                  dedicated to the memories, soundscapes, and photographic heritage of
                  Durga Puja in Bengal.
                </p>
                <p>
                  From the crackling early morning radio broadcast of Mahalaya to the
                  quiet contemplation of Ekadashi, this project preserves the feeling of
                  watching the festival unfold from a Kolkata balcony.
                </p>
                <div className="pt-2 text-[10px] font-mono text-white/40 uppercase tracking-widest">
                  Design & Curation &mdash; Soumyadeep &copy; 2026
                </div>
              </div>
            )}

            {/* Sheet Content: ARCHIVE */}
            {activeSheet === "archive" && (
              <div className="grid grid-cols-1 gap-2 max-h-[50vh] overflow-y-auto no-scrollbar">
                {FESTIVAL_SCENES.map((scene) => (
                  <button
                    key={scene.id}
                    onClick={() => {
                      setFestival(scene.id);
                      close();
                    }}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 transition-colors text-left"
                  >
                    <div
                      className="w-10 h-10 rounded-md bg-cover bg-center border border-white/10 shrink-0"
                      style={{
                        backgroundImage: `url(/scenes/${scene.imageBasename}-480.webp)`,
                      }}
                    />
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono text-white/40 uppercase">
                          {scene.date}
                        </span>
                        <span className="text-[10px] font-serif text-white/30 italic">
                          {scene.bengaliLabel}
                        </span>
                      </div>
                      <span className="text-xs font-serif text-white/90 font-medium truncate">
                        {scene.label} &mdash; {scene.subtitle}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
