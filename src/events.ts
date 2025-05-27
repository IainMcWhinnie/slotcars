import { MouseEventBuffer, KeyEventBuffer, EventBuffer } from "./types";


export function createEventBuffer() : EventBuffer{
    const keyEventBuffer = createKeyEventBuffer();
    const mouseEventBuffer = createMouseEventBuffer();
    const eventBuffer : EventBuffer = {keyEventBuffer, mouseEventBuffer};
    return eventBuffer;
}

export function createKeyEventBuffer() : KeyEventBuffer{
    const events : KeyboardEvent[] = [];

    function init(){
        document.addEventListener("keydown", handleEvent);
        document.addEventListener('keyup',handleEvent);
    }

    function handleEvent(event: KeyboardEvent){
        events.push(event);
    }

    return {init: init, events: events}
}

export function createMouseEventBuffer() : MouseEventBuffer{
    const events : MouseEvent[] = [];

    function init(canvas : HTMLCanvasElement){
        canvas.addEventListener('click', handleEvent);
    }

    function handleEvent(event: MouseEvent){
        events.push(event);
    }

    return {init: init, events: events}
}