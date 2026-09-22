import { FESTIVAL_SCENES, type FestivalId } from "@/data/festival";

export function getSurroundingScenes(currentId: FestivalId): {
  prev: string;
  next: string;
} {
  const currentIndex = FESTIVAL_SCENES.findIndex((s) => s.id === currentId);
  const total = FESTIVAL_SCENES.length;
  
  const prevIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;
  
  return {
    prev: `/scenes/${FESTIVAL_SCENES[prevIndex].imageBasename}-1280.webp`,
    next: `/scenes/${FESTIVAL_SCENES[nextIndex].imageBasename}-1280.webp`,
  };
}

export function preloadImage(src: string): void {
  if (typeof window === "undefined") return;
  const img = new Image();
  img.src = src;
}
