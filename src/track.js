import { FourierSeries } from "./fourier.js";

class Track{
    constructor(game, samples){
        this.series = new FourierSeries([1,0,0,0,0,0,0.1],[1,0.2,0.3,0,0,0,0.1]);
        this.series.init(samples);
        this.samples = samples;
        this.game = game;
    }

    // s ranges from [0,1]
    placement(s){
        return this.series.eval(s);
    }


    evalToCanvas(s){
        var out = this.placement(s);
        return this.convertToCanvasSpace(out,0.8);
    }

    draw(){
        var point = this.evalToCanvas(this.samples[0]);
        this.game.ctx.moveTo(point[0], point[1]);

        for(var i = 1; i < this.samples.length; i++){

            point = this.evalToCanvas(this.samples[i]);

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

    unitEvalToCanvas(s){
        var out = this.series.unitEval(s, this.samples);
        return this.convertToCanvasSpace(out, 0.6);
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

    convertToCanvasSpace(xy, scale){
        // var scale = 0.7;
        var newX = this.game.width*0.5*(xy[0]*scale+1);
        var newY = this.game.height*0.5*(1-(xy[1]*scale));
        return [newX, newY];
    }

    
}




export {Track};