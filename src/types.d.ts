type State = {
    init : (game : Game) => void;
    mainloop : (game : Game, eventBuffer : EventBuffer, now : number) => void;
}

export type EventBuffer = {
    init: (canvas: HTMLCanvasElement) => void;
    handler: (event: Event) => void;
};
