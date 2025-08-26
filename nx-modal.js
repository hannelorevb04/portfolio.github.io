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

  const titleEl  = modal.querySelector('.nx-title') || modal.querySelector('#nxTitle');
  const metaTxt  = modal.querySelector('.nx-meta') || modal.querySelector('#nxMeta');
  const descEl   = modal.querySelector('.nx-desc') || modal.querySelector('#nxDesc');
  const tagsEl   = modal.querySelector('.nx-taglist') || modal.querySelector('#nxTags');
  const discEl   = modal.querySelector('.nx-discipline') || modal.querySelector('#nxDiscipline');
  const toolsEl  = modal.querySelector('.nx-tools') || modal.querySelector('#nxTools');
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

  
  function buildComparisons(card){
    if (!card || (!leftCol && !tagsEl)) return;
    // remove old comparisons
    const old = modal.querySelectorAll('.nx-compare[data-dynamic]');
    old.forEach(n => n.remove());
    const raw = card.getAttribute('data-compare');
    if (!raw) return;
    let arr = [];
    try { arr = JSON.parse(raw); } catch(e){ arr = []; }
    if (!Array.isArray(arr) || !arr.length) return;

    function makeOne(spec){
      const parts = String(spec||'').split('|');
      const leftSrc  = parts[0] || '';
      const rightSrc = parts[1] || '';
      const leftLbl  = parts[2] || '';
      const rightLbl = parts[3] || '';

      const wrap = DOC.createElement('div');
      wrap.className = 'nx-compare';
      wrap.setAttribute('data-dynamic','');

      const imgR = DOC.createElement('img');
      imgR.className = 'nx-cmp-img nx-cmp-right';
      imgR.src = rightSrc; imgR.alt = rightLbl || 'After';

      const imgL = DOC.createElement('img');
      imgL.className = 'nx-cmp-img nx-cmp-left';
      imgL.src = leftSrc; imgL.alt = leftLbl || 'Before';

      const handle = DOC.createElement('div');
      handle.className = 'nx-cmp-handle';
      const knob = DOC.createElement('div');
      knob.className = 'nx-cmp-knob';
      knob.setAttribute('aria-hidden','true');
      handle.appendChild(knob);

      const lLabel = DOC.createElement('span');
      lLabel.className = 'nx-cmp-label left';
      lLabel.textContent = leftLbl;

      const rLabel = DOC.createElement('span');
      rLabel.className = 'nx-cmp-label right';
      rLabel.textContent = rightLbl;

      wrap.appendChild(imgR);
      wrap.appendChild(imgL);
      wrap.appendChild(handle);
      if (leftLbl) wrap.appendChild(lLabel);
      if (rightLbl) wrap.appendChild(rLabel);

      // interaction
      let dragging = false;
      function setPct(p){
        const pct = Math.max(0, Math.min(100, p));
        imgL.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
        handle.style.left = pct + '%';
        wrap.setAttribute('data-pct', pct.toFixed(2));
      }
      function eventPct(ev){
        const rect = wrap.getBoundingClientRect();
        const x = (ev.touches && ev.touches[0] ? ev.touches[0].clientX : ev.clientX) - rect.left;
        return (x / rect.width) * 100;
      }
      wrap.addEventListener('mousedown', (e)=>{ dragging=true; setPct(eventPct(e)); });
      wrap.addEventListener('mousemove', (e)=>{ if(dragging) setPct(eventPct(e)); });
      wrap.addEventListener('mouseup',   ()=> dragging=false);
      wrap.addEventListener('mouseleave',()=> dragging=false);
      wrap.addEventListener('touchstart',(e)=>{ dragging=true; setPct(eventPct(e)); }, {passive:true});
      wrap.addEventListener('touchmove', (e)=>{ if(dragging) setPct(eventPct(e)); }, {passive:true});
      wrap.addEventListener('touchend',  ()=> dragging=false);
      wrap.addEventListener('dblclick',  ()=> setPct(50));

      wrap.tabIndex = 0;
      wrap.addEventListener('keydown', (e)=>{
        if (e.key === 'ArrowLeft')  { setPct((+wrap.getAttribute('data-pct')||50) - 2); e.preventDefault(); }
        if (e.key === 'ArrowRight') { setPct((+wrap.getAttribute('data-pct')||50) + 2); e.preventDefault(); }
        if (e.key === 'Home') { setPct(0); e.preventDefault(); }
        if (e.key === 'End')  { setPct(100); e.preventDefault(); }
        if (e.key === ' ' || e.key === 'Spacebar') { setPct(50); e.preventDefault(); }
      });

      setPct(50);
      return wrap;
    }

    // insert each comparison directly after tags, or at end of left column
    let anchor = tagsEl || leftCol;
    if (!anchor) return;
    let last = tagsEl;
    arr.forEach(spec => {
      const node = makeOne(spec);
      if (!node) return;
      if (last) {
        last.insertAdjacentElement('afterend', node);
      } else {
        anchor.appendChild(node);
      }
      last = node;
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
    const __discVal = card.getAttribute('data-discipline') || '—';
    if (discEl) discEl.textContent = __discVal; else addSpecBlock('DISCIPLINE', __discVal);
    const __toolsVal = card.getAttribute('data-tools') || '';
    if (toolsEl) toolsEl.textContent = __toolsVal; else addSpecBlock('TOOLS', __toolsVal);

    buildComparisons(card);

    if (tagsEl) {
      tagsEl.innerHTML = '';
      parseList(card.getAttribute('data-tags')).forEach(t => {
        const span = DOC.createElement('span');
        span.className = 'nx-tag';
        span.textContent = t;
        tagsEl.appendChild(span);
      });
    }

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