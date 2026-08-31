// Shared Cloudinary credentials for the upload/sync scripts.
//
// Credentials come from the environment — never hardcode them here, since this
// repo is public. Set them in .env (gitignored) and run scripts with:
//
//   node --env-file=.env upload-videos.js
//
const cloudinary = require('cloudinary').v2;

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error(
    'Missing Cloudinary credentials.\n' +
    'Copy .env.example to .env, fill in your keys, then run:\n' +
    '  node --env-file=.env <script>.js'
  );
  process.exit(1);
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
module.exports.CLOUD = CLOUDINARY_CLOUD_NAME;
