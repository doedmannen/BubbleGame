/*

This part is a test of having each bubble assigned to a unique travelplan.
The idea was that this would make sure that bubbles don't travel
to close to each other. However, that is not the case. This needs to be
done in another way.

The class is designed to work like a hashset, hopefully.
Each time a bubble needs a new destination to travel or spawn to,
that new location has to be checked against the criteria that no
other bubble is traveling to that position on the grid.

The functions add() and spawn() are recursive and checks if a random position
is suitable as a new location for the bubble.

Whenever a bubble reaches its x or y position it has reached the end of
the line and should get a new position.

delete() is used when a position is not used by a bubble any more.

clear() is used to empty the array when the player levels up and
a new wave of bubbles should spawn into the game.


*/
class positionTracker{

  constructor(){
    this.set = [];        // Array containing unique position for bubbles
    this.scale = 20;
    this.x;
    this.y;
    this.key;
  }

  spawn(){
    this.x = random(wall+20, width-20-wall*2);
    this.y = random(wall+20, height-20-wall*2);
    if(dist(this.x, this.y, ourHero.x, ourHero.y) > ourHero.r+100){
      this.x /= this.scale;
      this.y /= this.scale;
      this.key = "" + this.x.toFixed(0) + this.y.toFixed(0);
        if(this.set[this.key] != true){
            this.set[this.key] = true;
            this.x *= this.scale;
            this.y *= this.scale;
            return [this.x, this.y];
        }
    }
    return this.spawn();
  }


  add(){
    this.x = random(wall+20, width-20-wall*2)/this.scale;
    this.y = random(wall+20, height-20-wall*2)/this.scale;
    this.key = "" + this.x.toFixed(0) + this.y.toFixed(0);

    if(this.set[this.key] != true){
        this.set[this.key] = true;
        this.x *= this.scale;
        this.y *= this.scale;
        return [this.x, this.y];
    }
    return this.add();
  }

  delete(x,y){
    this.x = x/this.scale;
    this.y = y/this.scale;
    this.key = "" + this.x.toFixed(0) + this.y.toFixed(0);
    this.set.splice(this.key, 1);
  }

  clear(){
      this.set = [];
  }
}
