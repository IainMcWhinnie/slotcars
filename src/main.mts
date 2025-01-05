import { createEventBuffer, EventBuffer } from "./events.mjs";
import { Game } from "./game.mjs";


main();

function getCanvas(width : number, height : number) : HTMLCanvasElement{
    var canvas : HTMLCanvasElement = document.createElement('canvas');
    canvas.width = width;
    canvas.height = 480;
    canvas.style.setProperty('border', '5px solid black');
    document.body.appendChild(canvas);
    return canvas;
}
    
function main(){

    const width = 600;
    const height = 480;
    
    const canvas = getCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    const eventBuffer = createEventBuffer();
    eventBuffer.init(canvas);

    const game = new Game();

    game.initStates();

    gameloop(game, eventBuffer);
}

function gameloop(game : Game, eventBuffer : EventBuffer){
    
}