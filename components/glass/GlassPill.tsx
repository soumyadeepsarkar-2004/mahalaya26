import React from "react";
import { cn } from "@/lib/utils";

interface GlassPillProps extends React.HTMLAttributes<HTMLDivElement> {
  dotColor?: string;
  pulsing?: boolean;
}

export const GlassPill: React.FC<GlassPillProps> = ({
  children,
  className,
  dotColor,
  pulsing = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md bg-white/5 text-[10px] font-mono tracking-widest uppercase text-white/80 shadow-md",
        className
      )}
      {...props}
    >
      {dotColor && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full shrink-0",
            pulsing && "animate-pulse"
          )}
          style={{ backgroundColor: dotColor }}
        />
      )}
      {children}
    </div>
  );
};
