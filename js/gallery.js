/* ============================================
   NBD — Gallery Viewer
   ============================================ */

(function () {
  const params    = new URLSearchParams(window.location.search);
  const galleryId = params.get('id');

  if (!galleryId) {
    window.location.href = 'galleries.html';
    return;
  }

  // ── State ────────────────────────────────────────────────────────────────
  let galleryData   = null;
  let photos        = [];
  let lightboxIndex = 0;
  let pendingPurchase = null; // { type: 'photo'|'gallery', file }

  // ── DOM refs ─────────────────────────────────────────────────────────────
  const gate         = document.getElementById('password-gate');
  const gateForm     = document.getElementById('gate-form');
  const gateInput    = document.getElementById('gate-password');
  const gateError    = document.getElementById('gate-error');
  const header       = document.getElementById('gallery-header');
  const galleryTitle = document.getElementById('gallery-title');
  const galleryDate  = document.getElementById('gallery-date');
  const galleryDesc  = document.getElementById('gallery-desc');
  const galleryActions = document.getElementById('gallery-actions');
  const gallerySection = document.getElementById('gallery-section');
  const photoGrid    = document.getElementById('photo-grid');
  const galleryEmpty = document.getElementById('gallery-empty');
  const lightbox     = document.getElementById('lightbox');
  const lightboxImg  = document.getElementById('lightbox-img');
  const lightboxInfo = document.getElementById('lightbox-info');
  const lbClose      = document.getElementById('lightbox-close');
  const lbPrev       = document.getElementById('lightbox-prev');
  const lbNext       = document.getElementById('lightbox-next');
  const modal        = document.getElementById('purchase-modal');
  const modalClose   = document.getElementById('modal-close');
  const modalTitle   = document.getElementById('modal-title');
  const modalDesc    = document.getElementById('modal-desc');
  const modalPrice   = document.getElementById('modal-price');
  const modalConfirm = document.getElementById('modal-confirm');
  const modalStatus  = document.getElementById('modal-status');
  const modalDevNote = document.getElementById('modal-dev-notice');

  // ── Load gallery ─────────────────────────────────────────────────────────
  async function loadGallery() {
    try {
      const res = await fetch(`/api/gallery/${galleryId}`);

      if (res.status === 401) {
        showGate();
        return;
      }

      if (!res.ok) {
        document.body.innerHTML = '<div style="padding:4rem;text-align:center"><h2>Gallery not found</h2><a href="galleries.html">← Back</a></div>';
        return;
      }

      galleryData = await res.json();
      photos = galleryData.photos || [];
      document.title = `${galleryData.title} — NBD`;
      renderGallery();
    } catch (e) {
      console.error(e);
    }
  }

  // ── Password gate ─────────────────────────────────────────────────────────
  function showGate() {
    gate.classList.add('gate--visible');
    gate.setAttribute('aria-hidden', 'false');
    setTimeout(() => gateInput.focus(), 100);
  }

  function hideGate() {
    gate.classList.remove('gate--visible');
    gate.setAttribute('aria-hidden', 'true');
  }

  gateForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    gateError.textContent = '';
    const password = gateInput.value;

    const res = await fetch(`/api/gallery/${galleryId}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      hideGate();
      loadGallery();
    } else {
      gateError.textContent = 'Incorrect password. Try again.';
      gateInput.value = '';
      gateInput.focus();
    }
  });

  // ── Render gallery ────────────────────────────────────────────────────────
  function renderGallery() {
    galleryTitle.textContent = galleryData.title;
    galleryDate.textContent  = galleryData.date;
    galleryDesc.textContent  = galleryData.description;
    header.style.display     = '';
    gallerySection.style.display = '';

    // Full gallery download button
    if (galleryData.pricing && photos.length > 0) {
      galleryActions.innerHTML = `
        <button class="btn btn--outline gallery-dl-btn" data-action="buy-gallery">
          Download Full Gallery — $${Number(galleryData.pricing.fullGallery).toFixed(2)}
        </button>
      `;
      galleryActions.querySelector('[data-action="buy-gallery"]')
        .addEventListener('click', () => openPurchaseModal('gallery', null));
    }

    if (photos.length === 0) {
      galleryEmpty.style.display = '';
      return;
    }

    photoGrid.innerHTML = photos.map((file, i) => `
      <div class="photo-item reveal" data-index="${i}">
        <div class="photo-item__inner">
          <img
            src="/photos/${galleryId}/${encodeURIComponent(file)}"
            alt="Photo ${i + 1}"
            loading="lazy"
            class="photo-item__img"
          >
          ${galleryData.watermark ? '<div class="photo-item__watermark-badge">Watermarked preview</div>' : ''}
          <div class="photo-item__overlay">
            <button class="photo-item__view" data-index="${i}" aria-label="View photo">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
            ${galleryData.pricing ? `
            <button class="photo-item__buy" data-file="${file}" aria-label="Buy photo">
              $${Number(galleryData.pricing.perPhoto).toFixed(2)} — Download
            </button>
            ` : ''}
          </div>
        </div>
      </div>
    `).join('');

    // View (lightbox) buttons
    photoGrid.querySelectorAll('.photo-item__view').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openLightbox(parseInt(btn.dataset.index));
      });
    });

    // Click image itself also opens lightbox
    photoGrid.querySelectorAll('.photo-item').forEach(item => {
      item.addEventListener('click', () => openLightbox(parseInt(item.dataset.index)));
    });

    // Buy per-photo buttons
    photoGrid.querySelectorAll('.photo-item__buy').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openPurchaseModal('photo', btn.dataset.file);
      });
    });

    // Reveal animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
    photoGrid.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  // ── Lightbox ──────────────────────────────────────────────────────────────
  function openLightbox(index) {
    lightboxIndex = index;
    updateLightbox();
    lightbox.classList.add('lightbox--open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('lightbox--open');
    document.body.style.overflow = '';
  }

  function updateLightbox() {
    const file = photos[lightboxIndex];
    lightboxImg.src = `/photos/${galleryId}/${encodeURIComponent(file)}`;
    lightboxImg.alt = `Photo ${lightboxIndex + 1} of ${photos.length}`;
    lightboxInfo.textContent = `${lightboxIndex + 1} / ${photos.length}`;
    lbPrev.style.display = lightboxIndex === 0 ? 'none' : '';
    lbNext.style.display = lightboxIndex === photos.length - 1 ? 'none' : '';
  }

  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  lbPrev.addEventListener('click', () => { if (lightboxIndex > 0) { lightboxIndex--; updateLightbox(); } });
  lbNext.addEventListener('click', () => { if (lightboxIndex < photos.length - 1) { lightboxIndex++; updateLightbox(); } });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('lightbox--open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft' && lightboxIndex > 0) { lightboxIndex--; updateLightbox(); }
    if (e.key === 'ArrowRight' && lightboxIndex < photos.length - 1) { lightboxIndex++; updateLightbox(); }
  });

  // ── Purchase modal ────────────────────────────────────────────────────────
  function openPurchaseModal(type, file) {
    pendingPurchase = { type, file };
    modalStatus.textContent = '';
    modalConfirm.disabled = false;

    if (type === 'gallery') {
      modalTitle.textContent = 'Download Full Gallery';
      modalDesc.textContent  = `Get every photo from "${galleryData.title}" in full resolution without watermarks.`;
      modalPrice.textContent = `$${Number(galleryData.pricing.fullGallery).toFixed(2)}`;
    } else {
      modalTitle.textContent = 'Download Photo';
      modalDesc.textContent  = `Download this photo in full resolution without a watermark.`;
      modalPrice.textContent = `$${Number(galleryData.pricing.perPhoto).toFixed(2)}`;
    }

    modal.classList.add('modal--visible');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    modal.classList.remove('modal--visible');
    modal.setAttribute('aria-hidden', 'true');
    pendingPurchase = null;
  }

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  modalConfirm.addEventListener('click', async () => {
    if (!pendingPurchase) return;
    modalConfirm.disabled = true;
    modalStatus.textContent = 'Processing…';

    try {
      const res = await fetch(`/api/gallery/${galleryId}/purchase`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pendingPurchase),
      });

      const data = await res.json();

      if (!res.ok) {
        modalStatus.textContent = data.error || 'Purchase failed.';
        modalConfirm.disabled = false;
        return;
      }

      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url;
        return;
      }
    } catch (err) {
      console.error(err);
      modalStatus.textContent = 'Something went wrong. Try again.';
      modalConfirm.disabled = false;
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('modal--visible')) closeModal();
  });

  // ── Handle return from Stripe ─────────────────────────────────────────────
  function handleStripeReturn() {
    const token = params.get('download_token');
    const type  = params.get('download_type');
    const file  = params.get('download_file');
    if (!token) return;

    // Clean URL
    const clean = new URL(window.location.href);
    ['download_token','download_type','download_file'].forEach(k => clean.searchParams.delete(k));
    window.history.replaceState({}, '', clean);

    if (type === 'gallery') {
      window.location.href = `/api/download/${galleryId}?token=${token}`;
    } else if (file) {
      const a = document.createElement('a');
      a.href = `/api/download/${galleryId}/${encodeURIComponent(file)}?token=${token}`;
      a.download = file;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  // ── Init ──────────────────────────────────────────────────────────────────
  handleStripeReturn();
  loadGallery();
})();
