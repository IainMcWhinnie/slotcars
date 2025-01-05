
function createEventBuffer(){
    var events = [];

    function init(canvas){
        // Put out event listners on the canvas
        document.addEventListener("keydown",handleEvent);
        document.addEventListener('keyup',handleEvent);
        canvas.addEventListener('click', handleEvent);

    }

    function handleEvent(event){
        events.push(event);
    }


    return {init, events}
}


export {createEventBuffer};