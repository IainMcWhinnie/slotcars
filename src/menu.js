import {drawTextFromCenterPoint,
        drawRectFromCenterPoint,
        drawButton} from "./elements.js";

function menu(game, events){
    console.log('Display the main menu');
    
    // Draw the main menu on the canvas
    drawMainMenu(game);

    // returns the clickable areas
    // so we check for any click events

    var event;

    while(events.length){
        event = events.shift();

        if (event.type == 'click'){
            // we need to check where :0
        }
    }

    // return next state?

}

function drawMainMenu(game){


    // Main Title
    drawTextFromCenterPoint(game, 
        "Slot Cars", 
        game.width/2, game.height/3,
        "rgb(0,0,0)", 70);


    var clickable1 = drawButton(game, "1 Player",
        game.width/4, 2*game.height/3,
        150, 50, "rgb(0,0,0)", "#45bfb9");
    
    var clickable = drawButton(game, "2 Players",
        3*game.width/4, 2*game.height/3,
        150, 50, 'rgb(0,0,0', '#45bfb9');

    console.log(clickable);

}

export {menu};