const monospaceWidthRatio = 0.56;
const systemFont = 'Consolas';

class Area{
    constructor(x,y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    getBottomLeft(){
        var newX = this.x - this.width/2;
        var newY = this.y + this.height/2;
        return {newX, newY};
    }

    getTopLeft(){
        var newX = this.x - this.width/2;
        var newY = this.y - this.height/2;
        return {newX, newY};
    }

    isContainedIn(cursorX, cursorY){
        if (this.width > cursorX-this.x &&  cursorX-this.x > -this.width){
            if (-this.height < cursorY-this.y && cursorY-this.y < this.height){
                return true;
            }
        }
        return false;
    }
}

class TextWidget{
    constructor(x,y,text,size,colour){
        this.area = new Area(x,y,text.length*size*monospaceWidthRatio,size);
        this.text = text;
        this.colour = colour;
        this.size = size;
    }

    draw(game){
        var position = this.area.getBottomLeft();

        game.ctx.fillStyle = this.colour;
        game.ctx.font = this.size+'px '+systemFont;

        game.ctx.fillText(this.text, position.newX, position.newY);
    }
}

class ButtonWidget{
    constructor(x,y,text,width,height,textColour,bgColour){
        this.textWidget = new TextWidget(x,y,text,height/2,textColour);
        this.area = new Area(x,y, width, height);
        this.bgColour = bgColour;
        this.width = width;
        this.height = height;
    }

    draw(game){
        var position = this.area.getTopLeft();

        game.ctx.fillStyle = this.bgColour;
        game.ctx.fillRect(position.newX, position.newY, this.width, this.height);

        this.textWidget.draw(game);
    }
}

export {TextWidget, ButtonWidget};