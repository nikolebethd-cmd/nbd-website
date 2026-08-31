// Upload a folder of photos to Cloudinary and print ready-to-use URLs.
//
//   node --env-file=.env upload-photos.js <folder> <slug>
//
// e.g. node --env-file=.env upload-photos.js ~/Desktop/for-website surf-2025
//
// Uploads originals (Cloudinary resizes on delivery, so no pre-processing
// needed) into photos/<slug>/ and prints a tile URL plus a gallery entry.
const cloudinary = require('./cloudinary-config');
const fs = require('fs');
const path = require('path');

const [folder, slug] = process.argv.slice(2);

if (!folder || !slug) {
  console.error('Usage: node --env-file=.env upload-photos.js <folder> <slug>');
  process.exit(1);
}
if (!fs.existsSync(folder)) {
  console.error(`No such folder: ${folder}`);
  process.exit(1);
}

const CLOUD = cloudinary.CLOUD;
const files = fs.readdirSync(folder)
  .filter(f => /\.(jpe?g|png|heic|webp|tiff?)$/i.test(f))
  .sort();

if (!files.length) {
  console.error(`No images found in ${folder}`);
  process.exit(1);
}

const totalMB = files.reduce((a, f) => a + fs.statSync(path.join(folder, f)).size, 0) / 1048576;

(async () => {
  console.log(`Uploading ${files.length} photos (${totalMB.toFixed(0)} MB) to photos/${slug}/ ...\n`);

  const uploaded = [];
  for (const f of files) {
    const publicId = `photos/${slug}/${path.parse(f).name.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
    try {
      const r = await cloudinary.uploader.upload(path.join(folder, f), {
        public_id: publicId,
        resource_type: 'image',
        overwrite: false,
      });
      uploaded.push({ file: f, publicId, w: r.width, h: r.height });
      process.stdout.write('.');
    } catch (err) {
      process.stdout.write('x');
      console.error(`\n  failed: ${f} — ${err.message || JSON.stringify(err)}`);
    }
  }

  console.log(`\n\nUploaded ${uploaded.length}/${files.length}.\n`);
  if (!uploaded.length) return;

  const tile = (id, ar) =>
    `https://res.cloudinary.com/${CLOUD}/image/upload/c_fill,ar_${ar},g_auto,w_900,q_auto,f_auto/${id}`;

  console.log('Homepage tile URL (3:4) for the first image:');
  console.log('  ' + tile(uploaded[0].publicId, '3:4') + '\n');
  console.log('All uploaded public_ids:');
  uploaded.forEach(u => console.log(`  ${u.publicId}  (${u.w}x${u.h})`));
})().catch(err => {
  console.error(`Upload failed: ${err.message}`);
  process.exit(1);
});
