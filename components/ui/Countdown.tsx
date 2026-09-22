"use client";

import React, { useEffect, useState } from "react";
import { getKolkataTime } from "@/lib/utils";

export const Countdown: React.FC = () => {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    setDays(getKolkataTime().daysToMahalaya);
    const interval = setInterval(() => {
      setDays(getKolkataTime().daysToMahalaya);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  if (days === null) return null;

  return (
    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-md bg-white/5 text-[9px] font-mono tracking-widest uppercase text-white/80">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      <span>{days > 0 ? `${days} DAYS TO MAHALAYA` : "MAHALAYA TODAY"}</span>
    </div>
  );
};
