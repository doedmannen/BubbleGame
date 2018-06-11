class player{

  constructor(){
    this.x = mouseX;
    this.y = mouseY;
    this.r = 10;

  }

  show(){
    stroke(255);
    strokeWeight(2);
    fill(0, 0, 255);
    ellipse(this.x, this.y, this.r*2);
  }

  move(){
    /*
    Player is controlled with the mouse and is not allowed to intersect with
    the red walls or the red bubbles. Players intersection with bubbles is
    checked in the bubble class.
    */
    this.x = mouseX;
    this.y = mouseY;
    if(this.x-this.r-1 < wall || this.y-this.r-1 < wall ||
      this.x+this.r+1 > width-wall || this.y+this.r+1 > height-wall){
        game = false;
      }
  }

}
