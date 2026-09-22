with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()
start = -1
end = -1
for i, l in enumerate(lines):
    if '<!-- DESKTOP RADIO CARD -->' in l or '<!-- RADIO DESKTOP -->' in l:
        start = i
    if '<!-- DESKTOP UTILITIES -->' in l:
        end = i
        break

if start != -1 and end != -1:
    desktop_radio = """        <!-- RADIO DESKTOP -->
        <div class="radio-card hidden md:flex flex-col gap-4 p-5 rounded-[2px] pointer-events-auto border border-white/5 shadow-2xl relative overflow-hidden" style="background: linear-gradient(135deg, rgba(var(--scene-rgb), 0.15) 0%, rgba(var(--scene-rgb), 0.05) 100%); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);">
            <!-- Top editorial line -->
            <div class="flex items-center justify-between">
                <span class="text-[8px] font-mono tracking-[0.3em] text-white/60">PUJA RADIO</span>
                <div class="flex items-center gap-2">
                    <div class="flex items-end gap-[2px] h-[8px] opacity-0 transition-opacity duration-300" id="audio-eq-desktop">
                        <div class="w-[1.5px] bg-white/50 animate-[eq_0.8s_ease-in-out_infinite_alternate]"></div>
                        <div class="w-[1.5px] bg-white/50 animate-[eq_0.5s_ease-in-out_infinite_alternate]"></div>
                        <div class="w-[1.5px] bg-white/50 animate-[eq_1.2s_ease-in-out_infinite_alternate]"></div>
                    </div>
                    <div class="w-1.5 h-1.5 rounded-full bg-white/30 transition-colors duration-500" id="signal-indicator-desktop"></div>
                </div>
            </div>
            
            <div class="w-full h-px bg-white/10"></div>
            
            <div class="flex items-center gap-4">
                <div class="w-16 h-16 rounded-[2px] bg-cover bg-center shrink-0 border border-white/10 shadow-lg transition-all duration-700" id="radio-thumb"></div>
                <div class="flex flex-col">
                    <span class="text-[8px] font-mono tracking-[0.2em] text-white/40 mb-1">NOW PLAYING</span>
                    <span class="text-sm text-white/90 font-serif" id="player-track-desktop">...</span>
                </div>
            </div>
            
            <div class="w-full h-px bg-white/5"></div>
            
            <!-- Controls -->
            <div class="flex flex-col items-center gap-3">
                <div class="flex items-center gap-6">
                    <button id="btn-prev" class="text-white/40 hover:text-white transition-colors outline-none"><i class="fas fa-backward text-[10px]"></i></button>
                    <button id="btn-play-pause-desktop" class="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center outline-none hover:bg-white/10 transition-colors">
                        <i class="fas fa-play text-xs text-white translate-x-[1px]" id="play-icon-desktop"></i>
                    </button>
                    <button id="btn-next" class="text-white/40 hover:text-white transition-colors outline-none"><i class="fas fa-forward text-[10px]"></i></button>
                </div>
                <div class="flex items-center gap-2 w-full max-w-[140px]">
                    <i class="fas fa-volume-down text-[8px] text-white/30"></i>
                    <input type="range" id="volume-slider-desktop" min="0" max="1" step="0.01" value="0.8" class="w-full h-[2px] bg-white/20 appearance-none slider-thumb-analog">
                    <i class="fas fa-volume-up text-[8px] text-white/30"></i>
                </div>
            </div>
        </div>

        <!-- RADIO MOBILE BAR -->
        <div id="mobile-radio-bar" class="md:hidden absolute bottom-[calc(env(safe-area-inset-bottom,0px)+16px)] left-1/2 -translate-x-1/2 w-[calc(100%-32px)] p-[12px] flex items-center justify-between pointer-events-auto z-30 border border-white/10 rounded-[2px]" style="background: rgba(var(--scene-rgb), 0.15); backdrop-filter: blur(24px);">
            <div class="flex items-center gap-2 shrink-0">
                <div class="w-1.5 h-1.5 rounded-full bg-white/30" id="signal-mobile"></div>
                <span class="text-[8px] font-mono tracking-[0.2em] text-white/50">PUJA RADIO</span>
            </div>
            <span class="text-[11px] text-white/90 truncate font-serif absolute left-1/2 -translate-x-1/2" id="player-track-mobile">...</span>
            
            <div class="flex items-center gap-3 shrink-0">
                <button id="btn-play-pause-mobile-bar" class="text-white/80 outline-none p-1">
                    <i class="fas fa-play text-[10px]" id="play-icon-mobile-bar"></i>
                </button>
            </div>
        </div>

"""
    lines[start:end] = [desktop_radio]
    with open('index.html', 'w', encoding='utf-8') as f:
        f.writelines(lines)
