
class santaSleigh {
    constructor(x,y,speedX,speedY) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    }
    display(){
      image(ChristmasSleigh, this.x, this.y, 300, 150);
      this.x += this.speedX;
      this.y += this.speedY;
    }
  }