import { createEventBuffer } from "./src/events.js";
import { menu } from "./src/menu.js";
import { createGame, gameStates } from "./src/game.js";
import { twoplayer } from "./src/twoplayer.js";

var DEBUG = true;

main();


function main(){

    const width = 640;
    const height = 480;

    // Initiate the game
    const canvas = document.querySelector("#glcanvas");
    const ctx = canvas.getContext('2d');


    // Create an event buffer
    const eventBuffer = createEventBuffer();
    eventBuffer.init(canvas);

    // create the game
    const game = createGame(ctx, width, height);
    if (DEBUG){
        console.log("IN DEBUG MODE");
        game.curState = gameStates.TwoPlayer;
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

        // each function draws the screen and then
        // handles events
        switch(game.curState){
            case gameStates.MainMenu:
                game.curState = menu(game, eventBuffer.events);
                break;
            case gameStates.OnePlayer:
                console.log("one player");
                break;
            case gameStates.TwoPlayer:
                game.curState = twoplayer(game, eventBuffer.events);
                break;
            default:
                alert('Error: Unknown state '+game.curState);
        }


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