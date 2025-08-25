/* nx-modal.js — v23 (single-image hero + comparisons) */
(function(){
  const DOC = document;
  const modal = DOC.getElementById('nxModal');
  if (!modal) return;

  // Modal UI refs
  const slidesEl = modal.querySelector('.nx-slides');
  const prevBtn  = modal.querySelector('.nx-nav.prev');
  const nextBtn  = modal.querySelector('.nx-nav.next');
  const dotsEl   = modal.querySelector('.nx-dots');

  const titleEl  = modal.querySelector('.nx-title');
  const metaTxt  = modal.querySelector('.nx-meta .nx-meta-text');
  const descEl   = modal.querySelector('.nx-desc');
  const tagsEl   = modal.querySelector('.nx-taglist');
  const discEl   = modal.querySelector('.nx-discipline');
  const toolsEl  = modal.querySelector('.nx-tools');
  const actions  = modal.querySelector('.nx-actions');
  const leftCol  = modal.querySelector('.nx-left');

  let idx=0, total=0;

  function parseList(raw){
    if (!raw) return [];
    try { const j = JSON.parse(raw); if (Array.isArray(j)) return j; } catch {}
    return String(raw).split(',').map(s=>s.trim()).filter(Boolean);
  }

  function clearSlides(){
    slidesEl.innerHTML='';
    dotsEl.innerHTML='';
    idx=0; total=0;
  }

  function buildSlidesFromCard(card){
    clearSlides();

    // 1) Prefer explicit data-slides
    let slides = parseList(card.getAttribute('data-slides'));

    // 2) Fallback: small slideshow thumbnails inside the card
    if (!slides.length){
      const thumbs = card.querySelectorAll('.slideshow-container .slides img[src]');
      slides = Array.from(thumbs).map(img => img.getAttribute('src'));
    }

    // 3) Final fallback: the main card image (even if only 1)
    if (!slides.length){
      const mainImg = card.querySelector('img.image, .overlap-group img, img');
      if (mainImg && mainImg.getAttribute('src')) slides = [ mainImg.getAttribute('src') ];
    }

    total = slides.length;

    slides.forEach((src, i)=>{
      const wrap = DOC.createElement('div');
      wrap.className = 'nx-slide' + (i===0 ? ' is-active' : '');

      if (src && String(src).startsWith('iframe:')){
        const ifr = DOC.createElement('iframe');
        ifr.src = src.replace(/^iframe:/,'');
        ifr.setAttribute('frameborder','0');
        ifr.loading = 'eager';
        ifr.style.width='100%'; ifr.style.height='100%';
        wrap.appendChild(ifr);
      } else {
        const img = DOC.createElement('img');
        img.src = src;
        img.alt = 'Slide '+(i+1);
        img.className = 'nx-hero-img';
        wrap.appendChild(img);
      }
      slidesEl.appendChild(wrap);
    });

    if (total>1){
      for (let i=0;i<total;i++){
        const b = DOC.createElement('button');
        b.type='button'; b.className='nx-dot'+(i===0?' is-active':'');
        b.addEventListener('click', ()=>goTo(i));
        dotsEl.appendChild(b);
      }
      prevBtn.style.display = nextBtn.style.display = '';
      dotsEl.style.display='';
    } else {
      prevBtn.style.display = nextBtn.style.display = 'none';
      dotsEl.style.display='none';
    }
  }

  function goTo(n){
    if (n<0) n = total-1;
    if (n>=total) n = 0;
    const slides = slidesEl.querySelectorAll('.nx-slide');
    slides.forEach((el,i)=> el.classList.toggle('is-active', i===n) );
    const dots = dotsEl.querySelectorAll('.nx-dot');
    dots.forEach((el,i)=> el.classList.toggle('is-active', i===n) );
    idx = n;
  }
  function next(){ goTo(idx+1); }
  function prev(){ goTo(idx-1); }
  prevBtn?.addEventListener('click', prev);
  nextBtn?.addEventListener('click', next);

  // TAGS
  function renderTags(card){
    if (!tagsEl) return;
    tagsEl.innerHTML='';
    parseList(card.getAttribute('data-tags')).forEach(t=>{
      const span = DOC.createElement('span');
      span.className = 'nx-tag';
      span.textContent = t;
      tagsEl.appendChild(span);
    });
  }

  // ACTION BUTTONS
  function renderActions(card){
    Array.from(actions.querySelectorAll('[data-dynamic]')).forEach(n=>n.remove());
    const links = parseList(card.getAttribute('data-links'));
    if (!links.length) return;
    links.forEach(json => {
      let data=null; try{ data = JSON.parse(json); }catch{}
      const a = DOC.createElement('a');
      a.className='nx-btn nx-ghost'; a.setAttribute('data-dynamic','');
      a.target='_blank'; a.rel='noopener';
      a.href = data?.url || data?.href || '#';
      a.textContent = data?.label || data?.title || 'Open';
      actions.appendChild(a);
    });
  }

  // COMPARISONS
  function parseCompare(card){
    const raw = card.getAttribute('data-compare');
    const list = parseList(raw);
    const pairs = [];
    list.forEach(s=>{
      if (!s) return;
      s = String(s).replace(/^compare:/,'');
      const parts = s.split('|');
      if (parts.length >= 2){
        pairs.push({
          a: parts[0].trim(),
          b: parts[1].trim(),
          la: (parts[2]||'Before').trim(),
          lb: (parts[3]||'After').trim(),
        });
      }
    });
    return pairs;
  }

  function renderComparisons(card){
    if (!leftCol) return;
    // remove previous
    Array.from(leftCol.querySelectorAll('.nx-compare-wrap')).forEach(n=>n.remove());
    const taglist = leftCol.querySelector('.nx-taglist');

    const pairs = parseCompare(card);
    if (!pairs.length) return;

    pairs.forEach((p, i)=>{
      const wrap = DOC.createElement('div');
      wrap.className = 'nx-compare-wrap';
      const cmp = DOC.createElement('div');
      cmp.className = 'nx-compare'; cmp.setAttribute('role','region');
      cmp.setAttribute('aria-label', (titleEl?.textContent || 'Comparison') + ' ' + (i+1));

      const imgA = DOC.createElement('img');
      imgA.src = p.a; imgA.alt = p.la; imgA.className = 'nx-cmp-img a';
      const imgB = DOC.createElement('img');
      imgB.src = p.b; imgB.alt = p.lb; imgB.className = 'nx-cmp-img b';
      const divider = DOC.createElement('div');
      divider.className = 'nx-cmp-divider';
      const knob = DOC.createElement('div');
      knob.className = 'nx-cmp-knob';
      divider.appendChild(knob);

      const labL = DOC.createElement('span');
      labL.className = 'nx-cmp-label left'; labL.textContent = p.la;
      const labR = DOC.createElement('span');
      labR.className = 'nx-cmp-label right'; labR.textContent = p.lb;

      cmp.appendChild(imgA); cmp.appendChild(imgB);
      cmp.appendChild(divider); cmp.appendChild(labL); cmp.appendChild(labR);
      wrap.appendChild(cmp);

      // interactions
      let pct = 50;
      function setPct(v){
        pct = Math.max(0, Math.min(100, v));
        imgB.style.clipPath = 'inset(0 0 0 ' + pct + '%)';
        divider.style.left = pct + '%';
      }
      setPct(50);

      function posFromEvent(e){
        const rect = cmp.getBoundingClientRect();
        const x = (e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? rect.left);
        return ((x - rect.left) / rect.width) * 100;
      }

      let dragging=false;
      cmp.addEventListener('pointerdown', e=>{ dragging=true; cmp.setPointerCapture(e.pointerId); setPct(posFromEvent(e)); });
      cmp.addEventListener('pointermove', e=>{ if (dragging) setPct(posFromEvent(e)); });
      cmp.addEventListener('pointerup',   e=>{ dragging=false; try{cmp.releasePointerCapture(e.pointerId);}catch{} });
      cmp.addEventListener('pointerleave',e=>{ dragging=false; });
      cmp.addEventListener('click', e=> setPct(posFromEvent(e)));

      cmp.tabIndex = 0;
      cmp.addEventListener('keydown', e=>{
        if (e.key === 'ArrowLeft')  { setPct(pct - 2); e.preventDefault(); }
        else if (e.key === 'ArrowRight'){ setPct(pct + 2); e.preventDefault(); }
        else if (e.key === 'Home')  { setPct(0); e.preventDefault(); }
        else if (e.key === 'End')   { setPct(100); e.preventDefault(); }
        else if (e.key === ' ' || e.key === 'Spacebar'){ setPct(50); e.preventDefault(); }
      });

      if (taglist && taglist.parentNode){
        taglist.parentNode.insertBefore(wrap, taglist.nextSibling);
      } else {
        leftCol.appendChild(wrap);
      }
    });
  }

  function openModal(card){
    // Fill meta
    if (titleEl) titleEl.textContent = card.getAttribute('data-title') || card.querySelector('.text .div')?.textContent || 'Untitled';
    if (metaTxt) metaTxt.textContent = card.getAttribute('data-meta') || '';
    if (descEl)  descEl.textContent  = card.getAttribute('data-desc') || '';
    if (discEl)  discEl.textContent  = card.getAttribute('data-discipline') || '—';
    if (toolsEl) toolsEl.textContent = card.getAttribute('data-tools') || '';

    renderTags(card);
    renderActions(card);
    buildSlidesFromCard(card);
    renderComparisons(card);

    modal.style.display = 'flex';
    DOC.body.style.overflow = 'hidden';
  }

  function closeModal(){
    modal.style.display = 'none';
    DOC.body.style.overflow = '';
    clearSlides();
    if (leftCol) Array.from(leftCol.querySelectorAll('.nx-compare-wrap')).forEach(n=>n.remove());
  }

  modal.querySelector('.nx-close')?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e)=>{ if (e.target === modal) closeModal(); });

  DOC.addEventListener('click', (e)=>{
    const t = e.target.closest?.('.project-card');
    if (t && !e.target.closest('a,button')) openModal(t);
  });
})();