(function () {
  const selector = ".projects";
  const DRAG_MULTIPLIER = 2;

  function makeDrag(slider) {
    let isDown = false;
    let startX = 0;
    let scrollStart = 0;
    let moved = false;

    const addActive = () => slider.classList.add("active");
    const remActive = () => slider.classList.remove("active");

    // ----- helpers -----
    function canDrag() {
      return slider.dataset.mode === "rail"; // alleen drag op desktop/rail
    }

    // MOUSE
    slider.addEventListener("mousedown", (e) => {
      if (!canDrag()) return;
      isDown = true;
      moved = false;
      addActive();
      startX = e.pageX - slider.offsetLeft;
      scrollStart = slider.scrollLeft;
    });

    slider.addEventListener("mousemove", (e) => {
      if (!canDrag() || !isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * DRAG_MULTIPLIER;
      slider.scrollLeft = scrollStart - walk;
      if (Math.abs(walk) > 3) moved = true;
    });

    ["mouseup", "mouseleave"].forEach((ev) =>
      slider.addEventListener(ev, () => {
        isDown = false;
        remActive();
      })
    );

    // TOUCH
    slider.addEventListener(
      "touchstart",
      (e) => {
        if (!canDrag() || !e.touches[0]) return;
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
        if (!canDrag() || !isDown || !e.touches[0]) return;
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * DRAG_MULTIPLIER;
        slider.scrollLeft = scrollStart - walk;
        if (Math.abs(walk) > 3) moved = true;
      },
      { passive: true }
    );

    ["touchend", "touchcancel"].forEach((ev) =>
      slider.addEventListener(ev, () => {
        isDown = false;
        remActive();
      })
    );

    // klik annuleren na drag
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

  // Init
  function init() {
    document.querySelectorAll(selector).forEach(makeDrag);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

// ------- mode toggler -------
const rails = document.querySelectorAll(".projects");
const mq = matchMedia("(max-width: 900px)");

function setMode() {
  rails.forEach((r) => (r.dataset.mode = mq.matches ? "grid" : "rail"));
}
setMode();
mq.addEventListener("change", setMode);
