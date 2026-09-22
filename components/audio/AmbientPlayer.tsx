"use client";

import React, { useState, useRef } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  RotateCcw,
  GripHorizontal,
  Radio as RadioIcon,
  Loader2,
  Signal,
  Disc3,
  Flame,
  Music,
} from "lucide-react";
import { motion, useAnimation } from "motion/react";
import { useFestivalStore } from "@/store/festival-store";
import { FESTIVAL_SCENES } from "@/data/festival";
import { formatTime } from "@/lib/utils";
import { useAudio } from "./useAudio";

export const AmbientPlayer: React.FC = () => {
  const { track, playlist, currentIndex } = useAudio();

  const isPlaying = useFestivalStore((s) => s.isPlaying);
  const isLoading = useFestivalStore((s) => s.isLoading);
  const audioError = useFestivalStore((s) => s.audioError);
  const isLiveStream = useFestivalStore((s) => s.isLiveStream);
  const currentTime = useFestivalStore((s) => s.currentTime);
  const duration = useFestivalStore((s) => s.duration);
  const volume = useFestivalStore((s) => s.volume);

  const togglePlay = useFestivalStore((s) => s.togglePlay);
  const nextTrack = useFestivalStore((s) => s.nextTrack);
  const prevTrack = useFestivalStore((s) => s.prevTrack);
  const setTrackIndex = useFestivalStore((s) => s.setTrackIndex);
  const setVolume = useFestivalStore((s) => s.setVolume);
  const seekTo = useFestivalStore((s) => s.seekTo);

  const currentFestivalId = useFestivalStore((s) => s.currentFestivalId);
  const currentScene =
    FESTIVAL_SCENES.find((s) => s.id === currentFestivalId) || FESTIVAL_SCENES[0];

  // Motion controls for drag and reset to original position
  const controls = useAnimation();
  const [hasMoved, setHasMoved] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const prevVolume = useRef(volume);

  const handleResetPosition = () => {
    controls.start({
      x: 0,
      y: 0,
      transition: { type: "spring", stiffness: 350, damping: 28 },
    });
    setHasMoved(false);
  };

  const toggleMute = () => {
    if (volume > 0) {
      prevVolume.current = volume;
      setVolume(0);
      setIsMuted(true);
    } else {
      setVolume(prevVolume.current || 0.8);
      setIsMuted(false);
    }
  };

  // Needle position calculation:
  // If track is recorded with duration: reflects playback progress
  // If live stream: reflects station position across the dial
  const stationRatio = playlist.length > 1 ? currentIndex / (playlist.length - 1) : 0.5;
  const progressPercent =
    !isLiveStream && duration > 0
      ? (currentTime / duration) * 100
      : stationRatio * 100;

  // Category Icon & Badge
  const getCategoryBadge = () => {
    switch (track.category) {
      case "radio":
        return {
          icon: <Signal className="w-2.5 h-2.5 text-red-400 animate-pulse" />,
          label: "LIVE FM RADIO",
          color: "text-red-400 border-red-500/30 bg-red-500/10",
        };
      case "dhak":
        return {
          icon: <Flame className="w-2.5 h-2.5 text-amber-400 animate-bounce" />,
          label: "DHAK BEATS",
          color: "text-amber-400 border-amber-500/30 bg-amber-500/10",
        };
      case "chant":
        return {
          icon: <Disc3 className="w-2.5 h-2.5 text-orange-400" />,
          label: "SACRED CHANT",
          color: "text-orange-300 border-orange-500/30 bg-orange-500/10",
        };
      default:
        return {
          icon: <Music className="w-2.5 h-2.5 text-emerald-400" />,
          label: "FESTIVE SONG",
          color: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10",
        };
    }
  };

  const badge = getCategoryBadge();

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.08}
      animate={controls}
      onDragStart={() => setHasMoved(true)}
      whileDrag={{ scale: 1.02, cursor: "grabbing", zIndex: 60 }}
      className="fixed z-40 pointer-events-auto cursor-grab select-none transition-shadow duration-300 right-3 md:right-8 bottom-[calc(10px+env(safe-area-inset-bottom,0px))] md:bottom-8 w-[calc(100vw-24px)] max-w-[340px] md:max-w-[370px]"
    >
      {/* =========================================================================
          VINTAGE RADIO CHASSIS CONTAINER
          ========================================================================= */}
      <div className="relative rounded-[16px] p-3.5 md:p-4 bg-gradient-to-b from-[#221e1a]/95 via-[#1a1614]/95 to-[#120f0d]/95 backdrop-blur-2xl border-2 border-[#5c4a3b]/60 shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.15)] overflow-hidden">
        
        {/* Telescopic Antenna Decoration */}
        <div className="absolute -top-3 right-6 w-36 h-[3px] bg-gradient-to-r from-neutral-600 via-neutral-300 to-neutral-400 rotate-[-18deg] origin-left rounded-full pointer-events-none opacity-80 shadow-md" />

        {/* Metallic Corner Screws */}
        <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-neutral-600 border border-neutral-400/40 shadow-inner" />
        <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-neutral-600 border border-neutral-400/40 shadow-inner" />
        <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-neutral-600 border border-neutral-400/40 shadow-inner" />
        <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-neutral-600 border border-neutral-400/40 shadow-inner" />

        {/* -----------------------------------------------------------------------
            1. TOP PANEL: Brand Badge + Re-place (Reset) Button + Drag Handle
            ----------------------------------------------------------------------- */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#3d3126]">
          {/* Radio Brand Badge */}
          <div className="flex items-center gap-2">
            <RadioIcon className="w-3.5 h-3.5 text-[#d49b58]" />
            <div className="flex flex-col">
              <span className="text-[9px] font-mono tracking-[0.25em] font-bold text-[#e6b980] uppercase">
                PUJA RADIO
              </span>
              <span className="text-[6.5px] font-mono tracking-widest text-[#9c7d5c] uppercase">
                AKASHVANI KOLKATA · SOLID STATE
              </span>
            </div>
          </div>

          {/* Controls: Drag Indicator & Re-place button */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleResetPosition}
              title="Reset to original bottom-right position"
              aria-label="Reset to original position"
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-[8px] font-mono tracking-wider uppercase transition-all cursor-pointer shadow-sm ${
                hasMoved
                  ? "bg-[#d49b58]/25 hover:bg-[#d49b58]/40 border-[#d49b58] text-[#e6b980] animate-pulse"
                  : "bg-white/5 hover:bg-white/10 border-white/10 text-white/50"
              }`}
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span>RE-PLACE</span>
            </button>
            <div
              title="Drag to move anywhere"
              className="p-1 text-neutral-500 hover:text-neutral-300 cursor-grab active:cursor-grabbing"
            >
              <GripHorizontal className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* -----------------------------------------------------------------------
            2. MAIN FACEPLATE: Speaker Grille + Illuminated Frequency Dial
            ----------------------------------------------------------------------- */}
        <div className="grid grid-cols-[96px_1fr] md:grid-cols-[112px_1fr] gap-3 items-center mb-2.5">
          
          {/* Perforated Circular Speaker Grille */}
          <div className="relative w-full aspect-square rounded-xl bg-[#14110f] border border-[#3d3126] shadow-inner p-2 flex items-center justify-center overflow-hidden">
            {/* Dot Matrix Speaker Grille Pattern */}
            <div
              className="absolute inset-0 opacity-40 mix-blend-screen"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #8a735c 1.2px, transparent 1.2px)",
                backgroundSize: "6px 6px",
              }}
            />
            {/* Center Album Art Badge */}
            <div
              className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-cover bg-center border-2 border-[#d49b58]/60 shadow-[0_0_12px_rgba(0,0,0,0.8)] z-10 transition-all duration-700"
              style={{
                backgroundImage: `url(/scenes/${currentScene.imageBasename}-480.webp)`,
              }}
            >
              {/* Spinning vinyl center effect */}
              <div
                className={`absolute inset-0 rounded-full border border-white/20 ${
                  isPlaying ? "animate-[spin_10s_linear_infinite]" : ""
                }`}
              />
              <div className="absolute inset-[35%] rounded-full bg-[#2a2018] border border-[#d49b58]/40" />
            </div>
          </div>

          {/* Illuminated Frequency / Tuning Dial */}
          <div className="flex flex-col justify-between h-full bg-[#16120e] rounded-xl border border-[#423427] p-2.5 shadow-inner relative overflow-hidden">
            {/* Warm Amber Dial Backlight */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-amber-600/5 to-transparent pointer-events-none" />

            {/* Dial Scale Header: Station Frequency & Broadcast status */}
            <div className="flex items-center justify-between text-[7px] font-mono text-[#a88665] uppercase tracking-widest border-b border-[#382b1f] pb-1">
              <span className="font-semibold text-[#e6b980]">
                {track.frequency || "MW · 540-1600 kHz"}
              </span>
              <div className="flex items-center gap-1">
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    isPlaying
                      ? "bg-red-500 shadow-[0_0_6px_#ef4444] animate-pulse"
                      : "bg-neutral-600"
                  }`}
                />
                <span className="text-[6.5px] text-[#c9a073] font-bold">
                  {isPlaying ? (isLiveStream ? "ON AIR LIVE" : "PLAYING") : "PAUSED"}
                </span>
              </div>
            </div>

            {/* Frequency Tuning Marks & Needle */}
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const ratio = Math.max(0, Math.min(1, clickX / rect.width));

                if (isLiveStream) {
                  // Switch station in playlist based on dial segment
                  const targetIdx = Math.min(
                    playlist.length - 1,
                    Math.floor(ratio * playlist.length)
                  );
                  setTrackIndex(targetIdx);
                } else if (duration > 0) {
                  seekTo(ratio * duration);
                }
              }}
              title={
                isLiveStream
                  ? "Click along dial to switch radio stations"
                  : "Click to seek broadcast"
              }
              className="relative h-6 my-1 bg-[#0d0a08] rounded border border-[#2e2319] cursor-pointer flex items-center px-1"
            >
              {/* Tick marks & Station indicators */}
              <div className="w-full flex justify-between px-1 pointer-events-none opacity-55">
                {playlist.map((pTrack, idx) => (
                  <div key={pTrack.id} className="flex flex-col items-center">
                    <div
                      className={`w-[1.5px] h-2 ${
                        idx === currentIndex ? "bg-amber-400" : "bg-[#8a7056]"
                      }`}
                    />
                    <span
                      className={`text-[5px] font-mono mt-0.5 ${
                        idx === currentIndex ? "text-amber-300 font-bold" : "text-[#8a7056]"
                      }`}
                    >
                      {pTrack.frequency?.replace(" FM", "").replace("AM ", "") || idx + 1}
                    </span>
                  </div>
                ))}
              </div>

              {/* Glowing Red Illuminated Tuning Needle */}
              <div
                className="absolute top-0 bottom-0 w-[2px] bg-red-500 shadow-[0_0_8px_#ef4444] transition-all duration-300 pointer-events-none"
                style={{ left: `${Math.min(98, Math.max(2, progressPercent))}%` }}
              >
                <div className="w-2 h-1 bg-red-500 -translate-x-[3px] rounded-full shadow-[0_0_6px_#ef4444]" />
              </div>
            </div>

            {/* Current Track Info & Category Badge */}
            <div className="flex flex-col min-w-0 pt-0.5">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <span
                  className={`inline-flex items-center gap-1 px-1.5 py-0.2 rounded border text-[6.5px] font-mono tracking-wider uppercase ${badge.color}`}
                >
                  {badge.icon}
                  <span>{badge.label}</span>
                </span>
                <span className="text-[7px] font-mono text-[#8a7056]">
                  {isLiveStream
                    ? "LIVE"
                    : `${formatTime(currentTime)} / ${formatTime(duration)}`}
                </span>
              </div>
              <span className="text-[9.5px] md:text-[10.5px] font-serif font-medium text-[#f0dfc8] truncate leading-tight">
                {audioError ? "Transmission error · Retrying..." : track.title}
              </span>
              <span className="text-[7px] font-mono text-[#8a7056] truncate mt-0.5">
                {track.artist}
              </span>
            </div>
          </div>
        </div>

        {/* -----------------------------------------------------------------------
            3. STATION SWITCHER PILLS (For quick channel tuning)
            ----------------------------------------------------------------------- */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-2 mb-2 border-b border-[#2e2319]">
          {playlist.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setTrackIndex(idx)}
              className={`px-2 py-0.5 rounded-md text-[7.5px] font-mono tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer border ${
                idx === currentIndex
                  ? "bg-[#d49b58]/20 border-[#d49b58] text-[#f0c28d] font-bold shadow-[0_0_8px_rgba(212,155,88,0.25)]"
                  : "bg-[#16120e] border-[#382b1f] text-[#8a7056] hover:text-[#c9a073] hover:border-[#524132]"
              }`}
            >
              {item.frequency || `CH ${idx + 1}`}
            </button>
          ))}
        </div>

        {/* -----------------------------------------------------------------------
            4. BOTTOM CONTROLS: Chunky Buttons & Analog Volume Slider
            ----------------------------------------------------------------------- */}
        <div className="flex items-center justify-between gap-2">
          
          {/* Mechanical Step & Play Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevTrack}
              aria-label="Previous Broadcast"
              title="Previous Broadcast / Station"
              className="w-8 h-8 rounded-lg bg-gradient-to-b from-[#2e251e] to-[#1c1612] border border-[#524132] hover:border-[#806750] active:scale-95 text-[#c9a073] flex items-center justify-center transition-all shadow-md cursor-pointer"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Tune In"}
              title={isPlaying ? "Pause Broadcast" : "Tune In / Play"}
              className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#d49b58] to-[#99642d] border border-[#f0c28d] active:scale-95 text-[#1a120b] flex items-center justify-center transition-all shadow-[0_4px_12px_rgba(212,155,88,0.4)] cursor-pointer font-bold"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-[#1a120b]" />
              ) : isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current translate-x-[1px]" />
              )}
            </button>

            <button
              onClick={nextTrack}
              aria-label="Next Broadcast"
              title="Next Broadcast / Station"
              className="w-8 h-8 rounded-lg bg-gradient-to-b from-[#2e251e] to-[#1c1612] border border-[#524132] hover:border-[#806750] active:scale-95 text-[#c9a073] flex items-center justify-center transition-all shadow-md cursor-pointer"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Analog Volume Knob / Slider */}
          <div className="flex items-center gap-1.5 flex-1 max-w-[130px] md:max-w-[145px] bg-[#120f0d] px-2 py-1.5 rounded-lg border border-[#382b1f]">
            <button
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
              className="text-[#a88665] hover:text-[#d49b58] cursor-pointer"
            >
              {volume === 0 || isMuted ? (
                <VolumeX className="w-3.5 h-3.5" />
              ) : (
                <Volume2 className="w-3.5 h-3.5" />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => {
                setVolume(parseFloat(e.target.value));
                setIsMuted(false);
              }}
              className="w-full h-1 bg-[#33271c] rounded-full appearance-none cursor-pointer accent-[#d49b58]"
            />
          </div>
        </div>

      </div>
    </motion.div>
  );
};
