const cloudinary = require('./cloudinary-config');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const os = require('os');

const CLOUD = 'dljs01zmp';
const mapping = JSON.parse(fs.readFileSync(path.join(__dirname, 'image-mapping.json')));
const failed = ['art-d6f3.png','chaos-creature.png','portrait-6501.png','portrait-6502.png','portrait-face.png'];

async function run() {
  for (const file of failed) {
    const filePath = path.join(__dirname, 'images', file);
    const name = path.parse(file).name;
    const tmp = path.join(os.tmpdir(), `nbd-${name}.png`);
    await sharp(filePath).resize({ width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true }).png({ compressionLevel: 9 }).toFile(tmp);
    const result = await cloudinary.uploader.upload(tmp, { public_id: `site-images/${name}`, overwrite: true, resource_type: 'image' });
    mapping[`images/${file}`] = result.secure_url;
    fs.unlinkSync(tmp);
    console.log(`✓ ${file}`);
  }
  fs.writeFileSync(path.join(__dirname, 'image-mapping.json'), JSON.stringify(mapping, null, 2));
  console.log('Done!');
}
run();
