
class santaSleigh {
    constructor(x,y,speedX,speedY) {
    this.x = x; // x location of the sleigh
    this.y = y; // y location of the sleigh
    this.speedX = speedX; // x axis speed
    this.speedY = speedY; // y axis speed
    this.dir = 1; //sleigh direction 
    }
    display(){
    // if direction is positive, sleigh facing left
    if (this.dir == 1){
      image(SleighLeft, this.x, this.y, 300, 150);
      this.x += this.speedX; //this.x = this.x + this.speedX
      this.y += this.speedY; //this.y = this.y + this.speedY
      }
    // if direction is negative, sleigh facing right
    if (this.dir == -1){
      image(SleighRight, this.x, this.y, 300, 150);
      this.x += this.speedX; //this.x = this.x + this.speedX
      this.y += this.speedY; //this.y = this.y + this.speedY
      } 
    }
    
    flyLeft(){
      this.dir = 1;
      }
    flyRight(){
      this.dir = -1;
      }
  }