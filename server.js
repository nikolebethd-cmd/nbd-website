/* ============================================
   NBD Gallery Server
   ============================================
   Run:  npm start
   Dev:  npm run dev   (auto-restarts on save)

   Routes:
     GET  /                          → static site
     GET  /api/galleries             → list all galleries (public metadata only)
     GET  /api/gallery/:id           → single gallery (401 if private + no session)
     POST /api/gallery/:id/auth      → password check, sets session
     GET  /photos/:id/:file          → serve photo (watermarked if enabled)
     GET  /api/download/:id/:file    → unwatermarked download (requires purchase token or DEV_MODE)
     POST /api/gallery/:id/purchase  → stub — returns dev token (replace with Stripe later)
   ============================================ */

const express = require('express');
const session = require('express-session');
const path    = require('path');
const fs      = require('fs');

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || 'dljs01zmp';

function cloudinaryUrl(galleryId, filename, watermark = false) {
  const base = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;
  const name = path.parse(filename).name;
  if (watermark) {
    const overlay = 'l_text:Arial_60_bold:NBD,co_white,o_45,g_center';
    return `${base}/${overlay}/galleries/${galleryId}/${name}.jpg`;
  }
  return `${base}/galleries/${galleryId}/${name}.jpg`;
}

const app  = express();
const PORT = process.env.PORT || 3000;
const DEV_MODE = process.env.DEV_MODE !== 'false'; // true by default locally

// ── Load gallery config ─────────────────────────────────────────────────────
const galleriesPath = path.join(__dirname, 'galleries.json');
function loadGalleries() {
  return JSON.parse(fs.readFileSync(galleriesPath, 'utf8')).galleries;
}

// ── In-memory purchase token store ──────────────────────────────────────────
// Map: token → { galleryId, file: '*' | filename, expires: Date }
const purchaseTokens = new Map();

function generateToken(galleryId, file) {
  const token   = Math.random().toString(36).slice(2) + Date.now().toString(36);
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h
  purchaseTokens.set(token, { galleryId, file, expires });
  return token;
}

function validateToken(token, galleryId, file) {
  const entry = purchaseTokens.get(token);
  if (!entry) return false;
  if (entry.expires < new Date()) { purchaseTokens.delete(token); return false; }
  if (entry.galleryId !== galleryId) return false;
  if (entry.file !== '*' && entry.file !== file) return false;
  return true;
}

// ── Middleware ───────────────────────────────────────────────────────────────
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'nbd-local-dev-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 } // 1 week
}));

// Serve static site files
app.use(express.static(__dirname));

// ── Gallery list ─────────────────────────────────────────────────────────────
app.get('/api/galleries', (req, res) => {
  const galleries = loadGalleries();
  res.json(galleries.map(g => ({
    id:          g.id,
    title:       g.title,
    description: g.description,
    date:        g.date,
    coverImage:  g.coverImage,
    private:     g.private,
    watermark:   g.watermark,
    pricing:     g.pricing,
  })));
});

// ── Single gallery ───────────────────────────────────────────────────────────
app.get('/api/gallery/:id', (req, res) => {
  const galleries = loadGalleries();
  const gallery   = galleries.find(g => g.id === req.params.id);
  if (!gallery) return res.status(404).json({ error: 'Gallery not found' });

  const unlockedGalleries = req.session.unlockedGalleries || [];
  if (gallery.private && !unlockedGalleries.includes(gallery.id)) {
    return res.status(401).json({ error: 'Password required', private: true });
  }

  const photos = gallery.photos || [];

  res.json({
    id:          gallery.id,
    title:       gallery.title,
    description: gallery.description,
    date:        gallery.date,
    watermark:   gallery.watermark,
    pricing:     gallery.pricing,
    photos,
  });
});

// ── Password auth ────────────────────────────────────────────────────────────
app.post('/api/gallery/:id/auth', (req, res) => {
  const galleries = loadGalleries();
  const gallery   = galleries.find(g => g.id === req.params.id);
  if (!gallery) return res.status(404).json({ error: 'Gallery not found' });
  if (!gallery.private) return res.json({ success: true });

  const { password } = req.body;
  if (!password || password !== gallery.password) {
    return res.status(401).json({ error: 'Incorrect password' });
  }

  if (!req.session.unlockedGalleries) req.session.unlockedGalleries = [];
  if (!req.session.unlockedGalleries.includes(gallery.id)) {
    req.session.unlockedGalleries.push(gallery.id);
  }

  res.json({ success: true });
});

// ── Serve photo (watermarked via Cloudinary) ──────────────────────────────────
app.get('/photos/:galleryId/:file', (req, res) => {
  const { galleryId, file } = req.params;

  if (!/^[\w\-. ]+\.(jpe?g|png|webp)$/i.test(file)) {
    return res.status(400).send('Invalid filename');
  }

  const galleries = loadGalleries();
  const gallery   = galleries.find(g => g.id === galleryId);
  if (!gallery) return res.status(404).send('Gallery not found');

  const unlockedGalleries = req.session.unlockedGalleries || [];
  if (gallery.private && !unlockedGalleries.includes(galleryId)) {
    return res.status(401).send('Unauthorized');
  }

  return res.redirect(cloudinaryUrl(galleryId, file, gallery.watermark));
});

// ── Purchase (stub — replace with Stripe later) ───────────────────────────────
app.post('/api/gallery/:id/purchase', (req, res) => {
  const galleries = loadGalleries();
  const gallery   = galleries.find(g => g.id === req.params.id);
  if (!gallery) return res.status(404).json({ error: 'Gallery not found' });

  const { type, file } = req.body; // type: 'photo' | 'gallery'

  if (DEV_MODE) {
    // In dev mode, skip payment and return a download token immediately
    const tokenFile = type === 'gallery' ? '*' : file;
    const token = generateToken(gallery.id, tokenFile);
    return res.json({
      success: true,
      devMode: true,
      token,
      message: 'Dev mode: payment skipped. Add Stripe before deploying.',
    });
  }

  // TODO: create Stripe checkout session here
  res.status(501).json({ error: 'Stripe not configured. Set DEV_MODE=true or add Stripe keys.' });
});

// ── Download (unwatermarked) ──────────────────────────────────────────────────
app.get('/api/download/:galleryId/:file', (req, res) => {
  const { galleryId, file } = req.params;
  const { token } = req.query;

  if (!/^[\w\-. ]+\.(jpe?g|png|webp)$/i.test(file)) {
    return res.status(400).send('Invalid filename');
  }

  const galleries = loadGalleries();
  const gallery   = galleries.find(g => g.id === galleryId);
  if (!gallery) return res.status(404).send('Gallery not found');

  // Validate purchase token
  if (!token || !validateToken(token, galleryId, file)) {
    return res.status(403).send('Invalid or expired download token');
  }

  return res.redirect(cloudinaryUrl(galleryId, file, false));
});

// ── Download full gallery as zip ──────────────────────────────────────────────
app.get('/api/download/:galleryId', async (req, res) => {
  const { galleryId } = req.params;
  const { token }     = req.query;

  const galleries = loadGalleries();
  const gallery   = galleries.find(g => g.id === galleryId);
  if (!gallery) return res.status(404).send('Gallery not found');

  if (!token || !validateToken(token, galleryId, '*')) {
    return res.status(403).send('Invalid or expired download token');
  }

  const photos = gallery.photos || [];
  if (photos.length === 0) return res.status(404).send('No photos in gallery');

  // Return list of Cloudinary download URLs as JSON for client-side handling
  const urls = photos.map(f => cloudinaryUrl(galleryId, f, false));
  res.json({ title: gallery.title, urls });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\nNBD Gallery Server running at http://localhost:${PORT}`);
  console.log(`DEV_MODE: ${DEV_MODE ? 'ON (payments skipped)' : 'OFF (Stripe required)'}\n`);
});
