const cloudinary = require('./cloudinary-config');
const fs = require('fs');
const path = require('path');

const thumbsDir = path.join(__dirname, 'videos/thumbs');
const dataPath = path.join(__dirname, 'js/data.js');
const mapping = {};

async function run() {
  const files = fs.readdirSync(thumbsDir).filter(f => /\.(png|jpe?g|webp)$/i.test(f));
  console.log(`Uploading ${files.length} thumbnails...`);

  for (const file of files) {
    const filePath = path.join(thumbsDir, file);
    const name = file.replace(/[^a-zA-Z0-9_.-]/g, '_');
    const publicId = `video-thumbs/${path.parse(name).name}`;
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        public_id: publicId,
        overwrite: false,
        resource_type: 'image',
      });
      mapping[`videos/thumbs/${file}`] = result.secure_url;
      process.stdout.write('.');
    } catch (err) {
      if (err.message && err.message.includes('already exists')) {
        mapping[`videos/thumbs/${file}`] = `https://res.cloudinary.com/dljs01zmp/image/upload/video-thumbs/${path.parse(name).name}.png`;
        process.stdout.write('s');
      } else {
        console.error(`\nFailed: ${file} — ${err.message}`);
      }
    }
  }

  // Update data.js
  let content = fs.readFileSync(dataPath, 'utf8');
  for (const [local, url] of Object.entries(mapping)) {
    content = content.split(`"${local}"`).join(`"${url}"`);
  }
  fs.writeFileSync(dataPath, content);
  console.log(`\nDone! Updated ${Object.keys(mapping).length} thumbnail references.`);
}
run();
