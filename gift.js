// The game needs more than one gift, therefore constructor
class gift {
  constructor(x, y, xSpeed, ySpeed, giftSize) {
    
    this.x = x;
    this.y = y;
    this.size = giftSize;
    this.velx = xSpeed;
    this.vely = ySpeed;
    this.hits = 0; //for setting game over when gift hits ground
  }
  display() {
    image(giftImage, this.x, this.y, 50, 50);

    this.x = this.x + this.velx;
    this.y = this.y + this.vely;

   // Wrap around if the gift runs out of screen
    if (this.x > width + this.size / 2) {
      this.x = 0 - this.size / 2;
    }
    if (this.x < 0 - this.size / 2) {
      this.x = width + this.size / 2;
    }
    //If the gift hits the bottom of the screen, it's game over
    if (this.y > height + this.size / 2) {
      screen = "screen3";

    }
  }
}
