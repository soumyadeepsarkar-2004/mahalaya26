import { create } from "zustand";
import { FESTIVAL_SCENES, type FestivalId } from "@/data/festival";
import { getPlaylistForFestival, type AudioTrack } from "@/lib/audio";

export type SheetType = "menu" | "status" | "about" | "archive" | "moments" | null;

interface FestivalState {
  currentFestivalId: FestivalId;
  previousFestivalId: FestivalId | null;
  isTransitioning: boolean;
  
  // Audio state
  activePlaylist: AudioTrack[];
  currentTrackIndex: number;
  isPlaying: boolean;
  isLoading: boolean;
  audioError: boolean;
  isLiveStream: boolean;
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
  setIsLiveStream: (isLive: boolean) => void;
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

const initialPlaylist = getPlaylistForFestival("mahalaya");

export const useFestivalStore = create<FestivalState>((set, get) => ({
  currentFestivalId: "mahalaya",
  previousFestivalId: null,
  isTransitioning: false,
  
  activePlaylist: initialPlaylist,
  currentTrackIndex: 0,
  isPlaying: false,
  isLoading: false,
  audioError: false,
  isLiveStream: !!initialPlaylist[0]?.isLive,
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
    
    const newPlaylist = getPlaylistForFestival(id);
    set({
      previousFestivalId: currentFestivalId,
      currentFestivalId: id,
      isTransitioning: true,
      activePlaylist: newPlaylist,
      currentTrackIndex: 0,
      currentTime: 0,
      duration: 0,
      audioError: false,
      isLiveStream: !!newPlaylist[0]?.isLive,
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
  setIsLiveStream: (isLive: boolean) => set({ isLiveStream: isLive }),
  setCurrentTime: (time: number) => set({ currentTime: time }),
  setDuration: (duration: number) => set({ duration: duration }),
  seekTo: (time: number) => set({ seekTarget: time, currentTime: time }),
  clearSeekTarget: () => set({ seekTarget: null }),
  
  setTrackIndex: (index: number) => {
    const { activePlaylist } = get();
    const validIdx = Math.max(0, Math.min(activePlaylist.length - 1, index));
    set({
      currentTrackIndex: validIdx,
      currentTime: 0,
      duration: 0,
      audioError: false,
      isLiveStream: !!activePlaylist[validIdx]?.isLive,
    });
  },
  
  nextTrack: () => {
    const { activePlaylist, currentTrackIndex } = get();
    const nextIdx = (currentTrackIndex + 1) % activePlaylist.length;
    set({
      currentTrackIndex: nextIdx,
      currentTime: 0,
      duration: 0,
      audioError: false,
      isLiveStream: !!activePlaylist[nextIdx]?.isLive,
    });
  },
  
  prevTrack: () => {
    const { activePlaylist, currentTrackIndex } = get();
    const prevIdx = (currentTrackIndex - 1 + activePlaylist.length) % activePlaylist.length;
    set({
      currentTrackIndex: prevIdx,
      currentTime: 0,
      duration: 0,
      audioError: false,
      isLiveStream: !!activePlaylist[prevIdx]?.isLive,
    });
  },
    
  setVolume: (volume: number) => set({ volume: Math.max(0, Math.min(1, volume)) }),
  setUiVisible: (visible: boolean) => set({ uiVisible: visible }),
  setActiveSheet: (sheet: SheetType) => set({ activeSheet: sheet }),
  togglePlayerExpanded: () => set((state) => ({ isPlayerExpanded: !state.isPlayerExpanded })),
  setPlayerExpanded: (expanded: boolean) => set({ isPlayerExpanded: expanded }),
}));
