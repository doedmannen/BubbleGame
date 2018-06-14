class bubble{

  constructor(type="RED"){
    fill(255,100,0);

    setBubble = checkPos.spawn();
    this.x = setBubble[0];
    this.y = setBubble[1];
    this.type = type;         // What kind of bubble is it?
    if(type == "YELLOW"){
      this.r = 20;  // Green and red gets random size
    } else if(type == "GREEN"){
      this.r = random(15, 20);
    } else {
      this.r = random(8, 13);
    }
    setBubble = checkPos.add();
    this.xN = setBubble[0];
    this.yN = setBubble[1];

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
      fill(255, 255, 0, 150);
      if(counter > 400 && counter % 5 == 0){
        fill(0);
      }
    }
    ellipse(this.x, this.y, this.r*2);
    if(this.type != "RED"){
      fill(0);
      ellipse(this.x, this.y, this.r);
      if(this.type == "YELLOW"){
        fill(255);
        ellipse(this.x, this.y, 4);
      }
    }
  }


  // Function to move the bubbles
  // Position is checked against outer walls of gameboard
  move(){

    if(counter == 1){
      checkPos.delete(this.x, this.y);
    }

    // If all the greens are picked, move all bubbles outside of board
    if(pickUps < 1){
      this.x = -100;
    }

    /*
    Yellow bubbles should only exist for a limited time. Once the timer
    runs out, the bubble is moved out of the gameboard.
    */
    if(this.type == "YELLOW" && counter == countTimer){
      this.x = -100;
    }

    if(this.x > 0){ // Is the object active?

      if((this.x > this.xN - moveSpeed && this.x < this.xN + moveSpeed) ||
          (this.y > this.yN - moveSpeed && this.y < this.yN + moveSpeed)){
            checkPos.delete(this.xN, this.yN);
            setBubble = checkPos.add();
            this.xN = setBubble[0];
            this.yN = setBubble[1];
      }

      if(this.x < this.xN){
        this.x += moveSpeed;
      } else if (this.x > this.xN){
        this.x -= moveSpeed;
      }
      if(this.y < this.yN){
        this.y += moveSpeed;
      } else if(this.y > this.yN){
        this.y -= moveSpeed;
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

        ourHero.r = 10; // Reset size of player
        
        score += 3;              // Increase score
        if(score > highscore){  // Update highscore
          highscore = score;
        }



      } else {
                                // The pickup was green
        ourHero.r += 0.2;       // Increase players size
        pickUps--;              // Decrease pickups
        score++;                // Increase score
        if(score > highscore){  // Update highscore
          highscore = score;
        }
        if(pickUps < 1){
          counter = 0;
          level++;
          if(level % 10 == 0){
            moveSpeed += 0.2;
            redBubbles = 0;
            greenBubbles = 0;
          }
        }
      }
    }
  }
}
