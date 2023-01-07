import { TrackFunction } from "./trackfuction.js";

class Track{

    constructor(game, samples){
        this.trackFunction = new TrackFunction(samples);
        this.samples = samples;
        this.game = game;
    }

    drawTrack(){
        // draw main track()
        // var mainTrackFunc = function(dist){
        //     return this.toCanvasSpace(this.trackFunction.unitEval(dist),0.8);
        // }
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
            var point = this.toCanvasWithOffset(this.samples[i], offset);
            // console.log(point);
            this.game.ctx.lineTo(point[0], point[1]);
        }
        this.game.ctx.stroke();
    }


    unitEvalToCanvas(s){
        var out = this.series.unitEval(s, this.samples);
        return this.toCanvasSpace(out, 0.6);
    }

    drawUnitParamed(){

        var point = this.unitEvalToCanvas(this.samples[0]);
        this.game.ctx.moveTo(point[0], point[1]);

        for(var i = 1; i < this.samples.length; i++){
            var point = this.unitEvalToCanvas(this.samples[i]);

            if(i%5==0){
                this.game.ctx.fillStyle = 'red';
                this.game.ctx.fillRect(point[0], point[1],4,4);
            }else{
                this.game.ctx.fillStlye = 'black';
            }

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