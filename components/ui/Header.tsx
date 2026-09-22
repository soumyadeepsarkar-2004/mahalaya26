"use client";

import React from "react";
import { Menu } from "lucide-react";
import { Clock } from "./Clock";
import { Countdown } from "./Countdown";
import { useFestivalStore } from "@/store/festival-store";

export const Header: React.FC = () => {
  const setActiveSheet = useFestivalStore((s) => s.setActiveSheet);

  return (
    <header className="fixed top-0 left-0 w-full z-40 px-4 md:px-[clamp(24px,4vw,64px)] pt-[calc(env(safe-area-inset-top,0px)+16px)] md:pt-[clamp(20px,3vh,32px)] flex items-start justify-between pointer-events-none">
      {/* Brand / Logo */}
      <div className="flex flex-col gap-1 pointer-events-auto">
        <h1 className="text-sm md:text-base font-serif tracking-[0.25em] text-white font-medium uppercase">
          MAHALAYA &apos;26
        </h1>
        <p className="text-[9px] md:text-[10px] font-mono tracking-[0.2em] text-white/50 uppercase">
          Bengal | Festival | People | Memories
        </p>
      </div>

      {/* Right controls: Countdown, Clock, Menu */}
      <div className="flex items-center gap-3 md:gap-5 pointer-events-auto">
        <div className="hidden sm:block">
          <Countdown />
        </div>

        <div className="hidden md:block">
          <Clock />
        </div>

        <button
          onClick={() => setActiveSheet("menu")}
          aria-label="Open Menu"
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md bg-white/5 hover:bg-white/10 active:bg-white/15 text-[10px] font-mono tracking-widest uppercase text-white/80 transition-all cursor-pointer shadow-sm outline-none"
        >
          <Menu className="w-3.5 h-3.5 text-white/80" />
          <span className="hidden sm:inline">MENU</span>
        </button>
      </div>
    </header>
  );
};
