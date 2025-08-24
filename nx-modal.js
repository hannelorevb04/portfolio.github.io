
/* NX Modal - ultra-robust, no optional chaining, wide browser support */
(function () {
  var DOC = document;
  var blockClick = false; // block click right after actual drag

  // ===== 1) Drag-to-scroll (safe) =====
  function bindDrag(container) {
    var down = false, startX = 0, startScroll = 0, moved = false;
    container.addEventListener('mousedown', function (e) {
      down = true; moved = false;
      startX = e.pageX - container.offsetLeft;
      startScroll = container.scrollLeft;
    });
    container.addEventListener('mousemove', function (e) {
      if (!down) return;
      var x = e.pageX - container.offsetLeft;
      var dx = x - startX;
      if (Math.abs(dx) > 6) {
        moved = true;
        blockClick = true;
        container.scrollLeft = startScroll - dx * 3.0;
      }
    });
    container.addEventListener('mouseup', function () { down = false; setTimeout(function(){ blockClick=false; }, 0); });
    container.addEventListener('mouseleave', function () { down = false; setTimeout(function(){ blockClick=false; }, 0); });
    // cancel click if dragged
    container.addEventListener('click', function (e) {
      if (moved) { e.stopPropagation(); e.preventDefault(); }
    }, true);
    // Touch
    var touchDown = false, tStartX = 0, tStartScroll = 0, tMoved = false;
    container.addEventListener('touchstart', function (e) {
      touchDown = true; tMoved = false;
      tStartX = e.touches[0].pageX - container.offsetLeft;
      tStartScroll = container.scrollLeft;
    }, { passive: true });
    container.addEventListener('touchmove', function (e) {
      if (!touchDown) return;
      var x = e.touches[0].pageX - container.offsetLeft;
      var dx = x - tStartX;
      if (Math.abs(dx) > 6) {
        tMoved = true;
        blockClick = true;
        container.scrollLeft = tStartScroll - dx * 3.0;
        e.preventDefault();
      }
    }, { passive: false });
    function touchend(){ touchDown = false; setTimeout(function(){ blockClick=false; }, 0); }
    container.addEventListener('touchend', touchend);
    container.addEventListener('touchcancel', touchend);
    container.addEventListener('touchend', function(e){ if (tMoved) { e.stopPropagation(); e.preventDefault(); } }, true);
  }

  var projectRows = DOC.querySelectorAll('.projects');
  for (var i=0; i<projectRows.length; i++) bindDrag(projectRows[i]);

  // ===== 2) Modal =====
  var modal = DOC.getElementById('nxModal');
  if (!modal) return;

  var closeBtn = modal.querySelector('.nx-close');
  var slidesEl = modal.querySelector('.nx-slides');
  var prevBtn  = modal.querySelector('.nx-nav.prev');
  var nextBtn  = modal.querySelector('.nx-nav.next');
  var dotsEl   = modal.querySelector('.nx-dots');
  var titleEl  = modal.querySelector('.nx-title');
  var descEl   = modal.querySelector('.nx-desc');
  var taglist  = modal.querySelector('.nx-taglist');

  // tolerant meta/tools/discipline (class or legacy ids)
  var metaEl = modal.querySelector('.nx-meta-text') 
            || DOC.getElementById('nxMeta')
            || DOC.createElement('span');
  var toolsEl = modal.querySelector('.nx-tools') 
             || DOC.getElementById('nxTools')
             || DOC.createElement('span');
  var discEl = modal.querySelector('.nx-discipline') 
            || DOC.getElementById('nxDiscipline')
            || DOC.createElement('span');

  var idx = 0, total = 0;

  function parseSlides(card) {
    try { 
      var raw = card.getAttribute('data-slides') || '[]';
      return JSON.parse(raw);
    } catch(e) { return []; }
  }

  function buildSlides(sources) {
    slidesEl.innerHTML = '';
    dotsEl.innerHTML = '';
    for (var i=0; i<(sources||[]).length; i++) {
      var s = String(sources[i] || '');
      var slide = DOC.createElement('div');
      slide.className = 'nx-slide' + (i===0 ? ' is-active' : '');
      if (s.indexOf('iframe:') === 0) {
        var ifr = DOC.createElement('iframe');
        ifr.src = s.replace('iframe:', '');
        ifr.title = 'Project';
        slide.appendChild(ifr);
      } else if (s) {
        var img = DOC.createElement('img');
        img.src = s; img.alt = 'Slide ' + (i+1);
        slide.appendChild(img);
      }
      slidesEl.appendChild(slide);
      var dot = DOC.createElement('button');
      dot.className = 'nx-dot' + (i===0 ? ' is-active' : '');
      dot.type = 'button';
      (function(to){ dot.addEventListener('click', function(){ goTo(to); }); })(i);
      dotsEl.appendChild(dot);
    }
    idx = 0; total = Math.max(1, (sources||[]).length);
  }

  function goTo(n) {
    var slides = Array.prototype.slice.call(slidesEl.children);
    var dots   = Array.prototype.slice.call(dotsEl.children);
    if (!slides.length) return;
    if (slides[idx]) slides[idx].classList.remove('is-active');
    if (dots[idx]) dots[idx].classList.remove('is-active');
    idx = (n + total) % total;
    if (slides[idx]) slides[idx].classList.add('is-active');
    if (dots[idx]) dots[idx].classList.add('is-active');
  }
  function next(){ goTo(idx + 1); }
  function prev(){ goTo(idx - 1); }
  if (prevBtn) prevBtn.addEventListener('click', prev);
  if (nextBtn) nextBtn.addEventListener('click', next);

  function openModal(card) {
    if (!card) return;
    titleEl.textContent = card.getAttribute('data-title') || 'Untitled';
    metaEl.textContent  = card.getAttribute('data-meta') || '';
    descEl.textContent  = card.getAttribute('data-desc') || '';
    discEl.textContent  = card.getAttribute('data-discipline') || '—';
    toolsEl.textContent = card.getAttribute('data-tools') || '';

    // tags
    taglist.innerHTML = '';
    var tags = (card.getAttribute('data-tags') || '').split(',');
    for (var i=0;i<tags.length;i++) {
      var t = tags[i].trim();
      if (!t) continue;
      var span = DOC.createElement('span');
      span.className = 'nx-tag';
      span.textContent = t;
      taglist.appendChild(span);
    }

    var slides = parseSlides(card);
    var first  = slides[0] || '';
    var primaryBtn = modal.querySelector('.nx-primary');
    if (primaryBtn) {
      primaryBtn.onclick = function(){
        if (typeof first === 'string' && first.indexOf('iframe:') === 0) {
          var url = first.replace('iframe:', '');
          window.open(url, '_blank', 'noopener');
        }
      };
    }

    buildSlides(slides);
    modal.style.display = 'flex';
    DOC.body.style.overflow = 'hidden';
    if (closeBtn) try { closeBtn.focus({preventScroll:true}); } catch(e){}
  }

  function closeModal() {
    modal.style.display = 'none';
    DOC.body.style.overflow = '';
    slidesEl.innerHTML = '';
    dotsEl.innerHTML = '';
  }
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
  DOC.addEventListener('keydown', function (e) {
    if (modal.style.display === 'flex') {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft')  prev();
    }
  });

  // ===== 3) Open modal on any .project-card click (capture + bubble + direct) =====
  function attachCardHandlers(useCapture) {
    var cards = DOC.querySelectorAll('.project-card');
    for (var i=0;i<cards.length;i++) {
      (function(card){
        card.addEventListener('click', function (e) {
          if (blockClick) return;
          var inLink = e.target.closest ? e.target.closest('a') : null;
          if (inLink) e.preventDefault();
          openModal(card);
        }, useCapture);
      })(cards[i]);
    }
  }
  attachCardHandlers(true);
  attachCardHandlers(false);

  // Global delegation as fallback
  DOC.addEventListener('click', function (e) {
    if (blockClick) return;
    var el = e.target.closest ? e.target.closest('.project-card') : null;
    if (!el) return;
    var inLink = e.target.closest ? e.target.closest('a') : null;
    if (inLink) e.preventDefault();
    openModal(el);
  }, true);
  DOC.addEventListener('click', function (e) {
    if (blockClick) return;
    var el = e.target.closest ? e.target.closest('.project-card') : null;
    if (!el) return;
    var inLink = e.target.closest ? e.target.closest('a') : null;
    if (inLink) e.preventDefault();
    openModal(el);
  }, false);
})();
