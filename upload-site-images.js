const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: 'dljs01zmp',
  api_key: '626545187848522',
  api_secret: 'XD1_E1MzQ-jvwZNQBU2OKNSYP_U',
});

const imagesDir = path.join(__dirname, 'images');
const CLOUD = 'dljs01zmp';
const mapping = {};

async function uploadAll() {
  const files = fs.readdirSync(imagesDir).filter(f =>
    /\.(jpe?g|png|webp|gif)$/i.test(f)
  );

  console.log(`Uploading ${files.length} site images...`);

  for (const file of files) {
    const filePath = path.join(imagesDir, file);
    const name = path.parse(file).name;
    const publicId = `site-images/${name}`;

    try {
      const result = await cloudinary.uploader.upload(filePath, {
        public_id: publicId,
        overwrite: false,
        resource_type: 'image',
      });
      mapping[`images/${file}`] = result.secure_url;
      process.stdout.write('.');
    } catch (err) {
      if (err.message && err.message.includes('already exists')) {
        // Build URL from known pattern
        const ext = path.parse(file).ext.replace('.', '');
        mapping[`images/${file}`] = `https://res.cloudinary.com/${CLOUD}/image/upload/site-images/${name}.${ext}`;
        process.stdout.write('s');
      } else {
        console.error(`\nFailed: ${file} — ${err.message}`);
      }
    }
  }

  // Save mapping
  fs.writeFileSync(path.join(__dirname, 'image-mapping.json'), JSON.stringify(mapping, null, 2));
  console.log(`\n\nDone! Uploaded ${Object.keys(mapping).length} images.`);
}

uploadAll();
