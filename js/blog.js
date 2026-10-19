/* ============================================
   Blog: essay list (blog.html) and a single
   essay with its comment section (essay.html)
   ============================================ */

(function () {
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }

  // --- Essay list ---
  const list = document.getElementById('essay-list');
  if (list) {
    fetch('/api/essays')
      .then(r => r.json())
      .then(essays => {
        essays.forEach((e, i) => {
          const card = el('a', 'essay-card reveal reveal--visible');
          card.href = `essay.html?e=${encodeURIComponent(e.slug)}`;
          card.appendChild(el('span', 'essay-card__num', String(i + 1).padStart(2, '0')));
          const text = el('div', 'essay-card__text');
          text.appendChild(el('h2', 'essay-card__title', e.title));
          text.appendChild(el('p', 'essay-card__subtitle', e.subtitle));
          const meta = [`${e.readMinutes} min read`];
          if (e.commentCount) meta.push(`${e.commentCount} comment${e.commentCount === 1 ? '' : 's'}`);
          text.appendChild(el('p', 'essay-card__meta', meta.join(' · ')));
          card.appendChild(text);
          list.appendChild(card);
        });
      })
      .catch(() => { list.appendChild(el('p', 'essay-list__empty', 'Couldn’t load essays. Try refreshing.')); });
  }

  // --- Single essay ---
  const essayBody = document.getElementById('essay-body');
  if (!essayBody) return;

  const slug = new URLSearchParams(location.search).get('e');
  if (!slug) { location.replace('blog.html'); return; }

  fetch(`/api/essays/${encodeURIComponent(slug)}`)
    .then(r => { if (!r.ok) throw new Error(); return r.json(); })
    .then(essay => {
      document.title = `${essay.title} | NBD`;
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.content = essay.subtitle;
      document.getElementById('essay-title').textContent = essay.title;
      document.getElementById('essay-subtitle').textContent = essay.subtitle;
      document.getElementById('essay-meta').textContent = `${essay.readMinutes} min read`;
      essay.body.forEach(block => essayBody.appendChild(el(block.type === 'h2' ? 'h2' : 'p', null, block.text)));
    })
    .catch(() => {
      document.getElementById('essay-title').textContent = 'Essay not found';
      document.getElementById('comments').hidden = true;
    });

  // --- Comments ---
  const commentList = document.getElementById('comment-list');
  const countEl = document.getElementById('comment-count');
  const form = document.getElementById('comment-form');
  const status = document.getElementById('comment-status');

  // Visit essay.html?e=...#admin to show delete buttons (asks for ADMIN_KEY once per tab).
  let adminKey = sessionStorage.getItem('nbdAdminKey');
  if (location.hash === '#admin' && !adminKey) {
    adminKey = prompt('Admin key') || null;
    if (adminKey) sessionStorage.setItem('nbdAdminKey', adminKey);
  }

  function renderComment(c) {
    const li = el('li', 'comment');
    const head = el('div', 'comment__head');
    head.appendChild(el('span', c.name ? 'comment__name' : 'comment__name comment__name--anon', c.name || 'Anonymous'));
    const time = el('time', 'comment__date', formatDate(c.createdAt));
    time.dateTime = c.createdAt;
    head.appendChild(time);
    if (adminKey) {
      const del = el('button', 'comment__delete', 'Delete');
      del.type = 'button';
      del.addEventListener('click', () => {
        if (!confirm('Delete this comment?')) return;
        fetch(`/api/essays/${encodeURIComponent(slug)}/comments/${c.id}`, {
          method: 'DELETE', headers: { 'x-admin-key': adminKey },
        }).then(r => {
          if (r.ok) { li.remove(); updateCount(); }
          else alert(r.status === 401 ? 'Wrong admin key.' : 'Couldn’t delete that comment.');
        });
      });
      head.appendChild(del);
    }
    li.appendChild(head);
    li.appendChild(el('p', 'comment__text', c.text));
    return li;
  }

  function updateCount() {
    const n = commentList.children.length;
    countEl.textContent = n ? `(${n})` : '';
  }

  fetch(`/api/essays/${encodeURIComponent(slug)}/comments`)
    .then(r => r.json())
    .then(comments => {
      comments.forEach(c => commentList.appendChild(renderComment(c)));
      updateCount();
    })
    .catch(() => {});

  form.addEventListener('submit', e => {
    e.preventDefault();
    const button = form.querySelector('button');
    button.disabled = true;
    status.textContent = 'Posting…';
    status.className = 'comment-form__status';
    fetch(`/api/essays/${encodeURIComponent(slug)}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.elements.name.value,
        text: form.elements.text.value,
        website: form.elements.website.value,
      }),
    })
      .then(r => r.json().then(data => ({ ok: r.ok, data })))
      .then(({ ok, data }) => {
        if (!ok) throw new Error(data.error || 'Something went wrong.');
        commentList.appendChild(renderComment(data));
        updateCount();
        form.elements.text.value = '';
        status.textContent = 'Thanks! Your comment is posted.';
      })
      .catch(err => {
        status.textContent = err.message || 'Something went wrong. Try again.';
        status.className = 'comment-form__status comment-form__status--error';
      })
      .finally(() => { button.disabled = false; });
  });
})();
