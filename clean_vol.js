const fs = require('fs');
let js = fs.readFileSync('script.js', 'utf-8');

js = js.replace(
    /const volDes = document\.getElementById\('volume-slider-desktop'\);[\s\S]*?\}\n/g,
    `const volDes = document.getElementById('volume-slider-desktop');
if(volDes) {
    volDes.addEventListener('input', (e) => { audio.volume = e.target.value; });
}
`
);

fs.writeFileSync('script.js', js);
