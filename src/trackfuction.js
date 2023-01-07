import { FourierSeries } from "./fourier.js";

class TrackFunction{
    constructor(){

        var coeffs = [0,1,0.3,math.complex(0.1,0.4)];
        for(var i = coeffs.length; i < 128; i++){
            coeffs.push(0);
        }

        this.funcImplementation = new FourierSeries(coeffs);

        this.funcImplementation.init();
        
    }

    getMainTrackPos(dist){
        return this.funcImplementation.unitEval(dist);
    }

    getOffsetTrackPos(dist, outwardsOffset){

        var s = this.funcImplementation.unitParam(dist);
        var derivativeVec = this.funcImplementation.derivative.eval(s);
        // var derivativeVec = this.funcImplementation.unitDerivEval(dist, this.samples);
        
        // console.log('The derivative was', derivativeVec);

        // Rotate the vector outwards and scale by the offset
        var rotX = derivativeVec[1];
        var rotY = -derivativeVec[0];

        var rotVecSize = (rotX**2 + rotY**2)**0.5

        rotX = rotX/rotVecSize * outwardsOffset;
        rotY = rotY/rotVecSize * outwardsOffset;

        // console.log('wait what?', rotX, rotY);

        // Calculate new position from the main track position
        var mainTrackPos = this.getMainTrackPos(dist);

        return [mainTrackPos[0]+rotX, mainTrackPos[1]+rotY];
    }

}

export {TrackFunction};