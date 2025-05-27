import { Game } from "./game";

export type State = {
    init : (game : Game) => void;
    mainloop : (game : Game, eventBuffer : EventBuffer, now : number) => void;
}

export type EventBuffer = {
    keyEventBuffer : KeyEventBuffer;
    mouseEventBuffer : MouseEventBuffer;
};

export type KeyEventBuffer = {
    init: () => void;
    events: KeyboardEvent[];
};

export type MouseEventBuffer = {
    init: (canvas: HTMLCanvasElement) => void;
    events: MouseEvent[];
};