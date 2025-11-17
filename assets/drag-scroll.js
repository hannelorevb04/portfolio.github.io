// drag-scroll.js
(function () {
  const selector = ".projects";
  const DRAG_MULTIPLIER = 1; // <<< minder gevoelig, meer "per pixel"

  function makeDrag(slider) {
    let isDown = false;
    let startX = 0;
    let scrollStart = 0;
    let moved = false;

    const addActive = () => slider.classList.add("is-dragging");
    const remActive = () => slider.classList.remove("is-dragging");

    function canDrag() {
      // op desktop drag / rail, op mobiel gewoon normaal scrollen
      return !window.matchMedia("(max-width: 900px)").matches;
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
      if (Math.abs(walk) > 2) moved = true;
    });

    ["mouseup", "mouseleave"].forEach((ev) =>
      slider.addEventListener(ev, () => {
        isDown = false;
        remActive();
      })
    );

    // TOUCH (voor tablets / mobiel)
    slider.addEventListener(
      "touchstart",
      (e) => {
        if (!e.touches[0]) return;
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
        if (!isDown || !e.touches[0]) return;
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * DRAG_MULTIPLIER;
        slider.scrollLeft = scrollStart - walk;
        if (Math.abs(walk) > 2) moved = true;
      },
      { passive: true }
    );

    ["touchend", "touchcancel"].forEach((ev) =>
      slider.addEventListener(ev, () => {
        isDown = false;
        remActive();
      })
    );

    // klik annuleren na echt slepen
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

  function init() {
    document.querySelectorAll(selector).forEach(makeDrag);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
