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
  isLoading: boolean;
  audioError: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  seekTarget: number | null;
  
  // UI state
  uiVisible: boolean;
  activeSheet: SheetType;
  isPlayerExpanded: boolean;
  
  // Actions
  setFestival: (id: FestivalId) => void;
  nextFestival: () => void;
  prevFestival: () => void;
  setIsTransitioning: (status: boolean) => void;
  setIsPlaying: (playing: boolean) => void;
  togglePlay: () => void;
  setIsLoading: (loading: boolean) => void;
  setAudioError: (error: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  seekTo: (time: number) => void;
  clearSeekTarget: () => void;
  setTrackIndex: (index: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setVolume: (volume: number) => void;
  setUiVisible: (visible: boolean) => void;
  setActiveSheet: (sheet: SheetType) => void;
  togglePlayerExpanded: () => void;
  setPlayerExpanded: (expanded: boolean) => void;
}

export const useFestivalStore = create<FestivalState>((set, get) => ({
  currentFestivalId: "mahalaya",
  previousFestivalId: null,
  isTransitioning: false,
  
  currentTrackIndex: 0,
  isPlaying: false,
  isLoading: false,
  audioError: false,
  currentTime: 0,
  duration: 0,
  volume: 0.8,
  seekTarget: null,
  
  uiVisible: true,
  activeSheet: null,
  isPlayerExpanded: false,
  
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
  setIsPlaying: (playing: boolean) => set({ isPlaying: playing, audioError: false }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying, audioError: false })),
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
  setAudioError: (error: boolean) => set({ audioError: error, isPlaying: false, isLoading: false }),
  setCurrentTime: (time: number) => set({ currentTime: time }),
  setDuration: (duration: number) => set({ duration: duration }),
  seekTo: (time: number) => set({ seekTarget: time, currentTime: time }),
  clearSeekTarget: () => set({ seekTarget: null }),
  
  setTrackIndex: (index: number) => set({ currentTrackIndex: index, currentTime: 0 }),
  nextTrack: () =>
    set((state) => ({
      currentTrackIndex: (state.currentTrackIndex + 1) % DEFAULT_AUDIO_TRACKS.length,
      currentTime: 0,
    })),
  prevTrack: () =>
    set((state) => ({
      currentTrackIndex:
        (state.currentTrackIndex - 1 + DEFAULT_AUDIO_TRACKS.length) %
        DEFAULT_AUDIO_TRACKS.length,
      currentTime: 0,
    })),
    
  setVolume: (volume: number) => set({ volume: Math.max(0, Math.min(1, volume)) }),
  setUiVisible: (visible: boolean) => set({ uiVisible: visible }),
  setActiveSheet: (sheet: SheetType) => set({ activeSheet: sheet }),
  togglePlayerExpanded: () => set((state) => ({ isPlayerExpanded: !state.isPlayerExpanded })),
  setPlayerExpanded: (expanded: boolean) => set({ isPlayerExpanded: expanded }),
}));
