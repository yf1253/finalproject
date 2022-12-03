     
    class Sleigh {
    constructor(x,y,xs,ys) {
    this.x = x;// x location
    this.y = y;//y location
    this.xSpeed = xs;//x speed value
    this.ySpeed = ys;//y speed value
    }
    display(){
     image(santaSleigh, this.x, this.y, 300, 150); 

     this.x = this.x + this.xSpeed; 
     this.y = this.y + this.ySpeed;
    }

}