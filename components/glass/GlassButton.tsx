import React from "react";
import { cn } from "@/lib/utils";

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "icon";
  size?: "sm" | "md" | "lg";
}

export const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ children, className, variant = "primary", size = "md", ...props }, ref) => {
    const variantStyles = {
      primary:
        "backdrop-blur-md bg-white/10 hover:bg-white/15 active:bg-white/20 border border-white/15 text-white shadow-lg",
      secondary:
        "backdrop-blur-sm bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 text-white/80 hover:text-white",
      ghost:
        "hover:bg-white/10 active:bg-white/15 text-white/70 hover:text-white border-transparent",
      icon:
        "rounded-full p-2.5 backdrop-blur-md bg-white/5 hover:bg-white/15 active:bg-white/20 border border-white/10 text-white/80 hover:text-white",
    };

    const sizeStyles = {
      sm: "text-[10px] px-2.5 py-1 tracking-widest font-mono uppercase",
      md: "text-xs px-3.5 py-1.5 tracking-wider font-mono uppercase",
      lg: "text-sm px-5 py-2.5 tracking-widest font-mono uppercase",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 outline-none select-none disabled:opacity-40 disabled:pointer-events-none",
          variantStyles[variant],
          variant !== "icon" && sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

GlassButton.displayName = "GlassButton";
