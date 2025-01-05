import { menu, initMenu } from "./states/menu.mjs";
import { initTwoPlayer, twoplayer } from "./states/twoplayer.mjs";
import { initOnePlayer, oneplayer } from "./states/oneplayer.mjs";
import { initSettings, runSettings } from "./states/settings.mjs";

// A list of all the possible game states
const gameStates = {
    MainMenu: {id: 0, function: menu, init: initMenu},
    OnePlayer: {id: 1, function: oneplayer, init: initOnePlayer},
    TwoPlayer: {id: 2, function: twoplayer, init: initTwoPlayer},
    Settings: {id: 3, function: runSettings, init: initSettings},
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
    }

    initStates(){
        gameStates.MainMenu.init(this);
        gameStates.TwoPlayer.init(this);
        gameStates.OnePlayer.init(this);
    }

    executeCurState(events, now){
        this.curState.function(this, events, now);
    }
}

export {Game, gameStates};