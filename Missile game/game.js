// met deze queryselectors opvoorhand te declareren, word de code makkelijker leesbaar en aanpasbaar
var startgame = document.querySelector(".start"); 
var startscreen = document.querySelector(".startscreen");
var bg = document.querySelector('.bg');
var center = document.querySelector(".center");
var boat = document.querySelector('.boat');
var shell = document.querySelector('.shell');
var topShell = -1500;
var leftShell = Math.random()*600; // dit is nodig om de collide uit te kunnen voeren
var gameover = document.querySelector(".gameover");
var gameoverscore = document.querySelector(".gameoverscore");
var levenseinde = document.querySelector(".levens");
var explode = document.querySelector(".explode");
var scoreboard = document.querySelector(".score");    
var score = 0; // score in het begin start op 0

shell.style.left = leftShell + "px"; // zorgt dat de random waarde van hierboven, in de css geïmplementeerd kan worden
shell.style.top = topShell + "px"; // zorgt dat de waarde van hierboven, in de css geïmplementeerd kan worden

var aantallevens = 3; // levens starten op 3
var snelheid = 1;

var leftPos = Math.random()*600; // zorgt dat de boot altijd op een andere plaats op de x-as begint
var topPos=	-800; // zorgt dat de boot, onderaan het scherm staat
boat.style.top = topPos + "px"; // zorgt dat de waarde van hierboven, in de css geïmplementeerd kan worden
boat.style.left = leftPos + "px"; // zorgt dat de random waarde van hierboven, in de css geïmplementeerd kan worden
bg.style.visibility = "hidden"; // background-image is niet te zien as het scherm niet gestart is
center.style.backgroundColor = "lightblue"; // geeft de achtergrond een blauw kleurtje
boat.style.visibility = "hidden"; // boat is niet zichtbaar
shell.style.visibility = "hidden"; // shell is niet zichtbaar

var teller = 0;

var id;

startgame.addEventListener("click", begin);     
function begin(){
    id = setInterval(move, 5) ;
    startscreen.style.visibility = "hidden"; //startscherm niet meer zichtbaar
    bg.style.visibility = "visible"; // background tonen
    boat.style.visibility = "visible"; // boat tonen
    shell.style.visibility = "visible"; // shell tonen
    document.querySelector(".levens").innerHTML = "❤️ " + aantallevens; // geeeft aantal levens weer
    document.querySelector(".score").innerHTML = "🐚 " + score; // geeft score weer
}   

function move() {	
    topShell++;
	if( collision (leftShell, topShell, 75, 75, leftPos, topPos, 75, 75)==true){ //collision zorgt ervoor dat wanneer shell en boat tegen elkaar botsen, er een punt af gaat
        aantallevens--; // wanneer de boat en shell tegen elkaar komen, gaat er 1 leven af
		document.querySelector(".levens").innerHTML = "❤️ " + aantallevens; // geeft het aantal levens weer
		if(aantallevens == 0){ // als het aantal leven 0 is, komt het gameover scherm tevoorschijn met de finale score, en gaan de boat en shell weg 
        gameover.style.visibility = "visible";
        gameoverscore.style.visibility = "visible";
        document.querySelector(".gameoverscore").innerHTML = "🎯" + "<br>" + "Finale score: " + score;
        levenseinde.style.visibility = "hidden";
        shell.style.visibility = "hidden";
        boat.style.visibility = "hidden";
        scoreboard.style.visibility = "hidden"; 
		stoppen();  
		}
        // volgende code zorgt ervoor dat er telkens maar 1 punt af gaat
		topShell = -10; 
		leftShell = Math.random()*350;
		shell.style.left = leftShell + "px";	
}
    //zorgt dat wanneer de schelp uit het beeld verdwijnt, hij terug bovenaan op een random positie komt, als je beneden gepassert bent, krijg je 1 punt
	shell.style.top = topShell + "px";
	if(topShell>-700){
		topShell = -1500;
		leftShell = Math.random()*350;
		shell.style.left = leftShell + "px";
        score++;
        
        document.querySelector(".score").innerHTML = "🐚 " + score;
	}
	

    //zorgt dat boot niet uit het vlak gaat
	if(topPos>750){
		boat.style.left = leftPos + "px"; 
		topPos=0;
	}	
    
}

// zorgt dat je met de pijltjes de boat kan besturen
window.addEventListener('keydown', onKeyboardEvent, false);
var keycode = {
  LEFT: 37,
  RIGHT: 39
  };

 function onKeyboardEvent (event) {
  switch (event.keyCode) {
	case keycode.LEFT: // zorgt dat de boat naar links gaat
        leftPos-= 10; 
        if(leftPos >= 0){
            boat.style.left = leftPos + "px";
        }
		
    break;
	   case keycode.RIGHT: // zorgt dat de boat naar rechts gaat
        leftPos += 10;
        if(leftPos <= 500 ){
           boat.style.left = leftPos + "px"; 
        }
		
    break;
  }
 }


function collision(x1,y1,w1,h1,x2,y2,w2,h2){ 
    if (
        ((x1 + w1 - 1) < x2) ||
        ((x2 + w2 - 1) < x1) ||
        ((y1 + h1 - 1) < y2) ||
        ((y2 + h2 - 1) < y1)
        ){
		return false;	 
	}
	else {
		return true;
	}
}

function stoppen(){
    clearInterval(id);
    }
