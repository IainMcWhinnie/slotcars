import { Game } from "../game";
import { MainMenuState } from "../states/menu";
import 'jest-canvas-mock';

test('Initiate game', () => {
    const canvas : HTMLCanvasElement = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context){
        const game = new Game(100, 100, context);
        expect(game.curState).toBe(MainMenuState);
    }
});