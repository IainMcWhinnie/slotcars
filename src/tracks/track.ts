import { CanvasPoint } from "../canvas/widgets";
import { Game } from "../game";
import { Test, TrackFunction } from "./track_function";

export class Track{

    trackFunction : TrackFunction;

    constructor(){
        this.trackFunction = new Test();
    }

    drawTrack(game : Game){
        this.drawTrackWithOffset(0, game);
    }

    // drawNormals(t : number){

    // }

    drawTrackWithOffset(offset : number, game : Game){
        game.ctx.beginPath()
        const start = this.toCanvasWithOffset(game, 0, offset);
        game.ctx.moveTo(start.x, start.y);

        for(let dist = 0; dist < 1; dist+= 1/this.trackFunction.N){
            const point = this.toCanvasWithOffset(game, dist, offset);
            game.ctx.lineTo(point.x, point.y);
        }

        game.ctx.lineTo(start.x, start.y);
        game.ctx.stroke();
    }

    toCanvasWithOffset(game : Game, dist : number, offset : number){
        if(offset == 0){
            return this.toCanvasSpace(game, this.trackFunction.getMainTrackPos(dist),0.4);
        }else{
            return this.toCanvasSpace(game, this.trackFunction.getOffsetTrackPos(dist, offset), 0.4);
        }
    }

    toCanvasSpace(game : Game, pos : CanvasPoint, scale : number) : CanvasPoint{
        const newX = game.width*0.5+(pos.x*scale)*game.height*0.5;
        const newY = game.height*0.5*(1-(pos.y*scale));
        return {x : newX, y : newY};
        // } else {
        //     console.error('Attempted to call `toCanvasSpace` before track was initialised.');
        //     return {x : 0, y : 0};
        // }
    }
}

 