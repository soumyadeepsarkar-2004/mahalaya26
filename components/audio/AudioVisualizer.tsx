"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AudioVisualizerProps {
  isPlaying: boolean;
  className?: string;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  isPlaying,
  className,
}) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* 3-bar subtle EQ */}
      <div
        className={cn(
          "flex items-end gap-[2px] h-[9px] transition-opacity duration-300",
          isPlaying ? "opacity-70" : "opacity-0"
        )}
      >
        <div
          className={cn(
            "w-[1.5px] bg-white rounded-full",
            isPlaying && "animate-[eq_0.8s_ease-in-out_infinite_alternate]"
          )}
          style={{ height: "100%" }}
        />
        <div
          className={cn(
            "w-[1.5px] bg-white rounded-full",
            isPlaying && "animate-[eq_0.5s_ease-in-out_infinite_alternate]"
          )}
          style={{ height: "60%" }}
        />
        <div
          className={cn(
            "w-[1.5px] bg-white rounded-full",
            isPlaying && "animate-[eq_1.1s_ease-in-out_infinite_alternate]"
          )}
          style={{ height: "80%" }}
        />
      </div>

      {/* Signal LED */}
      <div
        className={cn(
          "w-1.5 h-1.5 rounded-full transition-all duration-500",
          isPlaying
            ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.7)] animate-pulse"
            : "bg-white/30"
        )}
      />
    </div>
  );
};
