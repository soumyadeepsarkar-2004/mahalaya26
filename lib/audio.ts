import { FestivalId } from "@/data/festival";

export type TrackCategory = "radio" | "song" | "chant" | "dhak";

export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  src: string;
  category: TrackCategory;
  isLive?: boolean;
  frequency?: string; // e.g. "107.0 FM", "100.1 FM", "AM 1008"
  description?: string;
}

/**
 * Curated authentic Bengali playlists for each day of the festival,
 * featuring popular Kolkata FM radio channels, iconic broadcasts,
 * and canonical tracks celebrated across Bengal.
 */
export const FESTIVAL_PLAYLISTS: Record<FestivalId, AudioTrack[]> = {
  mahalaya: [
    {
      id: "mahalaya-live-geetanjali",
      title: "Akashvani Kolkata Geetanjali",
      artist: "All India Radio Kolkata · Primary Bengali Channel",
      src: "https://airhlspush.pc.cdn.bitgravity.com/httppush/hlspbaudio055/hlspbaudio05564kbps.m3u8",
      category: "radio",
      isLive: true,
      frequency: "AM 1008",
      description: "Live broadcast from Akashvani Kolkata, the home of Mahishasura Mardini.",
    },
    {
      id: "mahalaya-live-rainbow",
      title: "Akashvani FM Rainbow Kolkata",
      artist: "AIR FM 107.0 MHz · Music & Festive Culture",
      src: "https://airhlspush.pc.cdn.bitgravity.com/httppush/hlspbaudio058/hlspbaudio05864kbps.m3u8",
      category: "radio",
      isLive: true,
      frequency: "107.0 FM",
      description: "Kolkata's beloved youth & cultural FM channel broadcasting Puja celebrations.",
    },
    {
      id: "mahalaya-live-gold",
      title: "AIR FM Gold Kolkata",
      artist: "AIR FM 100.1 MHz · Golden Classics",
      src: "https://airhlspush.pc.cdn.bitgravity.com/httppush/hlspbaudio057/hlspbaudio05764kbps.m3u8",
      category: "radio",
      isLive: true,
      frequency: "100.1 FM",
      description: "Timeless Bengali classics and festive special programming.",
    },
    {
      id: "mahalaya-birendra-krishna",
      title: "Mahishasura Mardini (Complete Broadcast)",
      artist: "Birendra Krishna Bhadra · Akashvani Kolkata",
      src: "https://archive.org/download/mahalaya-birendra-krishna/Mahalaya-birendra-krishna.mp3",
      category: "chant",
      frequency: "AM 657",
      description: "The timeless 1931 radio invocation of Devi Durga ushering in Devi Paksha.",
    },
    {
      id: "mahalaya-stotram",
      title: "Mahishasur Mardini Stotram (Aigiri Nandini)",
      artist: "Traditional Sanskrit Chants",
      src: "https://archive.org/download/MahishasurMardiniStotram/Mahishasur%20Mardini%20Stotram.mp3",
      category: "chant",
      frequency: "MW 820",
      description: "The euphoric, heroic chanting praising the Goddess Mahishasuramardini.",
    },
  ],

  tritiya: [
    {
      id: "tritiya-agomoni-aalo",
      title: "Agomoni Aalo (Devi Agomoni Gaan)",
      artist: "Jayati Chakraborty",
      src: "https://archive.org/download/agomoni-aalo-official-music-video-jayati-jayati-chakraborty-official-bvij-2-hd-ggv-4/Agomoni%20Aalo%20__%20Official%20Music%20Video%20__%20Jayati%20__%20%E0%A6%86%E0%A6%97%E0%A6%AE%E0%A6%A8%E0%A7%80%20%E0%A6%86%E0%A6%B2%E0%A7%8B%20__%20%E0%A6%9C%E0%A7%9F%E0%A6%A4%E0%A7%80%20___%20Jayati%20Chakraborty%20Official%20%5Bbvij2HdGgv4%5D.mp3",
      category: "song",
      frequency: "91.9 FM",
      description: "Sweet anticipation as the bamboo scaffolds turn into glowing pandals.",
    },
    {
      id: "tritiya-agomoni-geet",
      title: "Agomoni Geet (Traditional Welcome)",
      artist: "Bengali Devotional Chorus",
      src: "https://archive.org/download/AgomoniGeet/agomoni%20geet.mp3",
      category: "song",
      frequency: "98.3 FM",
      description: "Traditional Agomoni melody welcoming Maa Durga into our homes.",
    },
    {
      id: "tritiya-mellow-bangla",
      title: "Mellow Bangla 24/7",
      artist: "Bengali Festive Radio",
      src: "https://radio.mellowbangla.com/stream",
      category: "radio",
      isLive: true,
      frequency: "WEB FM",
      description: "Non-stop soothing Bengali melodies and Puja vibes.",
    },
  ],

  panchami: [
    {
      id: "panchami-durgatinashini",
      title: "Durga Durgatinashini (The Arrival)",
      artist: "Bengali Devotional Chorus",
      src: "https://archive.org/download/durga-durgti-naashini/Durga%20Durgti%20Naashini%20.mp3",
      category: "song",
      frequency: "93.5 FM",
      description: "The idols are unveiled; streets reverberate with joyous pandal hoppers.",
    },
    {
      id: "panchami-agomoni-collection",
      title: "Pujo Elo Re (Agomoni Collection)",
      artist: "Bengali Festive Artists",
      src: "https://archive.org/download/agomoni-song-2025-durga-puja-song-2025-durga-puja-song-bengali-durga-puja-song-bftbto-g-4tb-a/Agomoni%20song%202025%20_%20%E0%A6%86%E0%A6%97%E0%A6%AE%E0%A6%A8%E0%A7%80%20%E0%A6%97%E0%A6%BE%E0%A6%A8%20_%20Durga%20puja%20song%202025%20_%20Durga%20Puja%20song%20_%20Bengali%20Durga%20Puja%20song%20%5BBFtbtoG4tbA%5D.mp3",
      category: "song",
      frequency: "104.0 FM",
      description: "Lively Durga Puja collection marking the beginning of pandal hopping.",
    },
    {
      id: "panchami-fm-rainbow",
      title: "Akashvani FM Rainbow Kolkata",
      artist: "AIR FM 107.0 MHz · Kolkata Pandal Hop",
      src: "https://airhlspush.pc.cdn.bitgravity.com/httppush/hlspbaudio058/hlspbaudio05864kbps.m3u8",
      category: "radio",
      isLive: true,
      frequency: "107.0 FM",
      description: "Live commentary and music from Kolkata's biggest pandals.",
    },
  ],

  shashthi: [
    {
      id: "shashthi-dhak-bodhon",
      title: "Dhak Er Bajna (Shashthi Bodhon Beats)",
      artist: "Traditional Bengal Dhakis",
      src: "https://archive.org/download/dhak-er-bajna-2/DHAK%20ER%20BAJNA%20%202.mp3",
      category: "dhak",
      frequency: "LIVE DHAK",
      description: "Bodhon under the bel tree. The thunderous dhak beats officially start Durga Puja.",
    },
    {
      id: "shashthi-saptashloki",
      title: "Saptashloki Durga & Bodhon Chants",
      artist: "Devi Mahatmyam Recitation",
      src: "https://archive.org/download/CHANDIDURGASAPTASATIPATH/01.Saptashloki%20durga.mp3",
      category: "chant",
      frequency: "AM 1008",
      description: "Akalbodhon invocation inviting the Divine Mother into the clay idol.",
    },
    {
      id: "shashthi-agomoni-aalo",
      title: "Agomoni Aalo",
      artist: "Jayati Chakraborty",
      src: "https://archive.org/download/agomoni-aalo-official-music-video-jayati-jayati-chakraborty-official-bvij-2-hd-ggv-4/Agomoni%20Aalo%20__%20Official%20Music%20Video%20__%20Jayati%20__%20%E0%A6%86%E0%A6%97%E0%A6%AE%E0%A6%A8%E0%A7%80%20%E0%A6%86%E0%A6%B2%E0%A7%8B%20__%20%E0%A6%9C%E0%A7%9F%E0%A6%A4%E0%A7%80%20___%20Jayati%20Chakraborty%20Official%20%5Bbvij2HdGgv4%5D.mp3",
      category: "song",
      frequency: "91.9 FM",
      description: "Celebration of Maa Durga's arrival on Shashthi evening.",
    },
  ],

  saptami: [
    {
      id: "saptami-kola-bou-dhak",
      title: "Kola Bou Snan & Saptami Dhak",
      artist: "Traditional Dhaki Ensemble",
      src: "https://archive.org/download/dhak-er-bajna-2/DHAK%20ER%20BAJNA%20%202.mp3",
      category: "dhak",
      frequency: "LIVE DHAK",
      description: "Nabapatrika snan at the riverbank at dawn as the rhythmic dhak beats guide the procession.",
    },
    {
      id: "saptami-manas-puja",
      title: "Durga Manas Puja (Morning Offering)",
      artist: "Vedic Chandi Recitation",
      src: "https://archive.org/download/CHANDIDURGASAPTASATIPATH/23.%20Durga%20manas%20puja.mp3",
      category: "chant",
      frequency: "AM 1008",
      description: "Sacred morning invocation during Maha Saptami pratham puja.",
    },
    {
      id: "saptami-fm-rainbow",
      title: "Akashvani FM Rainbow Kolkata",
      artist: "AIR FM 107.0 MHz · Live Puja Vibes",
      src: "https://airhlspush.pc.cdn.bitgravity.com/httppush/hlspbaudio058/hlspbaudio05864kbps.m3u8",
      category: "radio",
      isLive: true,
      frequency: "107.0 FM",
      description: "Live Puja coverage and celebrations across Kolkata.",
    },
  ],

  ashtami: [
    {
      id: "ashtami-pushpanjali-argala",
      title: "Argala Stotram (Pushpanjali Mantra)",
      artist: "Jayanti Mangala Kali · Sanskrit Chandi Path",
      src: "https://archive.org/download/CHANDIDURGASAPTASATIPATH/04.%20Argalastotram%281%29.mp3",
      category: "chant",
      frequency: "SACRED MW",
      description: "The iconic Pushpanjali mantra chanted by millions of Bengalis on Maha Ashtami morning.",
    },
    {
      id: "ashtami-sandhi-dhak",
      title: "Sandhi Puja 108 Pradip Dhak Beats",
      artist: "High-Energy Dhaki Rhythms",
      src: "https://archive.org/download/dhak-er-bajna-2/DHAK%20ER%20BAJNA%20%202.mp3",
      category: "dhak",
      frequency: "LIVE DHAK",
      description: "The pinnacle of devotion during the juncture of Ashtami and Nabami with 108 lotuses.",
    },
    {
      id: "ashtami-stotram",
      title: "Mahishasur Mardini Stotram",
      artist: "Traditional Sanskrit Chants",
      src: "https://archive.org/download/MahishasurMardiniStotram/Mahishasur%20Mardini%20Stotram.mp3",
      category: "chant",
      frequency: "AM 1008",
      description: "Chanted during the fierce battle of Goddess Chamunda slaying Chanda and Munda.",
    },
  ],

  nabami: [
    {
      id: "nabami-dhunuchi-dhak",
      title: "Dhunuchi Naach & Aarti Dhak Frenzy",
      artist: "Bengal Dhaki Utsav",
      src: "https://archive.org/download/dhak-er-bajna-2/DHAK%20ER%20BAJNA%20%202.mp3",
      category: "dhak",
      frequency: "LIVE DHAK",
      description: "The thunderous, ecstatic rhythm of smoke-filled Dhunuchi Naach on Maha Nabami night.",
    },
    {
      id: "nabami-durgatinashini",
      title: "Durga Durgatinashini (Maha Aarti)",
      artist: "Bengali Devotional Chorus",
      src: "https://archive.org/download/durga-durgti-naashini/Durga%20Durgti%20Naashini%20.mp3",
      category: "song",
      frequency: "98.3 FM",
      description: "The grand evening aarti filled with camphor, incense, and profound reverence.",
    },
    {
      id: "nabami-mellow-bangla",
      title: "Mellow Bangla Live Radio",
      artist: "Bengali Festive Stream 24/7",
      src: "https://radio.mellowbangla.com/stream",
      category: "radio",
      isLive: true,
      frequency: "WEB FM",
      description: "Puja carnival melodies across Bengal on Nabami night.",
    },
  ],

  dashami: [
    {
      id: "dashami-bisarjan-dhak",
      title: "Bisarjan Dhak & Asche Bochor Abar Hobe",
      artist: "Traditional Bisarjan Dhak",
      src: "https://archive.org/download/dhak-er-bajna-2/DHAK%20ER%20BAJNA%20%202.mp3",
      category: "dhak",
      frequency: "LIVE DHAK",
      description: "Sindoor Khela, tearful eyes, and the eternal whisper: 'Asche Bochor Abar Hobe'.",
    },
    {
      id: "dashami-rabindrasangeet",
      title: "Srabono Dharaye Elo Ratri (Farewell Melodies)",
      artist: "Tagore Classic · Rabindrasangeet",
      src: "https://archive.org/download/SrabonoDharayeEloRatri/SrabonoDharaeEloRatri.mp3",
      category: "song",
      frequency: "AM 1008",
      description: "Poignant melody as Maa Durga departs for Mount Kailash.",
    },
    {
      id: "dashami-kshamaprarthana",
      title: "Devi Kshamaparadh Stotram (Kshama Prarthana)",
      artist: "Vedic Chandi Path",
      src: "https://archive.org/download/CHANDIDURGASAPTASATIPATH/25.%20Devi%20kshamaparadh%20stotram.mp3",
      category: "chant",
      frequency: "MW 820",
      description: "Seeking forgiveness and blessings as the Mother embarks on Her journey back.",
    },
  ],

  ekadashi: [
    {
      id: "ekadashi-subho-bijoya",
      title: "Subho Bijoya Nostalgia & Rabindrasangeet",
      artist: "Tagore Melodies & Sitar Ensemble",
      src: "https://archive.org/download/SrabonoDharayeEloRatri/SrabonoDharaeEloRatri.mp3",
      category: "song",
      frequency: "AM 1008",
      description: "Subho Bijoya greetings, touching elders' feet, sharing sweets, and warmth.",
    },
    {
      id: "ekadashi-mellow-bangla",
      title: "Mellow Bangla Subho Bijoya Special",
      artist: "Bengali Classics 24/7",
      src: "https://radio.mellowbangla.com/stream",
      category: "radio",
      isLive: true,
      frequency: "WEB FM",
      description: "Nostalgic Subho Bijoya classics and memories.",
    },
    {
      id: "ekadashi-live-geetanjali",
      title: "Akashvani Kolkata Geetanjali",
      artist: "All India Radio Kolkata · Subho Bijoya Broadcast",
      src: "https://airhlspush.pc.cdn.bitgravity.com/httppush/hlspbaudio055/hlspbaudio05564kbps.m3u8",
      category: "radio",
      isLive: true,
      frequency: "AM 1008",
      description: "Akashvani Kolkata's Bijoya Sammelani broadcast.",
    },
  ],
};

/**
 * Retrieve playlist for a given festival day, falling back to Mahalaya.
 */
export function getPlaylistForFestival(festivalId: FestivalId): AudioTrack[] {
  return FESTIVAL_PLAYLISTS[festivalId] || FESTIVAL_PLAYLISTS.mahalaya;
}

/**
 * Default tracks for initial store state (points to Mahalaya lineup)
 */
export const DEFAULT_AUDIO_TRACKS: AudioTrack[] = FESTIVAL_PLAYLISTS.mahalaya;
