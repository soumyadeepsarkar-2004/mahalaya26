"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  ChevronUp,
  ChevronDown,
  RotateCcw,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useFestivalStore } from "@/store/festival-store";
import { FESTIVAL_SCENES } from "@/data/festival";
import { formatTime } from "@/lib/utils";
import { useAudio } from "./useAudio";
import { AudioVisualizer } from "./AudioVisualizer";
import { GlassSlider } from "@/components/glass/GlassSlider";

export const AmbientPlayer: React.FC = () => {
  const { track } = useAudio();

  const isPlaying = useFestivalStore((s) => s.isPlaying);
  const isLoading = useFestivalStore((s) => s.isLoading);
  const audioError = useFestivalStore((s) => s.audioError);
  const currentTime = useFestivalStore((s) => s.currentTime);
  const duration = useFestivalStore((s) => s.duration);
  const volume = useFestivalStore((s) => s.volume);
  const isPlayerExpanded = useFestivalStore((s) => s.isPlayerExpanded);

  const togglePlay = useFestivalStore((s) => s.togglePlay);
  const nextTrack = useFestivalStore((s) => s.nextTrack);
  const prevTrack = useFestivalStore((s) => s.prevTrack);
  const setVolume = useFestivalStore((s) => s.setVolume);
  const seekTo = useFestivalStore((s) => s.seekTo);
  const togglePlayerExpanded = useFestivalStore((s) => s.togglePlayerExpanded);

  const currentFestivalId = useFestivalStore((s) => s.currentFestivalId);
  const currentScene =
    FESTIVAL_SCENES.find((s) => s.id === currentFestivalId) || FESTIVAL_SCENES[0];

  // Mobile Volume Popover state
  const [showVolumePopover, setShowVolumePopover] = useState(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  // Close popover on outside click
  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setShowVolumePopover(false);
      }
    };
    if (showVolumePopover) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [showVolumePopover]);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      {/* =========================================================================
          DESKTOP PLAYER (hidden md:flex)
          Floating cinematic glass card at bottom-left
          ========================================================================= */}
      <div className="radio-card hidden md:flex fixed z-40 pointer-events-auto bottom-[28px] left-[clamp(24px,4vw,64px)] w-[280px] xl:w-[320px] p-4 rounded-[4px] backdrop-blur-2xl bg-white/[0.08] border border-white/10 shadow-2xl flex-col gap-3">
        {/* Top Editorial Row */}
        <div className="flex items-center justify-between w-full">
          <span className="text-[8px] font-mono tracking-[0.3em] text-white/60">
            PUJA RADIO
          </span>
          <AudioVisualizer isPlaying={isPlaying} />
        </div>

        <div className="w-full h-px bg-white/10" />

        {/* Middle Row: Artwork + Track Name */}
        <div className="flex items-center gap-3 w-full">
          <div
            className="w-14 h-14 rounded-[2px] bg-cover bg-center shrink-0 border border-white/15 shadow-md transition-all duration-700"
            style={{
              backgroundImage: `url(/scenes/${currentScene.imageBasename}-480.webp)`,
            }}
          />
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-[8px] font-mono tracking-[0.2em] text-white/40 uppercase mb-0.5">
              NOW PLAYING
            </span>
            <span className="text-sm text-white/90 font-serif truncate w-full">
              {track.title}
            </span>
            <span className="text-[9px] text-white/40 font-mono tracking-wider truncate">
              {track.artist}
            </span>
          </div>
        </div>

        {/* Seek line on desktop */}
        <div className="flex items-center gap-2 w-full pt-1">
          <span className="text-[8px] font-mono text-white/40 w-7">
            {formatTime(currentTime)}
          </span>
          <div className="flex-1 relative flex items-center">
            <GlassSlider
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={seekTo}
            />
          </div>
          <span className="text-[8px] font-mono text-white/40 w-7 text-right">
            {formatTime(duration)}
          </span>
        </div>

        <div className="w-full h-px bg-white/5" />

        {/* Controls Row */}
        <div className="flex items-center justify-between gap-3 w-full">
          <div className="flex items-center gap-4">
            <button
              onClick={prevTrack}
              aria-label="Previous Track"
              className="text-white/40 hover:text-white transition-colors cursor-pointer outline-none p-1"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center outline-none hover:bg-white/10 active:bg-white/20 transition-all cursor-pointer shadow-md"
            >
              {isLoading ? (
                <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-3.5 h-3.5 text-white" />
              ) : (
                <Play className="w-3.5 h-3.5 text-white translate-x-[0.5px]" />
              )}
            </button>

            <button
              onClick={nextTrack}
              aria-label="Next Track"
              className="text-white/40 hover:text-white transition-colors cursor-pointer outline-none p-1"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Desktop Volume */}
          <div className="flex items-center gap-2 max-w-[110px] flex-1">
            <Volume2 className="w-3 h-3 text-white/40 shrink-0" />
            <GlassSlider value={volume} onChange={setVolume} />
          </div>
        </div>
      </div>

      {/* =========================================================================
          MOBILE DOCK PLAYER (md:hidden)
          Dedicated fixed bottom dock, height 68-80px in compact mode, expandable.
          ========================================================================= */}
      <div className="md:hidden fixed left-3 right-3 bottom-[calc(10px+env(safe-area-inset-bottom,0px))] z-40 pointer-events-auto">
        {/* Mobile Volume Popover */}
        <AnimatePresence>
          {showVolumePopover && (
            <motion.div
              ref={popoverRef}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-2 bottom-[calc(100%+12px)] p-3 rounded-2xl backdrop-blur-3xl bg-neutral-900/90 border border-white/15 shadow-2xl flex items-center gap-3 w-[180px]"
            >
              <Volume2 className="w-4 h-4 text-white/60 shrink-0" />
              <GlassSlider value={volume} onChange={setVolume} />
              <button
                onClick={() => setShowVolumePopover(false)}
                className="text-[10px] font-mono text-white/40 hover:text-white pl-1"
              >
                &times;
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Dock Container */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 350, damping: 32 }}
          className="relative overflow-hidden rounded-[20px] backdrop-blur-2xl bg-black/60 border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
        >
          {/* Thin seek progress line at the very top of the dock */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/10">
            <div
              className="h-full bg-white/70 transition-all duration-200"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Compact View (Always Visible Header Bar) */}
          <div
            onClick={togglePlayerExpanded}
            className="flex items-center justify-between px-3.5 py-3 cursor-pointer select-none"
          >
            {/* Left: Signal + Label + Track Info */}
            <div className="flex items-center gap-2.5 min-w-0 flex-1 pr-2">
              <AudioVisualizer isPlaying={isPlaying} />
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[7.5px] font-mono tracking-[0.25em] text-white/50 uppercase">
                    PUJA RADIO
                  </span>
                  <span className="text-[7.5px] font-mono text-white/30">•</span>
                  <span className="text-[7.5px] font-mono text-white/40 uppercase">
                    {audioError
                      ? "ERROR"
                      : isLoading
                      ? "LOADING"
                      : isPlaying
                      ? "ON AIR"
                      : "PAUSED"}
                  </span>
                </div>
                <span className="text-xs text-white/95 font-serif truncate">
                  {audioError ? "Audio unavailable — tap retry" : track.title}
                </span>
              </div>
            </div>

            {/* Right: Expand Chevron + Primary Play Button */}
            <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setShowVolumePopover(!showVolumePopover)}
                aria-label="Adjust Volume"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-colors"
              >
                {volume === 0 ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>

              <button
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white active:scale-95 transition-all shadow-md"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 text-white animate-spin" />
                ) : audioError ? (
                  <RotateCcw className="w-4 h-4 text-amber-400" />
                ) : isPlaying ? (
                  <Pause className="w-4 h-4 text-white" />
                ) : (
                  <Play className="w-4 h-4 text-white translate-x-[0.5px]" />
                )}
              </button>

              <button
                onClick={togglePlayerExpanded}
                aria-label={isPlayerExpanded ? "Collapse player" : "Expand player"}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/40"
              >
                {isPlayerExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronUp className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Expanded Drawer Area */}
          <AnimatePresence>
            {isPlayerExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="px-4 pb-4 pt-1 flex flex-col gap-3 border-t border-white/5"
              >
                {/* Seek Scrubber with Timestamps */}
                <div className="flex flex-col gap-1 w-full pt-1">
                  <GlassSlider
                    min={0}
                    max={duration || 100}
                    value={currentTime}
                    onChange={seekTo}
                  />
                  <div className="flex items-center justify-between text-[8px] font-mono text-white/40">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Secondary Transport Controls */}
                <div className="flex items-center justify-center gap-8 py-1">
                  <button
                    onClick={prevTrack}
                    aria-label="Previous Track"
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white/60 active:text-white"
                  >
                    <SkipBack className="w-5 h-5" />
                  </button>

                  <button
                    onClick={togglePlay}
                    aria-label={isPlaying ? "Pause" : "Play"}
                    className="w-13 h-13 rounded-full bg-white/15 border border-white/25 flex items-center justify-center text-white shadow-lg active:scale-95 transition-all"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5 translate-x-[1px]" />
                    )}
                  </button>

                  <button
                    onClick={nextTrack}
                    aria-label="Next Track"
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white/60 active:text-white"
                  >
                    <SkipForward className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
};
