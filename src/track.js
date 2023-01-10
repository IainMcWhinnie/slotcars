import { TrackFunction } from "./trackfuction.js";

class Track{

    constructor(){
        this.trackFunction = new TrackFunction();
    }

    setGame(game){
        this.game = game;
    }

    drawTrack(){
        this.game.ctx.strokeStyle = '#222222'
        this.game.ctx.lineWidth = 26;
        this.drawTrackWithOffset(0);

        this.game.ctx.lineWidth = 2;
        this.game.ctx.strokeStyle = '#dd4444';
        this.drawTrackWithOffset(-0.06);
        this.drawTrackWithOffset(0.06);
    }

    toCanvasWithOffset(dist, offset){
        if(offset == 0){
            return this.toCanvasSpace(this.trackFunction.getMainTrackPos(dist),0.4);
        }else{
            return this.toCanvasSpace(this.trackFunction.getOffsetTrackPos(dist, offset), 0.4);
        }
    }

    drawTrackWithOffset(offset){
        this.game.ctx.beginPath()
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