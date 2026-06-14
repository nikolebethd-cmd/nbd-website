// Fetches photo lists from Cloudinary and updates galleries.json
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: 'dljs01zmp',
  api_key: '626545187848522',
  api_secret: 'XD1_E1MzQ-jvwZNQBU2OKNSYP_U',
});

const CLOUD = 'dljs01zmp';

async function getPhotos(galleryId) {
  const results = [];
  let nextCursor;
  do {
    const res = await cloudinary.api.resources({
      type: 'upload',
      prefix: `galleries/${galleryId}/`,
      max_results: 500,
      next_cursor: nextCursor,
    });
    results.push(...res.resources.map(r => path.basename(r.public_id) + '.jpg'));
    nextCursor = res.next_cursor;
  } while (nextCursor);
  return results.sort();
}

async function main() {
  const galleriesPath = path.join(__dirname, 'galleries.json');
  const data = JSON.parse(fs.readFileSync(galleriesPath, 'utf8'));

  for (const g of data.galleries) {
    console.log(`Fetching photo list for: ${g.id}`);
    const photos = await getPhotos(g.id);
    g.photos = photos;

    // Update cover image to Cloudinary URL
    if (g.coverImage) {
      const match = g.coverImage.match(/\/photos\/[^/]+\/(.+)/);
      if (match) {
        const filename = path.parse(match[1]).name;
        g.coverImage = `https://res.cloudinary.com/${CLOUD}/image/upload/galleries/${g.id}/${filename}.jpg`;
      }
    }
    console.log(`  ${photos.length} photos found`);
  }

  fs.writeFileSync(galleriesPath, JSON.stringify(data, null, 2));
  console.log('\ngalleries.json updated!');
}

main();
