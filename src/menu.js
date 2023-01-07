// import {drawTextFromCenterPoint,
//         drawRectFromCenterPoint,
//         drawButton} from "./elements.js";
import {TextWidget, ButtonWidget} from './widgets.js';
import { gameStates } from './game.js';

function menu(game, events){
    //console.log('Display the main menu');
    
    // Draw the main menu on the canvas
    var buttons = drawMainMenu(game);

    // returns the clickable areas
    // so we check for any click events

    var event;
    var nextState = game.curState;

    while(events.length){
        event = events.shift();

        if (event.type == 'click'){
            // we need to check where :0
            if (buttons.onePlayerButton.area.isContainedIn(event.offsetX, event.offsetY)){
                nextState = gameStates.OnePlayer;
            }else if(buttons.twoPlayerButton.area.isContainedIn(event.offsetX, event.offsetY)){
                nextState = gameStates.TwoPlayer;
            }
        }
    }

    // return next state?
    return nextState;

}

function drawMainMenu(game){

    var title = new TextWidget(game.width/2, game.height/3, 'Slot Cars', 50, 'rgb(0,0,0)');
    title.draw(game);


    var onePlayerButton = new ButtonWidget(game.width/4, game.height*2/3, "1 Player", 200, 60, 'black', '#45bfb9');
    onePlayerButton.draw(game);

    var twoPlayerButton = new ButtonWidget(game.width*3/4, game.height*2/3, "2 Player", 200, 60, 'black', '#45bfb9');
    twoPlayerButton.draw(game);

    // var clickable1 = drawButton(game, "1 Player",
    //     game.width/4, 2*game.height/3,
    //     150, 50, "rgb(0,0,0)", "#45bfb9");
    
    // var clickable = drawButton(game, "2 Players",
    //     3*game.width/4, 2*game.height/3,
    //     150, 50, 'rgb(0,0,0', '#45bfb9');

    // console.log(clickable);

    return {onePlayerButton, twoPlayerButton};

}

export {menu};