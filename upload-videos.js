const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

cloudinary.config({
  cloud_name: 'dljs01zmp',
  api_key: '626545187848522',
  api_secret: 'XD1_E1MzQ-jvwZNQBU2OKNSYP_U',
});

const videosDir = path.join(__dirname, 'videos');
const mapping = {};

async function uploadAll() {
  const files = fs.readdirSync(videosDir).filter(f =>
    /\.(mov|mp4|avi|mkv)$/i.test(f) && fs.statSync(path.join(videosDir, f)).isFile()
  );

  console.log(`Uploading ${files.length} videos...`);

  for (const file of files) {
    const filePath = path.join(videosDir, file);
    const size = fs.statSync(filePath).size;
    const name = path.parse(file).name.replace(/[^a-zA-Z0-9_-]/g, '_');
    const publicId = `site-videos/${name}`;
    let uploadPath = filePath;
    let tmpUsed = null;

    // Compress if over 90MB
    if (size > 90 * 1024 * 1024) {
      const tmp = path.join(os.tmpdir(), `nbd-${name}.mp4`);
      try {
        execSync(`ffmpeg -i "${filePath}" -vcodec libx264 -crf 28 -preset fast -acodec aac -y "${tmp}" 2>/dev/null`);
        uploadPath = tmp;
        tmpUsed = tmp;
      } catch (e) {
        console.error(`\nffmpeg failed for ${file}, skipping`);
        continue;
      }
    }

    try {
      const result = await cloudinary.uploader.upload(uploadPath, {
        public_id: publicId,
        resource_type: 'video',
        overwrite: false,
      });
      mapping[`videos/${file}`] = result.secure_url;
      process.stdout.write('.');
    } catch (err) {
      if (err.message && err.message.includes('already exists')) {
        mapping[`videos/${file}`] = `https://res.cloudinary.com/dljs01zmp/video/upload/site-videos/${name}.mp4`;
        process.stdout.write('s');
      } else {
        console.error(`\nFailed: ${file} — ${err.message}`);
      }
    } finally {
      if (tmpUsed && fs.existsSync(tmpUsed)) fs.unlinkSync(tmpUsed);
    }
  }

  fs.writeFileSync(path.join(__dirname, 'video-mapping.json'), JSON.stringify(mapping, null, 2));
  console.log(`\n\nDone! ${Object.keys(mapping).length}/${files.length} videos uploaded.`);
}

uploadAll();
