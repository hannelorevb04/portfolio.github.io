(() => {
  // ---------- helpers ----------
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const make = (t, c, p, b) => {
    const e = document.createElement(t);
    if (c) e.className = c;
    if (p) {
      b ? p.insertBefore(e, b) : p.appendChild(e);
    }
    return e;
  };
  const parseArr = (raw) => {
    try {
      const a = JSON.parse(raw || "[]");
      return Array.isArray(a) ? a : [];
    } catch {
      return [];
    }
  };
  const titleOf = (card) => card.getAttribute("data-title") || "Project";

  const getCover = (card) => {
    const img = card.querySelector(".overlap-group img");
    return img
      ? {
          src: img.getAttribute("src"),
          alt: img.getAttribute("alt") || titleOf(card),
        }
      : null;
  };

  // 1) Bronlijst voor de GRID:
  //    - Als data-inline-slides AANWEZIG is → gebruik die exact (ook als het [] is).
  //    - Anders leid voorzichtig af uit data-slides (iframe/video -> map/cover.png; http(s) -> cover).
  function getInlineSources(card) {
    const hasInline = card.hasAttribute("data-inline-slides");
    const fromInline = parseArr(card.getAttribute("data-inline-slides"))
      .map((s) =>
        String(s)
          .replace(/^image:/, "")
          .trim()
      )
      .filter(Boolean);
    if (hasInline) return fromInline; // expliciet: zelfs als het leeg is → niets in grid

    const cover = getCover(card)?.src || "";
    const fromSlides = parseArr(card.getAttribute("data-slides"));
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
        } // extern -> cover in grid
        const dir = url.replace(/\/[^\/]*$/, "/"); // lokaal -> map/cover.png
        out.push(dir + "cover.png");
        continue;
      }
      out.push(s); // plain image-pad
    }
    if (!out.length && cover) out.push(cover);
    return out;
  }

  // 2) Preload: alleen bestaande beelden, geen .jpg/.png wissel-trucs. Duplicaten eruit.
  async function prepareSources(card, rawList) {
    const load = (src) =>
      new Promise((res) => {
        if (!src) return res("");
        const im = new Image();
        im.onload = () => res(src);
        im.onerror = () => res(""); // kapot? skippen
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

  // ---------- builder ----------
  async function buildCard(card) {
    const host = card.querySelector(".overlap-group") || card;
    if (!host) return;

    // Geen iframes in de grid: vervang inline <iframe> door cover-image
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

    // bronnen ophalen + valideren
    let sources = await prepareSources(card, getInlineSources(card));

    // Minder dan 2 unieke images? Geen slideshow opbouwen (pijlen zouden niets doen)
    if (sources.length <= 1 || host.querySelector(".slideshow-container"))
      return;

    // Slideshow DOM
    const container = make("div", "slideshow-container", host, host.firstChild);
    const slidesWrap = make("div", "slides", container);

    sources.forEach((src, i) => {
      const slide = make(
        "div",
        "slide" + (i === 0 ? " active" : ""),
        slidesWrap
      );
      const img = make("img", "image", slide);
      img.src = src;

      // ALT voor a11y (korte, stabiele tekst)
      const t = titleOf(card);
      img.alt = `${t} – ${i + 1}`;

      img.decoding = "async";
      img.loading = i === 0 ? "eager" : "lazy";
    });

    // Navigatie + autoplay
    const nav = make("div", "slideshow-nav", container);
    const prev = make("button", "prev", nav);
    prev.type = "button";
    prev.innerHTML = svgArrow("prev");
    const next = make("button", "next", nav);
    next.type = "button";
    next.innerHTML = svgArrow("next");

    // Pijlen altijd klikbaar (overlay blokkeert niet)
    nav.style.pointerEvents = "none";
    prev.style.pointerEvents = next.style.pointerEvents = "auto";

    // Toetsenbord
    container.setAttribute("tabindex", "0");

    let idx = 0,
      total = sources.length,
      timer = null,
      hovering = false;
    const AUTO_MS = 3800;
    const slides = () => $$(".slide", slidesWrap);

    const show = (n) => {
      const arr = slides();
      arr[idx]?.classList.remove("active");
      idx = (n + total) % total;
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
      if (total > 1 && !hovering) {
        timer = setInterval(() => step(1), AUTO_MS);
      }
    };
    const restart = () => {
      stop();
      start();
    };

    // Directe click-handlers (betrouwbaar)
    prev.addEventListener("click", (e) => {
      e.stopPropagation();
      step(-1);
      restart();
    });
    next.addEventListener("click", (e) => {
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

    start();
  }

  function init() {
    $$(".project-card").forEach((card) => buildCard(card));
  }
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init);
  else init();
})();
