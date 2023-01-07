/// DEPRECIATED :)


const monospaceWidthRatio = 0.56;
const systemFont = 'Consolas';

function drawTextFromCenterPoint(game, text, center_x, center_y, colour, size){
    game.ctx.fillStyle = colour;
    game.ctx.font = size+'px '+systemFont;

    var top_y = center_y + size/2;
    var left_x = center_x - ((text.length)*size*monospaceWidthRatio)/2;
    game.ctx.fillText(text, left_x, top_y);
}

function drawRectFromCenterPoint(game, center_x, center_y, width, height, colour){
    game.ctx.fillStyle = colour;

    var top_y = center_y - height/2;
    var left_x = center_x - width/2;

    game.ctx.fillRect(left_x, top_y, width, height);

    return {top_y, left_x, bottom_y:top_y+height, right_x:left_x+width};
}

function drawButton(game, label, center_x, center_y, width, height, textColour, bgColour){
    var area = drawRectFromCenterPoint(game, 
        center_x, center_y,
        width, height,
        bgColour);

    drawTextFromCenterPoint(game, 
        label, 
        center_x, center_y,
        textColour, height/3);

    return area;
}


export {drawTextFromCenterPoint, drawRectFromCenterPoint, drawButton};