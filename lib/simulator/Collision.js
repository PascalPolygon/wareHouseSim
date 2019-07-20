
export class Collision{
  constructor(){
    this.hit = -1;
    this.insideBounds = true;
    this.xDist = 0,
    this.yDist = 0;
    this.rx = 0;
    this.ry = 0;
    this.boxHeight = 50;
  }

  onTheMap(map,tracker, tracker2){

    this.insideBounds = true;
    if (tracker2.x <= map.x || tracker2.x >=map.width || tracker2.y <= map.y || tracker2.y >= map.height)
    {
        this.insideBounds = false;
    } else if(tracker.x <= map.x || tracker.x >=map.width || tracker.y <= map.y || tracker.y >= map.height){
      this.insideBounds = false;
    }

    return this.insideBounds;
  }


  spriteHit(crates, tracker, tracker2){

    let spriteMaxX, spriteMaxY;

    this.hit = -1;

    for (let i = 0; i < crates.length; i++){
      spriteMaxX = crates[i].x + crates[i].width;
      spriteMaxY = crates[i].y + crates[i].height;
      if (tracker2.x >= crates[i].x && tracker2.x <=spriteMaxX && tracker2.y >= crates[i].y && tracker2.y <= spriteMaxY)
      {
          this.hit = i;

      } else if (tracker.x >= crates[i].x && tracker.x <=spriteMaxX && tracker.y >= crates[i].y && tracker.y <= spriteMaxY)
      {
        this.hit = i;
      }

    }
    return this.hit;

  }
}
