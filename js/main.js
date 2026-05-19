/* ============================================
   NBD — Main Site JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Navigation scroll effect ---
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('nav--scrolled', window.scrollY > 40);
    });
  }

  // --- Mobile menu toggle ---
  const toggle = document.querySelector('.nav__toggle');
  const mobileMenu = document.querySelector('.nav__mobile');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('nav__toggle--open');
      mobileMenu.classList.toggle('nav__mobile--open');
      document.body.style.overflow = mobileMenu.classList.contains('nav__mobile--open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('nav__toggle--open');
        mobileMenu.classList.remove('nav__mobile--open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Scroll reveal ---
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => observer.observe(el));
  }

  // --- Render gallery cards ---
  const galleryGrid = document.getElementById('gallery-grid');
  if (galleryGrid) {
    function renderGalleryCards(galleries) {
      galleryGrid.innerHTML = galleries.map(g => {
        const url = g.url || `gallery.html?id=${g.id}`;
        const coverImage = g.coverImage || g.image;
        return `
          <div class="gallery-card reveal">
            <div class="gallery-card__image">
              ${coverImage ? `<img src="${coverImage}" alt="${g.title}" loading="lazy">` : `<div class="placeholder-img" style="aspect-ratio:16/10">Your Image</div>`}
            </div>
            <div class="gallery-card__body">
              <div class="gallery-card__meta">${g.date}</div>
              ${g.private ? `<div class="gallery-card__lock"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Private</div>` : ''}
              <h3 class="gallery-card__title">${g.title}</h3>
              <p class="gallery-card__desc">${g.description}</p>
              <a href="${url}" class="btn btn--small btn--arrow"><span>${g.private ? 'Unlock Gallery' : 'View Gallery'}</span></a>
            </div>
          </div>
        `;
      }).join('');
      initReveals(galleryGrid);
    }

    // Try to load live gallery list from server; fall back to SITE_DATA
    fetch('/api/galleries')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data && Array.isArray(data)) {
          renderGalleryCards(data);
        } else if (SITE_DATA.galleries) {
          renderGalleryCards(SITE_DATA.galleries);
        }
      })
      .catch(() => {
        if (SITE_DATA.galleries) renderGalleryCards(SITE_DATA.galleries);
      });
  }

  // --- Render art cards ---
  const artGrid = document.getElementById('art-grid');
  if (artGrid && SITE_DATA.artPieces) {
    artGrid.innerHTML = SITE_DATA.artPieces.map(a => {
      const isSold = a.status === 'sold';
      return `
        <div class="art-card ${isSold ? 'art-card--sold' : ''} reveal">
          <div class="art-card__image">
            <span class="art-card__badge ${isSold ? 'art-card__badge--sold' : 'art-card__badge--available'}">
              ${isSold ? 'Sold' : 'Available'}
            </span>
            ${a.image ? `<img src="${a.image}" alt="${a.title}" loading="lazy">` : `<div class="placeholder-img" style="aspect-ratio:4/5">Your Image</div>`}
          </div>
          <div class="art-card__body">
            <h3 class="art-card__title">${a.title}</h3>
            <p class="art-card__details">${a.medium}</p>
            <p class="art-card__details">${a.size}</p>
            <p class="art-card__price">$${a.price.toLocaleString()}</p>
            ${!isSold ? `<a href="mailto:${SITE_DATA.site.email}?subject=Inquiry: ${encodeURIComponent(a.title)}" class="btn btn--small btn--arrow"><span>Contact to Purchase</span></a>` : ''}
          </div>
        </div>
      `;
    }).join('');
    initReveals(artGrid);
  }

  // --- Render video cards ---
  const videoGrid     = document.getElementById('video-grid');
  const videoFilters  = document.getElementById('video-filters');
  const videoLightbox = document.getElementById('video-lightbox');

  if (videoGrid && SITE_DATA.videos) {
    const videos = SITE_DATA.videos;

    // Extract YouTube video ID from any standard YouTube URL
    function getYouTubeId(url) {
      const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
      return m ? m[1] : null;
    }

    // Resolve thumbnail URL: custom > YouTube API > empty (placeholder shown)
    function getThumbnail(v) {
      if (v.thumbnail) return v.thumbnail;
      if (v.type === 'youtube') {
        const id = getYouTubeId(v.src);
        return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : '';
      }
      return '';
    }

    // Build filter tag list from all videos
    const allTags = [...new Set(videos.flatMap(v => v.tags || []))].sort();
    if (allTags.length > 1 && videoFilters) {
      videoFilters.style.display = '';
      videoFilters.innerHTML =
        `<button class="video-filter-btn video-filter-btn--active" data-tag="all">All</button>` +
        allTags.map(t =>
          `<button class="video-filter-btn" data-tag="${t}">${t.charAt(0).toUpperCase() + t.slice(1)}</button>`
        ).join('');

      videoFilters.querySelectorAll('.video-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          videoFilters.querySelectorAll('.video-filter-btn').forEach(b => b.classList.remove('video-filter-btn--active'));
          btn.classList.add('video-filter-btn--active');
          renderCards(btn.dataset.tag);
        });
      });
    }

    // Render video card grid
    function renderCards(tag) {
      const list = tag === 'all' ? videos : videos.filter(v => (v.tags || []).includes(tag));
      videoGrid.innerHTML = list.map(v => {
        const thumb  = getThumbnail(v);
        const meta   = [v.duration, v.year].filter(Boolean).join(' · ');
        const isYT   = v.type === 'youtube';
        return `
          <div class="video-card reveal">
            <div class="video-card__thumbnail"
              data-src="${v.src}"
              data-type="${v.type || 'local'}"
              data-title="${v.title}"
              data-meta="${meta}">
              ${thumb
                ? `<img src="${thumb}" alt="${v.title}" loading="lazy">`
                : `<div class="video-card__thumb-placeholder"></div>`}
              <div class="video-card__play"></div>
              <span class="video-card__badge ${isYT ? 'video-card__badge--yt' : 'video-card__badge--local'}">${isYT ? 'YouTube' : 'Film'}</span>
            </div>
            <div class="video-card__body">
              <h3 class="video-card__title">${v.title}</h3>
              ${v.description ? `<p class="video-card__desc">${v.description}</p>` : ''}
              ${meta ? `<p class="video-card__meta">${meta}</p>` : ''}
            </div>
          </div>
        `;
      }).join('');
      bindClicks();
      initReveals(videoGrid);
    }

    renderCards('all');

    // Lightbox open / close
    const vlbPlayer = document.getElementById('vlb-player');
    const vlbTitle  = document.getElementById('vlb-title');
    const vlbInfo   = document.getElementById('vlb-info');
    const vlbClose  = document.getElementById('vlb-close');

    function openLightbox(src, type, title, meta) {
      vlbTitle.textContent = title;
      vlbInfo.textContent  = meta;
      if (type === 'youtube') {
        const id = getYouTubeId(src);
        vlbPlayer.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1&rel=0" allowfullscreen allow="autoplay; encrypted-media; fullscreen" frameborder="0"></iframe>`;
      } else {
        vlbPlayer.innerHTML = `<video src="${src}" controls autoplay playsinline></video>`;
      }
      videoLightbox.classList.add('video-lightbox--open');
      videoLightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      videoLightbox.classList.remove('video-lightbox--open');
      videoLightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      vlbPlayer.innerHTML = '';
    }

    function bindClicks() {
      videoGrid.querySelectorAll('.video-card__thumbnail').forEach(thumb => {
        thumb.addEventListener('click', () =>
          openLightbox(thumb.dataset.src, thumb.dataset.type, thumb.dataset.title, thumb.dataset.meta)
        );
      });
    }

    if (vlbClose)   vlbClose.addEventListener('click', closeLightbox);
    if (videoLightbox) {
      videoLightbox.addEventListener('click', e => { if (e.target === videoLightbox) closeLightbox(); });
    }
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && videoLightbox && videoLightbox.classList.contains('video-lightbox--open')) closeLightbox();
    });
  }

  // --- Render archive items ---
  const archiveGrid = document.getElementById('archive-grid');
  if (archiveGrid && SITE_DATA.archiveItems) {
    archiveGrid.innerHTML = SITE_DATA.archiveItems.map(a => `
      <div class="archive-item" data-src="${a.image}">
        ${a.image ? `<img src="${a.image}" alt="${a.title}" loading="lazy">` : `<div class="placeholder-img" style="aspect-ratio:${Math.random() > 0.5 ? '3/4' : '4/3'}">Your Image</div>`}
        <div class="archive-item__overlay">
          <div class="archive-item__info">
            <p class="archive-item__title">${a.title}</p>
            <p class="archive-item__type">${a.type}</p>
          </div>
        </div>
      </div>
    `).join('');

    archiveGrid.querySelectorAll('.archive-item').forEach(item => {
      item.addEventListener('click', () => {
        const src = item.dataset.src;
        if (src) openLightbox(src);
      });
    });
  }

  // --- Render about section ---
  const aboutContent = document.getElementById('about-content');
  if (aboutContent && SITE_DATA.about) {
    const a = SITE_DATA.about;
    const portrait = document.getElementById('about-portrait');
    if (portrait) {
      portrait.innerHTML = a.portrait
        ? `<img src="${a.portrait}" alt="Portrait">`
        : `<div class="placeholder-img" style="aspect-ratio:3/4;min-height:400px">Your Portrait</div>`;
    }
    aboutContent.innerHTML = `
      <span class="label section__label">About</span>
      <h2>The Story</h2>
      ${a.bio.map(p => `<p>${p}</p>`).join('')}
      <div class="about__values">
        ${a.values.map(v => `<span class="about__value-tag">${v}</span>`).join('')}
      </div>
    `;
  }

  // --- Lightbox ---
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.addEventListener('click', () => {
      lightbox.classList.remove('lightbox--open');
    });
  }

  function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    lightbox.querySelector('img').src = src;
    lightbox.classList.add('lightbox--open');
  }

  // --- Commission form ---
  const commissionForm = document.getElementById('commission-form');
  if (commissionForm) {
    commissionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(commissionForm);
      const subject = encodeURIComponent('Commission Inquiry');
      const body = encodeURIComponent(
        `Name: ${formData.get('name')}\n` +
        `Email: ${formData.get('email')}\n` +
        `Type: ${formData.get('type')}\n` +
        `Budget: ${formData.get('budget')}\n` +
        `Timeline: ${formData.get('timeline')}\n\n` +
        `Details:\n${formData.get('details')}`
      );
      window.location.href = `mailto:${SITE_DATA.site.email}?subject=${subject}&body=${body}`;
      const success = commissionForm.querySelector('.form__success');
      if (success) success.classList.add('form__success--visible');
    });
  }

  // --- Contact form ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const subject = encodeURIComponent('Website Contact');
      const body = encodeURIComponent(
        `Name: ${formData.get('name')}\n` +
        `Email: ${formData.get('email')}\n\n` +
        `${formData.get('message')}`
      );
      window.location.href = `mailto:${SITE_DATA.site.email}?subject=${subject}&body=${body}`;
      const success = contactForm.querySelector('.form__success');
      if (success) success.classList.add('form__success--visible');
    });
  }

  // --- Helper: init reveal animations on dynamically added elements ---
  function initReveals(container) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    container.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  // --- Hero scroll button ---
  const heroScroll = document.querySelector('.hero__scroll');
  if (heroScroll) {
    heroScroll.addEventListener('click', () => {
      const nextSection = document.querySelector('.hero + *');
      if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

});
