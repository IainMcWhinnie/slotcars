import { EventBuffer } from "./types";


export function createEventBuffer() : EventBuffer{
    const events : Event[] = [];

    function init(canvas : HTMLCanvasElement){
        document.addEventListener("keydown", handleEvent);
        document.addEventListener('keyup',handleEvent);
        canvas.addEventListener('click', handleEvent);
    }

    function handleEvent(event : Event){
        events.push(event);
    }

    return {init: init, events : events}
}