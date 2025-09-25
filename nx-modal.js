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

  /* ---------- (Optional) Comparisons & Contributors ---------- */
  function buildComparisons(card) {
    const raw = card.getAttribute("data-compare");
    const arr = raw ? tryJSON(raw) : null;
    const list = Array.isArray(arr) ? arr : [];
    const target = leftCol; // eenvoudig gehouden
    if (!target) return;
    qa(target, ".nx-compare[data-dynamic]").forEach((n) => n.remove());
    list.forEach((spec) => {
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
      imgL.style.clipPath = "inset(0 50% 0 0)";
      const handle = DOC.createElement("div");
      handle.className = "nx-cmp-handle";
      const knob = DOC.createElement("div");
      knob.className = "nx-cmp-knob";
      handle.appendChild(knob);
      w.appendChild(imgR);
      w.appendChild(imgL);
      w.appendChild(handle);
      target.appendChild(w);
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
    const href = linkFromSlide(currentSlide());
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
