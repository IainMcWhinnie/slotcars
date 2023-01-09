import { FourierSeries } from "./fourier.js";

class TrackFunction{
    constructor(){

        var coeffs = [0,1,0,math.complex(0,0.9)];
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

        // Rotate the vector outwards and scale by the offset
        var rotX = derivativeVec[1];
        var rotY = -derivativeVec[0];

        var rotVecSize = (rotX**2 + rotY**2)**0.5

        rotX = rotX/rotVecSize * outwardsOffset;
        rotY = rotY/rotVecSize * outwardsOffset;

        // Calculate new position from the main track position
        var mainTrackPos = this.getMainTrackPos(dist);

        return [mainTrackPos[0]+rotX, mainTrackPos[1]+rotY];
    }

}

export {TrackFunction};