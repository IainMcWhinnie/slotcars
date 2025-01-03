import { Track } from "../tracks/track.mjs";
import { Car } from "../car.mjs";

var track =  new Track();
var car = new Car(track,0,'red');


function initOnePlayer(game){
    track.setGame(game);
    car.init();
}

function oneplayer(game, events, now){
    track.drawTrack();
    // for (var i=0; i<1; i=i+0.05){
    //     track.drawNormals(i);
    // }


    var event;
    while(events.length){
        event = events.shift();

        if (event.type == 'keydown'){
            if (!car.isAccel && event.code == 'Space'){
                car.isAccel = true;
            }
        } else if (event.type == 'keyup'){
            if (car.isAccel && event.code == 'Space'){
                car.isAccel = false;
            }
        }
    }

    car.update(now);
    car.draw(game);
}

export {oneplayer, initOnePlayer}