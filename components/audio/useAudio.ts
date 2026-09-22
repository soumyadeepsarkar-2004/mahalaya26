"use client";

import { useEffect, useRef } from "react";
import { useFestivalStore } from "@/store/festival-store";
import { DEFAULT_AUDIO_TRACKS } from "@/lib/audio";

export function useAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isPlaying = useFestivalStore((s) => s.isPlaying);
  const currentTrackIndex = useFestivalStore((s) => s.currentTrackIndex);
  const volume = useFestivalStore((s) => s.volume);
  const setIsPlaying = useFestivalStore((s) => s.setIsPlaying);
  const nextTrack = useFestivalStore((s) => s.nextTrack);

  const track = DEFAULT_AUDIO_TRACKS[currentTrackIndex] || DEFAULT_AUDIO_TRACKS[0];

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio(track.src);
    audio.volume = volume;
    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => nextTrack();
    const handleError = () => {
      console.warn("Audio playback failed or blocked");
      setIsPlaying(false);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.pause();
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  // Update track source
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const wasPlaying = isPlaying;
    audio.src = track.src;

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
        console.warn("Autoplay blocked by browser policy:", e);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

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
