import { gameStates } from "./game.js";
import { Track } from "./track.js";

var delta = (1.0/100)
var samples = []
for(var i = 0.0; i < 1+delta; i = i + delta){
    samples.push(i);
}


function twoplayer(game, events){

    console.log("playing with two!");


    var curTrack = new Track(game, samples);
    curTrack.draw();
    curTrack.drawUnitParamed();

    return gameStates.TwoPlayer;
}



export {twoplayer};