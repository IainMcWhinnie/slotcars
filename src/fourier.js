const noCoeffParts = 7;


class FourierSeries{
    constructor(realCoeff, imagCoeff){
        this.realCoeff = realCoeff;
        this.imagCoeff = imagCoeff;
    }

    init(samples){
        this.derivative = this.getDerivative();
        this.normalizedDistanceSamples = this.getCurveDistances(samples);
    }

    eval(s){
        var totalReal = 0;
        var totalImag = 0;
        for(var i=0; i<noCoeffParts; i++){
            totalReal += math.cos((i+1)*s*2*math.pi)*this.realCoeff[i];
            totalImag += math.sin((i+1)*s*2*math.pi)*this.imagCoeff[i];
        }
        return [totalReal, totalImag];
    }

    unitEval(dist, samples){
        var s = this.unitParam(dist, samples);
        return this.eval(s);
    }

    unitParam(dist, samples){
        // If normalizedDistanceSamples describes a function that maps from 
        //              s -> distance travelled
        // then perform a reverse lookup to see which value of s matches the given distance
        var i = 0;
        while (i < this.normalizedDistanceSamples.length && dist > this.normalizedDistanceSamples[i]){
            i++;
        }
        return samples[i];
    }

    getCurveDistances(samples){

        var distanceSamples = [];
        var distanceTravelled = 0;

        // Integrate the speed to get distance travelled
        for (var i = 0; i < samples.length; i++){
            distanceTravelled += this.getSpeed(samples[i])/samples.length;
            distanceSamples.push(distanceTravelled);
        }

        
        // Normalize the distances, so that the total distance looks like 1
        var normalizedDistanceSamples = [];
        for (var i = 0; i < distanceSamples.length; i++){
            normalizedDistanceSamples.push(distanceSamples[i]/distanceTravelled);
        }

        return normalizedDistanceSamples;
    }

    getSpeed(s){
        var d = this.derivative.eval(s);
        return math.sqrt(d[0]**2+d[1]**2);
    }

    getDerivative(){
        var newRealCoeff = [];
        var newImagCoeff = [];
        for (var i = 0; i < noCoeffParts; i++){
            newRealCoeff.push(this.imagCoeff[i]*(i+1));
            newImagCoeff.push(this.realCoeff[i]*-(i+1));
        }
        return new FourierSeries(newRealCoeff, newImagCoeff);
    }


}


export {FourierSeries};