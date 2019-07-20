import * as PIXI from 'pixi.js';

let style = new PIXI.TextStyle({
  fontFamily: "\"Lucida Console\", Monaco, monospace",
  fontSize: 12,
  fill: "lime",
});

let dataStyle = new PIXI.TextStyle({
  fontFamily: "\"Lucida Console\", Monaco, monospace",
  fontSize: 24,
  fill: "lime",
});

let sensorStyle = new PIXI.TextStyle({
  fontFamily: "\"Lucida Console\", Monaco, monospace",
  fontSize: 16,
  fill: "lime",
});

let loserStyle = new PIXI.TextStyle({
  fontFamily: "\"Lucida Console\", Monaco, monospace",
  fontSize: 24,
  fill: "red",
});

let winnerStyle = new PIXI.TextStyle({
  fontFamily: "\"Lucida Console\", Monaco, monospace",
  fontSize: 16,
  fill: "lime",
});

let numberOfBoxes = 0;

let application;

let batteryPercentage = 0;

let battery = new PIXI.Graphics();

let title = new PIXI.Text("Ready to boogie...");
title.position.set(1110, 410);

let batteryField = new PIXI.Text("Battery: ");
batteryField.position.set(1110, 450);

let batteryLevel = new PIXI.Text("");
batteryLevel.position.set(1180, 442);

let boxesField = new PIXI.Text("Boxes collected: ");
boxesField.position.set(1110, 510);

let boxesCollected = new PIXI.Text(numberOfBoxes);
boxesCollected.position.set(1240, 502);

let sensorDataField = new PIXI.Text("Sensor data: ");
sensorDataField.position.set(1110, 570);

let sensorData = new PIXI.Text("No collision...");
sensorData.position.set(1210, 566);


export class Status{
  constructor(){
  }

  createLog(app){
    let background = new PIXI.Graphics();
    background.alpha = 0.7; //opacity
    background.beginFill(0x000000);
    background.drawRoundedRect(0, 0, 300, 300, 10);
    background.endFill();
    background.x = 1100;
    background.y = 400;

    title.style = style;
    batteryField.style = style;
    boxesField.style = style;
    sensorDataField.style = style;

    batteryLevel.style = dataStyle;
    boxesCollected.style = dataStyle;
    sensorData.style = sensorStyle;


    app.stage.addChild(background);
    app.stage.addChild(title) ;
    app.stage.addChild(batteryField);
    app.stage.addChild(batteryLevel);
    app.stage.addChild(boxesField);
    app.stage.addChild(boxesCollected);
    app.stage.addChild(sensorDataField);
    app.stage.addChild(sensorData);
  }



  initBattery(app){
    application = app;
    battery.beginFill(0x00FF00);
    battery.drawRect(0, 0, 280, 4);
    battery.endFill();

    battery.x = 1110;
    battery.y = 475;
    app.stage.addChild(battery);
    return battery;
  }

  updateBatteryLevel(level){
    batteryLevel.text = level+'%';
    console.log('New line to: '+ (level*280)/100);
    batteryPercentage = Math.floor(((level*280)/100));
    battery.width = batteryPercentage;
    application.stage.addChild(battery);
  }

  updateBoxesCollected(){
    boxesCollected.text = numberOfBoxes++;
  }

  updateSensorData(data){
    sensorData.text = data;
  }

  loserScreen(){
    application.stage.removeChild(title) ;
    application.stage.removeChild(batteryField);
    application.stage.removeChild(batteryLevel);
    application.stage.removeChild(boxesField);
    application.stage.removeChild(boxesCollected);
    application.stage.removeChild(sensorDataField);
    application.stage.removeChild(sensorData);
    application.stage.removeChild(battery);

    let loserMessage = new PIXI.Text("Robot ran out of \nbattery and died :(");
    loserMessage.position.set(1110, 510);
    loserMessage.style = loserStyle;
    application.stage.addChild(loserMessage);
  }

  winnerScreen(){
    application.stage.removeChild(title) ;
    application.stage.removeChild(boxesField);
    application.stage.removeChild(boxesCollected);
    application.stage.removeChild(sensorDataField);
    application.stage.removeChild(sensorData);

    let winnerMessage = new PIXI.Text("Well done!\nRobot picked up every package\nand docked to recharge!\nRestarting simulation...");
    winnerMessage.position.set(1110, 500);
    winnerMessage.style = winnerStyle;
    application.stage.addChild(winnerMessage);

    alert("YOU WON!");
    location.reload();

  }

}
