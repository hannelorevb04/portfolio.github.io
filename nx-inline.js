(() => {
  // ---------- helpers ----------
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const $ = (s, c = document) => c.querySelector(s);
  const make = (tag, cls, parent, before) => {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (parent)
      before ? parent.insertBefore(el, before) : parent.appendChild(el);
    return el;
  };
  const parseArr = (raw) => {
    if (raw == null) return [];
    try {
      const a = JSON.parse(raw);
      return Array.isArray(a) ? a : [];
    } catch {
      // fallback: "a,b,c"
      return String(raw)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
  };
  const titleOf = (card) => card.getAttribute("data-title") || "Project";
  const svgArrow = (dir /* 'prev' | 'next' */) => `
    <svg viewBox="0 0 24 24" width="20" height="20"
         fill="none" stroke="currentColor" stroke-width="3"
         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      ${
        dir === "prev"
          ? '<polyline points="15 18 9 12 15 6" />'
          : '<polyline points="9 18 15 12 9 6" />'
      }
    </svg>`;

  const getCover = (card) => {
    const img = card.querySelector(".overlap-group img");
    return img
      ? {
          src: img.getAttribute("src"),
          alt: img.getAttribute("alt") || titleOf(card),
        }
      : null;
  };

  // Grid-bronnen bepalen:
  // - Als data-inline-slides bestaat → exact die gebruiken (zelfs [] = niets)
  // - Anders afleiden uit data-slides (iframe/video → cover.png of externe cover)
  function getInlineSources(card) {
    const hasInline = card.hasAttribute("data-inline-slides");
    const fromInline = parseArr(card.getAttribute("data-inline-slides"))
      .map((s) =>
        String(s)
          .replace(/^image:/, "")
          .trim()
      )
      .filter(Boolean);
    if (hasInline) return fromInline;

    const fromSlides = parseArr(card.getAttribute("data-slides"));
    const cover = getCover(card)?.src || "";
    const out = [];
    for (const def of fromSlides) {
      const s = String(def || "").trim();
      if (!s) continue;

      if (s.startsWith("image:")) {
        out.push(s.slice(6));
        continue;
      }

      if (s.startsWith("iframe:") || s.startsWith("video:")) {
        const url = s.replace(/^(iframe:|video:)/, "").trim();
        if (/^https?:\/\//i.test(url)) {
          out.push(cover);
          continue;
        } // extern → cover
        const dir = url.replace(/\/[^\/]*$/, "/"); // lokaal → map/cover.png
        out.push(dir + "cover.png");
        continue;
      }
      out.push(s); // gewoon image-pad
    }
    if (!out.length && cover) out.push(cover);
    return out;
  }

  // Preload/validate + unieke lijst
  async function prepareSources(card, rawList) {
    const load = (src) =>
      new Promise((res) => {
        if (!src) return res("");
        const im = new Image();
        im.onload = () => res(src);
        im.onerror = () => res("");
        im.src = src;
      });
    const uniq = new Set();
    const out = [];
    for (const s of rawList) {
      const ok = await load(s);
      if (!ok || uniq.has(ok)) continue;
      uniq.add(ok);
      out.push(ok);
    }
    return out;
  }

  // Slider bedraden (pijlen, keyboard, hover-pause, swipe)
  function wireSlider(container, slidesWrap) {
    // Zorg voor precies één .active
    const slides = () => $$(".slide", slidesWrap);
    if (
      slides().length &&
      !slides().some((s) => s.classList.contains("active"))
    ) {
      slides()[0].classList.add("active");
    }

    // Nav maken als die ontbreekt
    let nav = $(".slideshow-nav", container);
    if (!nav) {
      nav = make("div", "slideshow-nav", container);
      const prev = make("button", "slideshow-prev", nav);
      prev.type = "button";
      prev.innerHTML = svgArrow("prev");
      const next = make("button", "slideshow-next", nav);
      next.type = "button";
      next.innerHTML = svgArrow("next");
    }
    const prevBtn = $(".slideshow-prev", nav);
    const nextBtn = $(".slideshow-next", nav);

    // Zichtbaarheid nav bij < 2 slides
    nav.style.display = slides().length < 2 ? "none" : "";

    // Overlay blokkeert niet
    nav.style.pointerEvents = "none";
    prevBtn.style.pointerEvents = nextBtn.style.pointerEvents = "auto";

    // Keyboard + autoplay + hover-pause
    container.setAttribute("tabindex", "0");
    let idx = Math.max(
      0,
      slides().findIndex((s) => s.classList.contains("active"))
    );
    if (idx < 0) idx = 0;
    let hovering = false,
      timer = null;
    const AUTO_MS = 3800;

    const show = (n) => {
      const arr = slides();
      arr[idx]?.classList.remove("active");
      idx = (n + arr.length) % arr.length;
      arr[idx]?.classList.add("active");
    };
    const step = (d) => show(idx + d);
    const stop = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };
    const start = () => {
      if (slides().length > 1 && !hovering)
        timer = setInterval(() => step(1), AUTO_MS);
    };
    const restart = () => {
      stop();
      start();
    };

    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      step(-1);
      restart();
    });
    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      step(1);
      restart();
    });

    container.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        step(-1);
        restart();
      }
      if (e.key === "ArrowRight") {
        step(1);
        restart();
      }
    });
    container.addEventListener("mouseenter", () => {
      hovering = true;
      stop();
    });
    container.addEventListener("mouseleave", () => {
      hovering = false;
      start();
    });

    // Swipe
    let sx = null;
    slidesWrap.addEventListener(
      "touchstart",
      (e) => {
        sx = e.touches[0].clientX;
      },
      { passive: true }
    );
    slidesWrap.addEventListener(
      "touchend",
      (e) => {
        if (sx == null) return;
        const dx = e.changedTouches[0].clientX - sx;
        if (Math.abs(dx) > 30) step(dx < 0 ? 1 : -1);
        sx = null;
        restart();
      },
      { passive: true }
    );

    start();
  }

  // --------- hoofd: per kaart bouwen/aanvullen ----------
  async function buildCard(card) {
    const host = card.querySelector(".overlap-group") || card;
    if (!host) return;

    // In de grid tonen we geen inline iframes: vervang ze door cover-image
    const ifr = host.querySelector("iframe.image, iframe.iframe-project");
    if (ifr) {
      const cov = getCover(card);
      const img = make("img", "image");
      if (cov) {
        img.src = cov.src;
        img.alt = (cov.alt || titleOf(card)) + " – cover";
      }
      ifr.replaceWith(img);
    }

    // Bronnen verzamelen en valideren
    const sources = await prepareSources(card, getInlineSources(card));

    // Bestaat er al een container in de HTML?
    let container = $(".slideshow-container", host);
    if (container) {
      // Zorg dat .slides bestaat
      let slidesWrap = $(".slides", container);
      if (!slidesWrap)
        slidesWrap = make("div", "slides", container, container.firstChild);

      // Bestaande slides normaliseren naar <img class="image slide">
      $$(".slides img", container).forEach((im) =>
        im.classList.add("slide", "image")
      );

      // Huidige src's noteren
      const existingSrcs = $$(".slides .slide", container)
        .map((s) =>
          s.tagName === "IMG"
            ? s.getAttribute("src")
            : $("img", s)?.getAttribute("src")
        )
        .filter(Boolean);

      // Eerste slide active als er nog geen active is
      if (
        !$(".slides .slide.active", container) &&
        $(".slides .slide", container)
      ) {
        const first = $(".slides .slide", container);
        if (first) first.classList.add("active");
      }

      // Voeg ontbrekende sources toe
      sources.forEach((src, i) => {
        if (existingSrcs.includes(src)) return;
        const img = make("img", "image slide", slidesWrap);
        img.src = src;
        img.alt = `${titleOf(card)} – ${existingSrcs.length + i + 1}`;
        img.decoding = "async";
        img.loading = "lazy";
      });

      // Nav + gedrag bedraden
      wireSlider(container, slidesWrap);
      return;
    }

    // Geen container aanwezig → opbouwen alleen bij ≥2 unieke images
    if (sources.length <= 1) return;

    container = make("div", "slideshow-container", host, host.firstChild);
    const slidesWrap = make("div", "slides", container);

    sources.forEach((src, i) => {
      const img = make(
        "img",
        "image slide" + (i === 0 ? " active" : ""),
        slidesWrap
      );
      img.src = src;
      img.alt = `${titleOf(card)} – ${i + 1}`;
      img.decoding = "async";
      img.loading = i === 0 ? "eager" : "lazy";
    });

    wireSlider(container, slidesWrap);
  }

  function init() {
    $$(".project-card").forEach((card) => buildCard(card));
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init);
  else init();
})();

/* === Safeguard: zorg dat nav weg is bij < 2 slides en dat er altijd 1 'active' is === */
(() => {
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  function tidy() {
    $$(".project-card .slideshow-container").forEach((sc) => {
      const slides = sc.querySelectorAll(".slides .slide");
      const nav = sc.querySelector(".slideshow-nav");
      if (
        slides.length &&
        ![...slides].some((s) => s.classList.contains("active"))
      ) {
        slides[0].classList.add("active");
      }
      if (nav) nav.style.display = slides.length < 2 ? "none" : "";
    });
  }
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", tidy);
  else tidy();
})();
