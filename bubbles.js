/*
newSpawn is used to make sure that the bubbles don't spawn to close to the
players x and y location. This is to prevent player from getting game over at
random or picking up green bubbles without moving.
The function is recursive and returns an array containing suitable x and y.
*/
var newSpawn = function(){
  let spawnX = random(wall, width-wall*2);
  let spawnY = random(wall, height-wall*2);
  let d = dist(spawnX, spawnY, ourHero.x, ourHero.y);
  if(d > 50 + 20 + ourHero.r){
    return [spawnX, spawnY];
  }
  return newSpawn();
}


class bubble{

  constructor(type="RED"){
    spawn = newSpawn();
    this.x = spawn[0];
    this.y = spawn[1];
    this.type = type;         // What kind of bubble is it?
    this.r = 20;              // Yellow bubbles should always be the larger size
    if(type != "YELLOW"){
      this.r = random(5,20);  // Green and red gets random size
    }
  }

  // Function that checks if a bubble hits the player
  intersects(){
    let d = dist(this.x, this.y, ourHero.x, ourHero.y);
    return(d < this.r + ourHero.r);
  }

  // Draw the bubbles
  show(){
    stroke(255);
    strokeWeight(2);
    fill(255, 0, 0, 150)
    if(this.type == "GREEN"){
      fill(0, 255, 0, 150);
    }else if(this.type == "YELLOW"){
      fill(255, 255, 0, 150)
    }
    ellipse(this.x, this.y, this.r*2);
  }


  // Function to move the bubbles
  // Position is checked against outer walls of gameboard
  move(){
    if(pickUps < 1){
      this.x = -100;
    }

    if(this.x > 0){ // Is the object active?
      // Checks the position to make sure object stays inside the walls
      if(this.x-this.r-1 < wall){
        this.x = this.x + random(0, 2);
      } else if(this.x+this.r+1 > width-wall){
        this.x = this.x + random(-2, 0);
      } else {
        this.x = this.x + random(-2, 2);
      }

      if(this.y-this.r-1 < wall){
        this.y = this.y + random(0, 2);
      } else if(this.y+this.r+1 > height-wall){
        this.y = this.y + random(-2, 0);
      } else {
        this.y = this.y + random(-2, 2);
      }

      /*
      Yellow bubbles should only exist for a limited time. Once the timer
      runs out, the bubble is moved out of the gameboard.
      */
      if(this.type == "YELLOW" && counter == countTimer){
        this.x = -100;
      }
    }

    /*
    The bubbles position is checked against the players, if they intersect
    the game will decide what to do based on what type of bubble it is.
    If player intersects with green or yellow bubbles, they are moved outside
    of the gameboard.
    */

    if(this.intersects()){
      if(this.type != "RED"){
        this.x = -100;        // Remove bubble if not red
      }

      if(this.type == "RED" && game){

        game=false;           // End game if player intersects red bubble

      } else if(this.type == "YELLOW"){

          ourHero.r -= 5;     // Shrink player in case of yellow
          if(ourHero.r < 10){
            ourHero.r = 10;   // Players size should be above 10

          }
      } else {
                              // The pickup was green
        ourHero.r += 0.2;     // Increase players size
        pickUps--;            // Decrease pickups
        if(pickUps < 1){
          counter = 0;
          level++;
        }
      }
    }
  }
}
