// --- Tracks Data (Mock data) ---
const playlists = {
    "mahalaya": [
        { title: "Birendra Krishna Bhadra - Ya Chandi", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
        { title: "Jago Tumi Jago", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" }
    ],
    "tritiya": [
        { title: "Agomoni Gaan - Flute", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" }
    ],
    "panchomi": [
        { title: "Festive Anticipation", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" }
    ],
    "shasti": [
        { title: "Bodhon Dhak", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" }
    ],
    "shaptami": [
        { title: "Anjali Mantra", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" }
    ],
    "ashtami": [
        { title: "Sandhi Puja Aarti", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
        { title: "Intense Dhak Beats", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" }
    ],
    "nabami": [
        { title: "Dhunuchi Naach", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" }
    ],
    "dashami": [
        { title: "Bisarjan Melancholy", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" }
    ],
    "ekadashi": [
        { title: "Asche Bochhor Abar Hobe - Quiet Flute", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3" }
    ],
    "radio": [
        { title: "Akashvani Kolkata (Live Stream)", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3" },
        { title: "Retro Puja Radio", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3" },
        { title: "Lofi Durga Puja Beats", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3" }
    ]
};

let currentPlaylist = playlists["mahalaya"];
let currentTrackIndex = 0;
let isPlaying = false;

// --- Background Images Mapping ---
const backgroundImages = {
    "mahalaya": "assets/bg-mahalaya.png",
    "tritiya": "assets/bg-tritiya.png",
    "panchomi": "assets/bg-panchomi.png",
    "shasti": "assets/bg-shasti.png",
    "shaptami": "assets/bg-shaptami.png",
    "ashtami": "assets/bg-ashtami.png",
    "nabami": "assets/bg-nabami.png",
    "dashami": "assets/bg-dashami.png",
    "ekadashi": "assets/bg-ekadashi.png",
    "radio": "assets/bg-mahalaya.png"
};

// --- Elements ---
const backgroundContainer = document.getElementById('background-container');
const audio = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('btn-play-pause');
const playIcon = document.getElementById('play-icon');
const prevBtn = document.getElementById('btn-prev');
const nextBtn = document.getElementById('btn-next');
const trackName = document.getElementById('current-track-name');
const playlistName = document.getElementById('current-playlist-name');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');
const timeCurrent = document.getElementById('time-current');
const timeTotal = document.getElementById('time-total');
const volumeSlider = document.getElementById('volume-slider');
const miniEq = document.getElementById('mini-eq');
const liveEq = document.getElementById('live-broadcast'); // for large eq
const tabRadio = document.getElementById('tab-radio');
const tabPlaylists = document.getElementById('tab-playlists');
const contentRadio = document.getElementById('content-radio');
const contentPlaylists = document.getElementById('content-playlists');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const sidebar = document.getElementById('sidebar');

// --- Initialization ---
function loadTrack(index) {
    if (index >= currentPlaylist.length || index < 0) return;
    const track = currentPlaylist[index];
    audio.src = track.src;
    trackName.textContent = track.title;
    audio.load();
}

// Format time in seconds to M:SS
function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
}

// --- Player Logic ---
function togglePlay() {
    if (audio.paused) {
        audio.play().catch(e => console.error("Playback failed:", e));
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
        playIcon.classList.remove('ml-1'); // adjust pause icon centering
        miniEq.classList.remove('hidden');
        miniEq.classList.add('playing', 'flex');
        liveEq.classList.add('playing');
        isPlaying = true;
    } else {
        audio.pause();
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        playIcon.classList.add('ml-1');
        miniEq.classList.remove('playing');
        liveEq.classList.remove('playing');
        isPlaying = false;
    }
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % currentPlaylist.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) {
        audio.play();
    }
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) {
        audio.play();
    }
}

// Audio Event Listeners
audio.addEventListener('loadedmetadata', () => {
    timeTotal.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
    timeCurrent.textContent = formatTime(audio.currentTime);
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
});

audio.addEventListener('ended', nextTrack);

// Click on progress bar to seek
progressContainer.addEventListener('click', (e) => {
    const rect = progressContainer.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pos * audio.duration;
});

// Controls Event Listeners
playPauseBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);
volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

// --- Tab Switching ---
function switchTab(activeTab, inactiveTab, showContent, hideContent) {
    activeTab.classList.add('text-orange-200', 'border-b-2', 'border-orange-200');
    activeTab.classList.remove('text-gray-400', 'hover:text-white');
    
    inactiveTab.classList.remove('text-orange-200', 'border-b-2', 'border-orange-200');
    inactiveTab.classList.add('text-gray-400', 'hover:text-white');

    showContent.classList.remove('hidden');
    hideContent.classList.add('hidden');
}

tabRadio.addEventListener('click', () => switchTab(tabRadio, tabPlaylists, contentRadio, contentPlaylists));
tabPlaylists.addEventListener('click', () => switchTab(tabPlaylists, tabRadio, contentPlaylists, contentRadio));


// --- Select Playlist / Station ---
function setActiveItem(clickedItem) {
    document.querySelectorAll('.playlist-item, .radio-station').forEach(el => {
        el.classList.remove('playlist-active');
    });
    clickedItem.classList.add('playlist-active');
}

document.querySelectorAll('.playlist-item').forEach(item => {
    item.addEventListener('click', () => {
        setActiveItem(item);
        const playlistKey = item.getAttribute('data-playlist');
        currentPlaylist = playlists[playlistKey];
        currentTrackIndex = 0;
        
        // Use the text from the p containing the name, ignoring the icon
        const nameEl = item.querySelector('.font-semibold');
        playlistName.textContent = nameEl ? nameEl.textContent : "Unknown Playlist";
        
        // Update background
        const bgImg = backgroundImages[playlistKey] || "assets/bg-mahalaya.png";
        backgroundContainer.style.backgroundImage = `url('${bgImg}')`;

        loadTrack(currentTrackIndex);
        if (isPlaying) {
            audio.play().catch(e => console.error(e));
        } else {
            togglePlay(); // auto-play when selecting a new playlist
        }
    });
});

document.querySelectorAll('.radio-station').forEach((item, idx) => {
    item.addEventListener('click', () => {
        setActiveItem(item);
        currentPlaylist = playlists["radio"];
        currentTrackIndex = idx;
        
        const nameEl = item.querySelector('.font-semibold');
        playlistName.textContent = nameEl ? nameEl.textContent : "Live Radio";
        
        // Update background for radio
        backgroundContainer.style.backgroundImage = `url('assets/bg-mahalaya.png')`;

        loadTrack(currentTrackIndex);
        if (!isPlaying) {
            togglePlay();
        } else {
            audio.play().catch(e => console.error(e));
        }
    });
});

// --- Mobile Sidebar Toggle ---
mobileMenuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('-translate-x-full');
});

// --- Countdown Timer Logic ---
// Set target to next Mahalaya (Oct 6, 2026, 04:00 AM IST)
// For demonstration, let's create a date dynamically if it's past, but hardcoding for now.
const targetDate = new Date('October 6, 2026 04:00:00 GMT+0530').getTime();

const countdownContainer = document.getElementById('countdown-container');
const liveBroadcastContainer = document.getElementById('live-broadcast');

const timerInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
        clearInterval(timerInterval);
        // Transition to Live Broadcast
        countdownContainer.classList.add('opacity-0');
        setTimeout(() => {
            countdownContainer.classList.add('hidden');
            liveBroadcastContainer.classList.remove('hidden');
            // Auto play Mahalaya (simulate)
            currentPlaylist = playlists["mahalaya"];
            currentTrackIndex = 0;
            playlistName.textContent = "Mahalaya";
            loadTrack(0);
            togglePlay();
        }, 1000);
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.querySelectorAll('.days-val').forEach(el => el.textContent = days.toString().padStart(2, '0'));
    document.querySelectorAll('.hours-val').forEach(el => el.textContent = hours.toString().padStart(2, '0'));
    document.querySelectorAll('.minutes-val').forEach(el => el.textContent = minutes.toString().padStart(2, '0'));
    document.querySelectorAll('.seconds-val').forEach(el => el.textContent = seconds.toString().padStart(2, '0'));
}, 1000);

// Init
loadTrack(0);
audio.volume = volumeSlider.value;
