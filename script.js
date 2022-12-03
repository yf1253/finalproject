
//Variables for preload images
let santaSleigh, gift, landscape, firstScreen;
//Variables for preload musics
let bgMusic;
let catchSound;
//Variables for falling gifts
let giftlist = [];
let santa;

let screen = "screen2"; //default screen
let point = 0; //starting point

let ngift; //new gift
let giftTime = 3000; //gift waiting time

function preload() {
  bgMusic = loadSound("songs/christmas.mp3");
  //christmasSong.setVolume(0.1);
  catchSound = loadSound('songs/catch.mp3');
  santaSleigh = loadImage('images/santa.png');
  gift = loadImage('images/giftG.png');
  landscape = loadImage('images/landscape.png');
  firstScreen = loadImage('images/firstScreen.png');
}

function setup() {
createCanvas(1200, 800);
background(landscape); //add winter landscape background
santa = new Sleigh(700,600,0,0);
}

function draw() {
noStroke();
fill(0);
textAlign(CENTER, CENTER);

//Screen 1: game introduction
  if (screen == "screen1") {
    background(firstScreen);
    // textSize(35);
    // textStyle(BOLD);
    // text("Santa has to catch the gifts before they hit the ground.", width / 2, 500);
    // textSize(25);
    // text("Use potentiometers to control Santa", width / 2, 600);
    // textSize(25);
    // text("Press space to start the game", width / 2, 700);
   }

//Screen 2: The page for the game itself
  if (screen == "screen2") {
    background(landscape);
    image(landscape);
    santa.display(); //display santa sleigh
    santa.move(); //move santa sleigh
    fill(0);
    stroke(5);
    textSize(25);
    //textStyle(BOLD);
    text("SCORE : " + point, 100, 50);

  // Feature that keeps the gifts coming
  if (millis() > ngift) {
    let newgift = new FallingGift(random(0, width-20), 0, random(0), random(0.7, 1.0), 30);
    giftlist.push(newgift);
    ngift = millis() + giftTime;
  }
  //for 
  for (let newgift of giftlist) {
    newgift.display();
    newgift.move();
  // Collision between Santa Claus and gifts
  if (dist(newgift.x, newgift.y, santa.x, santa.y) < 20) {
    newgift.hits = newgift.hits + 1;
    point = point + 1;
    }
  }

  giftlist = giftlist.filter(giftNoHits);

  santa.display();
  santa.move();

  }

if (screen == "screen3") {
   gameover();
   }
}

// Gameover screen
function gameover() {
  background(landscape);
  textSize(60);
  fill(150, 0, 0);
  text("GAME OVER", 250, 175);
}

//gifts not hit ground
function giftNoHits(FallingGift) {
  if (FallingGift.hits == 0) {
    return true; // keep the gift
  } else {
    return false; // don't keep 
  }
}


// Arrow keys
function keyPressed() {
  // a: d: w: s:
  if (keyCode == 87) {
    santa.ySpeed = -1; // w 
  }
  if (keyCode == 83) {
    santa.ySpeed = 1; // s
  }
  if (keyCode == 65) {
    santa.xSpeed = -1; // a
  }
  if (keyCode == 68) {
    santa.xSpeed = 1; // d 
  }
  if (keyCode == 32) {
    if (screen == "screen1") {
      screen == "screen2";
      ngift = millis();

    }
  }
}


function keyReleased() {
  if (keyCode == 87) {
    santa.ySpeed = 0;
  }
  if (keyCode == 83) {
    santa.ySpeed = 0;
  }
  if (keyCode == 65) {
    santa.xSpeed = 0;
  }
  if (keyCode == 68) {
    santa.xSpeed = 0;
  }
}















 
 
 

