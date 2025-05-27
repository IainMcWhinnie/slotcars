import { Game } from "../src/game";
import { MainMenuState } from "../src/states/menu";
import 'jest-canvas-mock';
import { EventBuffer, State, KeyEventBuffer, MouseEventBuffer } from "../src/types";

test('Context can be mocked', () => {
    const canvas : HTMLCanvasElement = document.createElement('canvas');
    const context = canvas.getContext('2d');

    expect(context).toBeTruthy();
})

test('Game starts in menu state', () => {
    const canvas : HTMLCanvasElement = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (context){
        const game = new Game(100, 100, context);
        expect(game.curState).toBe(MainMenuState);
    }
});

test('Game change state works correctly', () => {
    const canvas : HTMLCanvasElement = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const newState : State = {
        init: () => {},
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        mainloop: (game : Game, eventBuffer : EventBuffer, now : number) => {}
    }

    if (context){
        const game = new Game(200, 200, context);
        game.changeState(newState);
        expect(game.curState).toBe(newState);
    }
});

test('Game can execute current state', () => {
    const canvas : HTMLCanvasElement = document.createElement('canvas');
    const context = canvas.getContext('2d');
    let hasBeenExecuted = false;
    const blankEventBuffer = {
        init : () => {},
        events:[]
    };
    const keyEventBuffer = blankEventBuffer as KeyEventBuffer;
    const mouseEventBuffer = blankEventBuffer as MouseEventBuffer;
    const eventBuffer : EventBuffer = {keyEventBuffer, mouseEventBuffer};
    const newState : State = {
        init: () => {},
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        mainloop: (game : Game, eventBuffer : EventBuffer, now : number) => {
            hasBeenExecuted = true;
        }
    };

    if (context){
        const game = new Game(200, 200, context);
        game.changeState(newState);
        game.executeCurState(eventBuffer, 0);
        expect(hasBeenExecuted).toBeTruthy();
    }
});
