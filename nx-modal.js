/* nx-modal.js — v29: robust modal, slides + comparisons, tags at bottom */
(function () {
  const DOC = document;
  const modal = DOC.getElementById("nxModal");
  if (!modal) return;

  // Modal elements
  const slidesEl = modal.querySelector(".nx-slides");
  const dotsEl = modal.querySelector(".nx-dots");
  const prevBtn = modal.querySelector(".nx-nav.prev");
  const nextBtn = modal.querySelector(".nx-nav.next");

  // Zorg voor afgeronde SVG-pijlen in de modal-knoppen
  (function ensureModalArrows() {
    const svgArrow = (dir) => `
    <svg viewBox="0 0 24 24" width="20" height="20"
         fill="none" stroke="currentColor" stroke-width="3"
         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      ${
        dir === "prev"
          ? '<polyline points="15 18 9 12 15 6" />'
          : '<polyline points="9 18 15 12 9 6" />'
      }
    </svg>`;

    if (prevBtn) {
      prevBtn.setAttribute("type", "button");
      prevBtn.setAttribute("aria-label", "Previous");
      if (!prevBtn.querySelector("svg")) prevBtn.innerHTML = svgArrow("prev");
    }
    if (nextBtn) {
      nextBtn.setAttribute("type", "button");
      nextBtn.setAttribute("aria-label", "Next");
      if (!nextBtn.querySelector("svg")) nextBtn.innerHTML = svgArrow("next");
    }
  })();

  const titleEl =
    modal.querySelector(".nx-title") || modal.querySelector("#nxTitle");
  const metaTxt =
    modal.querySelector(".nx-meta .nx-meta-text") ||
    modal.querySelector("#nxMeta");
  const descEl =
    modal.querySelector(".nx-desc") || modal.querySelector("#nxDesc");
  const tagsEl =
    modal.querySelector(".nx-taglist") || modal.querySelector("#nxTags");
  const leftCol = modal.querySelector(".nx-left");
  const rightAside = modal.querySelector(".nx-right");
  const rightDis =
    modal.querySelector(".nx-discipline") ||
    modal.querySelector("#nxDiscipline");
  const rightTools =
    modal.querySelector(".nx-tools") || modal.querySelector("#nxTools");
  const cmpContainer = modal.querySelector(".nx-comparisons") || null;

  const closeBtn = modal.querySelector(".nx-close");
  let idx = 0,
    total = 0;

  // Utility
  function wipe(el) {
    if (el) el.innerHTML = "";
  }
  function tryJSON(s) {
    try {
      return JSON.parse(s);
    } catch {
      return null;
    }
  }

  // Build SLIDES from card
  function extractSlides(card) {
    const raw = card.getAttribute("data-slides");
    if (raw) {
      const arr = tryJSON(raw);
      if (Array.isArray(arr) && arr.length) return arr;
    }
    const inlineImgs = card.querySelectorAll(
      ".slideshow-container .slides img"
    );
    if (inlineImgs.length) {
      return Array.from(inlineImgs).map((img) => img.getAttribute("src"));
    }
    const firstImg = card.querySelector("img");
    if (firstImg) return [firstImg.getAttribute("src")];
    return [];
  }

  function buildSlides(arr) {
    wipe(slidesEl);
    if (dotsEl) wipe(dotsEl);
    total = Array.isArray(arr) ? arr.length : 0;

    arr.forEach((src, i) => {
      const wrap = DOC.createElement("div");
      wrap.className = "nx-slide" + (i === 0 ? " is-active" : "");

      let node;
      if (typeof src === "string" && src.startsWith("iframe:")) {
        const url = src.slice(7);
        node = DOC.createElement("iframe");
        node.src = url;
        node.setAttribute("frameborder", "0");
        node.setAttribute("loading", "lazy");
        node.setAttribute("allowfullscreen", "");
      } else {
        node = DOC.createElement("img");
        node.loading = "lazy";
        node.alt = titleEl ? titleEl.textContent || "Slide" : "Slide";
        node.src = src;
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

    setNavVisible(total > 1);
    idx = 0;
  }

  function setNavVisible(show) {
    if (prevBtn) prevBtn.style.display = show ? "" : "none";
    if (nextBtn) nextBtn.style.display = show ? "" : "none";
    if (dotsEl) dotsEl.style.display = show ? "" : "none";
  }

  function goTo(n) {
    if (!slidesEl) return;
    const slides = Array.from(slidesEl.children);
    const dots = dotsEl ? Array.from(dotsEl.children) : [];
    if (!slides.length) return;
    slides[idx] && slides[idx].classList.remove("is-active");
    dots[idx] && dots[idx].classList.remove("is-active");
    idx = (n + total) % total;
    slides[idx] && slides[idx].classList.add("is-active");
    dots[idx] && dots[idx].classList.add("is-active");
  }
  function next() {
    goTo(idx + 1);
  }
  function prev() {
    goTo(idx - 1);
  }

  if (prevBtn) prevBtn.addEventListener("click", prev);
  if (nextBtn) nextBtn.addEventListener("click", next);

  function fillInfo(card) {
    const title =
      card.getAttribute("data-title") ||
      card.querySelector(".project-title")?.textContent ||
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
    if (rightTools) rightTools.textContent = tools || "—";

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

  function buildComparisons(card) {
    const raw = card.getAttribute("data-compare");
    const arr = raw ? tryJSON(raw) : null;
    const list = Array.isArray(arr) ? arr : [];
    const target = cmpContainer || tagsEl || leftCol;
    if (!target) return;

    const old = target.querySelectorAll(".nx-compare[data-dynamic]");
    old.forEach((n) => n.remove());

    list.forEach((spec) => {
      const parts = String(spec).split("|");
      const left = (parts[0] || "").trim();
      const right = (parts[1] || "").trim();
      const lLab = (parts[2] || "").trim();
      const rLab = (parts[3] || "").trim();
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

      (cmpContainer || leftCol || tagsEl).appendChild(w);
    });
  }

  // OPEN / CLOSE
  function openFromCard(card) {
    fillInfo(card);
    buildSlides(extractSlides(card));
    buildComparisons(card);

    // CONTRIBUTORS rechts onder TOOLS
    (function () {
      const raw = card.getAttribute("data-contributors");
      let arr = [];
      try {
        arr = JSON.parse(raw || "[]");
      } catch {}

      const oldSpec = rightAside?.querySelector(".nx-contrib-spec");
      if (oldSpec) oldSpec.remove();

      if (rightAside && arr.length) {
        const toolsSpec = rightTools
          ? rightTools.closest(".nx-spec")
          : rightAside.querySelector(".nx-spec:last-of-type");

        const spec = document.createElement("div");
        spec.className = "nx-spec nx-contrib-spec";

        const title = document.createElement("div");
        title.className = "nx-spec-title";
        title.textContent = "CONTRIBUTORS";

        const list = document.createElement("ul");
        list.className = "nx-spec-list";

        arr.forEach((c) => {
          const li = document.createElement("li");
          const a = document.createElement("a");

          if (typeof c === "string") {
            // fallback: enkel naam
            a.href = "#";
            a.textContent = c;
          } else {
            // object met naam + url
            a.href = c.url || "#";
            a.textContent = c.name || "Contributor";
          }

          a.target = "_blank"; // opent in nieuw tabblad
          a.rel = "noopener"; // veilig openen
          li.appendChild(a);
          list.appendChild(li);
        });

        spec.appendChild(title);
        spec.appendChild(list);

        if (toolsSpec && toolsSpec.parentNode) {
          toolsSpec.parentNode.insertBefore(spec, toolsSpec.nextSibling);
        } else {
          rightAside.appendChild(spec);
        }
      }
    })();

    modal.style.display = "flex";
    DOC.body.style.overflow = "hidden";
    idx = 0;
    goTo(0);
  }

  function closeModal() {
    modal.style.display = "none";
    DOC.body.style.overflow = "";
    wipe(slidesEl);
    if (dotsEl) wipe(dotsEl);
    if (cmpContainer) {
      const old = cmpContainer.querySelectorAll(".nx-compare[data-dynamic]");
      old.forEach((n) => n.remove());
    }
    const oldSpec = rightAside?.querySelector(".nx-contrib-spec");
    if (oldSpec) oldSpec.remove();
  }

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display !== "none") closeModal();
  });

  function bindCards() {
    const cards = Array.from(DOC.querySelectorAll(".project-card"));
    cards.forEach((card) => {
      card.style.cursor = "pointer";
      card.addEventListener("click", (e) => {
        const target = e.target;
        if (
          target.closest(".slideshow-container .prev") ||
          target.closest(".slideshow-container .next")
        )
          return;
        openFromCard(card);
      });
    });
  }
  bindCards();
})();
