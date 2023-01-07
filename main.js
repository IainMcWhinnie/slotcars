import { createEventBuffer } from "./events.js";
import { menu } from "./menu.js";
import { createGame, gameStates } from "./game.js";

main();

var DEBUG = true;


function main(){

    // Initiate the game
    const canvas = document.querySelector("#glcanvas");
    const ctx = canvas.getContext('2d');


    // Create an event buffer
    const eventBuffer = createEventBuffer();
    eventBuffer.init(canvas);

    // create the game
    const game = createGame(ctx);

    // Enter the gameloop
    gameloop(game, eventBuffer);
}

function gameloop(game, eventBuffer){
    var isStillPlaying = true;
    let startTime;

    function updateCanvas(now){
        if(startTime == undefined){
            console.log(now);
            startTime = now;
        }


        //get current state
        console.log(game.curState);

        // get events - depends on user input and on previous game logic
        while(eventBuffer.events.length){
            console.log('Event: '+eventBuffer.events.shift());
        }

        // clear the screen
        game.ctx.clearRect(0,0,620,240);

        // update game logic - depends on state
        // call a function to
        // update screen
        switch(game.curState){
            case gameStates.MainMenu:
                menu(game, eventBuffer.events);
                break;
            default:

        }


        // loop
        if(isStillPlaying){
            if(!DEBUG){
                requestAnimationFrame(updateCanvas);
            }else{
                setTimeout(updateCanvas, 5000, 10);
            }
        }else{
            // Display end screen and freeze
        }
        
    }

    requestAnimationFrame(updateCanvas);
    // updateCanvas();
}