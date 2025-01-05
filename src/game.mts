import { MainMenuState } from "./states/menu.mjs";
import { EventBuffer, State } from "./types";


class Game{
    width : number;
    height : number;
    ctx : CanvasRenderingContext2D;
    curState : State;


    constructor(width : number, height : number, ctx : CanvasRenderingContext2D){
        this.width = width;
        this.height = height;
        this.ctx = ctx;

        this.curState = MainMenuState;
    }

    initStates(){
        MainMenuState.init(this);
    }

    changeState(newState : State){
        this.curState = newState;
    }

    executeCurState(eventBuffer : EventBuffer, now : number){
        this.curState.mainloop(this, eventBuffer, now);
    }
}



export { Game };
