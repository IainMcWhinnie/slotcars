import { createEventBuffer } from "./events";
import { Game } from "./game";
import { EventBuffer } from "./types";
// import * as math from 'mathjs';

main();

function makeCanvas(width : number, height : number) : HTMLCanvasElement{
    const canvas : HTMLCanvasElement = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.style.setProperty('border', '5px solid black');
    document.body.appendChild(canvas);
    return canvas;
}
    
function main(){
    const width = 600;
    const height = 480;

    const canvas = makeCanvas(width, height);
    const ctx = canvas.getContext('2d');
    if ( ctx ){
        const game = new Game(width, height, ctx);
        
        const eventBuffer = createEventBuffer();
        eventBuffer.init(canvas);


        game.initStates();

        gameloop(game, eventBuffer);
    } else {
        console.error('Failed to initiate game context.');
    }
}

function gameloop(game : Game, eventBuffer : EventBuffer){
    function updateCanvas(now : number){

        game.ctx.clearRect(0, 0, game.width, game.height);
        game.executeCurState(eventBuffer, now);

        requestAnimationFrame(updateCanvas);
    }

    requestAnimationFrame(updateCanvas);
}