let start = document.querySelector('.button.start');
let breath = document.querySelector('#breath');
let scoreTime = document.querySelector("#scoreTime");

var score = 0;
var sec = 10;
var idsec;
var id;

start.addEventListener('click', begin);

function begin() {
  start.style.display = 'none';
  breath.style.display = 'block';

  breath.addEventListener("click", jump);

  score = 0;
  sec = 10;

  document.getElementById("scoreTime").innerHTML = "<b>Score:</b> " + score + " ‖ " + "<b>Resterende tijd:</b> " + sec;
  idsec = setInterval(aftellen, 1000);
  id = setInterval(jump2, 1000);
  setTimeout(stoppen, 10000);
}

function jump() {
  breath.style.display = 'none';
  score++;
  document.getElementById("scoreTime").innerHTML = "<b>Score:</b> " + score + " ‖ " + "<b>Resterende tijd:</b> " + sec;
}

function jump2() {
  breath.style.display = 'block';
  randomPlace();
}

function randomPlace() {
  var container = document.querySelector('header');
  var containerRect = container.getBoundingClientRect();
  var containerLeft = containerRect.left;
  var containerTop = containerRect.top;
  var containerWidth = container.offsetWidth;
  var containerHeight = container.offsetHeight;
  var breathWidth = breath.offsetWidth;
  var breathHeight = breath.offsetHeight;

  var leftRandom = Math.floor(Math.random() * (containerWidth - breathWidth));
  var topRandom = Math.floor(Math.random() * (containerHeight - breathHeight));

  breath.style.left = containerLeft + leftRandom + 'px';
  breath.style.top = containerTop + topRandom + 'px';
}

function stoppen() {
  clearInterval(id);
  clearInterval(idsec);

  breath.style.display = 'none';
  start.style.display = 'block';

  sec = 0;
  document.getElementById("scoreTime").innerHTML = "<b>Score:</b> " + score + " ‖ " + "<b>Resterende tijd:</b> " + sec;

  scoreTime.style.color = 'white';
  scoreTime.style.backgroundColor = 'red';
}

function aftellen() {
  sec--;
  document.getElementById("scoreTime").innerHTML = "<b>Score:</b> " + score + " ‖ " + "<b>Resterende tijd:</b> " + sec;
}
