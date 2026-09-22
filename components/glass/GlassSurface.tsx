import React from "react";
import { cn } from "@/lib/utils";

interface GlassSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  intensity?: "low" | "medium" | "high";
  rounded?: "sm" | "md" | "lg" | "xl" | "full" | "none";
}

export const GlassSurface = React.forwardRef<HTMLDivElement, GlassSurfaceProps>(
  ({ children, className, intensity = "medium", rounded = "md", style, ...props }, ref) => {
    const intensityStyles = {
      low: "backdrop-blur-md bg-white/[0.03] border-white/5",
      medium: "backdrop-blur-xl bg-white/[0.06] border-white/10 shadow-2xl",
      high: "backdrop-blur-2xl bg-white/[0.12] border-white/15 shadow-2xl",
    };

    const roundedStyles = {
      none: "rounded-none",
      sm: "rounded-[2px]",
      md: "rounded-md",
      lg: "rounded-xl",
      xl: "rounded-2xl",
      full: "rounded-full",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "border transition-colors duration-500",
          intensityStyles[intensity],
          roundedStyles[rounded],
          className
        )}
        style={{
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassSurface.displayName = "GlassSurface";
