import { TrackFunction } from "./trackfuction.mjs";
import { Test } from "./test.mjs";

class Track{

    constructor(){
        this.trackFunction = new Test();//new TrackFunction();
    }

    setGame(game){
        this.game = game;
    }

    drawTrack(){
        this.game.ctx.strokeStyle = '#222222'
        this.game.ctx.lineWidth = 26;
        this.drawTrackWithOffset(0);

        // this.drawTrackWithOffset(0.1)
        

        this.game.ctx.lineWidth = 2;
        this.game.ctx.strokeStyle = '#dd4444';
        this.drawTrackWithOffset(-0.06);
        this.drawTrackWithOffset(0.06);
    }

    drawNormals(t){
        // draw a normal at t=0
        var pos = this.trackFunction.getMainTrackPos(t)
        var posC = this.toCanvasWithOffset(t,0);
        var nmal = this.trackFunction.getNormal(t)
        var nmalC = this.toCanvasSpace([
            pos[0]+nmal[0], pos[1]+nmal[1]
        ], 0.4);

        this.game.ctx.beginPath();
        this.game.ctx.moveTo(posC[0], posC[1]);
        this.game.ctx.lineTo(nmalC[0], nmalC[1]);
        this.game.ctx.stroke();
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
        var newX = this.game.width*0.5+(xy[0]*scale)*this.game.height*0.5;
        var newY = this.game.height*0.5*(1-(xy[1]*scale));
        return [newX, newY];
    }

    
}

export {Track};