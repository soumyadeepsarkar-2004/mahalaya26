// --- Data Models ---

const festivalDays = [
    {
        id: "mahalaya",
        title: "MAHALAYA",
        subtitle: "Dawn chants & anticipation",
        bgUrl: "assets/bg-mahalaya.png",
        sceneRgb: "230, 161, 91", // Warm dawn
        tracks: [
            { title: "Birendra Krishna Bhadra - Ya Chandi", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
            { title: "Jago Tumi Jago", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" }
        ]
    },
    {
        id: "tritiya",
        title: "TRITIYA",
        subtitle: "Preparation & afternoon warmth",
        bgUrl: "assets/bg-tritiya.png",
        sceneRgb: "230, 161, 91", 
        tracks: [
            { title: "Agomoni Gaan - Flute", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" }
        ]
    },
    {
        id: "panchomi",
        title: "PANCHAMI",
        subtitle: "Bodhon Awakening",
        bgUrl: "assets/bg-panchomi.png",
        sceneRgb: "230, 161, 91", // Warm amber
        tracks: [
            { title: "Festive Anticipation", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" }
        ]
    },
    {
        id: "shasti",
        title: "SHASHTHI",
        subtitle: "Adhibas & Welcoming",
        bgUrl: "assets/bg-shasti.png",
        sceneRgb: "150, 100, 50", // Twilight gold
        tracks: [
            { title: "Bodhon Dhak", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" }
        ]
    },
    {
        id: "shaptami",
        title: "SAPTAMI",
        subtitle: "Morning Anjali",
        bgUrl: "assets/bg-shaptami.png",
        sceneRgb: "240, 230, 200", // Soft cream/gold
        tracks: [
            { title: "Anjali Mantra", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" }
        ]
    },
    {
        id: "ashtami",
        title: "ASHTAMI",
        subtitle: "Sandhi Puja & Diya Light",
        bgUrl: "assets/bg-ashtami.png",
        sceneRgb: "242, 169, 0", // Diya amber
        tracks: [
            { title: "Sandhi Puja Aarti", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
            { title: "Intense Dhak Beats", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" }
        ]
    },
    {
        id: "nabami",
        title: "NAVAMI",
        subtitle: "Evening Celebrations",
        bgUrl: "assets/bg-nabami.png",
        sceneRgb: "217, 37, 37", // Festival red
        tracks: [
            { title: "Dhunuchi Naach", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" }
        ]
    },
    {
        id: "dashami",
        title: "DASHAMI",
        subtitle: "Bisarjan & Sindoor Khela",
        bgUrl: "assets/bg-dashami.png",
        sceneRgb: "255, 69, 0", // Vermilion red
        tracks: [
            { title: "Bisarjan Melancholy", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" }
        ]
    },
    {
        id: "ekadashi",
        title: "EKADASHI",
        subtitle: "Asche bochhor abar hobe",
        bgUrl: "assets/bg-ekadashi.png",
        sceneRgb: "100, 120, 140", // Cool muted blue-grey
        tracks: [
            { title: "Quiet Morning Flute", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3" }
        ]
    }
];

// --- State ---
let currentDayIndex = 0;
let currentTrackIndex = 0;
let isPlaying = false;
let activeBgLayer = 1; // 1 or 2

// --- DOM Elements ---
const bg1 = document.getElementById('bg-1');
const bg2 = document.getElementById('bg-2');
const fpTitle = document.getElementById('fp-title');
const fpSubtitle = document.getElementById('fp-subtitle');
const timelineContainer = document.getElementById('timeline-container');
const playerTrack = document.getElementById('player-track');
const audio = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('btn-play-pause');
const playIcon = document.getElementById('play-icon');
const audioEq = document.getElementById('audio-eq');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');
const volumeSlider = document.getElementById('volume-slider');
const cdVal = document.getElementById('cd-val');
const cdLabel = document.getElementById('cd-label');
const root = document.documentElement;

// --- Initialize Application ---
function init() {
    buildTimeline();
    selectDay(0, false);
    startCountdown();
}

// --- Build Timeline ---
function buildTimeline() {
    festivalDays.forEach((day, index) => {
        const pill = document.createElement('div');
        pill.className = 'timeline-pill';
        pill.textContent = day.title;
        pill.addEventListener('click', () => {
            if (currentDayIndex !== index) {
                selectDay(index, true);
            }
        });
        timelineContainer.appendChild(pill);
    });
}

// --- Select Day ---
function selectDay(index, crossfade = true) {
    currentDayIndex = index;
    const day = festivalDays[index];

    // Update Timeline UI
    const pills = timelineContainer.querySelectorAll('.timeline-pill');
    pills.forEach((pill, i) => {
        if (i === index) {
            pill.classList.add('active');
            pill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
            pill.classList.remove('active');
        }
    });

    // Update Scene Color Variable
    root.style.setProperty('--scene-rgb', day.sceneRgb);

    // Update Text with fade
    fpTitle.style.opacity = '0';
    fpSubtitle.style.opacity = '0';
    setTimeout(() => {
        fpTitle.textContent = day.title;
        fpSubtitle.textContent = day.subtitle;
        fpTitle.style.opacity = '1';
        fpSubtitle.style.opacity = '1';
    }, 300);

    // Update Background via Crossfade
    if (crossfade) {
        if (activeBgLayer === 1) {
            bg2.style.backgroundImage = \`url('\${day.bgUrl}')\`;
            bg2.style.opacity = '1';
            bg1.style.opacity = '0';
            activeBgLayer = 2;
        } else {
            bg1.style.backgroundImage = \`url('\${day.bgUrl}')\`;
            bg1.style.opacity = '1';
            bg2.style.opacity = '0';
            activeBgLayer = 1;
        }
    } else {
        bg1.style.backgroundImage = \`url('\${day.bgUrl}')\`;
        bg1.style.opacity = '1';
        bg2.style.opacity = '0';
    }

    // Preload next image silently
    if (index + 1 < festivalDays.length) {
        const img = new Image();
        img.src = festivalDays[index + 1].bgUrl;
    }

    // Update Audio Track
    currentTrackIndex = 0;
    loadTrack();
    if (isPlaying) {
        audio.play().catch(console.error);
    }
}

// --- Audio Management ---
function loadTrack() {
    const day = festivalDays[currentDayIndex];
    if (!day.tracks || day.tracks.length === 0) return;
    
    const track = day.tracks[currentTrackIndex];
    audio.src = track.src;
    playerTrack.textContent = track.title;
    audio.load();
}

function togglePlay() {
    if (audio.paused) {
        audio.play().then(() => {
            isPlaying = true;
            playIcon.classList.replace('fa-play', 'fa-pause');
            audioEq.style.opacity = '1';
        }).catch(console.error);
    } else {
        audio.pause();
        isPlaying = false;
        playIcon.classList.replace('fa-pause', 'fa-play');
        audioEq.style.opacity = '0';
    }
}

playPauseBtn.addEventListener('click', togglePlay);

audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = \`\${percent}%\`;
    }
});

progressContainer.addEventListener('click', (e) => {
    const rect = progressContainer.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pos * audio.duration;
});

audio.addEventListener('ended', () => {
    const day = festivalDays[currentDayIndex];
    if (currentTrackIndex + 1 < day.tracks.length) {
        currentTrackIndex++;
        loadTrack();
        audio.play();
    } else {
        // Stop playing or loop
        currentTrackIndex = 0;
        loadTrack();
        isPlaying = false;
        playIcon.classList.replace('fa-pause', 'fa-play');
        audioEq.style.opacity = '0';
    }
});

volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

// --- Minimal Countdown ---
function startCountdown() {
    // Target Oct 6, 2026, 04:00 AM IST
    const targetDate = new Date('October 6, 2026 04:00:00 GMT+0530').getTime();

    const updateCd = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance <= 0) {
            cdVal.textContent = "NOW";
            cdLabel.innerHTML = "MAHALAYA<br>BEGINS";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        if (days > 0) {
            cdVal.textContent = days.toString().padStart(2, '0');
            cdLabel.innerHTML = "Days<br>Until";
        } else {
            cdVal.textContent = hours.toString().padStart(2, '0');
            cdLabel.innerHTML = "Hrs<br>Until";
        }
    };

    updateCd();
    setInterval(updateCd, 1000 * 60); // Update every minute to save battery
}

// Start
init();
audio.volume = volumeSlider.value;
