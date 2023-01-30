import {TextWidget, ButtonWidget} from '../widgets.mjs';
import { gameStates } from '../game.mjs';

var clicks = [];
var img = new Image();

function initMenu(game){
    console.log('help');
    img.src = "/slotcars/images/car.jpg";
    console.log(img.naturalWidth);
    img.onload = () => {console.log('loaded')};
    console.log(img);
}

function menu(game, events, now){
    
    game.ctx.drawImage(img, 0,0 );
    // Draw the main menu on the canvas
    var buttons = drawMainMenu(game);

    for(var i = 0; i<clicks.length; i++){
        var point = clicks[i];
        game.ctx.beginPath();
        game.ctx.moveTo(point[0],point[1]-10);
        game.ctx.lineTo(point[0],point[1]+10);
        game.ctx.stroke();

        game.ctx.beginPath();
        game.ctx.moveTo(point[0]-10,point[1]);
        game.ctx.lineTo(point[0]+10,point[1]);
        game.ctx.stroke();
    }

    // returns the clickable areas
    // so we check for any click events

    var event;

    while(events.length){
        event = events.shift();

        if (event.type == 'click'){
            // we need to check where :0
            // Firefox disagrees with event.offsetX and just gives 0
            // var x = event.offsetX;
            // var y = event.offsetY;

            var x = event.clientX - 13;
            var y = event.clientY - 13;

            clicks.push([x,y]);



            if (buttons.onePlayerButton.area.isContainedIn(x,y)){
                game.changeState(gameStates.OnePlayer);
            }else if(buttons.twoPlayerButton.area.isContainedIn(x,y)){
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

export {menu, initMenu};