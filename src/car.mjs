const accelRate = 0.25;
const frictionRate = 0.5;
const crashForce = 0.25;

var MAX_SPEED = 0.7



class Car{
    constructor(track, offset, colour){
        this.distPos = 0;
        this.track = track;
        this.speed = 0;
        this.offset = offset;
        this.colour = colour;
        this.width = 10;
        this.length = 20;
        this.isAccel = false;

        this.curPosition;
        this.lastPosition;
        this.derivative;
        this.angle;

        this.lastUpdateTime = 0;
    }

    init(){
        this.lastPosition = this.track.toCanvasWithOffset(-0.01, this.offset);
        this.curPosition = this.track.toCanvasWithOffset(this.distPos, this.offset);

        this.getDerivativeAtPos(0.01);
        this.getCurrentAngle();
        this.prevDerivative = this.derivative;
    }

    getPositionOnCanvas(){
        this.curPosition = this.track.toCanvasWithOffset(this.distPos, this.offset);
        return this.curPosition;
    }

    update(now){

        // Units: 1 unit distance per second
        var dt = (now-this.lastUpdateTime)/1000

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
        var prevDerivative = this.derivative;
        this.getDerivativeAtPos(dt);
        this.getCurrentAngle();

        // Calculate force on car
        var cornerAccel = math.norm(math.subtract(this.derivative, this.prevDerivative))*this.speed;
        if (this.colour == 'red'){

            // console.log(cornerAccel);
        }
        // if(cornerAccel > crashForce){
        //     console.log('crash');
        // }
        this.angle *= (1);

        // Move forward
        this.distPos += this.speed*dt;


        this.lastPosition = this.curPosition;
        this.lastUpdateTime = now;
    }

    getRotatedCorners(angleRadians){
        // car points to the right before rotation
        var corners = [[this.length/2,this.width/2], [this.length/2,-this.width/2], [-this.length/2,-this.width/2], [-this.length/2,this.width/2]];
        var mathOutput = math.multiply(math.rotationMatrix(angleRadians), math.matrixFromColumns(...corners));
        return mathOutput._data;
    }

    getDerivativeAtPos(dt){
        this.derivative = math.multiply(math.subtract(this.curPosition, this.lastPosition),dt);
        // console.log(math.norm(this.derivative));
    }

    getCurrentAngle(){
        var derivNorm = math.norm(this.derivative);
        if (derivNorm != 0){
            this.angle = math.acos(this.derivative[0]/derivNorm);
            if(this.derivative[1]<0){
                this.angle = math.pi*2-this.angle;
            }
        }
    }

    draw(game){
        var canvasPos = this.getPositionOnCanvas();
        var offsets = this.getRotatedCorners(this.angle);
        game.ctx.fillStyle = this.colour;

        game.ctx.beginPath();
        game.ctx.moveTo(canvasPos[0]+offsets[0][0], canvasPos[1]+offsets[1][0]); 
        game.ctx.lineTo(canvasPos[0]+offsets[0][1], canvasPos[1]+offsets[1][1]); 
        game.ctx.lineTo(canvasPos[0]+offsets[0][2], canvasPos[1]+offsets[1][2]); 
        game.ctx.lineTo(canvasPos[0]+offsets[0][3], canvasPos[1]+offsets[1][3]); 
        game.ctx.fill();
        
    }

}

export { Car };