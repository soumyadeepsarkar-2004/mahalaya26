"use client";

import React, { useEffect, useRef } from "react";
import { useFestivalStore } from "@/store/festival-store";
import { FESTIVAL_SCENES } from "@/data/festival";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

export const SceneAtmosphere: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentFestivalId = useFestivalStore((s) => s.currentFestivalId);
  const scene = FESTIVAL_SCENES.find((s) => s.id === currentFestivalId) || FESTIVAL_SCENES[0];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const getParticleColor = () => {
      switch (scene.atmosphere) {
        case "golden":
          return "rgba(255, 215, 150, ";
        case "diya":
          return "rgba(255, 180, 100, ";
        case "vermilion":
          return "rgba(230, 80, 60, ";
        case "twilight":
          return "rgba(240, 160, 110, ";
        case "cool-mist":
          return "rgba(200, 220, 240, ";
        default:
          return "rgba(255, 255, 255, ";
      }
    };

    const initParticles = () => {
      const isMobile = window.innerWidth < 768;
      const count = isMobile ? 24 : 50;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: -(Math.random() * 0.4 + 0.1),
        opacity: Math.random() * 0.4 + 0.1,
        color: getParticleColor(),
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;

        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [scene.atmosphere]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 opacity-70 mix-blend-screen"
    />
  );
};
