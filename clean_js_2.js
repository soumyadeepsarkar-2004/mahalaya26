const fs = require('fs');
let js = fs.readFileSync('script.js', 'utf-8');

js = js.replace(/const sheetRadio = document\.getElementById\('sheet-radio'\);\n?/g, '');
js = js.replace(/setTimeout\(\(\) => openSheet\(sheetRadio\), 400\);/g, '');

fs.writeFileSync('script.js', js);
