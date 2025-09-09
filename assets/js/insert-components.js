// Injecteert HTML "componenten" in elementen met [data-include="pad/naar/file.html"]
// en laadt vervolgens contact.js één keer.
(function () {
  async function includeInto(el) {
    const url = el.getAttribute("data-include");
    if (!url) return;
    try {
      const resp = await fetch(url, { credentials: "same-origin" });
      if (!resp.ok) throw new Error("HTTP " + resp.status);
      const html = await resp.text();
      el.innerHTML = html;
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
    // Na injecties: laad contact.js precies één keer (zo werkt popup+submit overal)
    loadScriptOnce("assets/js/contact.js");
  });
})();
