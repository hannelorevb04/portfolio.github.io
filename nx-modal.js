/* nx-modal.js — v29: robust modal, slides + comparisons, tags at bottom */
(function(){
  const DOC = document;
  const modal = DOC.getElementById('nxModal');
  if (!modal) return;

  // Modal elements
  const slidesEl = modal.querySelector('.nx-slides');
  const dotsEl   = modal.querySelector('.nx-dots');
  const prevBtn  = modal.querySelector('.nx-nav.prev');
  const nextBtn  = modal.querySelector('.nx-nav.next');
  const titleEl  = modal.querySelector('.nx-title') || modal.querySelector('#nxTitle');
  const metaTxt  = modal.querySelector('.nx-meta .nx-meta-text') || modal.querySelector('#nxMeta');
  const descEl   = modal.querySelector('.nx-desc') || modal.querySelector('#nxDesc');
  const tagsEl   = modal.querySelector('.nx-taglist') || modal.querySelector('#nxTags');
  const leftCol  = modal.querySelector('.nx-left');
  const rightDis = modal.querySelector('.nx-discipline') || modal.querySelector('#nxDiscipline');
  const rightTools = modal.querySelector('.nx-tools') || modal.querySelector('#nxTools');
  const cmpContainer = modal.querySelector('.nx-comparisons') || null;

  const closeBtn = modal.querySelector('.nx-close');
  let idx = 0, total = 0;

  // Utility
  function wipe(el){ if (el) el.innerHTML = ''; }
  function tryJSON(s){
    try { return JSON.parse(s); } catch { return null; }
  }

  // Build SLIDES from card
  function extractSlides(card){
    // 1) data-slides
    const raw = card.getAttribute('data-slides');
    if (raw){
      const arr = tryJSON(raw);
      if (Array.isArray(arr) && arr.length) return arr;
    }
    // 2) inline slideshow images
    const inlineImgs = card.querySelectorAll('.slideshow-container .slides img');
    if (inlineImgs.length){
      return Array.from(inlineImgs).map(img => img.getAttribute('src'));
    }
    // 3) fallback first image in card
    const firstImg = card.querySelector('img');
    if (firstImg) return [ firstImg.getAttribute('src') ];
    return [];
  }

  function buildSlides(arr){
    wipe(slidesEl); if (dotsEl) wipe(dotsEl);
    total = Array.isArray(arr) ? arr.length : 0;
    arr.forEach((src, i) => {
      const wrap = DOC.createElement('div');
      wrap.className = 'nx-slide' + (i===0 ? ' is-active' : '');
      const img = DOC.createElement('img');
      img.loading = 'lazy';
      img.alt = titleEl ? (titleEl.textContent || 'Slide') : 'Slide';
      img.src = src;
      wrap.appendChild(img);
      slidesEl.appendChild(wrap);
      if (dotsEl && total > 1){
        const dot = DOC.createElement('button');
        dot.type = 'button';
        dot.className = 'nx-dot' + (i===0 ? ' is-active' : '');
        dot.addEventListener('click', ()=> goTo(i));
        dotsEl.appendChild(dot);
      }
    });
    setNavVisible(total > 1);
    idx = 0;
  }

  function setNavVisible(show){
    if (prevBtn) prevBtn.style.display = show ? '' : 'none';
    if (nextBtn) nextBtn.style.display = show ? '' : 'none';
    if (dotsEl)  dotsEl.style.display  = show ? '' : 'none';
  }

  function goTo(n){
    if (!slidesEl) return;
    const slides = Array.from(slidesEl.children);
    const dots   = dotsEl ? Array.from(dotsEl.children) : [];
    if (!slides.length) return;
    slides[idx] && slides[idx].classList.remove('is-active');
    dots[idx]   && dots[idx].classList.remove('is-active');
    idx = (n + total) % total;
    slides[idx] && slides[idx].classList.add('is-active');
    dots[idx]   && dots[idx].classList.add('is-active');
  }
  function next(){ goTo(idx+1); }
  function prev(){ goTo(idx-1); }

  if (prevBtn) prevBtn.addEventListener('click', next);
  if (nextBtn) nextBtn.addEventListener('click', next);

  // Build INFO (title, meta, desc, tags, right specs)
  function fillInfo(card){
    const title = card.getAttribute('data-title') || card.querySelector('.project-title')?.textContent || '';
    const meta  = card.getAttribute('data-meta')  || '';
    const desc  = card.getAttribute('data-desc')  || '';
    const tags  = card.getAttribute('data-tags');
    const tools = card.getAttribute('data-tools') || '';
    const disc  = card.getAttribute('data-discipline') || '';

    if (titleEl) titleEl.textContent = title || 'Project';
    if (metaTxt) metaTxt.textContent = meta || '';
    if (descEl)  descEl.textContent  = desc || '';

    if (rightDis) rightDis.textContent = disc || '—';
    if (rightTools) rightTools.textContent = tools || '—';

    // Tags
    if (tagsEl){
      wipe(tagsEl);
      let arr = [];
      const parsed = tryJSON(tags);
      if (Array.isArray(parsed)) arr = parsed;
      else if (typeof tags === 'string' && tags) arr = tags.split(',').map(s=>s.trim()).filter(Boolean);
      arr.forEach(t => {
        const s = DOC.createElement('span');
        s.className = 'nx-tag';
        s.textContent = t;
        tagsEl.appendChild(s);
      });
    }
  }

  // Build COMPARISON sliders under .nx-comparisons (or after tags if container missing)
  function buildComparisons(card){
    const raw = card.getAttribute('data-compare');
    const arr = raw ? tryJSON(raw) : null;
    const list = Array.isArray(arr) ? arr : [];
    const target = cmpContainer || tagsEl || leftCol;
    if (!target) return;

    // Remove existing dynamic comparisons
    const old = target.querySelectorAll('.nx-compare[data-dynamic]');
    old.forEach(n => n.remove());

    list.forEach(spec => {
      const parts = String(spec).split('|');
      const left  = (parts[0] || '').trim();
      const right = (parts[1] || '').trim();
      const lLab  = (parts[2] || '').trim();
      const rLab  = (parts[3] || '').trim();
      if (!left || !right) return;

      const w = DOC.createElement('div');
      w.className = 'nx-compare';
      w.setAttribute('data-dynamic','');

      const imgR = DOC.createElement('img'); // bottom (right)
      imgR.className = 'nx-cmp-img right';
      imgR.src = right; imgR.alt = rLab || 'After';

      const imgL = DOC.createElement('img'); // top (left)
      imgL.className = 'nx-cmp-img left';
      imgL.src = left; imgL.alt = lLab || 'Before';
      imgL.style.clipPath = 'inset(0 50% 0 0)';

      const handle = DOC.createElement('div');
      handle.className = 'nx-cmp-handle';
      const knob = DOC.createElement('div');
      knob.className = 'nx-cmp-knob';
      handle.appendChild(knob);

      if (lLab){
        const lbl = DOC.createElement('span');
        lbl.className = 'nx-cmp-label left';
        lbl.textContent = lLab;
        w.appendChild(lbl);
      }
      if (rLab){
        const lbl = DOC.createElement('span');
        lbl.className = 'nx-cmp-label right';
        lbl.textContent = rLab;
        w.appendChild(lbl);
      }

      w.appendChild(imgR);
      w.appendChild(imgL);
      w.appendChild(handle);

      // interactions (swipe / click)
      let pct = 50, dragging = false;
      function setPct(p){
        pct = Math.max(0, Math.min(100, p));
        imgL.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
        handle.style.left = pct + '%';
        w.setAttribute('data-pct', pct.toFixed(2));
      }
      function xyPct(clientX){
        const rect = w.getBoundingClientRect();
        return ((clientX - rect.left) / rect.width) * 100;
      }
      function onDown(e){ dragging = true; const x = e.touches ? e.touches[0].clientX : e.clientX; setPct(xyPct(x)); }
      function onMove(e){ if(!dragging) return; const x = e.touches ? e.touches[0].clientX : e.clientX; setPct(xyPct(x)); }
      function onUp(){ dragging = false; }

      w.addEventListener('mousedown', onDown);
      w.addEventListener('mousemove', onMove);
      w.addEventListener('mouseup', onUp);
      w.addEventListener('mouseleave', onUp);
      w.addEventListener('touchstart', onDown, {passive:true});
      w.addEventListener('touchmove', onMove, {passive:true});
      w.addEventListener('touchend', onUp);
      w.addEventListener('dblclick', ()=> setPct(50));
      w.tabIndex = 0;
      w.addEventListener('keydown', (e)=>{
        if (e.key === 'ArrowLeft')  { setPct(pct - 2); e.preventDefault(); }
        if (e.key === 'ArrowRight') { setPct(pct + 2); e.preventDefault(); }
        if (e.key === 'Home') { setPct(0); e.preventDefault(); }
        if (e.key === 'End')  { setPct(100); e.preventDefault(); }
        if (e.key === ' ' || e.key === 'Spacebar') { setPct(50); e.preventDefault(); }
      });

      (cmpContainer || leftCol || tagsEl).appendChild(w);
      // ensure tags end up below comparisons (your HTML already places nx-comparisons above nx-taglist)
    });
  }

  // OPEN / CLOSE
  function openFromCard(card){
    // Fill content
    fillInfo(card);
    buildSlides(extractSlides(card));
    buildComparisons(card);
    // Show modal
    modal.style.display = 'flex';
    DOC.body.style.overflow = 'hidden';
    idx = 0; // ensure first slide
    goTo(0);
  }
  function closeModal(){
    modal.style.display = 'none';
    DOC.body.style.overflow = '';
    // cleanup dynamic slides/comparisons
    wipe(slidesEl);
    if (dotsEl) wipe(dotsEl);
    if (cmpContainer){
      const old = cmpContainer.querySelectorAll('.nx-compare[data-dynamic]');
      old.forEach(n => n.remove());
    }
  }
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e)=>{
    if (e.target === modal) closeModal();
  });
  window.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape' && modal.style.display !== 'none') closeModal();
  });

  // Bind all project cards
  function bindCards(){
    const cards = Array.from(DOC.querySelectorAll('.project-card'));
    cards.forEach(card => {
      card.style.cursor = 'pointer';
      card.addEventListener('click', (e)=>{
        // ignore clicks on inline slideshow arrows (if any)
        const target = e.target;
        if (target.closest('.slideshow-container .prev') || target.closest('.slideshow-container .next')) return;
        openFromCard(card);
      });
    });
  }
  bindCards();
})();