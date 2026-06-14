const fs = require('fs');
const path = require('path');

const mapping = JSON.parse(fs.readFileSync(path.join(__dirname, 'video-mapping.json')));

const filePath = path.join(__dirname, 'js/data.js');
let content = fs.readFileSync(filePath, 'utf8');

for (const [local, url] of Object.entries(mapping)) {
  content = content.split(`"${local}"`).join(`"${url}"`);
}

fs.writeFileSync(filePath, content);
console.log(`Updated ${Object.keys(mapping).length} video references in data.js`);
