/*
Needed to be done:
1. A function that corrects movement so they don't drift outside
  of the gameboard.
2. Logic for levelchanges and game over.

*/

let bubbles = []; // Array for bubble objects
var redBubbles = 100; // Startvalue for game
var greenBubbles = 20; // Startvalue for game

let ourHero; // The player object

let wall = 20; // Size of wall around gameboard


function setup(){
  createCanvas(800, 600);
  ourHero = new player();

  for(let i = 0; i < redBubbles+greenBubbles; i++){
    if(i<greenBubbles){
      bubbles[i] = new bubble(random(width), random(height), random(5,20),
      "#0f0", false)
    }else{
      bubbles[i] = new bubble(random(width), random(height), random(5,20))
    }
  }

}



function draw(){
  background(0);

  noStroke();
  fill(100);
  rect(wall, wall, width-wall*2, height-wall*2);

  ourHero.show();
  ourHero.move();

  for(let b of bubbles){
    b.show();
    b.move();
  }
}

class bubble{

  constructor(x, y, r, c="#f00", enemy=true){
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;
    this.enemy = enemy;
  }

  intersects(){
    let d = dist(this.x, this.y, ourHero.x, ourHero.y);
    return(d < this.r + ourHero.r);
  }

  show(){
    stroke(255);
    strokeWeight(2)
    fill(this.c);
    ellipse(this.x, this.y, this.r*2);
  }

  move(){
    this.x = this.x + random(-2, 2);
    this.y = this.y + random(-2, 2);
    if(this.intersects()){
      if(this.enemy){
        console.log("Game over");
      }else{
        console.log("Point");
      }
    }
  }



}

class player{

  constructor(){
    this.x = width/2;
    this.y = height/2;
    this.r = 10;
  }

  show(){
    stroke(255);
    strokeWeight(2)
    fill('#00f');
    ellipse(this.x, this.y, this.r*2);
  }

  move(){
    this.x = mouseX;
    this.y = mouseY;
  }

}
