const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf-8');

// 1. Simplify radio-card
content = content.replace(
    /<div class="radio-card hidden md:flex absolute [^>]+>/,
    '<div class="radio-card overflow-hidden">'
);

// 2. Remove mobile-radio-bar
const barStart = content.indexOf('<!-- RADIO MOBILE BAR -->');
const utilitiesStart = content.indexOf('<!-- DESKTOP UTILITIES -->');
if(barStart !== -1 && utilitiesStart !== -1) {
    content = content.substring(0, barStart) + content.substring(utilitiesStart);
}

// 3. Remove Mobile Radio Expanded Sheet
const sheetStart = content.indexOf('<!-- Mobile Radio Expanded Sheet -->');
const statusSheetStart = content.indexOf('<!-- Mobile Status Sheet (Time/Countdown) -->');
if(sheetStart !== -1 && statusSheetStart !== -1) {
    content = content.substring(0, sheetStart) + content.substring(statusSheetStart);
}

fs.writeFileSync('index.html', content);
