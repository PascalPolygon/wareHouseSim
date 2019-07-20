import MainLoop from 'mainloop.js';
import * as PIXI from 'pixi.js';
import {Stage} from './Stage';
import{MySprite} from './MySprite';
import{InputKeys} from './InputKeys';
import{Collision} from './Collision';
import{Status} from './Status';
import{startTimer} from './Utils';

let robot, app, myBot, result, boxesCollected = 0;

export class Simulation{
  constructor(_document, stage, sprite, inputKeys, collision, status){
    this.document = _document;
    this.status = status || new Status();
    this.input = inputKeys || new InputKeys(this, _document);//, this.collision, stage);
    this.stage = stage || new Stage(this, _document, inputKeys, this.status);
    this.collision = collision || new Collision(/*this, _document, this.input, this.stage*/);
    this.sprite = sprite || new MySprite(this, _document, this.stage);
    this.enableMove = true;

    //startTimer(35); //Robot runs out of battery in 35 seconds
    this.start();
  }

  start(){
    this.stage.createStage();

    this.sprite.addSprite("assets/robot-icon-1.png", "assets/grid.png", "assets/crate.png", "assets/shipping_box.png", "assets/recharge.png");

  }

  end(){
    this.status.winnerScreen();
    return;
  }

  play(delta, map, robot, crates, boxes, dock, tracker, tracker2){

    result = this.collision.spriteHit(boxes, tracker, tracker2);
    if (result != -1){
      this.stage.removeSprite(result);
      this.status.updateBoxesCollected();
      //boxesCollected++;
      if (boxes.length == 0){
        this.stage.displayDocking();

      }
    }
    result = this.collision.spriteHit(crates, tracker, tracker2);
     if (result!= -1){
       //console.log("HIT!!");
       this.enableMove = false;
       this.status.updateSensorData("Crate collision");
    }else if(!this.collision.onTheMap(map, tracker, tracker2)){
      this.enableMove = false;
      this.status.updateSensorData("Boundary collision");
    }else{
      this.enableMove = true;
      this.status.updateSensorData("No collision...");
    }

    if (robot.vx == 'rotate right') {//rotate to the right
      robot.rotation += 0.05;

      tracker.x = robot.x + this.stage.cornerVectorMag*(Math.cos((robot.rotation-Math.PI/2)-this.stage.offSetAngle));
      tracker.y = robot.y + this.stage.cornerVectorMag*(Math.sin((robot.rotation-Math.PI/2)-this.stage.offSetAngle));

      tracker2.x = robot.x + this.stage.cornerVectorMag*(Math.cos((robot.rotation-Math.PI/2)+this.stage.offSetAngle));
      tracker2.y = robot.y + this.stage.cornerVectorMag*(Math.sin((robot.rotation-Math.PI/2)+this.stage.offSetAngle));

    }else if (robot.vx == "rotate left"){
      robot.rotation -= 0.05;
      tracker.x = robot.x + this.stage.cornerVectorMag*(Math.cos((robot.rotation-Math.PI/2)-this.stage.offSetAngle));
      tracker.y = robot.y + this.stage.cornerVectorMag*(Math.sin((robot.rotation-Math.PI/2)-this.stage.offSetAngle));

      tracker2.x = robot.x + this.stage.cornerVectorMag*(Math.cos((robot.rotation-Math.PI/2)+this.stage.offSetAngle));
      tracker2.y = robot.y + this.stage.cornerVectorMag*(Math.sin((robot.rotation-Math.PI/2)+this.stage.offSetAngle));
    }
    else if (this.enableMove){
      robot.x += robot.vx;
      robot.y += robot.vy;

      tracker.x += robot.vx;
      tracker.y += robot.vy;

      tracker2.x += robot.vx;
      tracker2.y += robot.vy;
    }
  }

  simulationLoop(delta, map, robot, crates, boxes, dock, tracker, tracker2){
    result = this.collision.spriteHit(dock, tracker, tracker2);
    if (result != -1 && boxes.length == 0){
      this.end();
    } else{
      this.play(delta, map, robot, crates, boxes, dock, tracker, tracker2);
    }
  }
}
