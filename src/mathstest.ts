import * as math from 'mathjs';

export function mathmain(){

    const x = [1,2];
    const y = [3,4];
    
    const z : number[] = math.subtract(x, y);
    console.log(z);
    
    const rMat = math.rotationMatrix(2);
    const out = math.multiply(rMat, x) as number[]
    console.log(out);

}