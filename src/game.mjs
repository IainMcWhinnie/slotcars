import { menu } from "./states/menu.mjs";
import { initTwoPlayer, twoplayer } from "./states/twoplayer.mjs";

// A list of all the possible game states
const gameStates = {
    MainMenu: {id: 0, function: menu},
    OnePlayer: {id: 1, function: undefined},
    TwoPlayer: {id: 2, function: twoplayer, init: initTwoPlayer},
}

// A state pattern that stores the current state
class Game{
    constructor(ctx, width, height){
        this.ctx = ctx;
        this.width = width;
        this.height = height;

        this.curState = gameStates.MainMenu;
    }

    changeState(newState){
        this.curState = newState;
        if(this.curState.init){
            this.curState.init(this);
        }
    }

    executeCurState(events, now){
        this.curState.function(this, events, now);
    }
}

export {Game, gameStates};