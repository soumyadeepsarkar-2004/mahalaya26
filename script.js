// --- Data Models ---

const festivalDays = [
    {
        id: "mahalaya",
        title: "Mahalaya",
        subtitle: "The Call",
        desc: "Dawn breaks. The eternal chants fill the mist-covered air. The anticipation begins.",
        bgUrl: "assets/bg-mahalaya.png",
        sceneRgb: "230, 161, 91", 
        tracks: [
            { title: "Birendra Krishna Bhadra - Ya Chandi", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
            { title: "Jago Tumi Jago", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" }
        ]
    },
    {
        id: "tritiya",
        title: "Tritiya",
        subtitle: "Preparations",
        desc: "The city hums with quiet energy. Bamboo structures rise, and the scent of shiuli floats in the breeze.",
        bgUrl: "assets/bg-tritiya.png",
        sceneRgb: "230, 161, 91", 
        tracks: [
            { title: "Agomoni Flute", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" }
        ]
    },
    {
        id: "panchomi",
        title: "Panchami",
        subtitle: "The Awakening",
        desc: "The air feels different now. She is on her way. Golden afternoon light washes over the balcony.",
        bgUrl: "assets/bg-panchomi.png",
        sceneRgb: "230, 161, 91", 
        tracks: [
            { title: "Festive Anticipation", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" }
        ]
    },
    {
        id: "shasti",
        title: "Shashthi",
        subtitle: "Adhibas",
        desc: "The Goddess is welcomed under the bel tree. Twilight falls, and the first dhak beats echo across Bengal.",
        bgUrl: "assets/bg-shasti.png",
        sceneRgb: "150, 100, 50", 
        tracks: [
            { title: "Bodhon Dhak", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" }
        ]
    },
    {
        id: "shaptami",
        title: "Saptami",
        subtitle: "Pushpanjali",
        desc: "A bright morning. Offerings of marigold and bel leaves. A shared devotion connects the pandal to the sky.",
        bgUrl: "assets/bg-shaptami.png",
        sceneRgb: "240, 230, 200", 
        tracks: [
            { title: "Anjali Mantra", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" }
        ]
    },
    {
        id: "ashtami",
        title: "Ashtami",
        subtitle: "Sandhi",
        desc: "The most sacred hour. 108 lotuses, 108 diyas. The night is steeped in amber light and intense rhythm.",
        bgUrl: "assets/bg-ashtami.png",
        sceneRgb: "242, 169, 0", 
        tracks: [
            { title: "Sandhi Puja Aarti", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
            { title: "Intense Dhak Beats", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" }
        ]
    },
    {
        id: "nabami",
        title: "Navami",
        subtitle: "Celebration",
        desc: "The peak of joy. Dhunuchi naach lights up the night. The scent of coconut husk smoke fills the air.",
        bgUrl: "assets/bg-nabami.png",
        sceneRgb: "217, 37, 37", 
        tracks: [
            { title: "Dhunuchi Naach", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" }
        ]
    },
    {
        id: "dashami",
        title: "Dashami",
        subtitle: "Sindoor Khela",
        desc: "A bittersweet farewell. Faces painted in red. The immersion draws near, leaving a haze of vermilion.",
        bgUrl: "assets/bg-dashami.png",
        sceneRgb: "255, 69, 0", 
        tracks: [
            { title: "Bisarjan Melancholy", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" }
        ]
    },
    {
        id: "ekadashi",
        title: "Ekadashi",
        subtitle: "The Silence",
        desc: "The pandals are empty. A cool, quiet morning remains, carrying a promise: 'Asche bochor abar hobe'.",
        bgUrl: "assets/bg-ekadashi.png",
        sceneRgb: "100, 120, 140", 
        tracks: [
            { title: "Quiet Morning Flute", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3" }
        ]
    }
];

// --- State ---
let currentDayIndex = 0;
let currentTrackIndex = 0;
let isPlaying = false;
let activeBgLayer = 1;

// --- DOM Elements ---
const bg1 = document.getElementById('bg-1');
const bg2 = document.getElementById('bg-2');
const parallaxWrapper = document.getElementById('parallax-wrapper');
const uiLayer = document.getElementById('ui-layer');

const chapterIndicator = document.getElementById('chapter-indicator');
const fpTitle = document.getElementById('fp-title');
const fpTitleNext = document.getElementById('fp-title-next');
const fpSubtitle = document.getElementById('fp-subtitle');
const fpSubtitleNext = document.getElementById('fp-subtitle-next');
const fpDesc = document.getElementById('fp-desc');
const fpDescNext = document.getElementById('fp-desc-next');

const timelineContainer = document.getElementById('timeline-container');
const timelinePrev = document.getElementById('timeline-prev');
const timelineNext = document.getElementById('timeline-next');

const playerTrack = document.getElementById('player-track');
const radioThumb = document.getElementById('radio-thumb');
const audio = document.getElementById('audio-player');
const playPauseBtnSmall = document.getElementById('btn-play-pause-small');
const playIconSmall = document.getElementById('play-icon-small');
const btnPlayAmbience = document.getElementById('btn-play-ambience');
const playIconAmbience = document.getElementById('play-icon-ambience');

const audioEq = document.getElementById('audio-eq');
const onAirIndicator = document.getElementById('on-air-indicator');
const volumeSlider = document.getElementById('volume-slider');
const cdVal = document.getElementById('cd-val');
const cdLabel = document.getElementById('cd-label');
const currentTimeEl = document.getElementById('current-time');
const root = document.documentElement;

// Custom Cursor
const cursorDot = document.getElementById('cursor-dot');
const cursorOutline = document.getElementById('cursor-outline');

// --- Initialize Application ---
function init() {
    buildTimeline();
    selectDay(0, false);
    startCountdown();
    startClock();
    initParallax();
    initMagnetic();
    initCursor();
    initParticles();
}

// --- Build Timeline ---
function buildTimeline() {
    festivalDays.forEach((day, index) => {
        const card = document.createElement('div');
        card.className = 'timeline-card';
        card.innerHTML = \`
            <div class="timeline-thumb" style="background-image: url('\${day.bgUrl}')"></div>
            <div class="timeline-title">\${day.id}</div>
            <div class="timeline-subtitle">\${day.subtitle}</div>
        \`;
        card.addEventListener('click', () => {
            if (currentDayIndex !== index) {
                selectDay(index, true);
            }
        });
        timelineContainer.appendChild(card);
    });

    timelinePrev.addEventListener('click', () => {
        timelineContainer.scrollBy({ left: -120, behavior: 'smooth' });
    });
    timelineNext.addEventListener('click', () => {
        timelineContainer.scrollBy({ left: 120, behavior: 'smooth' });
    });
}

// --- Text Morph Animation ---
function animateTextMorph(day, index) {
    // Determine direction
    const isForward = index > currentDayIndex || (currentDayIndex === festivalDays.length-1 && index === 0);
    
    chapterIndicator.textContent = \`CHAPTER 0\${index + 1} / 09\`;

    // Title
    fpTitleNext.textContent = day.title;
    fpTitleNext.style.transform = isForward ? 'translateY(100%)' : 'translateY(-100%)';
    fpTitleNext.style.opacity = '0';
    
    fpTitle.style.transform = isForward ? 'translateY(-100%)' : 'translateY(100%)';
    fpTitle.style.opacity = '0';
    
    // Subtitle
    fpSubtitleNext.textContent = day.subtitle;
    fpSubtitleNext.style.transform = isForward ? 'translateY(100%)' : 'translateY(-100%)';
    fpSubtitleNext.style.opacity = '0';
    
    fpSubtitle.style.transform = isForward ? 'translateY(-100%)' : 'translateY(100%)';
    fpSubtitle.style.opacity = '0';

    // Desc
    fpDescNext.textContent = day.desc;
    fpDescNext.style.transform = 'translateY(10px)';
    fpDescNext.style.opacity = '0';
    
    fpDesc.style.transform = 'translateY(-10px)';
    fpDesc.style.opacity = '0';

    // Trigger reflow
    void fpTitleNext.offsetWidth;

    // Animate In
    fpTitleNext.style.transform = 'translateY(0)';
    fpTitleNext.style.opacity = '1';
    fpSubtitleNext.style.transform = 'translateY(0)';
    fpSubtitleNext.style.opacity = '1';
    fpDescNext.style.transform = 'translateY(0)';
    fpDescNext.style.opacity = '1';

    // Swap text after transition
    setTimeout(() => {
        fpTitle.textContent = day.title;
        fpTitle.style.transition = 'none';
        fpTitle.style.transform = 'translateY(0)';
        fpTitle.style.opacity = '1';
        
        fpSubtitle.textContent = day.subtitle;
        fpSubtitle.style.transition = 'none';
        fpSubtitle.style.transform = 'translateY(0)';
        fpSubtitle.style.opacity = '1';
        
        fpDesc.textContent = day.desc;
        fpDesc.style.transition = 'none';
        fpDesc.style.transform = 'translateY(0)';
        fpDesc.style.opacity = '1';

        fpTitleNext.style.transition = 'none';
        fpTitleNext.style.opacity = '0';
        fpSubtitleNext.style.transition = 'none';
        fpSubtitleNext.style.opacity = '0';
        fpDescNext.style.transition = 'none';
        fpDescNext.style.opacity = '0';

        // Restore transitions
        setTimeout(() => {
            fpTitle.style.transition = '';
            fpSubtitle.style.transition = '';
            fpDesc.style.transition = '';
            fpTitleNext.style.transition = '';
            fpSubtitleNext.style.transition = '';
            fpDescNext.style.transition = '';
        }, 50);

    }, 700);
}

// --- Select Day ---
function selectDay(index, crossfade = true) {
    const day = festivalDays[index];
    
    if (crossfade) animateTextMorph(day, index);
    else {
        chapterIndicator.textContent = \`CHAPTER 0\${index + 1} / 09\`;
        fpTitle.textContent = day.title;
        fpSubtitle.textContent = day.subtitle;
        fpDesc.textContent = day.desc;
    }

    currentDayIndex = index;

    // Update Timeline UI
    const cards = timelineContainer.querySelectorAll('.timeline-card');
    cards.forEach((card, i) => {
        if (i === index) {
            card.classList.add('active');
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
            card.classList.remove('active');
        }
    });

    // Update Scene Color Variable
    root.style.setProperty('--scene-rgb', day.sceneRgb);

    // Update Radio Thumb
    radioThumb.style.backgroundImage = \`url('\${day.bgUrl}')\`;

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
            playIconSmall.classList.replace('fa-play', 'fa-pause');
            playIconAmbience.classList.replace('fa-play', 'fa-pause');
            audioEq.style.opacity = '1';
            onAirIndicator.style.opacity = '1';
        }).catch(console.error);
    } else {
        audio.pause();
        isPlaying = false;
        playIconSmall.classList.replace('fa-pause', 'fa-play');
        playIconAmbience.classList.replace('fa-pause', 'fa-play');
        audioEq.style.opacity = '0';
        onAirIndicator.style.opacity = '0.5';
    }
}

playPauseBtnSmall.addEventListener('click', togglePlay);
btnPlayAmbience.addEventListener('click', togglePlay);

document.getElementById('btn-next').addEventListener('click', () => {
    const day = festivalDays[currentDayIndex];
    if (currentTrackIndex + 1 < day.tracks.length) {
        currentTrackIndex++;
    } else {
        currentTrackIndex = 0;
    }
    loadTrack();
    if(isPlaying) audio.play();
});

document.getElementById('btn-prev').addEventListener('click', () => {
    const day = festivalDays[currentDayIndex];
    if (currentTrackIndex - 1 >= 0) {
        currentTrackIndex--;
    } else {
        currentTrackIndex = day.tracks.length - 1;
    }
    loadTrack();
    if(isPlaying) audio.play();
});

audio.addEventListener('ended', () => {
    document.getElementById('btn-next').click();
});

volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

// --- Pointer Parallax ---
let targetX = 0, targetY = 0;
let currentX = 0, currentY = 0;
function initParallax() {
    if (window.innerWidth < 768) return;
    
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        targetX = x * 15; // Max 15px shift
        targetY = y * 15;
    });

    function animateParallax() {
        currentX += (targetX - currentX) * 0.05; // Ease
        currentY += (targetY - currentY) * 0.05;

        // Background moves subtly
        parallaxWrapper.style.transform = \`translate3d(\${-currentX}px, \${-currentY}px, 0)\`;
        // UI Layer moves opposite subtly for depth
        uiLayer.style.transform = \`translate3d(\${currentX * 0.3}px, \${currentY * 0.3}px, 0)\`;

        requestAnimationFrame(animateParallax);
    }
    animateParallax();
}

// --- Custom Cursor ---
function initCursor() {
    if (window.innerWidth < 768) return;

    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;
    let ox = cx, oy = cy;
    
    window.addEventListener('mousemove', (e) => {
        cx = e.clientX;
        cy = e.clientY;
        cursorDot.style.transform = \`translate3d(\${cx}px, \${cy}px, 0) translate(-50%, -50%)\`;
    });

    function animateCursor() {
        ox += (cx - ox) * 0.15;
        oy += (cy - oy) * 0.15;
        cursorOutline.style.transform = \`translate3d(\${ox}px, \${oy}px, 0) translate(-50%, -50%)\`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects on interactive elements
    const interactives = document.querySelectorAll('button, a, .magnetic, input[type="range"], .timeline-card');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '48px';
            cursorOutline.style.height = '48px';
            cursorOutline.style.borderColor = 'rgba(255,255,255,0.8)';
            cursorOutline.style.backgroundColor = 'rgba(255,255,255,0.05)';
            cursorOutline.style.backdropFilter = 'blur(2px)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '32px';
            cursorOutline.style.height = '32px';
            cursorOutline.style.borderColor = 'rgba(255,255,255,0.3)';
            cursorOutline.style.backgroundColor = 'transparent';
            cursorOutline.style.backdropFilter = 'blur(0)';
        });
    });
}

// --- Magnetic UI ---
function initMagnetic() {
    if (window.innerWidth < 768) return;
    const magnets = document.querySelectorAll('.magnetic, .magnetic-sm');
    
    magnets.forEach(magnet => {
        magnet.addEventListener('mousemove', (e) => {
            const rect = magnet.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const strength = magnet.classList.contains('magnetic-sm') ? 0.2 : 0.4;
            
            magnet.style.transform = \`translate(\${x * strength}px, \${y * strength}px)\`;
        });
        
        magnet.addEventListener('mouseleave', () => {
            magnet.style.transform = 'translate(0px, 0px)';
            magnet.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            setTimeout(() => magnet.style.transition = '', 400);
        });
    });
}

// --- Minimal Countdown & Clock ---
function startClock() {
    const updateTime = () => {
        const now = new Date();
        currentTimeEl.textContent = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    };
    updateTime();
    setInterval(updateTime, 1000 * 60);
}

function startCountdown() {
    const targetDate = new Date('October 6, 2026 04:00:00 GMT+0530').getTime();

    const updateCd = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance <= 0) {
            cdVal.textContent = "NOW";
            cdLabel.innerHTML = "MAHALAYA";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        if (days > 0) {
            cdVal.textContent = days.toString().padStart(2, '0') + " DAYS";
            cdLabel.innerHTML = "UNTIL MAHALAYA";
        } else {
            cdVal.textContent = hours.toString().padStart(2, '0') + " HRS";
            cdLabel.innerHTML = "UNTIL MAHALAYA";
        }
    };

    updateCd();
    setInterval(updateCd, 1000 * 60);
}

// --- Simple Canvas Particles (Dust) ---
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if(!canvas || window.innerWidth < 768) return; // disable on mobile to save battery
    const ctx = canvas.getContext('2d');
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    for(let i=0; i<60; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 1.5,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
            alpha: Math.random() * 0.5
        });
    }

    function render() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if(p.x < 0) p.x = width;
            if(p.x > width) p.x = 0;
            if(p.y < 0) p.y = height;
            if(p.y > height) p.y = 0;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = \`rgba(255, 255, 255, \${p.alpha})\`;
            ctx.fill();
        });
        requestAnimationFrame(render);
    }
    render();
}

// Start
init();
audio.volume = volumeSlider.value;
