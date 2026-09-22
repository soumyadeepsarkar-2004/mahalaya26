"use client";

import React, { useEffect, useState } from "react";
import { getKolkataTime } from "@/lib/utils";

export const Clock: React.FC = () => {
  const [time, setTime] = useState<string>("--:--:--");

  useEffect(() => {
    const update = () => {
      setTime(getKolkataTime().timeStr);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-mono tracking-widest text-white/70">
        {time}
      </span>
      <span className="text-[8px] font-mono tracking-widest text-white/40">
        IST
      </span>
    </div>
  );
};
