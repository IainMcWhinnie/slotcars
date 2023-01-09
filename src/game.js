import { menu } from "./menu.js";
import { initTwoPlayer, twoplayer } from "./twoplayer.js";

const gameStates = {
    MainMenu: {id: 0, function: menu},
    OnePlayer: {id: 1, function: undefined},
    TwoPlayer: {id: 2, function: twoplayer, init: initTwoPlayer},
}

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

    executeCurState(events){
        this.curState.function(this, events);
    }
}

export {Game, gameStates};