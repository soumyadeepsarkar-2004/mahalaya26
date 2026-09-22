const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf-8');

// The new CSS to append
const unifiedPlayerCSS = `
/* =========================================================
   UNIFIED PUJA RADIO
   One player component across desktop / tablet / mobile
   ========================================================= */

.radio-card {
    position: absolute;
    z-index: 35;

    left: clamp(24px, 4vw, 64px);
    bottom: 28px;

    width: clamp(360px, 30vw, 450px);

    display: flex;
    flex-direction: column;

    padding: 20px;

    border-radius: 4px;

    pointer-events: auto;

    background:
        linear-gradient(
            135deg,
            rgba(var(--scene-rgb), 0.16),
            rgba(var(--scene-rgb), 0.05)
        );

    backdrop-filter: blur(24px) saturate(120%);
    -webkit-backdrop-filter: blur(24px) saturate(120%);

    border: 1px solid rgba(255,255,255,.08);

    box-shadow:
        0 18px 60px rgba(0,0,0,.28),
        inset 0 1px 0 rgba(255,255,255,.06);

    transition:
        width .45s cubic-bezier(.22,1,.36,1),
        padding .45s cubic-bezier(.22,1,.36,1),
        bottom .45s cubic-bezier(.22,1,.36,1),
        border-radius .45s ease,
        background .8s ease;
}


/* ---------------------------------------------------------
   TABLET
   --------------------------------------------------------- */

@media (min-width: 768px) and (max-width: 1100px) {

    .radio-card {
        width: min(390px, 38vw);
        padding: 16px;
    }

}


/* ---------------------------------------------------------
   MOBILE
   --------------------------------------------------------- */

@media (max-width: 767px) {

    .radio-card {
        display: flex !important;

        left: 12px;
        right: 12px;

        bottom: calc(
            12px + env(safe-area-inset-bottom, 0px)
        );

        width: auto;

        padding: 12px;

        border-radius: 18px;

        flex-direction: column;

        gap: 10px;

        background:
            linear-gradient(
                145deg,
                rgba(var(--scene-rgb), .22),
                rgba(20,16,14,.62)
            );

        backdrop-filter: blur(26px) saturate(125%);
        -webkit-backdrop-filter: blur(26px) saturate(125%);

        box-shadow:
            0 16px 50px rgba(0,0,0,.35),
            inset 0 1px 0 rgba(255,255,255,.08);

        border: 1px solid rgba(255,255,255,.10);
    }


    /*
       Top metadata row
    */

    .radio-card > div:first-child {
        width: 100%;
    }


    /*
       Artwork + track row
    */

    .radio-card > div:nth-of-type(3) {
        width: 100%;

        display: grid;
        grid-template-columns: 48px minmax(0, 1fr);

        align-items: center;

        gap: 12px;
    }


    .radio-card #radio-thumb {
        width: 48px;
        height: 48px;

        border-radius: 10px;

        box-shadow:
            0 6px 18px rgba(0,0,0,.28);
    }


    .radio-card #player-track-desktop {
        display: block;

        max-width: 100%;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        font-size: 15px;
    }


    /*
       Controls
    */

    .radio-card > div:last-child {
        width: 100%;
    }


    .radio-card > div:last-child > div:first-child {
        gap: 22px;
    }


    .radio-card #btn-play-pause-desktop {
        width: 42px;
        height: 42px;

        background: rgba(255,255,255,.08);

        border-color: rgba(255,255,255,.22);

        box-shadow:
            0 5px 20px rgba(0,0,0,.2);
    }


    .radio-card #btn-prev,
    .radio-card #btn-next {
        width: 32px;
        height: 32px;

        display: flex;
        align-items: center;
        justify-content: center;

        padding: 0;
    }


    /*
       Volume remains visible on mobile.
       No hover dependency.
    */

    .radio-card #volume-slider-desktop {
        height: 14px;
        min-height: 14px;
    }


    .radio-card .slider-thumb-analog::-webkit-slider-thumb {
        width: 12px;
        height: 12px;
    }


    /*
       Hide the old mobile duplicate players.
    */

    #mobile-radio-bar,
    #sheet-radio {
        display: none !important;
    }


    /*
       Don't allow the player to crush the timeline.
    */

    .timeline-container-pos {
        bottom: calc(
            128px + env(safe-area-inset-bottom, 0px)
        );
    }


    /*
       Hero needs slightly more breathing room.
    */

    .hero-copy {
        bottom: calc(
            190px + env(safe-area-inset-bottom, 0px)
        );

        max-width: calc(100vw - 32px);
    }

}


/* ---------------------------------------------------------
   VERY SMALL PHONES
   --------------------------------------------------------- */

@media (max-width: 380px) {

    .radio-card {
        padding: 10px;

        border-radius: 16px;
    }

    .radio-card #radio-thumb {
        width: 42px;
        height: 42px;
    }

    .radio-card #player-track-desktop {
        font-size: 14px;
    }

    .radio-card > div:last-child > div:first-child {
        gap: 16px;
    }

    .radio-card #btn-play-pause-desktop {
        width: 38px;
        height: 38px;
    }

}


/* ---------------------------------------------------------
   LANDSCAPE MOBILE
   --------------------------------------------------------- */

@media (max-width: 767px) and (orientation: landscape) {

    .radio-card {
        left: 16px;
        right: auto;

        width: min(440px, calc(100vw - 32px));

        bottom: calc(
            10px + env(safe-area-inset-bottom, 0px)
        );

        padding: 10px 12px;

        display: grid !important;

        grid-template-columns:
            1fr
            auto;

        gap: 8px;
    }


    .radio-card > div:nth-of-type(3) {
        grid-column: 1;
    }


    .radio-card > div:last-child {
        grid-column: 2;
        grid-row: 2;
    }


    .timeline-container-pos {
        bottom: 12px;
        padding-bottom: 70px;
    }


    .hero-copy {
        bottom: 82px;
        max-width: 52vw;
    }

}


/* ---------------------------------------------------------
   ACCESSIBILITY
   --------------------------------------------------------- */

@media (prefers-reduced-motion: reduce) {

    .radio-card {
        transition: none !important;
    }

}
`;

// Clean up existing .timeline-container-pos and .hero-copy in css if they exist outside of the media queries
// We'll just replace the entire max-width: 767px media query since the user wants us to replace it.

const badMediaStart = css.indexOf('@media (max-width: 767px) {\n    .scene-bg {');
if(badMediaStart !== -1) {
    const end = css.indexOf('/* Mobile interactions */', badMediaStart);
    // Actually, it's safer to just remove the specific block:
    // @media (orientation: landscape) {
    //    .hero-copy { bottom: 64px; }
    // }
    // Let's do a regex replacement for the nested orientation query.
    css = css.replace(/@media \(orientation: landscape\) \{[\s\S]*?\}/, '');
}

// Write the new css to the bottom
css += '\n' + unifiedPlayerCSS;
fs.writeFileSync('style.css', css);
