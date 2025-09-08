(function () {
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  function parseSlides(raw) {
    if (!raw) return [];
    try {
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  }

  function make(tag, cls, parent, before) {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (parent) {
      if (before) parent.insertBefore(el, before);
      else parent.appendChild(el);
    }
    return el;
  }

  function parseIframeDef(def) {
    // "iframe:URL|scale=0.8|x=-10px|y=8px"
    const out = { url: "", scale: null, x: null, y: null };
    if (typeof def !== "string") return out;
    if (!def.startsWith("iframe:")) return out;
    const rest = def.slice(7);
    const parts = rest.split("|");
    out.url = (parts.shift() || "").trim();
    parts.forEach((p) => {
      const [k, v] = p.split("=").map((s) => (s || "").trim());
      if (!k) return;
      if (k === "scale") out.scale = parseFloat(v);
      if (k === "x") out.x = v;
      if (k === "y") out.y = v;
    });
    return out;
  }

  /* afgeronde pijlen als SVG, kleuren via CSS (currentColor) */
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

  function buildCard(card) {
    const list = parseSlides(card.getAttribute("data-slides")).filter(Boolean);
    if (list.length <= 1) return; // geen slideshow nodig

    const host = card.querySelector(".overlap-group") || card;
    if (!host) return;
    if (host.querySelector(".slideshow-container")) return;

    // clear single preview
    host
      .querySelectorAll("img.image, iframe.image")
      .forEach((el) => el.remove());

    // Insert first
    const container = make("div", "slideshow-container", host, host.firstChild);
    const slidesWrap = make("div", "slides", container);

    // Per-card defaults
    const dScale = parseFloat(card.getAttribute("data-iframe-scale") || "0.82");
    const dX = card.getAttribute("data-iframe-offset-x") || "0px";
    const dY = card.getAttribute("data-iframe-offset-y") || "0px";

    // Build slides
    list.forEach((src, idx) => {
      const isIframe = typeof src === "string" && src.indexOf("iframe:") === 0;
      const slide = make(
        "div",
        "slide" + (idx === 0 ? " active" : ""),
        slidesWrap
      );

      if (isIframe) {
        const info = parseIframeDef(src);
        const scaler = make("div", "iframe-scaler", slide);
        scaler.style.setProperty(
          "--scale",
          String(
            info.scale && info.scale > 0 && info.scale <= 1
              ? info.scale
              : dScale
          )
        );
        scaler.style.setProperty("--tx", info.x != null ? info.x : dX);
        scaler.style.setProperty("--ty", info.y != null ? info.y : dY);

        const ifr = make("iframe", "image", scaler);
        ifr.src = info.url;
        ifr.setAttribute("frameborder", "0");
        ifr.setAttribute("scrolling", "no");
        ifr.setAttribute("loading", "eager");
        ifr.title =
          (card.getAttribute("data-title") || "Project") + " – " + (idx + 1);
        ifr.style.pointerEvents = "none";
      } else {
        const img = make("img", "image", slide);
        img.src = src;
        img.alt =
          (card.getAttribute("data-title") || "Project") + " – " + (idx + 1);
        img.decoding = "async";
      }
    });

    // Alleen pijlen (geen dots) — SVG inside
    const nav = make("div", "slideshow-nav", container);

    const prev = make("button", "prev", nav);
    prev.type = "button";
    prev.setAttribute("aria-label", "Previous");
    prev.innerHTML = svgArrow("prev");

    const next = make("button", "next", nav);
    next.type = "button";
    next.setAttribute("aria-label", "Next");
    next.innerHTML = svgArrow("next");

    let idx = 0,
      total = list.length,
      timer = null,
      hovering = false;
    const AUTO_MS = 3800;

    function show(n) {
      const slides = $$(".slide", slidesWrap);
      slides[idx]?.classList.remove("active");
      idx = (n + total) % total;
      slides[idx]?.classList.add("active");
    }
    function step(d) {
      show(idx + d);
    }
    function stop() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }
    function start() {
      if (total > 1 && !hovering) {
        timer = setInterval(() => step(1), AUTO_MS);
      }
    }
    function restart() {
      stop();
      start();
    }

    prev.addEventListener("click", (ev) => {
      ev.stopPropagation();
      step(-1);
      restart();
    });
    next.addEventListener("click", (ev) => {
      ev.stopPropagation();
      step(1);
      restart();
    });

    container.addEventListener("mouseenter", () => {
      hovering = true;
      stop();
    });
    container.addEventListener("mouseleave", () => {
      hovering = false;
      start();
    });

    // Toetsenbord-ondersteuning (optioneel, handig)
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

    start();
  }

  function init() {
    document.querySelectorAll(".project-card").forEach(buildCard);
  }
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init);
  else init();
})();
