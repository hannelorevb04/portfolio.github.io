// Netlify submit + popup — werkt overal waar footer.html is ingevoegd
(function () {
  function toURLEncoded(fd) {
    const p = new URLSearchParams();
    for (const [k, v] of fd.entries()) p.append(k, v);
    return p.toString();
  }

  function init() {
    const form = document.getElementById("footerContactForm");
    const popup = document.getElementById("popup");
    const close = document.getElementById("closePopup");
    if (!form) return; // geen footer op deze pagina

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      if (!fd.get("form-name")) fd.set("form-name", "contact");

      // Honeypot => doe alsof OK
      if ((fd.get("bot-field") || "").trim() !== "") {
        form.reset();
        popup && (popup.style.display = "flex");
        return;
      }

      try {
        const res = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: toURLEncoded(fd),
        });

        if ([200, 201, 202, 204, 302, 303].includes(res.status)) {
          form.reset();
          popup && (popup.style.display = "flex");
        } else {
          console.error(
            "Netlify submit failed:",
            res.status,
            await res.text().catch(() => "")
          );
          alert("Something went wrong, please try again.");
        }
      } catch (err) {
        console.error("Network/JS error:", err);
        alert("Something went wrong, please try again.");
      }
    });

    close &&
      close.addEventListener("click", () => (popup.style.display = "none"));
  }

  // Init na injectie
  document.addEventListener("DOMContentLoaded", () => {
    // init kan direct, insert-components laadt dit script pas na injecties
    init();
  });
})();
