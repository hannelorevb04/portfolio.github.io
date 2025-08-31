// Click & Drag zoals in je voorbeeld – voor alle .projects rails
(function () {
  const selector = ".projects"; // pas aan indien nodig
  const DRAG_MULTIPLIER = 2; // zoals in je voorbeeld: *2

  function makeDrag(slider) {
    let isDown = false;
    let startX = 0;
    let scrollStart = 0;
    let moved = false;

    // helpers
    const addActive = () => slider.classList.add("active");
    const remActive = () => slider.classList.remove("active");

    // MOUSE
    slider.addEventListener("mousedown", (e) => {
      isDown = true;
      moved = false;
      addActive();
      startX = e.pageX - slider.offsetLeft;
      scrollStart = slider.scrollLeft;
    });

    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault(); // voorkomt text select/ghost drag
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * DRAG_MULTIPLIER;
      slider.scrollLeft = scrollStart - walk;
      if (Math.abs(walk) > 3) moved = true; // drempel
    });

    slider.addEventListener("mouseup", () => {
      isDown = false;
      remActive();
    });

    slider.addEventListener("mouseleave", () => {
      isDown = false;
      remActive();
    });

    // TOUCH
    slider.addEventListener(
      "touchstart",
      (e) => {
        if (!e.touches || !e.touches[0]) return;
        isDown = true;
        moved = false;
        addActive();
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollStart = slider.scrollLeft;
      },
      { passive: true }
    );

    slider.addEventListener(
      "touchmove",
      (e) => {
        if (!isDown || !e.touches || !e.touches[0]) return;
        // niet preventDefault zodat native momentum blijft, maar je kan het inschakelen:
        // e.preventDefault();
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * DRAG_MULTIPLIER;
        slider.scrollLeft = scrollStart - walk;
        if (Math.abs(walk) > 3) moved = true;
      },
      { passive: true }
    );

    slider.addEventListener("touchend", () => {
      isDown = false;
      remActive();
    });

    slider.addEventListener("touchcancel", () => {
      isDown = false;
      remActive();
    });

    // voorkom “klik” (bijv. modal openen) als je eigenlijk sleepte
    slider.addEventListener(
      "click",
      (e) => {
        if (moved) {
          e.preventDefault();
          e.stopPropagation();
          moved = false;
        }
      },
      true
    );
  }

  // Init voor alle rails
  function init() {
    document.querySelectorAll(selector).forEach(makeDrag);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

const rails = document.querySelectorAll(".projects");
const mq = matchMedia("(max-width: 900px)");

function setMode() {
  rails.forEach((r) => (r.dataset.mode = mq.matches ? "grid" : "rail"));
}
setMode();
mq.addEventListener("change", setMode);
