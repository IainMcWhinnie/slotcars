import { gameStates } from "./game.js";
import { Track } from "./track.js";

// Hopefully remove this code
// ###############################
var delta = (1.0/128)
var samples = []
for(var i = 0.0; i < 1+delta; i = i + delta){
    samples.push(i);
}
// ###############################

// Should the current track be a global variable
// perhaps it should be part of Game?
var curTrack = new Track(samples);

function initTwoPlayer(game){
    curTrack.game = game;
}

function twoplayer(game, events){
    
    curTrack.drawTrack();

    return gameStates.TwoPlayer;
}


export {twoplayer, initTwoPlayer};