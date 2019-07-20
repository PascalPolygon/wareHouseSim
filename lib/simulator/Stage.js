import * as PIXI from 'pixi.js';
import{InputKeys} from './InputKeys';
import {Status} from './Status';
import{startTimer} from './Utils';


let Application = PIXI.Application,
    Sprite = PIXI.Sprite;

let app = new Application({
  width: 256,
  height: 256,
  antialias: true,
  transparent: false,
  resolution: 1
});

let robot, map, crate;
const crates = new Array();
const boxes = new Array();
const dock = new Array();
let loader = app.loader;
let resources = app.loader.resources;

export class Stage{
  constructor(simulation, _document, inputKeys, status){
    this.simulation = simulation;
    this.document = _document;
    this.input = inputKeys || new InputKeys(this, _document);
    this.status = status || new Status();
    this.OffSetAngle = 0;
    this.numberOfCrates = 6;
    this.numberOfBoxes = 10;
    app.renderer.backgroundColor = 0x96DAFF;
    app.renderer.resize(this.width, this.height);

  }

  removeSprite(index){
    console.log('Removing box: '+ index);
    app.stage.removeChild(boxes[index]);
    boxes.splice(index, 1);
  }

  addCrates(crate_file){
    console.log('Inside add crates');
    let spacing = 208, xOffset = 100;
    let y = 0;

    for (let i = 0; i < this.numberOfCrates; i++){

      crates[i] = new Sprite(resources[crate_file].texture);

      crates[i].width = 150;
      crates[i].height = 150;

      let x = spacing * i + xOffset; //constant spacing in x direction

      // if (i == crates.length-1){
      //     y = this.randomInt(0, (map.height/2)-crates[i].height); //last crate only displayed in lower half of window to leave space for display
      // }
      // else{
      //     y = this.randomInt(0, map.height-crates[i].height);
      // }
      y = this.randomInt(0, map.height-crates[i].height);
      crates[i].x = x;
      crates[i].y = y;

      app.stage.addChild(crates[i]);
    }
  }

  addBoxes(box_file){
    console.log('inside boxes');
    let spacing = 108, xOffset = 50, checkID = 1, crateID = 0, crateMaxY = 0, boxMaxY = 0;

    for (let i = 0; i < this.numberOfBoxes; i++){

      boxes[i] = new Sprite(resources[box_file].texture);

      boxes[i].width = 50;
      boxes[i].height = 50;

      let x = spacing*i+xOffset;

      let y = this.randomInt(0, map.height-boxes[i].height);

      boxes[i].x = x;
      boxes[i].y = y;

      if(i%2){ //only boxes at odd indeces might overlap
        crateID = i-checkID;
        crateMaxY = crates[crateID].y + crates[crateID].height;
        boxMaxY = boxes[i].y + boxes[i].height;

        if ((boxes[i].y > crates[crateID].y && boxes[i].y < crateMaxY) || (boxMaxY > crates[crateID].y && boxMaxY < crateMaxY) ){

          console.log("Box "+ i +" created on crate");

          if (crates[crateID].y - map.y < map.height-crateMaxY){   //more space below crate to replace box

              console.log('Replacing box '+ i +' below');
              boxes[i].y = boxes[i].y+crates[crateID].height;

          }else{ //replace box above crate

              console.log('Replacing box '+ i +' above');
              boxes[i].y = boxes[i].y-crates[crateID].height;
          }
        }
        checkID++;
      }
      app.stage.addChild(boxes[i]);
    }

  }

  createStage(){
    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.display = "block";
    app.renderer.autoResize = true;
    app.renderer.resize(window.innerWidth, window.innerHeight);
    this.cornerVectorMag = 0; // Magnitude of vector from center of robot to corner of container
    this.document.body.appendChild(app.view);
  }

  displayDocking()
  {
    app.stage.addChild(dock[0]);
  }
  renderSprite(sprite_file, grid_file, crate_file, box_file, dock_file, width, height, x, y)
  {

     loader.add([sprite_file, grid_file, crate_file, box_file, dock_file]);
     loader.load(()=>{
       robot = new Sprite(resources[sprite_file].texture);
       map = new Sprite(resources[grid_file].texture);
       dock[0] = new Sprite(resources[dock_file].texture);

       let tracker = new PIXI.Graphics();
       tracker.beginFill(0x9966FF);
       tracker.drawCircle(0, 0, 10);
       tracker.endFill();

       let tracker2 = new PIXI.Graphics();
       tracker2.beginFill(0x9966FF);
       tracker2.drawCircle(0, 0, 10);
       tracker2.endFill();

       console.log(sprite_file);
       console.log(grid_file);
       console.log(grid_file);

       //make grid fullscreen;
       map.width = window.innerWidth;
       map.height = window.innerHeight;

       dock[0].width = 50;
       dock[0].height = 50;

       dock[0].y = 600;
       dock[0].x = 20

       robot.width = width;
       robot.height = height;

       console.log('width: ' + robot.width);
       let xSquared = Math.pow(robot.width/2, 2);
       let ySquared = Math.pow(robot.height/2, 2);
       console.log('xSquared: '+ xSquared);
       this.cornerVectorMag = Math.sqrt( xSquared + ySquared);
       console.log('Corner Vector Magnitude: ' + this.cornerVectorMag);
       this.offSetAngle = Math.atan((robot.height/2)/(robot.width/2));
       console.log(this.offSetAngle);

       robot.x = x;
       robot.y = y;

       tracker.x = robot.x - robot.width/2;
       tracker.y = robot.y - robot.height/2

       tracker2.x = robot.x + robot.width/2;
       tracker2.y = robot.y - robot.height/2;
       //Points for visual tracking



       app.stage.addChild(map);
       this.addCrates(crate_file);
       app.stage.addChild(robot);
       // app.stage.addChild(tracker);
       // app.stage.addChild(tracker2);
       this.addBoxes(box_file);
       this.status.createLog(app);
       this.status.initBattery(app);
       this.status.updateBatteryLevel(100);
       this.status.updateBoxesCollected(0);

       robot.rotate = Math.PI/2; //set to pi/2 (vertical) for kinamtic calcucations later
       robot.vx = 0;
       robot.vy = 0;

       robot.anchor.set(0.5, 0.5); //setting anchor point for rotation as well as x and y index
       this.input.control(robot, crates, tracker, tracker2);
       startTimer(22); //robot will run out of battery and die in 35 seconds;
       app.ticker.add(delta => this.simulation.simulationLoop(delta, map, robot, crates, boxes, dock, tracker, tracker2));
     });
  }

  randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
