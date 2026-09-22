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
  mobilePosition?: string; // e.g. "60% center"
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
    mobilePosition: "50% center",
    accentRgb: "230, 161, 91",
    atmosphere: "mist",
    trackTitle: "Akashvani Kolkata Geetanjali (Live)",
    trackSrc: "https://airhlspush.pc.cdn.bitgravity.com/httppush/hlspbaudio055/hlspbaudio05564kbps.m3u8",
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
    mobilePosition: "55% center",
    accentRgb: "166, 124, 82",
    atmosphere: "dust",
    trackTitle: "Agomoni Aalo (Jayati Chakraborty)",
    trackSrc: "https://archive.org/download/agomoni-aalo-official-music-video-jayati-jayati-chakraborty-official-bvij-2-hd-ggv-4/Agomoni%20Aalo%20__%20Official%20Music%20Video%20__%20Jayati%20__%20%E0%A6%86%E0%A6%97%E0%A6%AE%E0%A6%A8%E0%A7%80%20%E0%A6%86%E0%A6%B2%E0%A7%8B%20__%20%E0%A6%9C%E0%A7%9F%E0%A6%A4%E0%A7%80%20___%20Jayati%20Chakraborty%20Official%20%5Bbvij2HdGgv4%5D.mp3",
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
    mobilePosition: "65% center",
    accentRgb: "197, 107, 45",
    atmosphere: "golden",
    trackTitle: "Durga Durgatinashini",
    trackSrc: "https://archive.org/download/durga-durgti-naashini/Durga%20Durgti%20Naashini%20.mp3",
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
    mobilePosition: "50% center",
    accentRgb: "228, 142, 88",
    atmosphere: "twilight",
    trackTitle: "Dhak Er Bajna (Shashthi Bodhon Beats)",
    trackSrc: "https://archive.org/download/dhak-er-bajna-2/DHAK%20ER%20BAJNA%20%202.mp3",
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
    mobilePosition: "52% center",
    accentRgb: "224, 117, 43",
    atmosphere: "incense",
    trackTitle: "Kola Bou Snan & Saptami Dhak",
    trackSrc: "https://archive.org/download/dhak-er-bajna-2/DHAK%20ER%20BAJNA%20%202.mp3",
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
    mobilePosition: "58% center",
    accentRgb: "218, 59, 33",
    atmosphere: "diya",
    trackTitle: "Argala Stotram (Pushpanjali Mantra)",
    trackSrc: "https://archive.org/download/CHANDIDURGASAPTASATIPATH/04.%20Argalastotram%281%29.mp3",
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
    mobilePosition: "50% center",
    accentRgb: "186, 73, 51",
    atmosphere: "petals",
    trackTitle: "Dhunuchi Naach & Aarti Dhak",
    trackSrc: "https://archive.org/download/dhak-er-bajna-2/DHAK%20ER%20BAJNA%20%202.mp3",
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
    mobilePosition: "54% center",
    accentRgb: "158, 62, 46",
    atmosphere: "vermilion",
    trackTitle: "Bisarjan Dhak & Asche Bochor Abar Hobe",
    trackSrc: "https://archive.org/download/dhak-er-bajna-2/DHAK%20ER%20BAJNA%20%202.mp3",
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
    mobilePosition: "50% center",
    accentRgb: "109, 114, 120",
    atmosphere: "cool-mist",
    trackTitle: "Subho Bijoya Nostalgia & Rabindrasangeet",
    trackSrc: "https://archive.org/download/SrabonoDharayeEloRatri/SrabonoDharaeEloRatri.mp3",
  },
];
