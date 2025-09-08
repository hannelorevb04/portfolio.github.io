(function () {
  const form = document.getElementById("footerContactForm");
  const popup = document.getElementById("popup");
  const closeBtn = document.getElementById("closePopup");

  function toURLEncoded(fd) {
    const p = new URLSearchParams();
    for (const [k, v] of fd.entries()) p.append(k, v);
    return p.toString();
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    if (!fd.get("form-name")) fd.set("form-name", "contact");

    if ((fd.get("bot-field") || "").trim() !== "") {
      form.reset();
      popup.style.display = "flex";
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
        popup.style.display = "flex";
      } else {
        alert("Something went wrong, please try again.");
      }
    } catch {
      alert("Something went wrong, please try again.");
    }
  });

  closeBtn.addEventListener("click", () => (popup.style.display = "none"));
})();
