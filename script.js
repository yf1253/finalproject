
// Home page with information about the game
let screen = "screen1";

// Starting point
let point = 0;

//preload images
let ChristmasSleigh; //santa sleigh
let giftImage; //Image gifts
let landscape; //Image winter landscape
let firstscreen; //starting screen
let gameoverscreen; //ending screen

//preload mp3
let ChristmasSong; 
let catchSound;
let loseSound;

//variables for falling gifts
let tGift;//time for new gifts coming
let timeGift = 3000; //3 seconds
let giftList = [];
//variable for sleigh
let sleigh; 

function preload(){
  ChristmasSleigh = loadImage("images/santa.png");
  giftImage = loadImage("images/giftG.png ");
  landscape = loadImage("images/landscape.png");
  firstscreen = loadImage("images/firstScreen.png");
  gameoverscreen = loadImage("images/gameover.png");
  ChristmasSong = loadSound('songs/christmas.mp3');
	catchSound = loadSound('songs/catch.wav');
  loseSound = loadSound('songs/ohno.mp3');
}

function setup() {
  createCanvas(1200, 800);
  sleigh = new santaSleigh (700,600,0,0);
}

function draw() {
  noStroke();
  fill(220);
  textAlign(CENTER, CENTER);

   //Text on home page
  if (screen == "screen1") {
    background(firstscreen);
    ChristmasSong.play();
    // textSize(20);
    // text("Santa has to catch the beers before they hit the ground", width / 2, 100);
    // textSize(15);
    // text("Press space to start the game", width / 2, height / 2);
    // textSize(15);
    // text("Use the w, a, s and d keys to control Santa", width / 2, 200);
  }

  //The page for the game itself
  if (screen == "screen2") {
    ChristmasSong.stop();
    //ChristmasSong.setVolume(0.1);
    background(0, 150, 0);
    imageMode(CENTER); 
    image(landscape,600,400,1200,800);
    sleigh.display();
    fill(0, 0, 0);
    stroke(5);
    textSize(25);
    text("POINT : " + point, 100, 50);
    
  
    // Feature that keeps the gifts coming
    if (millis() > tGift) { 
      //set up parameters for copies of gifts
      let ArrayGifts = new gift(random(25, width-25), 0, random(0), random(0.7, 1.0), 30); 
      giftList.push(ArrayGifts);
      tGift = millis()+ timeGift; 
      console.log(tGift);
    }
    for (let fallingGift of giftList) {
      fallingGift.display();
      // Collision between Santa Claus and gift
      if (dist(fallingGift.x, fallingGift.y, sleigh.x, sleigh.y) < 100) {
        console.log(dist);
        fallingGift.hits += 1;
        point = point + 1;
        catchSound.play();
      }
    }

    giftList = giftList.filter(giftNoHits);
    sleigh.display();

  }
  if (screen == "screen3") {
    gameover();
  }
}

// Gameover text
function gameover() {
  loseSound.play();
  background(0, 0, 0);
  imageMode(CENTER); 
  image(gameoverscreen,600,400,1200,800);
  textSize(60);
  fill(150, 0, 0);
  //text("GAME OVER", 250, 175);
  noLoop(); // get rid of the echo sound
}

function giftNoHits(gift) {
  if (gift.hits == 0) {
    return true; // keep the gift
  } else {
    return false; // Do not keep
  }
}

// Arrow keys 

function keyPressed() {
  // a: d: w: s:
  if (keyCode == UP_ARROW) {
    sleigh.speedY = -1; // w = 87
  }
  if (keyCode == DOWN_ARROW) {
    sleigh.speedY = 1; // s = 83
  }
  if (keyCode == LEFT_ARROW) {
    sleigh.speedX = -1; // a = 65
  }
  if (keyCode == RIGHT_ARROW) {
    sleigh.speedX = 1; // d = 68
  }

  // start the game(scrren2) with spacebar
  if (keyCode == 32) {
    if (screen == "screen1") {
      screen = "screen2";
      // reset the tGift equal to the current number of milliseconds
      tGift = millis();
    }
  }
}


function keyReleased() {
  if (keyCode == UP_ARROW) {
    sleigh.speedY = 0;
  }
  if (keyCode == DOWN_ARROW) {
    sleigh.speedY = 0;
  }
  if (keyCode == LEFT_ARROW) {
    sleigh.speedX = 0;
  }
  if (keyCode == RIGHT_ARROW) {
    sleigh.speedX = 0;
  }
}