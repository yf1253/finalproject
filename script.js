
// Home page with information about the game
let screen = "screen1";

let point = 0;

let ChristmasSleigh; //santa sleigh
let giftImage; //Image gifts
let landscape; //Image winter landscape
let firstscreen;
let gameoverscreen;

let tGift;//time for new gifts coming
let timeGift = 3000; //gift waiting time

let giftList = [];
let sleigh;


function setup() {
  createCanvas(1200, 800);
  ChristmasSleigh = loadImage("images/santa.png");
  giftImage = loadImage("images/giftG.png ");
  landscape = loadImage("images/landscape.png");
  firstscreen = loadImage("images/firstScreen.png");
  gameoverscreen = loadImage("images/gameover.png");
  sleigh = new santaSleigh (700,600,0,0);
}

function draw() {
  noStroke();
  fill(220);
  textAlign(CENTER, CENTER);

   //Text on home page
  if (screen == "screen1") {
    background(firstscreen);
    // textSize(20);
    // text("Julemanden skal fange øllene før de rammer jorden. ", width / 2, 100);
    // textSize(15);
    // text("Tryk med pilen på skærmen og derefter mellemrum for at starte spillet", width / 2, height / 2);
    // textSize(15);
    // text("Brug tasterne w, a, s og d, til at styre julemanden.", width / 2, 200);

  }

  //The page for the game itself
  if (screen == "screen2") {
    background(0, 150, 0);
    imageMode(CENTER); 
    image(landscape,600,400,1200,800);
    sleigh.display();
    fill(0, 0, 0);
    stroke(5);
    textSize(25);
    text("POINT : " + point, 100, 50);

     // Is it time for a new gift?
    // Feature that keeps the gifts coming
    if (millis() > tGift) { ////set up parameters for copies of gifts
      let ArrayGifts = new gift(random(0, width-20), 0, random(0), random(0.7, 1.0), 30);
      giftList.push(ArrayGifts);
      tGift = millis() + timeGift;
    }

    for (let fallingGift of giftList) {
      fallingGift.display();

      // Collision between Santa Claus and gift
      if (dist(fallingGift.x, fallingGift.y, sleigh.x, sleigh.y) < 120) {
        fallingGift.hits += 1;
        point = point + 1;
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
  background(0, 0, 0);
  imageMode(CENTER); 
  image(gameoverscreen,600,400,1200,800);
  textSize(60);
  fill(150, 0, 0);
  //text("GAME OVER", 250, 175);

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
  if (keyCode == 87) {
    sleigh.speedY = -1; // w 
  }
  if (keyCode == 83) {
    sleigh.speedY = 1; // s
  }
  if (keyCode == 65) {
    sleigh.speedX = -1; // a
  }
  if (keyCode == 68) {
    sleigh.speedX = 1; // d 
  }
  if (keyCode == 32) {
    if (screen == "screen1") {
      screen = "screen2";
      tGift = millis();

    }
  }
}


function keyReleased() {
  if (keyCode == 87) {
    sleigh.speedY = 0;
  }
  if (keyCode == 83) {
    sleigh.speedY = 0;
  }
  if (keyCode == 65) {
    sleigh.speedX = 0;
  }
  if (keyCode == 68) {
    sleigh.speedX = 0;
  }
}