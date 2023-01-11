import {TextWidget, ButtonWidget} from '../widgets.mjs';
import { gameStates } from '../game.mjs';

function menu(game, events, now){
    
    // Draw the main menu on the canvas
    var buttons = drawMainMenu(game);

    // returns the clickable areas
    // so we check for any click events

    var event;

    while(events.length){
        event = events.shift();

        if (event.type == 'click'){
            // we need to check where :0
            if (buttons.onePlayerButton.area.isContainedIn(event.offsetX, event.offsetY)){
                game.changeState(gameStates.OnePlayer);
            }else if(buttons.twoPlayerButton.area.isContainedIn(event.offsetX, event.offsetY)){
                game.changeState(gameStates.TwoPlayer);
            }
        }
    }


}

function drawMainMenu(game){

    var title = new TextWidget(game.width/2, game.height/3, 'Slot Cars', 50, 'rgb(0,0,0)');
    title.draw(game);

    var onePlayerButton = new ButtonWidget(game.width/4, game.height*2/3, "1 Player", 200, 60, 'black', '#45bfb9');
    onePlayerButton.draw(game);

    var twoPlayerButton = new ButtonWidget(game.width*3/4, game.height*2/3, "2 Player", 200, 60, 'black', '#45bfb9');
    twoPlayerButton.draw(game);

    return {onePlayerButton, twoPlayerButton};

}

export {menu};