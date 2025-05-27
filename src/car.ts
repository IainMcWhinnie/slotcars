import * as math from 'mathjs'
import { Track } from './tracks/track';
import { CanvasPoint } from './canvas/widgets';
import { Game } from './game';

const accelRate = 0.25;
const frictionRate = 0.5;
// const crashForce = 0.25;

const MAX_SPEED = 0.7

export class Car{
    distPos : number;
    offset : number;
    speed : number;
    width : number;
    length : number;
    isAccel : boolean;

    curPos : CanvasPoint;
    lastPos : CanvasPoint;
    derivative : number[];
    angle : number;
    lastUpdateTime : number;

    track : Track;
    colour : string;


    constructor(track : Track, offset : number, colour : string){
        this.track = track;
        this.colour = colour;
        this.offset = offset;

        this.distPos = 0;
        this.speed = 0;
        this.width = 10;
        this.length = 20;
        this.isAccel = false;

        this.curPos = {x:0, y:0};
        this.lastPos = {x:0, y:0};
        this.derivative = [0,0];
        this.angle = 0;

        this.lastUpdateTime = 0;
    }

    init(game : Game){
        this.lastPos = this.track.toCanvasWithOffset(game, -0.01, this.offset);
        this.curPos = this.track.toCanvasWithOffset(game, this.distPos, this.offset);

        this.getDerivativeAtPos(0.01);
        this.getCurrentAngle();
        // this.prevDerivative = this.derivative;
    }

    getPositionOnCanvas(game : Game) : CanvasPoint{
        this.curPos = this.track.toCanvasWithOffset(game, this.distPos, this.offset);
        return this.curPos;
    }

    update(now : number){

        // Units: 1 unit distance per second
        const dt = (now-this.lastUpdateTime)/1000

        // Accelerate
        if (this.isAccel && this.speed < MAX_SPEED){
            this.speed += accelRate*dt;
        }

        // Apply friction
        if (! this.isAccel){
            this.speed -= this.speed*(1-frictionRate)*dt;
        }

        // // Apply static friction
        // if (! this.isAccel && this.speed < 0.02){
        //     this.speed = 0;
        // }
        
        // calculate derivative of speed
        // const prevDerivative = this.derivative;
        this.getDerivativeAtPos(dt);
        this.getCurrentAngle();

        // Calculate force on car
        // const cornerAccel = math.norm(math.subtract(this.derivative, prevDerivative))*this.speed;
        if (this.colour == 'red'){

            // console.log(cornerAccel);
        }
        // if(cornerAccel > crashForce){
        //     console.log('crash');
        // }
        this.angle *= (1);

        // Move forward
        this.distPos += this.speed*dt;


        this.lastPos = this.curPos;
        this.lastUpdateTime = now;
    }

    getRotatedCorners(angleRadians : number) : math.Matrix{
        // car points to the right before rotation
        const corners : math.Matrix = math.matrix([[this.length/2,this.width/2], [this.length/2,-this.width/2], [-this.length/2,-this.width/2], [-this.length/2,this.width/2]]);
        const mathOutput = math.multiply(math.rotationMatrix(angleRadians), math.transpose(corners));
        return mathOutput;
    }

    getDerivativeAtPos(dt : number){
        const derivative = [(this.curPos.x - this.lastPos.x)*dt, (this.curPos.y - this.lastPos.y)*dt];
        // console.log(math.norm(this.derivative));
        // console.log(derivative);
        this.derivative = derivative;
    }

    getCurrentAngle(){
        const derivNorm : number = math.norm(this.derivative) as number;
        if (derivNorm != 0){
            this.angle = math.acos(this.derivative[0]/derivNorm) as number;
            if(this.derivative[1]<0){
                this.angle = math.pi*2-this.angle;
            }
        }
    }

    draw(game : Game){
        const canvasPos : CanvasPoint = this.getPositionOnCanvas(game);
        const offsets = this.getRotatedCorners(this.angle);
        game.ctx.fillStyle = this.colour;

        game.ctx.beginPath();
        game.ctx.moveTo(canvasPos.x+offsets.get([0,0]), canvasPos.y+offsets.get([1,0])); 
        game.ctx.lineTo(canvasPos.x+offsets.get([0,1]), canvasPos.y+offsets.get([1,1])); 
        game.ctx.lineTo(canvasPos.x+offsets.get([0,2]), canvasPos.y+offsets.get([1,2])); 
        game.ctx.lineTo(canvasPos.x+offsets.get([0,3]), canvasPos.y+offsets.get([1,3])); 
        game.ctx.fill();
        
    }

}