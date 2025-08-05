// tank = player 

class Tank {
    constructor(xCoord, yCoord){
        this.x = xCoord;
        this.y = yCoord;
        this.size = 10;
        // this.speed = 0.2;
        this.moveDir = 5;
        this.points = 0;
        
    }


    display(){

    //vlak om colliding te vergemakkelijken 

    push();
    rectMode(CENTER);
    noFill();
    // fill("white");
    noStroke();
    
    rect(this.x + 60, this.y + 50 , 50, 5); // bij rectMode corner
    // rect(this.x + 50, this.y + 125, 85, 125); // bij rectMode center
    pop();
        
    //wielen
    push();
    strokeWeight(2);
    fill(0);
    circle(this.x + 20, this.y + 115, this.size + 5); // linker boven wiel
    circle(this.x + 84, this.y + 115, this.size + 5); // rechter boven wiel
    circle(this.x + 84, this.y + 160, this.size + 5); // rechter onder wiel
    circle(this.x + 20, this.y + 160, this.size + 5); // linker onder wiel
    pop();

    // circle(this.x * 2.05, this.y * 1.25, this.size * 1.5); // linker boven wiel
    // circle(this.x * 1.55, this.y * 1.25, this.size * 1.5); // rechter boven wiel
    // circle(this.x * 2.05, this.y * 1.55, this.size * 1.5); // rechter onder wiel
    // circle(this.x * 1.55, this.y * 1.55, this.size * 1.5); // linker onder wiel
    // pop();

  


    //body
    push();
    fill(63, 79, 51);
    // rect(this.x * 1.55, this.y * 1.055, this.size * 5, this.size * 6.5 );
    rect(this.x + 19, this.y + 95 , this.size + 55, this.size + 75 );
    // rectMode(CENTER);
    pop();

    //canon
    push();
    fill(0);
        strokeWeight(2);
    circle(this.x + 51, this.y + 135, this.size + 20);  
        // strokeWeight(4);
    // line(this.x + 50, this.y + 85, this.x + 50, this.y + 135);  
    rect(this.x + 47, this.y + 60, 7, 35);
    pop();
    

    //punten
    push();
    textSize(24);
    fill(0);
        textAlign(LEFT, TOP);
        text("points: " + this.points, 15, 15);
    pop();

    
    }

    move(){
        //this.y  += 1;
       
            // this.y -= this.speed;
            
        
            if(keyIsDown(LEFT_ARROW)){ //left
                this.x = this.x - this.moveDir;
            }
    
            if(keyIsDown(RIGHT_ARROW)){ //right
                this.x = this.x + this.moveDir;
            }     
    }

    addPoints(amount){
        this.points += amount;
    }
}