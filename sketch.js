let bubbles = [];          // Array for bubble objects
let redBubbles = 0;        // Startvalue for game
let greenBubbles = 0;      // Startvalue for game
let yellowBubbles = 0;      // Startvalue for game

let ourHero;               // The player object
let pickUps = 0;           // How many pickUps we need to level up
let level = 0;             // The current level (0 if no game is active)

/*
The timer is used for 3 things
  1. To keep the board clean at levelchanges and displaying "level up"-text
  2. To calculate how long a yellow bubble should be active on the gameboard

*/
let countTimer = 500;      // Set timer
let counter = countTimer;  // counts time at levelchanges

let wall = 10;             // Size of wall around gameboard
let game = false;          // Is the game active?
let pause = false;         // Pauses the game
let spawn;


function setup(){
  createCanvas(800, 600);

  frameRate(100);           // Probably not going to do 100fps

  noCursor();               // Hide the mouse inside canvas

  ourHero = new player();   // Create our hero (DOOM reference)


}

/*
If the button "P" is pressed, the game is paused.
This is a terrible feature because if we move the mouse while
the game is paused and then unpause the game, we will probably hit
something red. I'm not sure about this.
*/
function keyPressed() {
  if (keyCode === 80) {
    if(pause == false){
      pause = true;
      noLoop();               // Stop the loop
    } else {
      pause = false;
      loop();                 // Start the loop
    }
  }
  return false;               // prevent default
}
/*
The game is started and restarted (on game over) by clicking
the mouse.
*/
function mouseClicked() {
  if (!game){
    game = true;               // Set the game to active
    level = 1;                 // We start at level 1
    redBubbles = 0;            // Reset value if game over
    greenBubbles = 0;          // Reset value if game over
    pickUps = greenBubbles;    // Reset value if game over
    counter = 0;               // Reset counter
    ourHero.r = 10;            // Reset playersize if game over
    loop();                    // Start the loop
  }
  return false;               // prevent default
}


function draw(){
  /*
  The counter is inceased if not max value and we reached a new level
  the "level up" is displayed.
  */
  if(counter < countTimer){
    counter++;
  }


  background(255, 0, 0);

  /*
  This draws the inside of the gameboard.
  The outer red walls are to keep the player from
  "cheating" by moving the mouse outside to avoid
  red bubbles.
  */
  noStroke();
  fill(0);
  rect(wall, wall, width-wall*2, height-wall*2);

  /*
  Check if the player picked up all the green bubbles and
  start a new level.

  If first game, the pickups are 0 at default and
  when the mouse is clicked, level is set to above 0.

  This uses the counter to make sure the player has
  a moment with no bubbles on screen.

  We also check if the level is 5, 10, 15 or above 15.
  If so, we allow the player to use a yellow bubble to
  shrink in size.
  */
  if(pickUps < 1 && level > 0 && counter >= 50){
    redBubbles += 5;
    greenBubbles += 1;
    yellowBubbles = 0;
    pickUps = greenBubbles;

    // How often to spawn yellowBubbles
    if((level < 15 && level % 5 == 0) || level > 15){
      yellowBubbles = 1;
    }


    /*
    This deletes the old bubbles and makes new.
    By using the constructor we make sure that bubbles
    are not to close to the players position.
    */
    delete bubbles;

    for(let i = 0; i < redBubbles+greenBubbles+yellowBubbles; i++){
      if(i < yellowBubbles){
        bubbles[i] = new bubble("YELLOW");
      } else if(i < greenBubbles+yellowBubbles){
        bubbles[i] = new bubble("GREEN");
      } else {
        bubbles[i] = new bubble();
      }
    }


  }


  // Show and move the player
  ourHero.show();
  ourHero.move();

  // Show and move all the bubbles
  for(let b of bubbles){
    b.show();
    b.move();
  }

  /*
  Check if the game is active.
  If we are on level 0, display the titlescreen with game information.
  Otherwise display GAME OVER.
  */
  if(!game){
    strokeWeight(1);
    stroke("#000")
    fill(255, 255, 0, 150);
    textStyle(NORMAL);
    textSize(20);
    text("CLICK THE MOUSE TO BEGIN A NEW GAME", 185, height/2+100);
    textSize(48);
    if(level == 0){
      textStyle(BOLD);
      text(".: BUBBLE CATCHER :.", 130, height/2-100);
      textStyle(NORMAL);
      textSize(20);
      text("- COLLECT GREEN BUBBLES -", 250, height/2-50);
      text("- GREEN BUBBLES WILL MAKE YOU GROW -", 190, height/2-25);
      text("- YELLOW BUBBLES WILL SHRINK YOUR SIZE -", 175, height/2);
      text("- AVOID RED BUBBLES AND THE RED WALL -", 185, height/2+25);
    } else {
      textStyle(BOLD);
      text(".: GAME  OVER :.", 200, height/2);
    }

    noLoop();
  }

  /*
  Display level up before next level
  */
  if(counter < 50 && level > 1 && pickUps < 1 && game){
    strokeWeight(1);
    stroke("#000")
    textSize(48);
    fill(255, 255, 0, 150);
    textStyle(BOLD);
    text("LEVEL "+level, 280, height/2);
  }


  /*
  This displays how many green bubbles we need to pickup on this level and
  which level we are on.
  */

  fill(255, 255, 0, 150);
  noStroke();
  textStyle(BOLD);
  textSize(16);
  text("Green bubbles left: " + pickUps, 25, 36);
  text("Level: " + level, 700, 36);

}
