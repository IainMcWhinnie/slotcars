import { Game } from "../game";

const monospaceWidthRatio = 0.56;
const systemFont = 'Consolas';

type Point = {
    x : number;
    y : number;
}

export interface Widget {
    area : Area;
    draw : (game : Game) => void;
    onClick : (game : Game) => void;
}

class Area{
    x : number;
    y : number;
    width : number;
    height : number;

    constructor(x : number, y : number, width : number, height : number){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    getBottomLeft() : Point{
        const newX = this.x - this.width/2;
        const newY = this.y + this.height/2;
        return {x : newX, y : newY};
    }

    getTopLeft() : Point{
        const newX = this.x - this.width/2;
        const newY = this.y - this.height/2;
        return {x : newX, y : newY};
    }

    containsPoint (cursorPos : Point) : boolean{
        if (this.width/2 > cursorPos.x-this.x &&  
            cursorPos.x-this.x > -this.width/2 &&
            -this.height/2 < cursorPos.y-this.y && 
            cursorPos.y-this.y < this.height/2
        ){
            return true;
        }
        return false;
    }
}

export class TextWidget implements Widget{
    area : Area;
    text : string;
    colour : string;
    size : number;

    constructor(x : number, y : number, text : string, size : number, colour : string){
        this.area = new Area(x,y,text.length*size*monospaceWidthRatio,size);
        this.text = text;
        this.colour = colour;
        this.size = size;
    }

    draw( game : Game ){
        const position : Point = this.area.getBottomLeft();

        game.ctx.fillStyle = this.colour;
        game.ctx.font = this.size+'px '+systemFont;
        game.ctx.fillText(this.text, position.x, position.y);
    }

    onClick(){};
}

export class ButtonWidget implements Widget{
    textWidget : TextWidget;
    area : Area;
    width : number;
    height : number;
    bgColour : string;
    onClick : (game : Game) => void;

    constructor(x : number, y : number, text : string, width : number,
         height : number, textColour : string, bgColour : string, 
         onClick : ((game : Game) => void)){
        this.textWidget = new TextWidget(x,y,text,height/2,textColour);
        this.area = new Area(x,y, width, height);
        this.bgColour = bgColour;
        this.width = width;
        this.height = height;
        this.onClick = onClick;
    }

    draw(game : Game){
        const position : Point = this.area.getTopLeft();

        game.ctx.fillStyle = this.bgColour;
        game.ctx.fillRect(position.x, position.y, this.width, this.height);

        this.textWidget.draw(game);
    }
}