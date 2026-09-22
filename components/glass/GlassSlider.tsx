import React from "react";
import { cn } from "@/lib/utils";

interface GlassSliderProps {
  value: number; // 0 to 1
  onChange: (value: number) => void;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
}

export const GlassSlider: React.FC<GlassSliderProps> = ({
  value,
  onChange,
  className,
  min = 0,
  max = 1,
  step = 0.01,
}) => {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className={cn(
        "w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer outline-none transition-colors hover:bg-white/30",
        "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(255,255,255,0.6)] [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-125",
        "[&::-moz-range-thumb]:w-2.5 [&::-moz-range-thumb]:h-2.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:shadow-[0_0_8px_rgba(255,255,255,0.6)] hover:[&::-moz-range-thumb]:scale-125",
        className
      )}
    />
  );
};
