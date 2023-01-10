import { gameStates } from "./game.js";
import { Track } from "./track.js";

// Should the current track be a global variable
// perhaps it should be part of Game?
var curTrack = new Track();

function initTwoPlayer(game){
    curTrack.game = game;
}

function twoplayer(game, events){
    
    curTrack.drawTrack();

    return gameStates.TwoPlayer;
}


export {twoplayer, initTwoPlayer};