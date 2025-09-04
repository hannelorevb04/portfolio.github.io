class Bullet{
    constructor(xCoord, yCoord){
        this.x = xCoord;
        this.y = yCoord;
        this.size = 7;
    }
    display(){
        push(); // start new drawing state
        noStroke();
        fill("red");
        ellipse(this.x, this.y, this.size);
        pop(); // restore original state
    }
    move(){
        this.y -= 10;
    }
    
    isHitting(obj){
        return collideCircleCircle(this.x, this.y, this.size, obj.x, obj.y, obj.size);
       
        
        }  
}        