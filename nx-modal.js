/* nx-modal.js — v12.1: class‑based selectors to match markup */
(function () {
  const DOC = document;
  const modal = DOC.getElementById('nxModal');
  if (!modal) return;

  // Elements (use CLASSES, not IDs, to match the HTML)
  const slidesEl = modal.querySelector('.nx-slides');
  const prevBtn  = modal.querySelector('.nx-nav.prev');
  const nextBtn  = modal.querySelector('.nx-nav.next');
  const dotsEl   = modal.querySelector('.nx-dots');

  const titleEl  = modal.querySelector('.nx-title');
  const metaTxt  = modal.querySelector('.nx-meta');
  const descEl   = modal.querySelector('.nx-desc');
  const tagsEl   = modal.querySelector('.nx-taglist');
  const discEl   = modal.querySelector('.nx-discipline');
  const toolsEl  = modal.querySelector('.nx-tools');
  const primary  = modal.querySelector('.nx-primary');
  const actions  = modal.querySelector('.nx-actions');
  const rightCol = modal.querySelector('.nx-right');
  const leftCol  = modal.querySelector('.nx-left');

  let idx = 0, total = 0, autoTimer = null;
  const AUTO_MS = 3800;

  function setNavVisible(show) {
    if (prevBtn) prevBtn.style.display = show ? '' : 'none';
    if (nextBtn) nextBtn.style.display = show ? '' : 'none';
    if (dotsEl)  dotsEl.style.display  = show ? '' : 'none';
  }
  function clearAuto() { if (autoTimer) { clearInterval(autoTimer); autoTimer = null; } }
  function startAuto() { clearAuto(); if (total > 1) autoTimer = setInterval(next, AUTO_MS); }

  function tryJSON(s, fallback){
    if (!s) return fallback;
    try { const x = JSON.parse(s); return x; } catch { return fallback; }
  }
  function parseList(raw){
    if (!raw) return [];
    const j = tryJSON(raw, null);
    if (Array.isArray(j)) return j;
    return String(raw).split(',').map(t=>t.trim()).filter(Boolean);
  }
  function parseSlides(card) {
    const raw = card.getAttribute('data-slides') || '[]';
    try {
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch { return []; }
  }
  function wipe(el){ if (el) el.innerHTML = ''; }

  function buildSlides(sources) {
    if (!slidesEl) return;
    slidesEl.innerHTML = '';
    if (dotsEl) dotsEl.innerHTML = '';
    total = Math.max(1, sources.length);

    sources.forEach((src, i) => {
      const s = String(src || '');
      const wrap = DOC.createElement('div');
      wrap.className = 'nx-slide' + (i === 0 ? ' is-active' : '');

      if (s.startsWith('iframe:')) {
        const ifr = DOC.createElement('iframe');
        ifr.src = s.replace('iframe:', '');
        ifr.title = 'Project';
        ifr.setAttribute('frameborder','0');
        ifr.setAttribute('loading','eager');
        ifr.style.width = '100%';
        ifr.style.height = '100%';
        wrap.appendChild(ifr);
      } else if (s) {
        const img = DOC.createElement('img');
        img.src = s;
        img.alt = 'Slide ' + (i + 1);
        img.className = 'nx-hero-img';
        wrap.appendChild(img);
      }
      slidesEl.appendChild(wrap);
    });

    if (dotsEl && total > 1) {
      for (let i = 0; i < total; i++) {
        const dot = DOC.createElement('button');
        dot.className = 'nx-dot' + (i === 0 ? ' is-active' : '');
        dot.type = 'button';
        dot.addEventListener('click', () => { goTo(i); startAuto(); });
        dotsEl.appendChild(dot);
      }
    }
    setNavVisible(total > 1);
    idx = 0;
    startAuto();
  }

  function goTo(n) {
    if (!slidesEl) return;
    const slides = Array.from(slidesEl.children);
    const dots   = dotsEl ? Array.from(dotsEl.children) : [];
    if (!slides.length) return;
    if (slides[idx]) slides[idx].classList.remove('is-active');
    if (dots[idx])   dots[idx].classList.remove('is-active');
    idx = (n + total) % total;
    if (slides[idx]) slides[idx].classList.add('is-active');
    if (dots[idx])   dots[idx].classList.add('is-active');
  }
  function next(){ goTo(idx + 1); }
  function prev(){ goTo(idx - 1); }

  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAuto(); });

  const slider = modal.querySelector('.nx-hero-slider') || modal;
  slider.addEventListener('mouseenter', clearAuto);
  slider.addEventListener('mouseleave', startAuto);

  function addSpecBlock(title, value){
    if (!value || !rightCol) return null;
    const spec = DOC.createElement('div');
    spec.className = 'nx-spec';
    spec.setAttribute('data-dynamic','');
    const h = DOC.createElement('div');
    h.className = 'nx-spec-title';
    h.textContent = title;
    const ul = DOC.createElement('ul');
    ul.className = 'nx-spec-list';
    const li = DOC.createElement('li');
    li.textContent = value;
    ul.appendChild(li);
    spec.appendChild(h); spec.appendChild(ul);
    rightCol.appendChild(spec);
    return spec;
  }

  function addListSection(title, items){
    if (!items || !items.length || !leftCol) return null;
    const h = DOC.createElement('h3');
    h.className = 'nx-h3';
    h.textContent = title;
    h.setAttribute('data-dynamic','');

    const ul = DOC.createElement('ul');
    ul.className = 'nx-list';
    ul.setAttribute('data-dynamic','');
    items.forEach(t => {
      const li = DOC.createElement('li');
      li.textContent = (typeof t === 'string') ? t : (t.label || '');
      ul.appendChild(li);
    });
    leftCol.appendChild(h);
    leftCol.appendChild(ul);
    return ul;
  }

  function addLinks(links){
    if (!actions) return;
    Array.from(actions.querySelectorAll('[data-dynamic]')).forEach(n=>n.remove());
    if (!Array.isArray(links) || !links.length) return;
    links.forEach(l => {
      const a = DOC.createElement('a');
      a.className = 'nx-btn nx-ghost';
      a.setAttribute('data-dynamic','');
      a.target = '_blank';
      a.rel = 'noopener';
      a.href = l.url || l.href || '#';
      a.textContent = l.label || l.title || 'Link';
      actions.appendChild(a);
    });
  }

  function openModal(card) {
    if (!modal) return;

    if (rightCol) Array.from(rightCol.querySelectorAll('[data-dynamic]')).forEach(n=>n.remove());
    if (leftCol)  Array.from(leftCol.querySelectorAll('[data-dynamic]')).forEach(n=>n.remove());

    if (titleEl) titleEl.textContent = card.getAttribute('data-title') || 'Untitled';
    const meta = card.getAttribute('data-meta') || '';
    if (metaTxt) {
      const metaSpan = metaTxt.querySelector('.nx-meta-text') || metaTxt.querySelectorAll('span')[1];
      if (metaSpan) metaSpan.textContent = meta;
    }
    if (descEl)  descEl.textContent  = card.getAttribute('data-desc') || '';
    if (discEl)  discEl.textContent  = card.getAttribute('data-discipline') || '—';
    if (toolsEl) toolsEl.textContent = card.getAttribute('data-tools') || '';

    if (tagsEl) {
      tagsEl.innerHTML = '';
      parseList(card.getAttribute('data-tags')).forEach(t => {
        const span = DOC.createElement('span');
        span.className = 'nx-tag';
        span.textContent = t;
        tagsEl.appendChild(span);
      });
    }
  /* === Comparison Slider (under tags) === */
  (function buildComparisons(){
    const raw = card.getAttribute('data-compare') || '[]';
    let pairs = [];
    try { const j = JSON.parse(raw); if (Array.isArray(j)) pairs = j; } catch {}
    if (!pairs.length || !leftCol) return;
    const host = DOC.createElement('div');
    host.className = 'nx-compare-wrap';
    if (tagsEl && tagsEl.parentNode === leftCol) {
      tagsEl.insertAdjacentElement('afterend', host);
    } else {
      leftCol.appendChild(host);
    }
    pairs.forEach((p) => {
      const parts = String(p||'').split('|');
      const a = parts[0] || '';
      const b = parts[1] || '';
      const la = parts[2] || 'Before';
      const lb = parts[3] || 'After';
      const box = DOC.createElement('div');
      box.className = 'nx-compare';
      const bottom = DOC.createElement('img');
      bottom.src = b; bottom.alt = lb; bottom.className = 'nx-cmp-img nx-cmp-bottom';
      const top = DOC.createElement('img');
      top.src = a; top.alt = la; top.className = 'nx-cmp-img nx-cmp-top';
      const handle = DOC.createElement('div');
      handle.className = 'nx-cmp-handle';
      const range = DOC.createElement('input');
      range.type = 'range'; range.min = '0'; range.max = '100'; range.value = '50';
      range.className = 'nx-cmp-range';
      range.setAttribute('aria-label','Image comparison slider');
      const labelL = DOC.createElement('span'); labelL.className = 'nx-cmp-label left'; labelL.textContent = la;
      const labelR = DOC.createElement('span'); labelR.className = 'nx-cmp-label right'; labelR.textContent = lb;
      box.appendChild(bottom);
      box.appendChild(top);
      box.appendChild(handle);
      box.appendChild(range);
      box.appendChild(labelL);
      box.appendChild(labelR);
      function updateClip(pct){
        pct = Math.max(0, Math.min(100, parseInt(pct||'50',10)));
        top.style.clipPath = 'inset(0 ' + (100-pct) + '% 0 0)';
        handle.style.left = pct + '%';
      }
      range.addEventListener('input', e => updateClip(e.target.value));
      box.addEventListener('pointerdown', (e)=>{
        const rect = box.getBoundingClientRect();
        const pct = ((e.clientX - rect.left) / rect.width) * 100;
        updateClip(pct);
      });
      updateClip(50);
      host.appendChild(box);
    });
  })();


    addSpecBlock('YEAR',      card.getAttribute('data-year'));
    addSpecBlock('ROLE',      card.getAttribute('data-role'));
    addSpecBlock('TEAM',      card.getAttribute('data-team'));
    addSpecBlock('CLIENT',    card.getAttribute('data-client'));
    addSpecBlock('DURATION',  card.getAttribute('data-duration'));

    addListSection('Highlights', parseList(card.getAttribute('data-highlights')));
    addListSection('Outcomes',   parseList(card.getAttribute('data-outcomes')));

    const links = tryJSON(card.getAttribute('data-links') || '[]', []);
    addLinks(links);

    const slides = parseSlides(card);
    if (primary) {
      const first = slides[0] || '';
      primary.onclick = () => {
        const live = (Array.isArray(links) ? links.find(l => /live|demo|site/i.test(l.label||'')) : null) || null;
        if (live && live.url) { window.open(live.url, '_blank', 'noopener'); return; }
        if (typeof first === 'string' && first.startsWith('iframe:')) {
          window.open(first.replace('iframe:', ''), '_blank', 'noopener');
        }
      };
    }

    buildSlides(slides);

    modal.style.display = 'flex';
    DOC.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.style.display = 'none';
    DOC.body.style.overflow = '';
    if (slidesEl) slidesEl.innerHTML = '';
    if (dotsEl) dotsEl.innerHTML = '';
    clearAuto();
  }

  const closeBtn = modal.querySelector('.nx-close');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  // Delegated open on any .project-card click (avoid links/buttons)
  DOC.addEventListener('click', (e) => {
    const t = e.target;
    if (!t.closest) return;
    if (t.closest('a,button')) return;
    const card = t.closest('.project-card');
    if (!card) return;
    openModal(card);
  });
})();