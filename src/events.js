
function createEventBuffer(){
    var events = [];

    function init(canvas){
        // Put out event listners on the canvas
        canvas.addEventListener('click', handleEvent);

    }

    function handleEvent(event){
        //console.log(event);
        events.push(event);
        //console.log(events);
    }


    return {init, events}
}


export {createEventBuffer};