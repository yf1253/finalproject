class FallingGift {
    constructor(x,y,xs,ys,giftsize) {
      // Definition of gifts values
      this.x = x;// x location
      this.y = y;//y location
      this.xSpeed = xs;//x speed value
      this.ySpeed = ys;//y speed value
      this.size = giftsize;//gift size
      this.hits = 0;
      }

    display() { 
      //set image
      image(gift, this.x, this.y, 50, 50);
      //set moving speed
      this.x = this.x + this.xSpeed;
      this.y = this.y + this.ySpeed;
      // Wrap around if the gift runs out of screen
      if (this.x > width + this.size / 2) {
      this.x = 0 - this.size / 2;
      }
      if (this.x < 0 - this.size / 2) {
      this.x = width + this.size / 2;
      }
      //If the gift hits the bottom of the screen, it's game over
      if (this.y > height + this.size / 2) {
      screen == "screen3"; //game over screen 
      }
    }
  }    
