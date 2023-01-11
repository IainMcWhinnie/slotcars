import { Track } from "../tracks/track.mjs";
import { Car } from "../car.mjs";

// Should the current track be a global variable
// perhaps it should be part of Game?
var curTrack = new Track();
var car1 = new Car(curTrack,0.06,'red');
var car2 = new Car(curTrack,-0.06,'blue');


function initTwoPlayer(game){
    curTrack.setGame(game);
    car1.init();
    car2.init();
}

function twoplayer(game, events, now){
    // draw track
    curTrack.drawTrack();

    // control cars
    var event;
    while(events.length){
        event = events.shift();
        
        if (event.type == 'keydown'){
            if (!car1.isAccel && event.code == 'Space'){
                car1.isAccel = true;
            }
            if (!car2.isAccel && event.code == 'KeyH'){
                car2.speed += 0.0005;
                car2.isAccel = true;
            }
        }

        if (event.type == 'keyup'){
            if (car1.isAccel && event.code == 'Space'){
                car1.isAccel = false;
            }
            if (car2.isAccel && event.code == 'KeyH'){
                car2.isAccel = false;
            }
        }
    }

    // update cars
    car1.update(now);
    car2.update(now);

    // draw cars
    car1.draw(game);
    car2.draw(game);
}


export {twoplayer, initTwoPlayer};