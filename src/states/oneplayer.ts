import { Car } from "../car";
import { Game } from "../game";
import { Track } from "../tracks/track";
import { EventBuffer, State } from "../types";


const track = new Track();
const car = new Car(track, 0, 'red');

export const OnePlayerState : State = {
    init : init,
    mainloop : mainloop,
}

function init(game : Game) {
    car.init(game);
}

function mainloop(game : Game, eventBuffer : EventBuffer, now : number){
    track.drawTrack(game);

    let event : KeyboardEvent;
    while(eventBuffer.keyEventBuffer.events.length){
        event = eventBuffer.keyEventBuffer.events.shift() as KeyboardEvent;
        if (event && event.type == 'keydown'){
            if (!car.isAccel && event.code == 'Space'){
                car.isAccel = true;
            }
        } else if (event && event.type == 'keyup'){
            if (car.isAccel && event.code == 'Space'){
                car.isAccel = false;
            }
        }
    }

    car.update(now);
    car.draw(game);
}