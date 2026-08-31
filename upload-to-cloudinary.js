const cloudinary = require('./cloudinary-config');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const os = require('os');

const galleryPhotosDir = path.join(__dirname, 'gallery-photos');
const tmpDir = os.tmpdir();

async function prepareFile(filePath) {
  const stat = fs.statSync(filePath);
  if (stat.size <= 9 * 1024 * 1024) return filePath; // under 9MB, use as-is

  // Compress to under 9MB
  const tmpPath = path.join(tmpDir, `nbd-${Date.now()}-${path.basename(filePath)}`);
  await sharp(filePath)
    .resize({ width: 3000, height: 3000, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 82 })
    .toFile(tmpPath);
  return tmpPath;
}

async function uploadAll() {
  const galleries = fs.readdirSync(galleryPhotosDir).filter(f =>
    fs.statSync(path.join(galleryPhotosDir, f)).isDirectory()
  );

  let uploaded = 0, failed = 0, skipped = 0;

  for (const gallery of galleries) {
    const galleryDir = path.join(galleryPhotosDir, gallery);
    const photos = fs.readdirSync(galleryDir).filter(f =>
      /\.(jpe?g|png|webp)$/i.test(f)
    );

    console.log(`\nUploading gallery: ${gallery} (${photos.length} photos)`);

    for (const photo of photos) {
      const filePath = path.join(galleryDir, photo);
      const publicId = `galleries/${gallery}/${path.parse(photo).name}`;
      let tmpUsed = null;

      try {
        const uploadPath = await prepareFile(filePath);
        if (uploadPath !== filePath) tmpUsed = uploadPath;

        await cloudinary.uploader.upload(uploadPath, {
          public_id: publicId,
          overwrite: false,
          resource_type: 'image',
        });
        process.stdout.write('.');
        uploaded++;
      } catch (err) {
        if (err.message && err.message.includes('already exists')) {
          process.stdout.write('s');
          skipped++;
        } else {
          process.stdout.write('x');
          failed++;
        }
      } finally {
        if (tmpUsed && fs.existsSync(tmpUsed)) fs.unlinkSync(tmpUsed);
      }
    }
  }

  console.log(`\n\nDone! Uploaded: ${uploaded}, Skipped (already exist): ${skipped}, Failed: ${failed}`);
}

uploadAll();
