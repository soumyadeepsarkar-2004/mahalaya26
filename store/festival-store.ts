import { create } from "zustand";
import { FESTIVAL_SCENES, type FestivalId } from "@/data/festival";
import { DEFAULT_AUDIO_TRACKS } from "@/lib/audio";

export type SheetType = "menu" | "status" | "about" | "archive" | "moments" | null;

interface FestivalState {
  currentFestivalId: FestivalId;
  previousFestivalId: FestivalId | null;
  isTransitioning: boolean;
  
  // Audio state
  currentTrackIndex: number;
  isPlaying: boolean;
  volume: number;
  
  // UI state
  uiVisible: boolean;
  activeSheet: SheetType;
  
  // Actions
  setFestival: (id: FestivalId) => void;
  nextFestival: () => void;
  prevFestival: () => void;
  setIsTransitioning: (status: boolean) => void;
  setIsPlaying: (playing: boolean) => void;
  togglePlay: () => void;
  setTrackIndex: (index: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setVolume: (volume: number) => void;
  setUiVisible: (visible: boolean) => void;
  setActiveSheet: (sheet: SheetType) => void;
}

export const useFestivalStore = create<FestivalState>((set, get) => ({
  currentFestivalId: "mahalaya",
  previousFestivalId: null,
  isTransitioning: false,
  
  currentTrackIndex: 0,
  isPlaying: false,
  volume: 0.8,
  
  uiVisible: true,
  activeSheet: null,
  
  setFestival: (id: FestivalId) => {
    const { currentFestivalId } = get();
    if (currentFestivalId === id) return;
    
    set({
      previousFestivalId: currentFestivalId,
      currentFestivalId: id,
      isTransitioning: true,
    });
  },
  
  nextFestival: () => {
    const { currentFestivalId, setFestival } = get();
    const idx = FESTIVAL_SCENES.findIndex((s) => s.id === currentFestivalId);
    const nextIdx = (idx + 1) % FESTIVAL_SCENES.length;
    setFestival(FESTIVAL_SCENES[nextIdx].id);
  },
  
  prevFestival: () => {
    const { currentFestivalId, setFestival } = get();
    const idx = FESTIVAL_SCENES.findIndex((s) => s.id === currentFestivalId);
    const prevIdx = (idx - 1 + FESTIVAL_SCENES.length) % FESTIVAL_SCENES.length;
    setFestival(FESTIVAL_SCENES[prevIdx].id);
  },
  
  setIsTransitioning: (status: boolean) => set({ isTransitioning: status }),
  setIsPlaying: (playing: boolean) => set({ isPlaying: playing }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  
  setTrackIndex: (index: number) => set({ currentTrackIndex: index }),
  nextTrack: () =>
    set((state) => ({
      currentTrackIndex: (state.currentTrackIndex + 1) % DEFAULT_AUDIO_TRACKS.length,
    })),
  prevTrack: () =>
    set((state) => ({
      currentTrackIndex:
        (state.currentTrackIndex - 1 + DEFAULT_AUDIO_TRACKS.length) %
        DEFAULT_AUDIO_TRACKS.length,
    })),
    
  setVolume: (volume: number) => set({ volume: Math.max(0, Math.min(1, volume)) }),
  setUiVisible: (visible: boolean) => set({ uiVisible: visible }),
  setActiveSheet: (sheet: SheetType) => set({ activeSheet: sheet }),
}));
