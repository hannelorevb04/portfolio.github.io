let s1;
let s2;
let s3;

// let t1 = new Tank(400, 625);

let soldiers;
let tank;
let gameOver;
let bullets = []; // array om alle bullets in op te slagen, bullets die dan iets geraakt hebben kunnen makkelijk verwijdert worden
// let gunShot;
// let soldierHit; 

// function preload(){
//   gunShot = loadSound("gun_shot_3.mp3");
//   soldierHit = loadSound("person_shot.mp3");
// }

function setup(){
  createCanvas(windowWidth, windowHeight);
  tank = new Tank(windowWidth/2, 595);    
  console.log(tank);

  // s1 = new Soldier(100, 0);
  // s2 = new Soldier(125, 0);
  // s3 = new Soldier(115, 0);
  // soldiers = [s1, s2];
  soldiers = [];
  // console.log(soldiers);
  setInterval(newSoldier, 7000);
  gameOver = false;
};



function draw(){
  background("lightgrey");


  if (gameOver == false){ // als er geen gameOver is, wordt tank getoont en verplaatst
      tank.display();
      tank.move();

      for(let i = 0; i < bullets.length; i++){ // bullets tonen en verplaatsen 
        bullets[i].display();
        bullets[i].move();
        // console.log(bullets);
      }

    if(soldiers.length <= 2){ // wanneer maar 2 soldiers op scherm, soldier bijvoegen
      newSoldier();
      // newSoldier();
      // s3.display();
      // s3.move();
    }

    for(let i = 0; i < soldiers.length; i++){ // soldiers tonen en verplaatsen
      soldiers[i].display();
      soldiers[i].move();
      if(soldiers[i].isColliding(tank)){ // als tank soldier aanraakt --> game over 
        console.log(i + " is hit");
        gameOver = true;
      }

      for (let j = 0; j < bullets.length; j++){
        if (bullets[j].isHitting(soldiers[i])){
          soldiers[i].shrink();
          tank.addPoints(50);
          bullets.splice(j, 1);// splice = objecten verwijderen
          // playSound();
          // keyTyped();
          // gunShot.play();
          // soldierHit.play();
          
         }
      }      
    }    

    for (let i = 0; i < soldiers.length; i ++){
      if(soldiers[i].size < 10){
        soldiers.splice(i, 1);
        tank.addPoints(50);
        // if (soldierHit.isPlaying()) {// .isPlaying() returns a boolean
        //   soldierHit.stop();
        //   gunShot.stop();  
        // } 
        // else {
        //   soldierHit.play();
        // }
      }
    }
 
  
    
    } 
    else{
      push(); // start new drawing state
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(32);
        text("GAME OVER", width/2, height/2) // /2, want in midden
        pop(); // restore original state
    }
  

    // if (keyCode == 32) {
    //   gunShot.play();
    //   }


  // s1.display();
  // s2.display();
  // s1.move();
  // s2.move();
  // t1.display();
  // t1.move();
  
}

function newSoldier(){
  let xPos;
  let yPos;
  // let size = 25;
  // let speed = 1;

  xPos = round(random(50, windowWidth - 50));
  yPos = 0;

  const soldier = new Soldier(xPos, yPos);
  soldiers.push(soldier);
}

//restart game when presseing enter
function keyPressed(e){ //e = event 
  e.preventDefault();
  if(gameOver && e.keyCode == 13){ // keyCode = kijken welke code een toets heeft
      soldiers = [];
      bullets = [];
      tank = new Tank(width/2 - 15, 595);
      gameOver = false;
  }
  if(e.keyCode == 32 && gameOver == false){ 
      const tankX = tank.x + tank.size/2 + 45 
      const tankY = tank.y + tank.size/2 + 75
      const b = new Bullet(tankX, tankY - 25); // b = bullet 
      // gunShot.play();
      bullets.push(b)
  }
}

// function playSound(e) {
//   e.preventDefault();
//   if(e.keycode === 32){
//     if (gunShot.isPlaying()) {
//     // .isPlaying() returns a boolean
//     gunShot.stop();
    
//   } else {
//     gunShot.play();
    
//   }
//   }
// }

// function keyTyped() {
//   if (key === 32) {
//     sound.play();
//   } 
// }