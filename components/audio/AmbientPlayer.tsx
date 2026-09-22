"use client";

import React from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { useFestivalStore } from "@/store/festival-store";
import { FESTIVAL_SCENES } from "@/data/festival";
import { useAudio } from "./useAudio";
import { AudioVisualizer } from "./AudioVisualizer";
import { GlassSlider } from "@/components/glass/GlassSlider";

export const AmbientPlayer: React.FC = () => {
  const { track } = useAudio();

  const isPlaying = useFestivalStore((s) => s.isPlaying);
  const togglePlay = useFestivalStore((s) => s.togglePlay);
  const nextTrack = useFestivalStore((s) => s.nextTrack);
  const prevTrack = useFestivalStore((s) => s.prevTrack);
  const volume = useFestivalStore((s) => s.volume);
  const setVolume = useFestivalStore((s) => s.setVolume);

  const currentFestivalId = useFestivalStore((s) => s.currentFestivalId);
  const currentScene =
    FESTIVAL_SCENES.find((s) => s.id === currentFestivalId) || FESTIVAL_SCENES[0];

  return (
    <div className="radio-card fixed z-40 pointer-events-auto transition-all duration-500 bottom-[calc(14px+env(safe-area-inset-bottom,0px))] md:bottom-[28px] left-3 right-3 md:right-auto md:left-[clamp(24px,4vw,64px)] md:w-[280px] xl:w-[320px] p-3.5 md:p-4 rounded-2xl md:rounded-[4px] backdrop-blur-2xl bg-white/[0.08] border border-white/10 shadow-2xl flex flex-col gap-2.5 md:gap-3">
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
          className="w-11 h-11 md:w-14 md:h-14 rounded-md md:rounded-[2px] bg-cover bg-center shrink-0 border border-white/15 shadow-md transition-all duration-700"
          style={{
            backgroundImage: `url(/scenes/${currentScene.imageBasename}-480.webp)`,
          }}
        />
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-[7px] md:text-[8px] font-mono tracking-[0.2em] text-white/40 uppercase mb-0.5">
            NOW PLAYING
          </span>
          <span className="text-xs md:text-sm text-white/90 font-serif truncate w-full">
            {track.title}
          </span>
          <span className="text-[9px] text-white/40 font-mono tracking-wider truncate">
            {track.artist}
          </span>
        </div>
      </div>

      <div className="w-full h-px bg-white/5 hidden md:block" />

      {/* Controls Row */}
      <div className="flex items-center justify-between gap-3 w-full pt-1 md:pt-0">
        {/* Playback buttons */}
        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={prevTrack}
            aria-label="Previous Track"
            className="text-white/40 hover:text-white transition-colors cursor-pointer outline-none"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-white/20 flex items-center justify-center outline-none hover:bg-white/10 active:bg-white/20 transition-all cursor-pointer shadow-md"
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 text-white" />
            ) : (
              <Play className="w-3.5 h-3.5 text-white translate-x-[0.5px]" />
            )}
          </button>

          <button
            onClick={nextTrack}
            aria-label="Next Track"
            className="text-white/40 hover:text-white transition-colors cursor-pointer outline-none"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Volume slider */}
        <div className="flex items-center gap-2 max-w-[100px] md:max-w-[120px] flex-1">
          <Volume2 className="w-3 h-3 text-white/40 shrink-0" />
          <GlassSlider value={volume} onChange={setVolume} />
        </div>
      </div>
    </div>
  );
};
