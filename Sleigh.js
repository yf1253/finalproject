
class santaSleigh {
    constructor(x,y,speedX,speedY) {
    this.x = x; // x location of the sleigh
    this.y = y; // y location of the sleigh
    this.speedX = speedX; // x axis speed
    this.speedY = speedY; // y axis speed
    }
    display(){
      image(ChristmasSleigh, this.x, this.y, 300, 150);
      this.x += this.speedX; //this.x = this.x + this.speedX
      this.y += this.speedY; //this.y = this.y + this.speedY
    }
  }