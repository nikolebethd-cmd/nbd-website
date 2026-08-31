// Upload a single video to Cloudinary and print the entry to paste into js/data.js.
//
//   node --env-file=.env upload-one-video.js <file.mp4> "Video Title"
//
// Transcode first if the source is HEVC or over ~90MB:
//   ffmpeg -i in.mov -vcodec libx264 -crf 24 -preset fast -pix_fmt yuv420p \
//          -acodec aac -b:a 128k -movflags +faststart -y out.mp4
//
const cloudinary = require('./cloudinary-config');
const fs = require('fs');
const path = require('path');

const [filePath, title] = process.argv.slice(2);

if (!filePath || !title) {
  console.error('Usage: node --env-file=.env upload-one-video.js <file> "Video Title"');
  process.exit(1);
}
if (!fs.existsSync(filePath)) {
  console.error(`No such file: ${filePath}`);
  process.exit(1);
}

const CLOUD = cloudinary.CLOUD;
const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const publicId = `site-videos/${slug}`;

function fmtDuration(seconds) {
  const s = Math.round(seconds);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

(async () => {
  const sizeMB = (fs.statSync(filePath).size / 1048576).toFixed(1);
  console.log(`Uploading ${path.basename(filePath)} (${sizeMB} MB) as "${title}"...`);

  // Use the callback form — upload_large's promise form rejects spuriously
  // with an empty error even when the upload succeeds.
  await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_large(
      filePath,
      {
        public_id: publicId,
        resource_type: 'video',
        overwrite: true,
        invalidate: true,
        chunk_size: 20 * 1024 * 1024,
      },
      (err, res) => (err ? reject(new Error(JSON.stringify(err))) : resolve(res))
    );
  });

  // upload_large resolves with a partial chunk response (no duration/dimensions),
  // so read the stored resource back for the real metadata.
  const result = await cloudinary.api.resource(publicId, {
    resource_type: 'video',
    media_metadata: true,
  });

  // Poster frame pulled from 2s in, so it isn't a black opening frame.
  const thumbnail =
    `https://res.cloudinary.com/${CLOUD}/video/upload/so_2,c_fill,ar_16:9,g_auto,w_800,q_auto,f_auto/${publicId}.jpg`;

  const entry = {
    title,
    type: 'local',
    src: result.secure_url,
    thumbnail,
    duration: fmtDuration(result.duration),
    year: String(new Date(result.created_at).getFullYear()),
  };

  console.log(`\nDone — ${result.width}x${result.height}, ${fmtDuration(result.duration)}\n`);
  console.log('Paste into the videos array in js/data.js:\n');
  console.log('    ' + JSON.stringify(entry) + ',');
})().catch(err => {
  console.error(`Upload failed: ${err.message}`);
  process.exit(1);
});
