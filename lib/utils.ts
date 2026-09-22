import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "00:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export function getKolkataTime(): {
  timeStr: string;
  tzLabel: string;
  daysToMahalaya: number;
} {
  const now = new Date();
  
  // Format live time in Asia/Kolkata timezone
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  
  const timeStr = formatter.format(now);
  
  // Calculate days to Mahalaya 2026 (Oct 10, 2026, 04:00 AM IST)
  // IST is UTC+5:30 -> 2026-10-09T22:30:00.000Z
  const mahalayaDate = new Date("2026-10-09T22:30:00.000Z");
  const diffMs = mahalayaDate.getTime() - now.getTime();
  const daysToMahalaya = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
  
  return {
    timeStr,
    tzLabel: "KOLKATA / IST",
    daysToMahalaya,
  };
}
