import { Game } from "../game.mjs";
import { EventBuffer, State } from "../types";


export const MainMenuState : State = {
    init : init,
    mainloop: mainloop,
}

var clicks = [];
var img = new Image();

function mainloop(game : Game, eventBuffer : EventBuffer, now : number){
    game.ctx.drawImage(img, 0, 0);
}

function init(game : Game){
    img.src = (new URL('images/car.jpg', document.URL)).href;
}
