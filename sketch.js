var grid = 50;
var width = 1366;
var carGroup1, logGroup1;
var grassHeight = 100;
var gameState = "play";
var logAnimation, playerAnimation;
var school;
var player;
var carAnimation1, carAnimation2;
var cityAnimation;

var gameState = "play";


function preload() {
  carAnimation1 = loadAnimation("images/car1.png");
  carAnimation2 = loadAnimation("images/car2.png");
  logAnimation = loadAnimation("images/log2.png");
  playerAnimation = loadAnimation("images/Player-03.png");
  cityAnimation = loadAnimation("images/city1.png")
}

function setup() {
  createCanvas(1366, 700);

  carGroup1 = new Group();
  logGroup1 = new Group();

  // Creating city
  city = createSprite(width/2, -1590);
  city.addAnimation("city", cityAnimation);
  
  // Creating Grasses
  for (var i = 0; i < 6; i++) {
    var bttomGrass1 = createSprite(683, height - 50 - (i * 400), width, grassHeight);
    if (i % 2 === 0) {
      var road = createSprite(683, height - 250 - (i * 400), width, 300,)
      road.shapeColor = "black";
    }
    bttomGrass1.shapeColor = "grey";
  }

  // Creating Cars and logs
  for (var i = 0; i < 40; i++) {
    cars = new Car(-5);
    carGroup1.add(cars.spt);
    logs = new Log(-6);
    logGroup1.add(logs.spt);
  }

  // Creating Player
  player = new Player(width / 2, height - 25);

}

function draw() {
  background("skyblue");
  translate(0, -player.spt.y + height - 150, 2);

  //Making logs reappear
  for (i = 1; i < logGroup1.length; i++) {
    if (logGroup1[i].x < 0) {
      logGroup1[i].x = width;
    }
  }

  // Making cars reappear
  for (i = 1; i < carGroup1.length; i++) {
    if (carGroup1[i].x < 0) {
      carGroup1[i].x = width;
    }
  }

  if (carGroup1.isTouching(player.spt)) {
    player.spt.x = width / 2;
    player.spt.y = height - 75;
  }
  if (logGroup1.isTouching(player.spt)) {
    player.spt.x = player.spt.x - 3;
  } else if ((player.spt.y > height - 1550 && player.spt.y < height - 1300) || (player.spt.y < height - 500 && player.spt.y > height - 850) || (player.spt.y > height) || (player.spt.x < 0) || (player.spt.x > width)) {
    player.spt.x = width / 2;
    player.spt.y = height - 75;
  }

  if (city.isTouching(player.spt)) {
    gameState = "win";
  }

  drawSprites();

  if (gameState == "win") {
    logGroup1.destroyEach();
    carGroup1.destroyEach();
    player.spt.setVelocity(0, 0);
    fill("green");
    stroke("green");
    textSize(40);
    text("Congratulations! You Reach that", width/2-250, -1700);
  }

}

// Function to move the player with the help of arrow keys
function keyPressed() {
  if (keyCode == UP_ARROW) {
    player.move(0, -2);
  }
  else if (keyCode == DOWN_ARROW) {
    player.move(0, 2);
  }
  else if (keyCode == LEFT_ARROW) {
    player.move(-2, 0);
  }
  else if (keyCode == RIGHT_ARROW) {
    player.move(2, 0);
  }
}

