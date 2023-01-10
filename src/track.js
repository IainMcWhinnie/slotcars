import { TrackFunction } from "./trackfuction.js";

class Track{

    constructor(){
        this.trackFunction = new TrackFunction();
    }

    setGame(game){
        this.game = game;
    }

    drawTrack(){
        // draw main track()
        this.drawTrackWithOffset(0);

        // draw inside track()
        this.drawTrackWithOffset(-0.1);

        // draw outside track()
        this.drawTrackWithOffset(0.1);
    }

    toCanvasWithOffset(dist, offset){
        if(offset == 0){
            return this.toCanvasSpace(this.trackFunction.getMainTrackPos(dist),0.4);
        }else{
            return this.toCanvasSpace(this.trackFunction.getOffsetTrackPos(dist, offset), 0.4);
        }
    }

    drawTrackWithOffset(offset){
        var start = this.toCanvasWithOffset(0, offset);
        this.game.ctx.moveTo(start[0], start[1]);

        for(var dist = 0; dist < 1; dist+= 1/this.trackFunction.N){
            var point = this.toCanvasWithOffset(dist, offset);
            this.game.ctx.lineTo(point[0], point[1]);
        }

        this.game.ctx.lineTo(start[0], start[1]);
        this.game.ctx.stroke();
    }

    toCanvasSpace(xy, scale){
        var newX = this.game.width*0.5*(xy[0]*scale+1);
        var newY = this.game.height*0.5*(1-(xy[1]*scale));
        return [newX, newY];
    }

    
}

export {Track};