/* nx-modal.js — rebuilt clean v15 */
(function(){
  const DOC = document;
  const modal = DOC.getElementById('nxModal');
  if (!modal) return;
  const slidesEl = modal.querySelector('.nx-slides');
  const prevBtn  = modal.querySelector('.nx-nav.prev');
  const nextBtn  = modal.querySelector('.nx-nav.next');
  const dotsEl   = modal.querySelector('.nx-dots');
  const titleEl  = modal.querySelector('.nx-title');
  const metaEl   = modal.querySelector('.nx-meta .nx-meta-text') || modal.querySelector('.nx-meta');
  const descEl   = modal.querySelector('.nx-desc');
  const tagsEl   = modal.querySelector('.nx-taglist');
  const leftCol  = modal.querySelector('.nx-left');

  let current = 0;
  let total = 0;
  let slideNodes = [];

  function wipeDynamic(){
    if (slidesEl) slidesEl.innerHTML = '';
    if (dotsEl) dotsEl.innerHTML = '';
    // remove any previously injected comparison blocks
    modal.querySelectorAll('[data-dynamic]').forEach(el => el.remove());
  }

  function collectCardSlides(card){
    const imgs = Array.from(card.querySelectorAll('.slides img'));
    if (imgs.length) return imgs.map(img => ({src: img.getAttribute('src'), alt: img.getAttribute('alt')||''}));
    // fallback: data-slides attribute (string array or simple csv), tolerant
    let raw = card.getAttribute('data-slides') || '[]';
    try {
      const arr = JSON.parse(raw);
      return arr.filter(x => typeof x === 'string' && !x.startsWith('iframe:')).map(src => ({src, alt:''}));
    } catch(e){
      return [];
    }
  }

  function baseDirFrom(src){
    if (!src) return '';
    const i = src.lastIndexOf('/');
    return i >= 0 ? src.slice(0, i+1) : '';
  }

  function buildSlides(sources){
    if (!slidesEl) return;
    slideNodes = sources.map((s, idx) => {
      const img = DOC.createElement('img');
      img.className = 'nx-slide';
      img.alt = s.alt || '';
      img.src = s.src;
      img.style.opacity = idx === 0 ? '1' : '0';
      slidesEl.appendChild(img);
      return img;
    });
    total = slideNodes.length;
    if (dotsEl && total > 1){
      for (let i=0;i<total;i++){
        const b = DOC.createElement('button');
        b.className = 'nx-dot' + (i===0?' active':'');
        b.setAttribute('type','button');
        b.addEventListener('click', ()=>go(i));
        dotsEl.appendChild(b);
      }
    }
    if (prevBtn) prevBtn.onclick = ()=>go(current-1);
    if (nextBtn) nextBtn.onclick = ()=>go(current+1);
  }

  function go(i){
    if (!slideNodes.length) return;
    const n = (i + slideNodes.length) % slideNodes.length;
    slideNodes[current].style.opacity = '0';
    slideNodes[n].style.opacity = '1';
    if (dotsEl){
      const ds = dotsEl.querySelectorAll('.nx-dot');
      ds[current]?.classList.remove('active');
      ds[n]?.classList.add('active');
    }
    current = n;
  }

  /** Image Comparison (swipe / drag only) */
  function createCompareSlider(spec){
    const wrap = DOC.createElement('div');
    wrap.className = 'nx-compare';
    wrap.setAttribute('data-dynamic','');
    // images
    const imgB = DOC.createElement('img'); // bottom (after)
    imgB.className = 'nx-cmp-img nx-cmp-bottom';
    imgB.src = spec.b; imgB.alt = spec.lb || 'After';
    const imgA = DOC.createElement('img'); // top (before)
    imgA.className = 'nx-cmp-img nx-cmp-top';
    imgA.src = spec.a; imgA.alt = spec.la || 'Before';
    // handle
    const handle = DOC.createElement('div');
    handle.className = 'nx-cmp-handle';
    const knob = DOC.createElement('div');
    knob.className = 'nx-cmp-knob';
    knob.setAttribute('aria-label','Drag to compare');
    knob.setAttribute('role','separator');
    handle.appendChild(knob);
    // labels (optional)
    if (spec.la || spec.lb){
      const la = DOC.createElement('span');
      la.className = 'nx-cmp-label left'; la.textContent = spec.la||'';
      const lb = DOC.createElement('span');
      lb.className = 'nx-cmp-label right'; lb.textContent = spec.lb||'';
      wrap.appendChild(la); wrap.appendChild(lb);
    }
    wrap.appendChild(imgB);
    wrap.appendChild(imgA);
    wrap.appendChild(handle);

    let pct = 50;
    function apply(){
      imgA.style.clipPath = 'inset(0 ' + (100-pct) + '% 0 0)';
      handle.style.left = pct + '%';
    }
    apply();

    function setFromX(clientX){
      const rect = wrap.getBoundingClientRect();
      const x = Math.max(rect.left, Math.min(clientX, rect.right));
      pct = Math.round(((x - rect.left) / rect.width) * 100);
      apply();
    }
    let dragging = false;
    function down(ev){
      dragging = true;
      const c = ('touches' in ev ? ev.touches[0].clientX : ev.clientX);
      setFromX(c);
      ev.preventDefault();
    }
    function move(ev){
      if (!dragging) return;
      const c = ('touches' in ev ? ev.touches[0].clientX : ev.clientX);
      setFromX(c);
    }
    function up(){ dragging = false; }

    wrap.addEventListener('mousedown', down);
    DOC.addEventListener('mousemove', move);
    DOC.addEventListener('mouseup', up);
    wrap.addEventListener('touchstart', down, {passive:false});
    DOC.addEventListener('touchmove', move, {passive:false});
    DOC.addEventListener('touchend', up);

    // Click to jump
    wrap.addEventListener('click', (e)=>{
      if (dragging) return;
      setFromX(e.clientX);
    });

    return wrap;
  }

  function injectComparisons(card){
    if (!leftCol) return;
    // Decide comparisons: prefer data-compare JSON; else known fallback for united colors
    let list = [];
    // Try attribute first
    const raw = card.getAttribute('data-compare');
    if (raw && raw.indexOf('...') === -1){ // ignore truncated
      try {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)){
          list = arr.map(it => Array.isArray(it) ? {a: it[0], b: it[1], la: it[2]||'', lb: it[3]||''} : it);
        }
      } catch(e){ /* ignore */ }
    }
    // Fallback for united colors
    if (!list.length && (card.id === 'unitedColorsCard' || /United colors/i.test(card.getAttribute('data-title')||''))){
      // base dir from first slide
      const slides = collectCardSlides(card);
      const base = baseDirFrom(slides[0]?.src || '');
      function p(name){ return base ? (base + name) : name; }
      list = [
        { a: p('court_1_brown_eyes.jpg'), b: p('CourtneyCox.webp'), la:'Brown eyes', lb:'Blue eyes' },
        { a: p('JenniferAnistonHWoFFeb2012.jpg'), b: p('jen_2_hair_pink.png'), la:'Original', lb:'Pink hair' },
        { a: p('Smurf_grey.jpg'), b: p('Smurf_grey - kopie.jpg'), la:'Grey', lb:'Blue' },
      ];
    }
    if (!list.length) return;

    const stack = DOC.createElement('div');
    stack.className = 'nx-compare-stack';
    stack.setAttribute('data-dynamic','');
    list.forEach(spec => stack.appendChild(createCompareSlider(spec)));

    // insert after taglist (if present), else at end of left column
    if (tagsEl && tagsEl.parentNode){
      tagsEl.parentNode.insertBefore(stack, tagsEl.nextSibling);
    } else {
      leftCol.appendChild(stack);
    }
  }

  function openModal(card){
    wipeDynamic();
    // Fill basics
    if (titleEl) titleEl.textContent = card.getAttribute('data-title') || (card.querySelector('.text .div') && card.querySelector('.text .div').textContent) || 'Project';
    if (metaEl){
      const disc = card.getAttribute('data-discipline') || 'Project';
      metaEl.textContent = disc;
    }
    if (descEl) descEl.textContent = card.getAttribute('data-desc') || '';

    // Slides (from images inside card)
    const sources = collectCardSlides(card);
    buildSlides(sources);
    current = 0;
    go(0);

    // Tags: read from data-tags (comma or JSON) if present
    const tagsRaw = card.getAttribute('data-tags') || '[]';
    if (tagsEl){
      tagsEl.innerHTML = '';
      let tags = [];
      try { const arr = JSON.parse(tagsRaw); if (Array.isArray(arr)) tags = arr; } catch(e){
        tags = tagsRaw.split(',').map(s => s.trim()).filter(Boolean);
      }
      tags.forEach(t => {
        const span = DOC.createElement('span');
        span.className = 'nx-chip';
        span.textContent = t;
        tagsEl.appendChild(span);
      });
    }

    // Comparisons
    injectComparisons(card);

    // Show modal
    modal.style.display = 'block';
    DOC.body.style.overflow = 'hidden';
  }

  function closeModal(){
    modal.style.display = 'none';
    DOC.body.style.overflow = '';
  }

  const closeBtn = modal.querySelector('.nx-close');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e)=>{ if (e.target === modal) closeModal(); });

  // Delegate clicks on .project-card (ignore links/buttons)
  DOC.addEventListener('click', (e)=>{
    const t = e.target;
    if (!t.closest) return;
    if (t.closest('a,button')) return;
    const card = t.closest('.project-card');
    if (!card) return;
    openModal(card);
  });
})();