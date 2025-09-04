/* nx-card-slideshow.js — hybride: inline of data-slides; images én iframes; pijlen + autoplay (geen dots) */
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
    if (parent)
      before ? parent.insertBefore(el, before) : parent.appendChild(el);
    return el;
  }

  // "iframe:URL|scale=0.8|x=-10px|y=8px"
  function parseIframeDef(def) {
    const out = { url: "", scale: null, x: null, y: null };
    if (typeof def !== "string" || !def.startsWith("iframe:")) return out;
    const parts = def.slice(7).split("|");
    out.url = (parts.shift() || "").trim();
    parts.forEach((p) => {
      const [k, v] = p.split("=").map((s) => (s || "").trim());
      if (k === "scale") out.scale = parseFloat(v);
      if (k === "x") out.x = v;
      if (k === "y") out.y = v;
    });
    return out;
  }

  // Bouw slideshow uit data-slides (als er geen inline container is)
  function buildFromData(card, host) {
    const list = parseSlides(card.getAttribute("data-slides")).filter(Boolean);
    if (list.length <= 1) return null;

    const container = make("div", "slideshow-container", host, host.firstChild);
    const slidesWrap = make("div", "slides", container);

    // Per-card defaults
    const dScale = parseFloat(card.getAttribute("data-iframe-scale") || "0.82");
    const dX = card.getAttribute("data-iframe-offset-x") || "0px";
    const dY = card.getAttribute("data-iframe-offset-y") || "0px";

    list.forEach((src, idx) => {
      const slide = make(
        "div",
        "slide" + (idx === 0 ? " active" : ""),
        slidesWrap
      );

      if (typeof src === "string" && src.startsWith("iframe:")) {
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
        // pointer-events uitzetten zodat hover/drag buiten iframe blijft
        ifr.style.pointerEvents = "none";
      } else {
        const img = make("img", "image", slide);
        img.src = src;
        img.decoding = "async";
        img.alt =
          (card.getAttribute("data-title") || "Project") + " – " + (idx + 1);
      }
    });

    const nav = make("div", "slideshow-nav", container);
    const prev = make("button", "prev", nav);
    prev.type = "button";
    prev.textContent = "‹";
    const next = make("button", "next", nav);
    next.type = "button";
    next.textContent = "›";

    return { container, slidesWrap, prev, next };
  }

  // Bedraad bestaande inline containers (.slideshow-container) in HTML
  function wireExisting(container) {
    const slidesWrap = container.querySelector(".slides");
    const prev = container.querySelector(".slideshow-nav .prev");
    const next = container.querySelector(".slideshow-nav .next");
    if (!slidesWrap || !prev || !next) return null;

    // Zorg dat alle items .slide hebben en precies 1 actief is
    const items = $$(".slides > *", container);
    items.forEach((el) => el.classList.add("slide"));
    if (!items.some((el) => el.classList.contains("active")) && items[0]) {
      items[0].classList.add("active");
    }
    return { container, slidesWrap, prev, next };
  }

  function attachLogic(api) {
    let idx = 0;
    let timer = null;
    let hovering = false;
    const AUTO_MS = 3800;

    const slides = () => $$(".slide", api.slidesWrap);

    // startpositie
    idx = Math.max(
      0,
      slides().findIndex((s) => s.classList.contains("active"))
    );
    if (idx === -1) idx = 0;

    function show(n) {
      const arr = slides();
      if (!arr.length) return;
      arr[idx]?.classList.remove("active");
      idx = (n + arr.length) % arr.length;
      arr[idx]?.classList.add("active");
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
      if (slides().length > 1 && !hovering)
        timer = setInterval(() => step(1), AUTO_MS);
    }
    function restart() {
      stop();
      start();
    }

    api.prev.addEventListener("click", (ev) => {
      ev.stopPropagation();
      step(-1);
      restart();
    });
    api.next.addEventListener("click", (ev) => {
      ev.stopPropagation();
      step(1);
      restart();
    });

    api.container.addEventListener("mouseenter", () => {
      hovering = true;
      stop();
    });
    api.container.addEventListener("mouseleave", () => {
      hovering = false;
      start();
    });

    // Toetsenbord (optioneel)
    api.container.setAttribute("tabindex", "0");
    api.container.addEventListener("keydown", (e) => {
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

  function buildCard(card) {
    const host = card.querySelector(".overlap-group") || card;

    // 1) Als er al een inline container is, gewoon bedraden
    const existing = host.querySelector(".slideshow-container");
    if (existing) {
      const api = wireExisting(existing);
      if (api) {
        attachLogic(api);
        return;
      }
    }

    // 2) Anders: proberen op te bouwen vanuit data-slides
    const api2 = buildFromData(card, host);
    if (api2) {
      attachLogic(api2);
    }
  }

  function init() {
    document.querySelectorAll(".project-card").forEach(buildCard);
  }
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init);
  else init();
})();

(function () {
  let currentLink = null;

  // Hulpfunctie: pak link uit data-link of uit "iframe:" slide
  function getLinkFromCard(card) {
    if (card.dataset.link && card.dataset.link !== "#")
      return card.dataset.link;
    try {
      const slides = JSON.parse(card.dataset.slides || "[]");
      const iframeSlide = slides.find(
        (s) => typeof s === "string" && s.startsWith("iframe:")
      );
      if (iframeSlide) return iframeSlide.replace(/^iframe:/, "").trim();
    } catch (e) {}
    return null;
  }

  // Als je op een project-card klikt (modal gaat open via jouw bestaande script),
  // onthouden we de link en zetten we de knop-status.
  document.addEventListener(
    "click",
    (e) => {
      const card = e.target.closest(".project-card");
      if (!card) return;

      currentLink = getLinkFromCard(card);

      const btn = document.getElementById("nxView");
      if (btn) {
        const enabled = !!currentLink;
        btn.disabled = !enabled;
        btn.setAttribute("aria-disabled", String(!enabled));
        btn.style.opacity = enabled ? "1" : "0.5";
        btn.style.pointerEvents = enabled ? "auto" : "none";
      }
    },
    true // capture: vóór bubbling scripts van je modal
  );

  // Klik op “View Project” => open in nieuw tabblad
  window.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("nxView");
    if (!btn) return;
    btn.addEventListener("click", (e) => {
      if (!currentLink) {
        e.preventDefault();
        return;
      }
      // open veilig in een nieuwe tab
      window.open(currentLink, "_blank", "noopener");
    });
  });
})();
