import{Status} from './Status';


const status = new Status();
//const simulation = new Simulation(document);

export function startTimer(duration)
{
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        //display.textContent = minutes + ":" + seconds;
        status.updateBatteryLevel(Math.floor((seconds*100)/duration));

        if (seconds==0){

          status.loserScreen();
          //alert("YOU LOST!");
          // alert("YOU LOST");
          // location.reload();
           setTimeout(function(){
            alert("YOU LOST");
            location.reload();
          }, 500);

        }

         if (--timer < 0) {
             timer = duration;
         }
    }, 1000);
}
