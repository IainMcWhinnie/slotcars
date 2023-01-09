
class FourierSeries{

    constructor(coeffs){
        this.coeffs = coeffs;
        this.N = coeffs.length;
    }

    init(){
        this.derivative = this.getDerivative();
        this.normalizedDistanceSamples = this.getCurveDistances();
    }

    eval(s){
        var total = math.complex(0,0);
        for(var i=0; i<this.N; i++){
            var exponent = math.exp(math.multiply(math.i,s*i*math.pi*2))
            total = math.add(total, math.multiply(exponent,this.coeffs[i]));
        }
        return [total.re, total.im];
    }
    
    unitEval(dist){
        var s = this.unitParam(dist);
        return this.eval(s);
    }

    unitDerivEval(dist){
        return this.derivative.unitEval(dist);
    }

    unitParam(dist){
        // If normalizedDistanceSamples describes a function that maps from 
        //              [0,1/N,2/N, ... ,1] -> distance travelled
        // then perform a reverse lookup to see which value of s matches the given distance
        var i = 0;
        while (i < this.normalizedDistanceSamples.length && dist > this.normalizedDistanceSamples[i]){
            i++;
        }
        return i*(1/this.N);
    }

    getCurveDistances(){

        var distanceSamples = [];
        var distanceTravelled = 0;

        var sampleIndex;
        // Integrate the speed to get distance travelled
        for (var i = 0; i < this.N; i++){
            sampleIndex = i*(1/this.N);
            distanceTravelled += this.getSpeed(sampleIndex)/this.N;
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
        var newCoeffs = [];
        for (var i = 0; i < this.N; i++){
            newCoeffs.push(math.multiply(this.coeffs[i], math.multiply(math.i, 2*math.pi*i/this.N)));
        }
        return new FourierSeries(newCoeffs);
    }


}


export {FourierSeries};