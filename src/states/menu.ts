import { TextWidget, ButtonWidget, Widget } from "../canvas/widgets";
import { Game } from "../game";
import { EventBuffer, State } from "../types";
import { OnePlayerState } from "./oneplayer";


export const MainMenuState : State = {
    init : init,
    mainloop: mainloop,
}

const img = new Image();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function mainloop(game : Game, eventBuffer : EventBuffer, _now : number){
    game.ctx.drawImage(img, 0, 0);

    const widgets = drawMainMenu(game);

    let event : MouseEvent;

    while(eventBuffer.mouseEventBuffer.events.length){
        event = eventBuffer.mouseEventBuffer.events.shift() as MouseEvent;

        if (event.type == 'click'){
            const cursorPos = {
                x: event.clientX - 13,
                y: event.clientY - 13,
            }

            widgets.forEach((widget : Widget) => {
                if (widget.area.containsPoint(cursorPos)) {
                    widget.onClick(game);
                }
            });
        }
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function init(_game : Game){
    img.src = (new URL('images/car.jpg', document.URL)).href;
}

function drawMainMenu (game : Game) : Widget[] {
    const title = new TextWidget(game.width/2, game.height/3, 'Slot Cars', 50, 'rgb(0,0,0)');
    title.draw(game);

    const onePlayerButton = new ButtonWidget(game.width/4, game.height*2/3, "1 Player", 
        200, 60, 'black', '#45bfb9', (game) => {game.changeState(OnePlayerState)});
    onePlayerButton.draw(game);

    const twoPlayerButton = new ButtonWidget(game.width*3/4, game.height*2/3, "2 Player", 
        200, 60, 'black', '#45bfb9', (game) => {game.changeState(MainMenuState)});
    twoPlayerButton.draw(game);

    const settingsButton = new ButtonWidget(game.width*3/4, game.height*5/6, "Settings", 
        200, 60, 'black', '#45bfb9', (game) => {game.changeState(MainMenuState)});
    settingsButton.draw(game);

    return [title, onePlayerButton, twoPlayerButton, settingsButton];
}