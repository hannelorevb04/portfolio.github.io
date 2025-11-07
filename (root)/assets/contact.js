document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("footerContactForm");
  const popup = document.getElementById("popup");
  const close = document.getElementById("closePopup");
  let lastFocus = null;

  if (!form || !popup || !close) return;

  const showPopup = (text) => {
    if (text) popup.querySelector("p").textContent = text;
    lastFocus = document.activeElement;
    popup.style.display = "flex";
    document.body.classList.add("popup-open");
    close.focus();

    // trap Esc
    const onEsc = (e) => {
      if (e.key === "Escape") hidePopup();
    };
    popup.dataset.esc = "1";
    window.addEventListener("keydown", onEsc, { once: true });
  };

  const hidePopup = () => {
    popup.style.display = "none";
    document.body.classList.remove("popup-open");
    lastFocus && lastFocus.focus();
  };

  close.addEventListener("click", hidePopup);
  popup.addEventListener("click", (e) => {
    if (e.target === popup) hidePopup();
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const res = await fetch(form.action, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form),
    });
    form.reset();
    showPopup(
      res.ok
        ? "Thank you for contacting me. I’ll get back to you soon."
        : "Something went wrong. Please try again later."
    );
    // auto close after 4s (optional):
    // setTimeout(hidePopup, 4000);
  });
});
