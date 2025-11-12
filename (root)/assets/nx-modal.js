/* nx-modal.js — v35
   - View Project button opens best target (data-link > first iframe > first slide)
   - Hides arrows/dots when there are 0–1 slides (modal + cards)
   - Centers media, supports iframes, comparisons, contributors, keyboard-nav
*/
(function () {
  const DOC = document;
  const modal = DOC.getElementById("nxModal");
  if (!modal) return;

  /* ---------- Failsafe CSS (enforce hide when no nav) ---------- */
  (function injectFailsafeCSS() {
    const css = `
      #nxModal .nx-hero-slider.no-nav .nx-nav,
      #nxModal .nx-hero-slider.no-nav .nx-dots { display: none !important; }

      .slideshow-container[data-no-nav="1"] .slideshow-nav,
      .slideshow-container[data-no-nav="1"] .prev,
      .slideshow-container[data-no-nav="1"] .next { display: none !important; }
    `;
    const style = DOC.createElement("style");
    style.textContent = css;
    DOC.head.appendChild(style);
  })();

  /* ---------- Modal DOM ---------- */
  const hero = modal.querySelector(".nx-hero-slider");
  const slidesEl = modal.querySelector(".nx-slides, #nxSlides");
  const dotsEl = modal.querySelector(".nx-dots, #nxDots");
  let prevBtn = modal.querySelector(".nx-nav.prev");
  let nextBtn = modal.querySelector(".nx-nav.next");
  const closeBtn = modal.querySelector(".nx-close");

  const titleEl = modal.querySelector(".nx-title, #nxTitle");
  const metaTxt = modal.querySelector(".nx-meta .nx-meta-text, #nxMeta");
  const descEl = modal.querySelector(".nx-desc, #nxDesc");
  const tagsEl = modal.querySelector(".nx-taglist, #nxTags");
  const leftCol = modal.querySelector(".nx-left");
  const right = modal.querySelector(".nx-right");
  const rightDis = modal.querySelector(".nx-discipline, #nxDiscipline");
  const rightTl = modal.querySelector(".nx-tools, #nxTools");

  /* Modal actions (buttons) */
  const viewBtn = modal.querySelector(
    ".nx-actions .btn.btn-primary, .nx-actions .nx-btn.nx-primary"
  );
  const contactBtn = modal.querySelector(
    ".nx-actions .btn.btn-secondary, .nx-actions .nx-btn:not(.nx-primary)"
  );

  let idx = 0,
    total = 0;
  let currentViewUrl = ""; // ← wordt op openFromCard ingevuld

  /* ---------- Helpers ---------- */
  const wipe = (el) => {
    if (el) el.innerHTML = "";
  };
  const show = (el, on) => {
    if (el) el.style.display = on ? "" : "none";
  };
  const tryJSON = (s) => {
    try {
      return JSON.parse(s);
    } catch {
      return null;
    }
  };
  const q = (r, s) => (r || DOC).querySelector(s);
  const qa = (r, s) => Array.from((r || DOC).querySelectorAll(s));

  function nxBestLinkForCard(card, slidesArr) {
    // 1) data-link op de kaart wint altijd
    const dl = card.getAttribute("data-link");
    if (dl) return dl;

    // 2) eerste iframe:... in data-slides
    const firstIframe = (slidesArr || []).find((s) =>
      String(s).startsWith("iframe:")
    );
    if (firstIframe) return String(firstIframe).slice(7);

    // 3) expliciete per-slide links (data-links)
    const perSlide = nxParseList(card.getAttribute("data-links"));
    if (perSlide.length) return perSlide[0];

    // 4) fallback: eerste slide (ook als dat een afbeelding is)
    if (slidesArr && slidesArr.length)
      return String(slidesArr[0]).replace(/^iframe:/, "");

    // 5) ultimate fallback: eerste img in de kaart
    const img = card.querySelector("img[src]");
    return img ? img.src : "";
  }

  /* ---------- Ensure modal arrows exist ---------- */
  (function ensureArrowsExist() {
    if (!hero) return;
    const svgArrow = (dir) => `
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none"
           stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        ${
          dir === "prev"
            ? '<polyline points="15 18 9 12 15 6" />'
            : '<polyline points="9 18 15 12 9 6" />'
        }
      </svg>`;
    if (!prevBtn) {
      prevBtn = DOC.createElement("button");
      prevBtn.className = "nx-nav prev";
      prevBtn.type = "button";
      prevBtn.setAttribute("aria-label", "Previous");
      prevBtn.innerHTML = svgArrow("prev");
      hero.appendChild(prevBtn);
    } else if (!prevBtn.querySelector("svg")) {
      prevBtn.innerHTML = svgArrow("prev");
    }
    if (!nextBtn) {
      nextBtn = DOC.createElement("button");
      nextBtn.className = "nx-nav next";
      nextBtn.type = "button";
      nextBtn.setAttribute("aria-label", "Next");
      nextBtn.innerHTML = svgArrow("next");
      hero.appendChild(nextBtn);
    } else if (!nextBtn.querySelector("svg")) {
      nextBtn.innerHTML = svgArrow("next");
    }
  })();

  /* ---------- Modal nav visibility ---------- */
  function setModalNavVisible() {
    const need = total > 1;
    show(prevBtn, need);
    show(nextBtn, need);
    show(dotsEl, need);
    if (hero) hero.classList.toggle("no-nav", !need);
  }

  /* ---------- Extract slides from card ---------- */
  function extractSlides(card) {
    const raw = card.getAttribute("data-slides");
    if (raw) {
      const arr = tryJSON(raw);
      if (Array.isArray(arr) && arr.length) return arr;
    }
    const inlineImgs = qa(card, ".slideshow-container .slides img");
    if (inlineImgs.length)
      return inlineImgs.map((img) => img.getAttribute("src"));
    const first = q(card, "img");
    return first ? [first.getAttribute("src")] : [];
  }

  /* ---------- Pick best 'View Project' URL ---------- */
  function pickViewUrl(card, slidesArr) {
    // 1) explicit data-link
    const direct = card.getAttribute("data-link");
    if (
      (direct && /^(https?:)?\/\//.test(direct)) ||
      (direct && !direct.startsWith("iframe:"))
    )
      return direct;

    // 2) first iframe:... in slides
    const firstIframe = (slidesArr || []).find((s) =>
      String(s).startsWith("iframe:")
    );
    if (firstIframe) return String(firstIframe).slice(7);

    // 3) fallback: first slide URL (image or relative page)
    const first = (slidesArr || [])[0];
    if (first) return String(first).replace(/^iframe:/, "");

    return "";
  }

  /* ---------- Build modal slides ---------- */
  function buildSlides(arr) {
    wipe(slidesEl);
    if (dotsEl) wipe(dotsEl);
    total = Array.isArray(arr) ? arr.length : 0;

    if (!total) {
      setModalNavVisible();
      idx = 0;
      return;
    }

    arr.forEach((src, i) => {
      const wrap = DOC.createElement("div");
      wrap.className = "nx-slide" + (i === 0 ? " is-active" : "");

      let node;
      if (String(src).startsWith("iframe:")) {
        node = DOC.createElement("iframe");
        node.src = String(src).slice(7);
        node.setAttribute("frameborder", "0");
        node.setAttribute("loading", "lazy");
        node.setAttribute("allowfullscreen", "");
      } else {
        node = DOC.createElement("img");
        node.src = src;
        node.loading = "lazy";
        node.alt = titleEl?.textContent || "Slide";
      }
      wrap.appendChild(node);
      slidesEl.appendChild(wrap);

      if (dotsEl && total > 1) {
        const dot = DOC.createElement("button");
        dot.type = "button";
        dot.className = "nx-dot" + (i === 0 ? " is-active" : "");
        dot.addEventListener("click", () => goTo(i));
        dotsEl.appendChild(dot);
      }
    });

    setModalNavVisible();
    idx = 0;
  }

  function buildEpisodes(card) {
    const host =
      document.getElementById("nxEpisodes") ||
      document.querySelector("#nxModal .nx-episodes");
    if (!host) return;

    host.innerHTML = "";
    const list = (tryJSON(card.getAttribute("data-episodes")) || []).filter(
      Boolean
    );
    if (!list.length) return;

    list.forEach((ep, i) => {
      const tile = document.createElement("article");
      tile.className = "nx-ep";
      tile.tabIndex = 0; // focusable
      tile.setAttribute("data-idx", i);

      // --- thumb + overlay play ---
      const thumb = document.createElement("div");
      thumb.className = "nx-ep-thumb";
      const img = document.createElement("img");
      img.src = ep.thumb || "";
      img.alt = ep.title || "Episode";
      thumb.appendChild(img);

      const play = document.createElement("button");
      play.className = "nx-ep-playbtn";
      play.type = "button";
      play.setAttribute("aria-label", `Play ${ep.title || "episode"}`);
      play.innerHTML = `
      <span class="bubble">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="8,5 19,12 8,19" fill="currentColor"/>
        </svg>
      </span>
    `;
      // Play -> ga meteen naar ep.link (nieuw tabblad)
      play.addEventListener("click", (e) => {
        e.stopPropagation();
        if (ep.link) window.open(ep.link, "_blank", "noopener");
      });

      thumb.appendChild(play);
      tile.appendChild(thumb);

      // --- tekstblok ---
      const meta = document.createElement("div");
      meta.className = "nx-ep-meta";
      const title = document.createElement("div");
      title.className = "nx-ep-title";
      title.textContent = `${ep.no ?? i + 1}. ${ep.title || ""}`;
      const sub = document.createElement("div");
      sub.className = "nx-ep-sub";
      sub.textContent = ep.desc || "";
      const extra = document.createElement("div");
      extra.className = "nx-ep-extra";
      if (ep.duration) extra.textContent = ep.duration;
      meta.appendChild(title);
      if (ep.desc) meta.appendChild(sub);
      if (ep.duration) meta.appendChild(extra);
      tile.appendChild(meta);

      // --- tegel selecteren: zet View Project + toon in hero ---
      function selectEpisode() {
        host
          .querySelectorAll(".nx-ep.is-active")
          .forEach((n) => n.classList.remove("is-active"));
        tile.classList.add("is-active");

        // View Project knop
        const vp =
          document.getElementById("nxViewProject") ||
          document.querySelector("#nxModal .nx-actions .btn.btn-primary");
        if (vp) {
          vp.setAttribute("href", ep.link || "#");
          vp.setAttribute("target", "_blank");
          vp.setAttribute("rel", "noopener");
        }

        // Hero vervangen door iframe (of fallback: afbeelding)
        const slides = document.querySelector("#nxModal .nx-slides");
        if (slides) {
          slides.innerHTML = "";
          const wrap = document.createElement("div");
          wrap.className = "nx-slide is-active";

          if (
            ep.link &&
            (ep.link.startsWith("http") || ep.link.endsWith(".html"))
          ) {
            const iframe = document.createElement("iframe");
            iframe.src = ep.link;
            iframe.loading = "lazy";
            iframe.allowFullscreen = true;
            iframe.frameBorder = "0";
            wrap.appendChild(iframe);
          } else {
            const im = document.createElement("img");
            im.src = ep.thumb || "";
            im.alt = ep.title || "Episode";
            wrap.appendChild(im);
          }
          slides.appendChild(wrap);
        }
      }
      tile.addEventListener("click", selectEpisode);
      tile.addEventListener("keydown", (e) => {
        if (e.key === "Enter") selectEpisode();
      });

      host.appendChild(tile);
    });

    // Kies standaard de eerste aflevering
    const first = host.querySelector(".nx-ep");
    if (first) first.click();
  }

  /* ---------- Modal navigation ---------- */
  function goTo(n) {
    if (!slidesEl || total <= 0) return;
    if (total === 1) {
      setModalNavVisible();
      return;
    }

    const slides = qa(slidesEl, ":scope > .nx-slide");
    const dots = qa(dotsEl, ":scope > .nx-dot");

    slides[idx]?.classList.remove("is-active");
    dots[idx]?.classList.remove("is-active");

    idx = (n + total) % total;

    slides[idx]?.classList.add("is-active");
    dots[idx]?.classList.add("is-active");
  }
  const next = () => goTo(idx + 1);
  const prev = () => goTo(idx - 1);

  prevBtn?.addEventListener("click", prev);
  nextBtn?.addEventListener("click", next);
  window.addEventListener("keydown", (e) => {
    if (modal.style.display === "none" || total <= 1) return;
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });

  /* ---------- Fill info ---------- */
  function fillInfo(card) {
    const title =
      card.getAttribute("data-title") ||
      q(card, ".project-title")?.textContent ||
      "";
    const meta = card.getAttribute("data-meta") || "";
    const desc = card.getAttribute("data-desc") || "";
    const tags = card.getAttribute("data-tags");
    const tools = card.getAttribute("data-tools") || "";
    const disc = card.getAttribute("data-discipline") || "";

    if (titleEl) titleEl.textContent = title || "Project";
    if (metaTxt) metaTxt.textContent = meta || "";
    if (descEl) descEl.textContent = desc || "";
    if (rightDis) rightDis.textContent = disc || "—";
    if (rightTl) rightTl.textContent = tools || "—";

    if (tagsEl) {
      wipe(tagsEl);
      let arr = [];
      const parsed = tryJSON(tags);
      if (Array.isArray(parsed)) arr = parsed;
      else if (typeof tags === "string" && tags)
        arr = tags
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      arr.forEach((t) => {
        const s = DOC.createElement("span");
        s.className = "nx-tag";
        s.textContent = t;
        tagsEl.appendChild(s);
      });
    }
  }

  // === helper: maak comparator sleepbaar ===
  function enableCompareDrag(wrap) {
    const leftImg = wrap.querySelector(".nx-cmp-img.left");
    const handle = wrap.querySelector(".nx-cmp-handle");
    const knob = wrap.querySelector(".nx-cmp-knob");

    let dragging = false;
    let pct = 0.5; // 0..1

    function apply(p) {
      pct = Math.max(0, Math.min(1, p));
      // Clip linkerbeeld en positioneer handle
      leftImg.style.clipPath = `inset(0 ${(1 - pct) * 100}% 0 0)`;
      handle.style.left = `${pct * 100}%`;
    }

    function relX(e) {
      const rect = wrap.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      return (clientX - rect.left) / rect.width;
    }

    // Pointer (desktop) + touch
    function down(e) {
      dragging = true;
      apply(relX(e));
      e.preventDefault();
    }
    function move(e) {
      if (!dragging) return;
      apply(relX(e));
    }
    function up() {
      dragging = false;
    }

    // Pointer
    wrap.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);

    // Touch (fallback)
    wrap.addEventListener("touchstart", down, { passive: false });
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", up);

    window.addEventListener("resize", () => apply(pct));
    apply(0.5);
  }

  // === vervang de oude buildComparisons(...) door deze ===
  function buildComparisons(card) {
    const raw = card.getAttribute("data-compare");
    const arr = raw ? tryJSON(raw) : null;
    const list = Array.isArray(arr) ? arr : [];
    const target = leftCol; // plaats ze in de linker kolom van de modal
    if (!target) return;

    // Opruimen van vorige dynamische comparators
    qa(target, ".nx-compare[data-dynamic]").forEach((n) => n.remove());

    list.forEach((spec) => {
      // "left|right|Left Label|Right Label"
      const [left, right, lLab, rLab] = String(spec)
        .split("|")
        .map((s) => s.trim());
      if (!left || !right) return;

      const w = DOC.createElement("div");
      w.className = "nx-compare";
      w.setAttribute("data-dynamic", "");

      const imgR = DOC.createElement("img");
      imgR.className = "nx-cmp-img right";
      imgR.src = right;
      imgR.alt = rLab || "After";

      const imgL = DOC.createElement("img");
      imgL.className = "nx-cmp-img left";
      imgL.src = left;
      imgL.alt = lLab || "Before";
      imgL.style.clipPath = "inset(0 50% 0 0)"; // start half/half

      const handle = DOC.createElement("div");
      handle.className = "nx-cmp-handle";
      const knob = DOC.createElement("div");
      knob.className = "nx-cmp-knob";
      handle.appendChild(knob);

      // <-- Labels (tags) op de slider zelf
      if (lLab) {
        const labL = DOC.createElement("div");
        labL.className = "nx-cmp-label left";
        labL.textContent = lLab;
        w.appendChild(labL);
      }
      if (rLab) {
        const labR = DOC.createElement("div");
        labR.className = "nx-cmp-label right";
        labR.textContent = rLab;
        w.appendChild(labR);
      }

      w.appendChild(imgR);
      w.appendChild(imgL);
      w.appendChild(handle);
      target.appendChild(w);

      // sleep/drag activeren
      enableCompareDrag(w);
    });
  }

  function buildContributors(card) {
    const raw = card.getAttribute("data-contributors");
    let arr = [];
    try {
      arr = JSON.parse(raw || "[]");
    } catch {}
    q(right, ".nx-contrib-spec")?.remove();

    if (right && arr.length) {
      const toolsSpec = rightTl
        ? rightTl.closest(".nx-spec")
        : q(right, ".nx-spec:last-of-type");
      const spec = DOC.createElement("div");
      spec.className = "nx-spec nx-contrib-spec";
      const title = DOC.createElement("div");
      title.className = "nx-spec-title";
      title.textContent = "CONTRIBUTORS";
      const list = DOC.createElement("ul");
      list.className = "nx-spec-list";

      arr.forEach((c) => {
        const li = DOC.createElement("li");
        const a = DOC.createElement("a");
        if (typeof c === "string") {
          a.href = "#";
          a.textContent = c;
        } else {
          a.href = c.url || "#";
          a.textContent = c.name || "Contributor";
        }
        a.target = "_blank";
        a.rel = "noopener";
        li.appendChild(a);
        list.appendChild(li);
      });

      spec.appendChild(title);
      spec.appendChild(list);
      if (toolsSpec?.parentNode)
        toolsSpec.parentNode.insertBefore(spec, toolsSpec.nextSibling);
      else right.appendChild(spec);
    }
  }

  /* ---------- Open/Close ---------- */
  function openFromCard(card) {
    const slidesArr = extractSlides(card);

    modal.dataset.cardLink = card.getAttribute("data-link") || "";
    modal.dataset.cardLinkLabel = card.getAttribute("data-link-label") || "";

    // Zet de beste View Project URL vast voor deze modal-sessie
    const best = nxBestLinkForCard(card, slidesArr);
    modal.dataset.viewUrl = best; // <- “lock” voor de sync IIFE

    const viewBtnEl =
      modal.querySelector("#nxViewProject") ||
      modal.querySelector(".nx-actions .btn.btn-primary");

    if (viewBtnEl) {
      if (viewBtnEl.tagName.toLowerCase() === "a") {
        viewBtnEl.href = best || "#";
        viewBtnEl.target = "_blank";
        viewBtnEl.rel = "noopener";
        if (!best) viewBtnEl.setAttribute("aria-disabled", "true");
        else viewBtnEl.removeAttribute("aria-disabled");
      } else {
        viewBtnEl.dataset.href = best || "";
        viewBtnEl.removeAttribute("disabled");
      }
    }

    fillInfo(card);
    buildSlides(slidesArr);
    nxApplyPerSlideLinks(card, slidesEl);
    buildComparisons(card);
    buildContributors(card);
    buildEpisodes(card);

    // Toon/label “View Project”
    if (viewBtn) {
      viewBtn.style.display = "";
      viewBtn.onclick = null;

      const lbl = modal.dataset.cardLinkLabel;
      if (lbl) {
        viewBtn.textContent = lbl;
      } else {
        viewBtn.innerHTML = `
      <span class="btn-icon" aria-hidden="true"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><polygon points="6,4 20,12 6,20" fill="currentColor"/></svg></span>
      <span>View project</span>
    `;
      }
    }

    fillInfo(card);
    buildSlides(slidesArr);
    nxApplyPerSlideLinks(card, slidesEl);

    buildComparisons(card);
    buildContributors(card);

    // View Project-knop tonen; link wordt door de sync-IIFE gezet op basis van de actieve slide
    if (viewBtn) {
      viewBtn.style.display = "";
      viewBtn.onclick = null; // geen statische binding
    }

    // Optional: Contact scroll naar footer
    if (contactBtn) {
      contactBtn.onclick = () => {
        const footer = DOC.querySelector(".site-footer");
        closeModal();
        if (footer && "scrollIntoView" in footer)
          footer.scrollIntoView({ behavior: "smooth" });
      };
    }

    modal.style.display = "flex";
    DOC.body.style.overflow = "hidden";
    idx = 0;
    goTo(0);
    setTimeout(updateModalNav, 30);
    setTimeout(updateModalNav, 150);
  }

  function closeModal() {
    modal.style.display = "none";
    DOC.body.style.overflow = "";
    wipe(slidesEl);
    if (dotsEl) wipe(dotsEl);
    qa(leftCol || DOC, ".nx-compare[data-dynamic]").forEach((n) => n.remove());
    q(right, ".nx-contrib-spec")?.remove();
    total = 0;
    idx = 0;
    currentViewUrl = "";
    modal.dataset.cardLink = "";
    modal.dataset.cardLinkLabel = "";
    setModalNavVisible();
  }

  closeBtn?.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  /* ---------- Modal nav live updates ---------- */
  function updateModalNav() {
    const count = qa(slidesEl, ".nx-slide").length;
    const need = count > 1;
    show(prevBtn, need);
    show(nextBtn, need);
    show(dotsEl, need);
    if (hero) hero.classList.toggle("no-nav", !need);
  }
  if (slidesEl && "MutationObserver" in window) {
    new MutationObserver(updateModalNav).observe(slidesEl, { childList: true });
  }

  /* ---------- Bind project cards ---------- */
  function bindCards() {
    qa(DOC, ".project-card").forEach((card) => {
      card.style.cursor = "pointer";
      card.addEventListener("click", (e) => {
        // Ignore clicks on inline slideshow arrows within the card
        if (
          e.target.closest(".slideshow-container .prev") ||
          e.target.closest(".slideshow-container .next")
        )
          return;
        openFromCard(card);
      });
    });
  }
  bindCards();

  /* ---------- CARDS: hide arrows if <= 1 slide ---------- */
  function updateCardNavs() {
    // A) Inline slideshows
    qa(DOC, ".slideshow-container").forEach((sc) => {
      const slides = qa(sc, ".slides img, .slides .slide");
      const need = slides.length > 1;
      const nav = q(sc, ".slideshow-nav");
      if (nav) show(nav, need);
      sc.setAttribute("data-no-nav", need ? "0" : "1");
      const prev = q(sc, ".prev"),
        next = q(sc, ".next");
      if (!need) {
        if (prev) prev.style.display = "none";
        if (next) next.style.display = "none";
      }
    });

    // B) Cards that only use data-slides
    qa(DOC, ".project-card").forEach((card) => {
      const raw = card.getAttribute("data-slides");
      if (!raw) return;
      let arr = tryJSON(raw) || [];
      const need = Array.isArray(arr) && arr.length > 1;
      const nav = q(card, ".slideshow-nav");
      if (nav) show(nav, need);
      const prev = q(card, ".prev"),
        next = q(card, ".next");
      if (!need) {
        if (prev) prev.style.display = "none";
        if (next) next.style.display = "none";
      }
    });
  }

  // Initial run + when DOM changes
  if (DOC.readyState === "loading") {
    DOC.addEventListener(
      "DOMContentLoaded",
      () => {
        updateCardNavs();
        updateModalNav();
      },
      { once: true }
    );
  } else {
    updateCardNavs();
    updateModalNav();
  }

  if ("MutationObserver" in window) {
    new MutationObserver(updateCardNavs).observe(DOC.body, {
      childList: true,
      subtree: true,
    });
  }

  DOC.addEventListener("click", (e) => {
    if (!e.target.closest(".project-card")) return;
    setTimeout(updateModalNav, 50);
    setTimeout(updateModalNav, 200);
  });
})();

/* ===== Sync "View Project" with the currently visible slide in the modal ===== */
(() => {
  const modal = document.getElementById("nxModal");
  if (!modal) return;

  const slidesRoot = modal.querySelector(".nx-slides");
  // Ondersteun zowel jouw <button class="btn btn-primary"> als varianten
  const actionBtn =
    modal.querySelector(".nx-actions .btn.btn-primary") ||
    modal.querySelector(".nx-actions .nx-btn.nx-primary");

  function currentSlide() {
    return slidesRoot
      ? slidesRoot.querySelector(".nx-slide.is-active") ||
          slidesRoot.firstElementChild
      : null;
  }

  // Bepaal de “link” van de actieve slide
  function linkFromSlide(slide) {
    if (modal.dataset.viewUrl) return modal.dataset.viewUrl;
    if (!slide) return "";

    // 1) Expliciet gezet?
    const explicit = slide.getAttribute("data-link") || slide.dataset?.link;
    if (explicit) return explicit;

    // 2) Iframe → src
    const ifr = slide.querySelector("iframe[src]");
    if (ifr && ifr.src) return ifr.src;

    // 3) Video → <source> of video.src
    const vsrc = slide.querySelector("video source[src]");
    if (vsrc) return vsrc.getAttribute("src") || "";
    const vid = slide.querySelector("video[src]");
    if (vid && vid.src) return vid.src;

    // 4) Image → src (laat gebruikers desnoods de full image openen)
    const img = slide.querySelector("img[src]");
    if (img && img.src) return img.src;

    return "";
  }

  function applyLink(href) {
    if (!actionBtn) return;

    const isAnchor = actionBtn.tagName.toLowerCase() === "a";
    if (href) {
      if (isAnchor) {
        actionBtn.href = href;
        actionBtn.target = "_blank";
        actionBtn.rel = "noopener";
        actionBtn.removeAttribute("aria-disabled");
        actionBtn.classList.remove("is-disabled");
      } else {
        actionBtn.dataset.href = href;
        actionBtn.removeAttribute("disabled");
      }
    } else {
      if (isAnchor) {
        actionBtn.href = "#";
        actionBtn.setAttribute("aria-disabled", "true");
        actionBtn.classList.add("is-disabled");
      } else {
        actionBtn.dataset.href = "";
        actionBtn.setAttribute("disabled", "disabled");
      }
    }
  }

  // Zorg dat klikken op de knop opent in nieuw tabblad (voor <button>)
  function ensureClickBinding() {
    if (!actionBtn) return;
    if (actionBtn._nxBound) return; // éénmalig binden
    actionBtn._nxBound = true;

    if (actionBtn.tagName.toLowerCase() !== "a") {
      actionBtn.addEventListener("click", (e) => {
        const href = actionBtn.dataset.href;
        if (href) {
          window.open(href, "_blank", "noopener");
        }
      });
    }
  }

  function sync() {
    ensureClickBinding();
    const cardLink = modal.dataset.cardLink || "";
    const slideHref = linkFromSlide(currentSlide());
    const href = cardLink || slideHref;
    applyLink(href);
  }

  // Initial sync bij load/openen
  sync();

  // Resync bij klikken op prev/next of dots
  modal
    .querySelectorAll(".nx-nav.prev, .nx-nav.next, .nx-dots")
    .forEach((el) => {
      el.addEventListener("click", () => setTimeout(sync, 0));
    });

  // Observeer class-wijzigingen (active slide)
  if (slidesRoot) {
    const obs = new MutationObserver(() => setTimeout(sync, 0));
    obs.observe(slidesRoot, {
      subtree: true,
      attributes: true,
      attributeFilter: ["class"],
      childList: true,
    });
  }

  // Resync wanneer de modal getoond/verandert
  const obs2 = new MutationObserver(() => setTimeout(sync, 0));
  obs2.observe(modal, {
    attributes: true,
    attributeFilter: ["style", "class"],
  });
})();

function nxParseList(raw) {
  if (raw == null) return [];
  try {
    const a = JSON.parse(raw);
    return Array.isArray(a) ? a : [];
  } catch {
    return String(raw)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
}
function nxApplyPerSlideLinks(card, slidesRoot) {
  const links = nxParseList(card.getAttribute("data-links"));
  if (!slidesRoot || !links.length) return;
  Array.from(slidesRoot.children).forEach((slideEl, i) => {
    const href = links[i];
    if (href) slideEl.setAttribute("data-link", href);
  });
}
