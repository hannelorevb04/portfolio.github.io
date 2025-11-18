window.addEventListener("DOMContentLoaded", function () {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function addRandomAnimation() {
    const flame = document.querySelector(".flame");
    if (flame) {
      const duration = getRandomInt(4, 8);
      const delay = getRandomInt(1, 5);

      const animationName =
        Math.random() < 0.5 ? "moveFlameExtra" : "enlargerFlameExtra";
      console.log("Selected animation:", animationName);

      flame.classList.remove("moveFlameExtra", "enLargeFlameExtra");

      flame.classList.add(animationName);
      flame.style.animationDelay = "${delay}s";
    }
  }
  addRandomAnimation();

  function addRandomAnimationInterval() {
    addRandomAnimation();
    setInterval(addRandomAnimation, getRandomInt(5000, 15000));
  }

  addRandomAnimationInterval();
});

var cards = new Array();
cards = [
  "How nice...",
  "Okay, let's blow it out.",
  "Go on!",
  "I can see it moving..Are you trying?",
  "Hmm maybe try harder?",
  "I know it is cosy, but i want some darkness.",
];

var b = -1;
var currentText;
function cardCounter() {
  b++;
  if (b < cards.length) {
    currentText = cards[b];
    document.getElementById("text").innerHTML = currentText;
  } else {
    b = -1;
    clearInterval(intervalTimer);
  }
}

var intervalTimer = setInterval(function () {
  cardCounter();
}, 5000);
