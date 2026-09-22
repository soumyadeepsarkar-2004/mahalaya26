export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  src: string;
}

export const DEFAULT_AUDIO_TRACKS: AudioTrack[] = [
  {
    id: "track-1",
    title: "Ambient Kolkata I",
    artist: "Atmospheric Field Recording",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: "track-2",
    title: "Ambient Kolkata II",
    artist: "Atmospheric Field Recording",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: "track-3",
    title: "Festival Atmosphere I",
    artist: "Dhak & Pandal Echoes",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    id: "track-4",
    title: "Festival Atmosphere II",
    artist: "Dhak & Pandal Echoes",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
];
