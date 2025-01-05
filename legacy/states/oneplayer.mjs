import { Track } from "../tracks/track.mjs";
import { Car } from "../car.mjs";
import { TextWidget } from "../widgets.mjs";

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

    drawStatsBox(game, [
        {'car.isAccel: ': car.isAccel},
        {'car.speed': car.speed},
        {'car.curPosition':car.curPosition},
        {'car.distPos': car.distPos},
        {'norm(car.derivative)': math.norm(car.derivative)}
    ]);

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

function drawStatsBox(game, stats){
    var xPos = 10;
    for(var i=0; i<stats.length; i++){
        game.ctx.fillStyle = 'black';
        game.ctx.font = 10+'px '+'Consolas';
        game.ctx.fillText(JSON.stringify(stats[i]), 5, xPos);
        xPos += 10;
    }
}

export {oneplayer, initOnePlayer}