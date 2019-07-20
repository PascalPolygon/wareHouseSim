
export class InputKeys {
  constructor(simulation, _document){
    this.leftArrow = false;
    this.rightArrow = false;
    this.upArrow = false;
    this.downArrow = false;
    this.omega = 0;
    this.vx = 0;
    this.vy = 0;
  }

   keyboard(value) {
           let key = {};
           key.value = value;
           key.isDown = false;
           key.isUp = true;
           key.press = undefined;
           key.release = undefined;
           //The `downHandler`
           key.downHandler = event => {
               if (event.key === key.value) {
                   if (key.isUp && key.press) key.press();
                   key.isDown = true;
                   key.isUp = false;
                   event.preventDefault();
               }
           };

           //The `upHandler`
           key.upHandler = event => {

               if (event.key === key.value) {
                   if (key.isDown && key.release) key.release();
                   key.isDown = false;
                   key.isUp = true;
                   event.preventDefault();
               }
           };

           //Attach event listeners
           const downListener = key.downHandler.bind(key);
           const upListener = key.upHandler.bind(key);

           window.addEventListener(
               "keydown", downListener, false
           );
           window.addEventListener(
               "keyup", upListener, false
           );

           // Detach event listeners
           key.unsubscribe = () => {
               window.removeEventListener("keydown", downListener);
               window.removeEventListener("keyup", upListener);
           };

           return key;
       }

       toDegrees(radians){
         let degrees = (180/Math.PI)*radians;
         console.log("degrees:"+degrees);
         return (degrees);
       }

       control(robot, crates, tracker, tracker2)
       {

         let up = this.keyboard("ArrowUp"),
             down = this.keyboard("ArrowDown"),
             right = this.keyboard("ArrowRight"),
             left = this.keyboard("ArrowLeft");

         up.press = () => {

             robot.vx = 5*(Math.cos(robot.rotation-Math.PI/2));
             robot.vy = 5*(Math.sin(robot.rotation-Math.PI/2));

         };
         up.release = () => {


           console.log("Up released");
           robot.vy = 0;
           robot.vx = 0;
            if (!down.isDown && robot.vx === 0) {
              robot.vy = 0;
         }

       };
       right.press = () => {
             robot.vx = 'rotate right';

            //this.omega = 0.1;
            //robot.rotation += 0.1;
        };
      right.release = () => {

        if (!left.isDown && robot.vy === 0) {
          robot.vx = 0;
          //this.omega = 0;
          console.log(robot.rotation);
        }
      };

      left.press = () => {
        robot.vx = 'rotate left';
      };
      left.release = () => {
        robot.vx = 0;
        if (!right.isDown && robot.vy === 0) {
          robot.vx = 0;
        }
      };
     }
}
