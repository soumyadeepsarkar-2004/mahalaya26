const fs = require('fs');
let js = fs.readFileSync('script.js', 'utf-8');

// Update audioTracks
js = js.replace(
    /title: "Dhak Beats Ambience",/,
    'title: "Ambient Kolkata I",'
).replace(
    /title: "Sandhi Puja Bells",/,
    'title: "Ambient Kolkata II",'
).replace(
    /title: "Morning Chants",/,
    'title: "Festival Atmosphere I",'
).replace(
    /title: "Evening Aarti",/,
    'title: "Festival Atmosphere II",'
);


// Replace updateAudioUI function
const updateAudioUIStr = `function updateAudioUI() {
    const playing = !audio.paused && !audio.ended;
    isPlaying = playing;

    const icon = document.getElementById('play-icon-desktop');
    if (icon) {
        icon.className = playing
            ? 'fas fa-pause text-xs text-white'
            : 'fas fa-play text-xs text-white translate-x-[1px]';
    }

    const eq = document.getElementById('audio-eq-desktop');
    if (eq) {
        eq.style.opacity = playing ? '1' : '0';
    }

    const signal = document.getElementById('signal-indicator-desktop');
    if (signal) {
        signal.className = playing
            ? 'w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse'
            : 'w-1.5 h-1.5 rounded-full bg-white/30';

        signal.style.boxShadow = playing
            ? '0 0 8px rgba(239,68,68,.6)'
            : 'none';
    }

    const track = audioTracks[currentTrackIndex]?.title || '';
    const trackEl = document.getElementById('player-track-desktop');
    if (trackEl) {
        trackEl.textContent = track;
    }
}`;

// Find updateAudioUI
const updateAudioUIStart = js.indexOf('function updateAudioUI() {');
const updateAudioUIEnd = js.indexOf('// Track Time formatting');

if(updateAudioUIStart !== -1 && updateAudioUIEnd !== -1) {
    js = js.substring(0, updateAudioUIStart) + updateAudioUIStr + '\n\n' + js.substring(updateAudioUIEnd);
}

// Add event listeners right after updateAudioUI
const listeners = `
audio.addEventListener('play', updateAudioUI);
audio.addEventListener('pause', updateAudioUI);
audio.addEventListener('ended', updateAudioUI);
`;

const timeFormatStart = js.indexOf('// Track Time formatting');
if(timeFormatStart !== -1) {
    js = js.substring(0, timeFormatStart) + listeners + '\n' + js.substring(timeFormatStart);
}

// Remove old button listeners array and use only btn-play-pause-desktop
js = js.replace(/\[\s*document.getElementById\('btn-play-pause-desktop'\)[\s\S]*?\]\.forEach\(btn => {/g, 
    `[document.getElementById('btn-play-pause-desktop')].forEach(btn => {`);

// Remove mobile-radio-bar listener if it exists
js = js.replace(/const mrb = document\.getElementById\('mobile-radio-bar'\);[\s\S]*?\}\);/g, '');

fs.writeFileSync('script.js', js);
