import { createEventBuffer } from "./events.mjs";
import { Game, gameStates } from "./game.mjs";

var DEBUG = false;

main();

function main(){
    
    // Initiate the game
    const canvas = document.querySelector("#glcanvas");
    const ctx = canvas.getContext('2d');

    const width = canvas.width;
    const height = canvas.height;

    // Create an event buffer
    const eventBuffer = createEventBuffer();
    eventBuffer.init(canvas);

    // create the game
    const game = new Game(ctx, width, height);
    if (DEBUG){
        console.log("IN DEBUG MODE");
        game.changeState(gameStates.TwoPlayer);
    }

    // Enter the gameloop
    gameloop(game, eventBuffer);
}

function gameloop(game, eventBuffer){
    var isStillPlaying = true;
    let startTime;

    function updateCanvas(now){
        if(startTime == undefined){
            startTime = now;
        }

        // clear the screen
        game.ctx.clearRect(0,0,game.width,game.height);

        // update game logic - depends on state
        game.executeCurState(eventBuffer.events, now);

        // loop
        if(isStillPlaying){
            if(!DEBUG){
                requestAnimationFrame(updateCanvas);
            }else{
                setTimeout(updateCanvas, 10000, 10);
            }
        }else{
            // Display end screen and freeze
        }
        
    }

    requestAnimationFrame(updateCanvas);
}