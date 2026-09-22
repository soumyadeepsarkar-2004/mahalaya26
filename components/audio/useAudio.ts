"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";
import { useFestivalStore } from "@/store/festival-store";

export function useAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  const activePlaylist = useFestivalStore((s) => s.activePlaylist);
  const currentTrackIndex = useFestivalStore((s) => s.currentTrackIndex);
  const isPlaying = useFestivalStore((s) => s.isPlaying);
  const volume = useFestivalStore((s) => s.volume);
  const seekTarget = useFestivalStore((s) => s.seekTarget);

  const setIsPlaying = useFestivalStore((s) => s.setIsPlaying);
  const setIsLoading = useFestivalStore((s) => s.setIsLoading);
  const setAudioError = useFestivalStore((s) => s.setAudioError);
  const setIsLiveStream = useFestivalStore((s) => s.setIsLiveStream);
  const setCurrentTime = useFestivalStore((s) => s.setCurrentTime);
  const setDuration = useFestivalStore((s) => s.setDuration);
  const clearSeekTarget = useFestivalStore((s) => s.clearSeekTarget);
  const nextTrack = useFestivalStore((s) => s.nextTrack);

  const track = activePlaylist[currentTrackIndex] || activePlaylist[0];

  // Helper to safely clean up Hls instance
  const cleanupHls = () => {
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
  };

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio();
    audio.volume = volume;
    audio.preload = "metadata";
    audioRef.current = audio;

    const handlePlay = () => {
      setIsPlaying(true);
      setIsLoading(false);
    };
    const handlePause = () => {
      setIsPlaying(false);
      setIsLoading(false);
    };
    const handleWaiting = () => {
      if (useFestivalStore.getState().isPlaying) {
        setIsLoading(true);
      }
    };
    const handleCanPlay = () => {
      setIsLoading(false);
    };
    const handlePlaying = () => {
      setIsLoading(false);
    };
    const handleEnded = () => nextTrack();
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => {
      if (!isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration);
      } else {
        setDuration(0);
      }
    };
    const handleError = () => {
      console.warn("Audio element encountered playback error");
      setAudioError(true);
      setIsLoading(false);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("loadedmetadata", handleDurationChange);
    audio.addEventListener("error", handleError);

    return () => {
      audio.pause();
      cleanupHls();
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.removeEventListener("loadedmetadata", handleDurationChange);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  // Handle track source changes (supports HLS .m3u8 live streams & standard MP3)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !track?.src) return;

    const wasPlaying = isPlaying;
    cleanupHls();
    setCurrentTime(0);
    setDuration(0);
    setIsLoading(wasPlaying);

    const isHls = track.src.includes(".m3u8");
    const isLive = Boolean(track.isLive || isHls);
    setIsLiveStream(isLive);

    if (isHls) {
      if (audio.canPlayType("application/vnd.apple.mpegurl")) {
        // Native HLS support (Safari on macOS / iOS)
        audio.src = track.src;
        if (wasPlaying) {
          audio.play().catch(() => {
            setIsPlaying(false);
            setIsLoading(false);
          });
        }
      } else if (Hls.isSupported()) {
        // HLS.js for Chrome, Firefox, Edge, Android
        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
          backBufferLength: 30,
        });
        hlsRef.current = hls;

        hls.loadSource(track.src);
        hls.attachMedia(audio);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (wasPlaying) {
            audio.play().catch(() => {
              setIsPlaying(false);
              setIsLoading(false);
            });
          } else {
            setIsLoading(false);
          }
        });

        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                console.warn("HLS fatal network error, attempting recovery...");
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.warn("HLS fatal media error, recovering...");
                hls.recoverMediaError();
                break;
              default:
                cleanupHls();
                setAudioError(true);
                setIsLoading(false);
                break;
            }
          }
        });
      } else {
        // Fallback
        audio.src = track.src;
        if (wasPlaying) {
          audio.play().catch(() => {
            setIsPlaying(false);
            setIsLoading(false);
          });
        }
      }
    } else {
      // Standard MP3 or Icecast audio stream
      audio.src = track.src;
      if (wasPlaying) {
        audio.play().catch(() => {
          setIsPlaying(false);
          setIsLoading(false);
        });
      }
    }
  }, [track?.src]);

  // Handle Play/Pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      setIsLoading(true);
      audio.play().catch((e) => {
        console.warn("Autoplay blocked or playback interrupted:", e);
        setIsPlaying(false);
        setIsLoading(false);
      });
    } else {
      audio.pause();
      setIsLoading(false);
    }
  }, [isPlaying]);

  // Handle Seeking (only for non-live tracks)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || seekTarget === null) return;

    if (!track.isLive && isFinite(audio.duration) && audio.duration > 0) {
      audio.currentTime = seekTarget;
    }
    clearSeekTarget();
  }, [seekTarget]);

  // Handle Volume change
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  return {
    track,
    playlist: activePlaylist,
    currentIndex: currentTrackIndex,
  };
}
