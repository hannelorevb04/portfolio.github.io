// Injecteert componenten in elementen met [data-include="..."]
// en laadt daarna contact.js exact één keer.
(function () {
  async function includeInto(el) {
    const url = el.getAttribute("data-include");
    if (!url) return;
    try {
      const resp = await fetch(url, { credentials: "same-origin" });
      if (!resp.ok) throw new Error("HTTP " + resp.status);
      el.innerHTML = await resp.text();
    } catch (e) {
      console.error("Include failed:", url, e);
    }
  }

  function loadScriptOnce(src) {
    if ([...document.scripts].some((s) => s.src.includes(src))) return;
    const s = document.createElement("script");
    s.src = src;
    s.defer = true;
    document.body.appendChild(s);
  }

  window.addEventListener("DOMContentLoaded", async () => {
    const includes = document.querySelectorAll("[data-include]");
    await Promise.all([...includes].map(includeInto));
    // >>> Belangrijk: pad komt overeen met jouw map
    loadScriptOnce("assets/js/contact.js");
  });
})();
