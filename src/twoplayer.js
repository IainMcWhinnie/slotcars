import { Track } from "./track.js";
import { Car } from "./car.js";

// Should the current track be a global variable
// perhaps it should be part of Game?
var curTrack = new Track();
var car1 = new Car(curTrack,0.06,'red');
var car2 = new Car(curTrack,-0.06,'blue');

// Should be properties of car
var acceleratingCar1;
var acceleratingCar2;

function initTwoPlayer(game){
    curTrack.game = game;
}

function twoplayer(game, events){
    
    curTrack.drawTrack();

    // draw car
    car1.draw(game);
    car2.draw(game);

    // update car
    var event;
    while(events.length){
        event = events.shift();
        
        if (event.type == 'keydown'){
            if (!acceleratingCar1 && event.code == 'Space'){
                acceleratingCar1 = true;
            }
            if (!acceleratingCar2 && event.code == 'KeyH'){
                car2.speed += 0.0005;
                acceleratingCar2 = true;
            }
        }

        if (event.type == 'keyup'){
            if (acceleratingCar1 && event.code == 'Space'){
                acceleratingCar1 = false;
            }
            if (acceleratingCar2 && event.code == 'KeyH'){
                acceleratingCar2 = false;
            }
        }
    }

    // Accelerate
    if (acceleratingCar1){
        car1.speed += 0.00005;
    }
    if (acceleratingCar2){
        car2.speed += 0.00005;
    }

    // Apply friction
    if (! acceleratingCar1){
        car1.speed *= 0.98;
    }
    if (! acceleratingCar2){
        car2.speed *= 0.98;
    }

    car1.update();
    car2.update();
}


export {twoplayer, initTwoPlayer};