//soldier = spot
class Soldier {
    constructor(xCoord, yCoord, size, speed){
        this.x = random(50, windowWidth - 50);
        this.y = yCoord;
        this.size = 20;
        this.speed = 1;
        


    }
    display(){

        // ellipse(this.x, this.y, this.size, this.size); // tank hier?
        // push();
        // fill(0);
        // strokeWeight(1);
        // ellipse(this.x, this.y, this.size, this.size);
        // // line(this.x, this.y, this.x, this.y - 5);
        // pop();
        

    // vlak op colliding te vergemakkelijken
    ellipseMode(CENTER);
    noFill();
    noStroke();
    ellipse(this.x, this.y, 60, 25);
    //soldier 
       // lichaam
        push();
        fill(63, 79, 51);
        strokeWeight(1);
        ellipse(this.x, this.y, this.size + 50, this.size + 10);
        pop();

        //hoofd
        push();
        stroke(0);
        fill(63, 79, 51);
        circle(this.x, this.y, this.size + 17);
        pop();

        // //helm
        // push();
        // noStroke();
        // fill(63, 79, 51);
        // circle(200, 500, 25);
        // pop(); 
   
    }

    move(){
        this.y += this.speed;

        let radius = this.size/2;
        if(this.x > width + radius){ //zorgt dat bol terug in beeld kom, + radius zorgt dat bol als hij half over de lijn is aand e andere kant er half terug in komt 
            this.x = 0 - radius;
        }

        if(this.x < 0 - radius){ // zorgt dat bal terug verschijnt in beginpositie
            this.x = width + radius; 
        }

        if(this.y > height + radius){
            this.y = 0 - radius; 
        }

        if(this.y < 0 - radius){
            this.y = height; 
        }
    }

    
    isColliding(obj){ 
        let isHit = collideRectCircle(obj.x, obj.y, obj.size, obj.size, this.x, this.y, this.size); // eerst waarde rect daarna waarde circle
        
        return isHit;
        
    }

    shrink(){
        this.size -= 10; 
     }
}


  
