const fs = require('fs');
const path = require('path');

const mapping = JSON.parse(fs.readFileSync(path.join(__dirname, 'image-mapping.json')));

function replaceRefs(content) {
  let result = content;
  for (const [local, url] of Object.entries(mapping)) {
    result = result.split(`"${local}"`).join(`"${url}"`);
    result = result.split(`'${local}'`).join(`'${url}'`);
    result = result.split(`src="${local}"`).join(`src="${url}"`);
  }
  return result;
}

const files = ['js/data.js', 'index.html'];
for (const file of files) {
  const filePath = path.join(__dirname, file);
  const original = fs.readFileSync(filePath, 'utf8');
  const updated = replaceRefs(original);
  fs.writeFileSync(filePath, updated);
  console.log(`Updated: ${file}`);
}
console.log('Done!');
