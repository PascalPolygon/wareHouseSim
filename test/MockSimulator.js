import MockCanvas from './MockCanvas';
import MockCrate from './MockCrate';
import MockBox from './MockBox';
import MockSensor from './MockSensor';
import MockRobot from './MockRobot';

export default class MockSimulator {
  constructor() {
    this.foo = 'bar';
    this.canvas = new MockCanvas();
    this.crate = new MockCrate();
    this.box = new MockBox();
    this.sensor = new MockSensor();
    this.robot = new MockRobot();
    //console.log(this.canvas);
  }

  boxSmallerThanCanvas(){
    //console.log(box);
    let isSmaller = false;
    if (this.box.height < this.canvas.height){
      isSmaller = true;
    }
      return isSmaller;
  }

  addBoxOnCrate(){

    let placement;
    let crateMaxY = this.crate.y + this.crate.height;
    let boxMaxY = this.box.y + this.box.height;

    if ((this.box.y > this.crate.y && this.box.y < crateMaxY) || (boxMaxY > this.crate.y && boxMaxY < crateMaxY) ){

      console.log("Box created on crate");

    if (this.crate.y - this.canvas.y < this.canvas.height-crateMaxY){   //more space below crate to replace box

        console.log('Replacing box below');
        this.box.y = this.box.y+this.crate.height;
        placement = "below";

      }else{ //replace box above crate

        console.log('Replacing box  above');
        this.box.y = this.box.y-this.crate.height;
        placement = "above";
      }

    }
      return placement;
  }

  addCrateOnCanvas(){

    let onCanvas;
    let y = this.randomInt(0, this.canvas.height-this.crate.height);
    if (y <= this.canvas.height && y >= this.canvas.y){
      onCanvas = true;
    }else{
      onCanvas = false;
    }
    return onCanvas;
  }

  checkSensorCrateCollision(){

    let collision = false;

    let crateMaxX = this.crate.x + this.crate.width;
    let crateMaxY = this.crate.y + this.crate.height;

    if (this.sensor.x >= this.crate.x && this.sensor.x <=crateMaxX && this.sensor.y >= this.crate.y && this.sensor.y <= crateMaxY)
        collision = true;

    return collision;
  }

  checkSensorBoundaryCollision(){

    let insideBounds = true;

    this.sensor.x = -1;
    this.sensor.y = -1; //Changing sensor position to be outside of bounds
    insideBounds = true;
    if (this.sensor.x <= this.canvas.x || this.sensor.x >=canvas.width || this.sensor.y <= this.canvas.y || thi.sensor.y >= this.canvas.height)
    {      // console.log("Tracker 2 outside map");
        insideBounds = false;
        //return crates;
    }
    return insideBounds;
  }

  getXvelocityFromAngle(angle){
    let vx = 5*(Math.cos(angle-Math.PI/2));
    return vx;
  }

  getYvelocityFromAngle(angle){
    let vy = 5*(Math.sin(angle-this.robot.rotation));
    return vy;
  }

  sensorDisplacement(){

    let xSquared = Math.pow(this.robot.width/2, 2);
    let ySquared = Math.pow(this.robot.height/2, 2);
    let cornerVectorMag = Math.sqrt( xSquared + ySquared);
    return cornerVectorMag.toPrecision(5);

  }

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
