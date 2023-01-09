import { TrackFunction } from "./trackfuction.js";

class Track{

    constructor(samples){
        this.trackFunction = new TrackFunction();
        this.samples = samples;
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
        var point = this.toCanvasWithOffset(this.samples[0], offset);
        this.game.ctx.moveTo(point[0], point[1]);

        for(var i = 1; i < this.samples.length; i++){
            point = this.toCanvasWithOffset(this.samples[i], offset);
            this.game.ctx.lineTo(point[0], point[1]);
        }
        this.game.ctx.stroke();
    }

    toCanvasSpace(xy, scale){
        var newX = this.game.width*0.5*(xy[0]*scale+1);
        var newY = this.game.height*0.5*(1-(xy[1]*scale));
        return [newX, newY];
    }

    
}

export {Track};