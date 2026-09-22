"use client";

import { useEffect, useRef } from "react";
import { useFestivalStore } from "@/store/festival-store";
import { DEFAULT_AUDIO_TRACKS } from "@/lib/audio";

export function useAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isPlaying = useFestivalStore((s) => s.isPlaying);
  const currentTrackIndex = useFestivalStore((s) => s.currentTrackIndex);
  const volume = useFestivalStore((s) => s.volume);
  const seekTarget = useFestivalStore((s) => s.seekTarget);

  const setIsPlaying = useFestivalStore((s) => s.setIsPlaying);
  const setIsLoading = useFestivalStore((s) => s.setIsLoading);
  const setAudioError = useFestivalStore((s) => s.setAudioError);
  const setCurrentTime = useFestivalStore((s) => s.setCurrentTime);
  const setDuration = useFestivalStore((s) => s.setDuration);
  const clearSeekTarget = useFestivalStore((s) => s.clearSeekTarget);
  const nextTrack = useFestivalStore((s) => s.nextTrack);

  const track = DEFAULT_AUDIO_TRACKS[currentTrackIndex] || DEFAULT_AUDIO_TRACKS[0];

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio(track.src);
    audio.volume = volume;
    audio.preload = "metadata";
    audioRef.current = audio;

    const handlePlay = () => {
      setIsPlaying(true);
      setIsLoading(false);
    };
    const handlePause = () => setIsPlaying(false);
    const handleWaiting = () => setIsLoading(true);
    const handlePlaying = () => setIsLoading(false);
    const handleEnded = () => nextTrack();
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => {
      if (!isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const handleError = () => {
      console.warn("Audio playback error encountered");
      setAudioError(true);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("loadedmetadata", handleDurationChange);
    audio.addEventListener("error", handleError);

    return () => {
      audio.pause();
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.removeEventListener("loadedmetadata", handleDurationChange);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  // Handle track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const wasPlaying = isPlaying;
    audio.src = track.src;
    setCurrentTime(0);
    setIsLoading(true);

    if (wasPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }
  }, [currentTrackIndex]);

  // Handle Play/Pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((e) => {
        console.warn("Autoplay blocked by browser:", e);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Handle Seeking
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || seekTarget === null) return;

    audio.currentTime = seekTarget;
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
  };
}
