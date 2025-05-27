import { createEventBuffer } from "../src/events";

test('Event buffer registers click on canvas', () => {
    const canvas : HTMLCanvasElement = document.createElement('canvas');
    const eventBuffer = createEventBuffer();
    eventBuffer.mouseEventBuffer.init(canvas);

    canvas.click();

    expect(eventBuffer.mouseEventBuffer.events).toHaveProperty('length', 1);
    const mouseEvent = eventBuffer.mouseEventBuffer.events.pop() as MouseEvent;
    expect(mouseEvent).toBeTruthy();
});

test('Event buffer registers keydown on document', () => {
    const eventBuffer = createEventBuffer();
    eventBuffer.keyEventBuffer.init();

    document.dispatchEvent(new KeyboardEvent('keydown', {'key':'a'}));

    expect(eventBuffer.keyEventBuffer.events).toHaveProperty('length', 1);
    const keyboardEvent = eventBuffer.keyEventBuffer.events.pop() as KeyboardEvent;
    expect(keyboardEvent).toBeTruthy();
});

test('Event buffer registers keyup on document', () => {
    const eventBuffer = createEventBuffer();
    eventBuffer.keyEventBuffer.init();

    document.dispatchEvent(new KeyboardEvent('keyup', {'key':'w'}));

    expect(eventBuffer.keyEventBuffer.events).toHaveProperty('length', 1);
    const keyboardEvent = eventBuffer.keyEventBuffer.events.pop() as KeyboardEvent;
    expect(keyboardEvent).toBeTruthy();
});
