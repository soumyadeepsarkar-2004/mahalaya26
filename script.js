// Mahalaya26 Data
const festivalDays = [
    { id: 'mahalaya', date: 'Oct 10', title: 'Mahalaya', subtitle: 'The Awakening', desc: 'The scent of shiuli fills the air as Birendra Krishna Bhadra\'s voice echoes through the morning mist, marking the beginning of Devi Paksha.', image: 'assets/bg-mahalaya', rgb: '230, 161, 91' },
    { id: 'tritiya', date: 'Oct 13', title: 'Tritiya', subtitle: 'The Anticipation', desc: 'The city starts transforming. Bamboo scaffolds become grand pandals, and the festive spirit begins to take physical form.', image: 'assets/bg-tritiya', rgb: '166, 124, 82' },
    { id: 'panchami', date: 'Oct 15', title: 'Panchami', subtitle: 'The Arrival', desc: 'The wait is over. The idols are unveiled, and the city streets begin to swell with early pandal hoppers.', image: 'assets/bg-panchomi', rgb: '197, 107, 45' },
    { id: 'shashthi', date: 'Oct 16', title: 'Shashthi', subtitle: 'The Welcome', desc: 'Bodhon. The Goddess is welcomed under the bel tree. The dhak beats resound, officially starting the grand festival.', image: 'assets/bg-shasti', rgb: '228, 142, 88' },
    { id: 'saptami', date: 'Oct 17', title: 'Saptami', subtitle: 'The Invocation', desc: 'Nabapatrika snan at dawn. The city is now fully immersed in joy, lights, and the endless rhythm of celebrations.', image: 'assets/bg-shaptami', rgb: '224, 117, 43' },
    { id: 'ashtami', date: 'Oct 18', title: 'Ashtami', subtitle: 'The Devotion', desc: 'Pushpanjali in the morning, Sandhi Puja at the juncture of Ashtami and Navami. The most auspicious day of the festival.', image: 'assets/bg-ashtami', rgb: '218, 59, 33' },
    { id: 'nabami', date: 'Oct 19', title: 'Nabami', subtitle: 'The Celebration', desc: 'The final night of unbridled joy. The dhunuchi naach reaches its peak, but a hint of melancholy lingers in the air.', image: 'assets/bg-nabami', rgb: '186, 73, 51' },
    { id: 'dashami', date: 'Oct 20', title: 'Dashami', subtitle: 'The Farewell', desc: 'Sindoor Khela and immersion. With tearful eyes, we bid adieu to the Goddess, whispering "Asche bochor abar hobe".', image: 'assets/bg-dashami', rgb: '158, 62, 46' },
    { id: 'ekadashi', date: 'Oct 21', title: 'Ekadashi', subtitle: 'The Aftermath', desc: 'Empty pandals, scattered flowers, and quiet streets. The wait for next year begins.', image: 'assets/bg-ekadashi', rgb: '109, 114, 120' }
];

// Audio Tracks (Honest Names)
const audioTracks = [
    { title: "Ambient Kolkata I", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { title: "Dhak Beats Ambience", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { title: "Kolkata Pandal Sounds", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
    { title: "Sandhi Puja Bells", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" }
];

// State
let currentIndex = 0;
let currentTrackIndex = 0;
let isPlaying = false;
let transitionId = 0;
let isMobile = window.innerWidth < 768;
let imageVariant = '-1280.webp';

// Detect Network / Device capability
const navConn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
const isSlowNetwork = navConn && (navConn.saveData || navConn.effectiveType === '2g' || navConn.effectiveType === '3g');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Determine image variant
function updateImageVariant() {
    let width = window.innerWidth;
    if (width <= 480) imageVariant = '-480.webp';
    else if (width <= 768) imageVariant = '-768.webp';
    else if (width <= 1280) imageVariant = '-1280.webp';
    else imageVariant = '.webp';
    
    if (isSlowNetwork && width > 768) imageVariant = '-1280.webp'; // limit max on slow net
}
updateImageVariant();

// DOM Elements
const bg1 = document.getElementById('bg-1');
const bg2 = document.getElementById('bg-2');
const root = document.documentElement;
const timelineDesktop = document.getElementById('timeline-desktop');
const timelineMobile = document.getElementById('timeline-mobile');

// PWA Logic
let deferredPrompt;
const pwaPrompt = document.getElementById('pwa-prompt');
const btnInstallPwa = document.getElementById('btn-install-pwa');
const btnDismissPwa = document.getElementById('btn-dismiss-pwa');
const iosPrompt = document.getElementById('pwa-prompt-ios');
const btnDismissIos = document.getElementById('btn-dismiss-ios');

const checkRecentlyDismissed = () => {
    const dismissedAt = localStorage.getItem('mahalaya-pwa-dismissed-at');
    return dismissedAt && (Date.now() - parseInt(dismissedAt)) < 7 * 24 * 60 * 60 * 1000;
};

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(err => console.error(err));
}

// Android/Chrome Install Prompt
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (!checkRecentlyDismissed() && !window.matchMedia('(display-mode: standalone)').matches && !navigator.standalone) {
        setTimeout(() => {
            if (pwaPrompt) {
                pwaPrompt.classList.remove('hidden');
                setTimeout(() => pwaPrompt.classList.remove('opacity-0', 'translate-y-4'), 50);
            }
        }, 15000);
    }
});

// iOS Install Fallback
if (!window.matchMedia('(display-mode: standalone)').matches && !navigator.standalone) {
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
        setTimeout(() => {
            if (iosPrompt && !checkRecentlyDismissed()) {
                iosPrompt.classList.remove('hidden');
                setTimeout(() => iosPrompt.classList.remove('opacity-0', 'translate-y-4'), 50);
            }
        }, 15000);
    }
}

if (btnInstallPwa) {
    btnInstallPwa.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                deferredPrompt = null;
            }
            hidePwaPrompt();
        }
    });
}

const dismissPWA = () => {
    localStorage.setItem('mahalaya-pwa-dismissed-at', Date.now().toString());
    hidePwaPrompt();
    hideIosPrompt();
};

if (btnDismissPwa) btnDismissPwa.addEventListener('click', dismissPWA);
if (btnDismissIos) btnDismissIos.addEventListener('click', dismissPWA);

function hidePwaPrompt() {
    if (pwaPrompt) {
        pwaPrompt.classList.add('opacity-0', 'translate-y-4');
        setTimeout(() => pwaPrompt.classList.add('hidden'), 500);
    }
}

function hideIosPrompt() {
    if (iosPrompt) {
        iosPrompt.classList.add('opacity-0', 'translate-y-4');
        setTimeout(() => iosPrompt.classList.add('hidden'), 500);
    }
}

// Check offline
window.addEventListener('offline', () => {
    const el = document.getElementById('offline-indicator');
    if(el) { el.classList.remove('hidden'); el.classList.add('flex'); }
});
window.addEventListener('online', () => {
    const el = document.getElementById('offline-indicator');
    if(el) { el.classList.add('hidden'); el.classList.remove('flex'); }
});

// Audio
const audio = document.getElementById('audio-player');
audio.src = audioTracks[0].src;
audio.volume = 0.8;

// Initialize Timelines
function initTimelines() {
    if(timelineDesktop) timelineDesktop.innerHTML = '';
    if(timelineMobile) timelineMobile.innerHTML = '';
    
    festivalDays.forEach((day, index) => {
        // Desktop Card
        if (timelineDesktop) {
            const card = document.createElement('div');
            card.className = `timeline-card ${index === currentIndex ? 'active' : ''}`;
            card.innerHTML = `
                <div class="timeline-thumb" style="background-image: url('${day.image}-480.webp')"></div>
                <div class="timeline-title">${day.date}</div>
                <div class="timeline-subtitle">${day.title}</div>
            `;
            card.onclick = () => selectDay(index);
            timelineDesktop.appendChild(card);
        }

        // Mobile Pill
        if (timelineMobile) {
            const pill = document.createElement('div');
            pill.className = `timeline-pill ${index === currentIndex ? 'active' : ''}`;
            pill.innerHTML = `[ ${day.title.toUpperCase()} ]`;
            pill.onclick = () => selectDay(index);
            timelineMobile.appendChild(pill);
        }
    });
}
initTimelines();

// Pre-caching logic for Service Worker
function cacheCriticalImages() {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller && !isSlowNetwork) {
        const cacheImages = [];
        const toCache = new Set([currentIndex, Math.max(0, currentIndex-1), Math.min(festivalDays.length-1, currentIndex+1)]);
        toCache.forEach(idx => {
            cacheImages.push(`${festivalDays[idx].image}-480.webp`);
            cacheImages.push(`${festivalDays[idx].image}-768.webp`);
            cacheImages.push(`${festivalDays[idx].image}-1280.webp`);
        });
        
        navigator.serviceWorker.controller.postMessage({
            type: 'CACHE_ASSETS',
            assets: cacheImages
        });
    }
}
window.addEventListener('load', cacheCriticalImages);

function selectDay(index) {
    if (index === currentIndex) return;
    currentIndex = index;
    updateUI();
    cacheCriticalImages(); // Cache adjacent dynamically
}

function refreshCurrentScene() {
    const day = festivalDays[currentIndex];
    const imageUrl = `${day.image}${imageVariant}`;
    const activeBg = bg1.style.opacity === '0' ? bg2 : bg1;
    activeBg.style.backgroundImage = `url('${imageUrl}')`;
}

function preloadImage(url) {
    if (!isSlowNetwork) {
        const img = new Image();
        img.src = url;
    }
}

function updateUI() {
    const day = festivalDays[currentIndex];
    const tid = ++transitionId;
    
    // Update active states
    if (timelineDesktop) {
        Array.from(timelineDesktop.children).forEach((child, idx) => {
            child.classList.toggle('active', idx === currentIndex);
        });
    }
    if (timelineMobile) {
        Array.from(timelineMobile.children).forEach((child, idx) => {
            child.classList.toggle('active', idx === currentIndex);
        });
    }
    
    // Scroll active element into view smoothly
    const activeDesktop = timelineDesktop ? timelineDesktop.children[currentIndex] : null;
    const activeMobile = timelineMobile ? timelineMobile.children[currentIndex] : null;
    if (activeDesktop) activeDesktop.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    if (activeMobile) activeMobile.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });

    // Scene Transition
    root.style.setProperty('--scene-rgb', day.rgb);
    const imageUrl = `${day.image}${imageVariant}`;
    
    const activeBg = bg1.style.opacity === '0' ? bg1 : bg2;
    const inactiveBg = bg1.style.opacity === '0' ? bg2 : bg1;
    
    activeBg.style.backgroundImage = `url('${imageUrl}')`;
    activeBg.style.opacity = '1';
    inactiveBg.style.opacity = '0';

    // Update Radio Thumbs
    const thumbUrl = `url('${day.image}-480.webp')`;
    const rt = document.getElementById('radio-thumb');
    const rtm = document.getElementById('radio-thumb-mobile');
    if (rt) rt.style.backgroundImage = thumbUrl;
    if (rtm) rtm.style.backgroundImage = thumbUrl;

    // Preload next
    if (currentIndex < festivalDays.length - 1) {
        preloadImage(`${festivalDays[currentIndex + 1].image}${imageVariant}`);
    }

    // Text Transition
    const els = ['title', 'subtitle', 'desc'].map(type => ({
        curr: document.getElementById(`fp-${type}`),
        next: document.getElementById(`fp-${type}-next`),
        val: type === 'title' ? day.title : (type === 'subtitle' ? day.subtitle : day.desc)
    })).filter(o => o.curr && o.next);

    els.forEach(({curr, next, val}) => {
        next.textContent = val;
        curr.style.transform = 'translateY(-100%)';
        curr.style.opacity = '0';
        next.style.transform = 'translateY(-100%)';
        next.style.opacity = '1';
    });

    const ci = document.getElementById('chapter-indicator');
    if (ci) ci.textContent = `CHAPTER 0${currentIndex + 1} / 09`;

    setTimeout(() => {
        if (transitionId !== tid) return;
        els.forEach(({curr, next, val}) => {
            curr.textContent = val;
            curr.style.transition = 'none';
            curr.style.transform = 'translateY(0)';
            curr.style.opacity = '1';
            
            next.style.transition = 'none';
            next.style.transform = 'translateY(0)';
            next.style.opacity = '0';
            
            curr.offsetHeight; next.offsetHeight; // flush css
            
            curr.style.transition = 'all 0.7s ease-out';
            next.style.transition = 'all 0.7s ease-out';
        });
    }, 700);
}

// Initial set
updateUI();

// Clock & Countdown
function updateTime() {
    const now = new Date();
    const mahalayaDate = new Date('2026-10-10T04:00:00+05:30'); // Explicit IST
    
    // Time
    const timeStr = now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' });
    const ctd = document.getElementById('current-time-desktop');
    const stm = document.getElementById('sheet-time');
    if(ctd) ctd.textContent = timeStr;
    if(stm) stm.textContent = timeStr;

    // Countdown
    const diff = mahalayaDate - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    const cdStr = days > 0 ? `0${days}`.slice(-2) + ' DAYS' : 'IT IS HERE';
    const cdv = document.getElementById('cd-val-desktop');
    const scdv = document.getElementById('sheet-cd-val');
    if(cdv) cdv.textContent = cdStr;
    if(scdv) scdv.textContent = cdStr;
}
setInterval(updateTime, 1000);
updateTime();

// Mobile Swipe Navigation
let touchStartX = 0;
let touchEndX = 0;

document.getElementById('ui-layer').addEventListener('touchstart', e => {
    // Ignore if touch originated inside controls/timeline/sheets
    if (e.target.closest('button') || e.target.closest('input') || e.target.closest('.timeline-container-pos') || e.target.closest('[data-sheet]')) {
        touchStartX = -1; // invalid
        return;
    }
    touchStartX = e.changedTouches[0].screenX;
}, {passive: true});

document.getElementById('ui-layer').addEventListener('touchend', e => {
    if (touchStartX === -1) return;
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, {passive: true});

function handleSwipe() {
    const swipeDist = touchEndX - touchStartX;
    if (Math.abs(swipeDist) > 75) {
        if (swipeDist < 0 && currentIndex < festivalDays.length - 1) {
            selectDay(currentIndex + 1); // Swipe Left -> Next
        }
        if (swipeDist > 0 && currentIndex > 0) {
            selectDay(currentIndex - 1); // Swipe Right -> Prev
        }
    }
}

// Audio Controls
async function togglePlay() {
    if (!isPlaying) {
        try {
            await audio.play();
            isPlaying = true;
        } catch(e) {
            console.error("Audio play blocked", e);
            isPlaying = false;
        }
    } else {
        audio.pause();
        isPlaying = false;
    }
    updateAudioUI();
}

function updateAudioUI() {
    const playIcons = [
        document.getElementById('play-icon-desktop'),
        document.getElementById('play-icon-mobile-bar'),
        document.getElementById('play-icon-sheet'),
        document.getElementById('play-icon-mobile')
    ];
    
    playIcons.forEach(icon => {
        if(icon) {
            icon.className = isPlaying ? "fas fa-pause text-xs text-white" : "fas fa-play text-xs text-white";
            if (icon.id === 'play-icon-mobile') icon.className = isPlaying ? "fas fa-pause text-[9px] text-white/90" : "fas fa-play text-[9px] text-white/90 translate-x-[1px]";
        }
    });

    const eq = document.getElementById('audio-eq');
    if(eq) eq.style.opacity = isPlaying ? '1' : '0';
    
    const trackName = audioTracks[currentTrackIndex].title;
    [document.getElementById('player-track-desktop'), document.getElementById('player-track-mobile'), document.getElementById('player-track-sheet')].forEach(el => {
        if(el) el.textContent = trackName;
    });
}

[
    document.getElementById('btn-play-pause-small'),
    document.getElementById('btn-play-pause-mobile-bar'),
    document.getElementById('btn-play-pause-sheet'),
    document.getElementById('btn-play-ambience-mobile')
].forEach(btn => {
    if (btn) btn.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePlay();
    });
});

audio.addEventListener('ended', async () => {
    currentTrackIndex = (currentTrackIndex + 1) % audioTracks.length;
    audio.src = audioTracks[currentTrackIndex].src;
    if (isPlaying) {
        try {
            await audio.play();
        } catch { isPlaying = false; }
    }
    updateAudioUI();
});

const nextTrack = async () => {
    currentTrackIndex = (currentTrackIndex + 1) % audioTracks.length;
    audio.src = audioTracks[currentTrackIndex].src;
    if (isPlaying) {
        try { await audio.play(); } catch { isPlaying = false; }
    }
    updateAudioUI();
};
const prevTrack = async () => {
    currentTrackIndex = (currentTrackIndex - 1 + audioTracks.length) % audioTracks.length;
    audio.src = audioTracks[currentTrackIndex].src;
    if (isPlaying) {
        try { await audio.play(); } catch { isPlaying = false; }
    }
    updateAudioUI();
};

const bnd = document.getElementById('btn-next'); if(bnd) bnd.addEventListener('click', nextTrack);
const bpd = document.getElementById('btn-prev'); if(bpd) bpd.addEventListener('click', prevTrack);
const bnm = document.getElementById('btn-next-mobile'); if(bnm) bnm.addEventListener('click', nextTrack);
const bpm = document.getElementById('btn-prev-mobile'); if(bpm) bpm.addEventListener('click', prevTrack);

const volDes = document.getElementById('volume-slider-desktop');
const volMob = document.getElementById('volume-slider-mobile');
if(volDes && volMob) {
    volDes.addEventListener('input', (e) => { audio.volume = e.target.value; volMob.value = e.target.value; });
    volMob.addEventListener('input', (e) => { audio.volume = e.target.value; volDes.value = e.target.value; });
}

// Mobile Sheets Logic
const backdrop = document.getElementById('backdrop');
const sheetRadio = document.getElementById('sheet-radio');
const sheetStatus = document.getElementById('sheet-status');
const sheetMenu = document.getElementById('sheet-menu');
const sheetAbout = document.getElementById('sheet-about');
let activeSheet = null;

function openSheet(sheet) {
    if (!sheet) return;
    activeSheet = sheet;
    backdrop.classList.remove('hidden');
    setTimeout(() => {
        backdrop.classList.remove('opacity-0');
        sheet.classList.remove('translate-y-full');
    }, 10);
}

function closeSheet() {
    if (!activeSheet) return;
    backdrop.classList.add('opacity-0');
    activeSheet.classList.add('translate-y-full');
    setTimeout(() => {
        backdrop.classList.add('hidden');
        activeSheet = null;
    }, 400);
}

if(backdrop) backdrop.addEventListener('click', closeSheet);
const mrb = document.getElementById('mobile-radio-bar'); if(mrb) mrb.addEventListener('click', () => openSheet(sheetRadio));
const bsm = document.getElementById('btn-status-mobile'); if(bsm) bsm.addEventListener('click', () => openSheet(sheetStatus));
const bmm = document.getElementById('btn-menu-mobile'); if(bmm) bmm.addEventListener('click', () => openSheet(sheetMenu));

// Sheet swipe to close
let sheetTouchStartY = 0;
[sheetRadio, sheetStatus, sheetMenu, sheetAbout].forEach(sheet => {
    if(!sheet) return;
    sheet.addEventListener('touchstart', e => {
        sheetTouchStartY = e.changedTouches[0].screenY;
    }, {passive: true});
    sheet.addEventListener('touchend', e => {
        const deltaY = e.changedTouches[0].screenY - sheetTouchStartY;
        if (deltaY > 50) closeSheet();
    }, {passive: true});
});

// Menu Button handlers
const btnArchive = document.getElementById('btn-menu-archive');
if(btnArchive) btnArchive.addEventListener('click', () => closeSheet());

const btnMoments = document.getElementById('btn-menu-moments');
if(btnMoments) btnMoments.addEventListener('click', () => {
    closeSheet();
    setTimeout(() => openSheet(sheetRadio), 400);
});

const btnAbout = document.getElementById('btn-menu-about');
if(btnAbout) btnAbout.addEventListener('click', () => {
    closeSheet();
    setTimeout(() => openSheet(sheetAbout), 400);
});

// Handle resize events for responsive image loading
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const wasMobile = isMobile;
        isMobile = window.innerWidth < 768;
        if (wasMobile !== isMobile) {
            updateImageVariant();
            refreshCurrentScene(); // FIX: Explicitly refresh the current scene image
            initTimelines(); // reset timelines UI sizes
            selectDay(currentIndex); // ensure selected
        }
        initParticles(); // Debounced resize rebuild
    }, 250);
});

// Particles System (Optimized)
const canvas = document.getElementById('particles-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let particles = [];
let animationFrameId = null;

function initParticles() {
    if (!canvas || !ctx) return;
    if (isSlowNetwork || prefersReducedMotion) {
        canvas.style.display = 'none';
        return;
    }
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const numParticles = isMobile ? Math.floor(Math.random() * 8) + 8 : Math.min(window.innerWidth / 30, 60);
    
    particles = Array.from({length: numParticles}, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.5 + 0.1
    }));
}

function drawParticles() {
    if (!ctx || isSlowNetwork || prefersReducedMotion) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
        p.x += p.speedX;
        p.y -= Math.abs(p.speedY);
        
        if (p.y < 0) p.y = canvas.height;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Master Render Loop
function renderLoop() {
    if (!document.hidden && !prefersReducedMotion) {
        drawParticles();
        animationFrameId = requestAnimationFrame(renderLoop);
    } else {
        animationFrameId = null;
    }
}

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    } else {
        if (!animationFrameId && !prefersReducedMotion) {
            renderLoop();
        }
    }
});

initParticles();
if(!prefersReducedMotion) renderLoop();
updateAudioUI();
