import { CanvasPoint } from "../canvas/widgets";
import * as math from 'mathjs'

// export type GameVector = {
//     v: number[],
//     x:
// }

// export class GameVector{
//     v : number[];

//     constructor(x : number, y : number){
//         this.v = [x,y];
//         this.x = x;
//         this.y = y;
//     }

// }

export interface TrackFunction {
    N : number;
    init : () => void;
    getMainTrackPos : (dist : number) => CanvasPoint;
    getOffsetTrackPos : (dist : number, offset : number) => CanvasPoint;
    getNormal : (dist : number) => CanvasPoint;
}

export class Test implements TrackFunction{
    N : number; 

    constructor(){
        this.N = 128;
    }

    init(){
        
    }

    getMainTrackPos(dist : number){
        return {
            x: 2*math.cos(2*math.pi*dist), 
            y: math.sin(4*math.pi*dist)
        };
    }

    getOffsetTrackPos(dist : number, outwardsOffset : number){
        const pos = this.getMainTrackPos(dist);
        const nmal = this.getNormal(dist);
        return {
            x : pos.x+outwardsOffset*nmal.x, 
            y: pos.y+outwardsOffset*nmal.y
        };
    }

    getNormal(dist : number) : CanvasPoint{
        const norm : number = math.sqrt(math.sin(2*math.pi*dist)**2 + 
                            math.cos(4*math.pi*dist)**2) as number;
        const unitTangent = [1/norm * -1*math.sin(2*math.pi*dist),
                1/norm * math.cos(4*math.pi*dist)];
        return {
            x: -unitTangent[1],
            y: unitTangent[0]
        };
    }
}