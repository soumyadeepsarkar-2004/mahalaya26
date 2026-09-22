export type FestivalId =
  | "mahalaya"
  | "tritiya"
  | "panchami"
  | "shashthi"
  | "saptami"
  | "ashtami"
  | "nabami"
  | "dashami"
  | "ekadashi";

export type AtmosphereType =
  | "mist"
  | "dust"
  | "golden"
  | "twilight"
  | "incense"
  | "diya"
  | "petals"
  | "vermilion"
  | "cool-mist";

export interface FestivalScene {
  id: FestivalId;
  numeral: string;
  label: string;
  bengaliLabel: string;
  subtitle: string;
  date: string;
  description: string;
  imageBasename: string; // e.g. "bg-mahalaya"
  accentRgb: string; // e.g. "230, 161, 91"
  atmosphere: AtmosphereType;
  trackTitle: string;
  trackSrc: string;
}

export const FESTIVAL_SCENES: FestivalScene[] = [
  {
    id: "mahalaya",
    numeral: "I",
    label: "Mahalaya",
    bengaliLabel: "মহালয়া",
    subtitle: "The Awakening",
    date: "Oct 10, 2026",
    description:
      "The scent of shiuli fills the air as Birendra Krishna Bhadra's voice echoes through the morning mist, marking the beginning of Devi Paksha.",
    imageBasename: "bg-mahalaya",
    accentRgb: "230, 161, 91",
    atmosphere: "mist",
    trackTitle: "Ambient Kolkata I",
    trackSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: "tritiya",
    numeral: "II",
    label: "Tritiya",
    bengaliLabel: "তৃতীয়া",
    subtitle: "The Anticipation",
    date: "Oct 13, 2026",
    description:
      "The city starts transforming. Bamboo scaffolds become grand pandals, and the festive spirit begins to take physical form.",
    imageBasename: "bg-tritiya",
    accentRgb: "166, 124, 82",
    atmosphere: "dust",
    trackTitle: "Ambient Kolkata II",
    trackSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: "panchami",
    numeral: "III",
    label: "Panchami",
    bengaliLabel: "পঞ্চমী",
    subtitle: "The Arrival",
    date: "Oct 15, 2026",
    description:
      "The wait is over. The idols are unveiled, and the city streets begin to swell with early pandal hoppers.",
    imageBasename: "bg-panchomi",
    accentRgb: "197, 107, 45",
    atmosphere: "golden",
    trackTitle: "Festival Atmosphere I",
    trackSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    id: "shashthi",
    numeral: "IV",
    label: "Shashthi",
    bengaliLabel: "ষষ্ঠী",
    subtitle: "The Welcome",
    date: "Oct 16, 2026",
    description:
      "Bodhon. The Goddess is welcomed under the bel tree. The dhak beats resound, officially starting the grand festival.",
    imageBasename: "bg-shasti",
    accentRgb: "228, 142, 88",
    atmosphere: "twilight",
    trackTitle: "Festival Atmosphere II",
    trackSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
  {
    id: "saptami",
    numeral: "V",
    label: "Saptami",
    bengaliLabel: "সপ্তমী",
    subtitle: "The Invocation",
    date: "Oct 17, 2026",
    description:
      "Nabapatrika snan at dawn. The city is now fully immersed in joy, lights, and the endless rhythm of celebrations.",
    imageBasename: "bg-shaptami",
    accentRgb: "224, 117, 43",
    atmosphere: "incense",
    trackTitle: "Ambient Kolkata I",
    trackSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: "ashtami",
    numeral: "VI",
    label: "Ashtami",
    bengaliLabel: "অষ্টমী",
    subtitle: "The Devotion",
    date: "Oct 18, 2026",
    description:
      "Pushpanjali in the morning, Sandhi Puja at the juncture of Ashtami and Navami. The most auspicious day of the festival.",
    imageBasename: "bg-ashtami",
    accentRgb: "218, 59, 33",
    atmosphere: "diya",
    trackTitle: "Ambient Kolkata II",
    trackSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: "nabami",
    numeral: "VII",
    label: "Nabami",
    bengaliLabel: "নবমী",
    subtitle: "The Celebration",
    date: "Oct 19, 2026",
    description:
      "The final night of unbridled joy. The dhunuchi naach reaches its peak, but a hint of melancholy lingers in the air.",
    imageBasename: "bg-nabami",
    accentRgb: "186, 73, 51",
    atmosphere: "petals",
    trackTitle: "Festival Atmosphere I",
    trackSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    id: "dashami",
    numeral: "VIII",
    label: "Dashami",
    bengaliLabel: "দশমী",
    subtitle: "The Farewell",
    date: "Oct 20, 2026",
    description:
      'Sindoor Khela and immersion. With tearful eyes, we bid adieu to the Goddess, whispering "Asche bochor abar hobe".',
    imageBasename: "bg-dashami",
    accentRgb: "158, 62, 46",
    atmosphere: "vermilion",
    trackTitle: "Festival Atmosphere II",
    trackSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
  {
    id: "ekadashi",
    numeral: "IX",
    label: "Ekadashi",
    bengaliLabel: "একাদশী",
    subtitle: "The Aftermath",
    date: "Oct 21, 2026",
    description:
      "Empty pandals, scattered flowers, and quiet streets. The wait for next year begins.",
    imageBasename: "bg-ekadashi",
    accentRgb: "109, 114, 120",
    atmosphere: "cool-mist",
    trackTitle: "Ambient Kolkata I",
    trackSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
];
