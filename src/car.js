
class Car{
    constructor(track, offset, colour){
        this.distPos = 0;
        this.track = track;
        this.speed = 0;
        this.offset = offset;
        this.colour = colour;

        this.width = 10;
        this.length = 20;
    }

    getPositionOnCanvas(){
        return this.track.toCanvasWithOffset(this.distPos, this.offset);
    }

    update(){
        this.distPos += this.speed;
    }

    getRotatedOffsets(angleRadians){
        // car points to the right
        var corners = [[10,5], [10,-5], [-10,-5], [-10,5]];
        var mathOutput = math.multiply(math.rotationMatrix(angleRadians), math.matrixFromColumns(...corners));
        return mathOutput._data;
    }

    getCurrentAngle(){
        var d_dist = 0.01;
        var cur = this.track.toCanvasWithOffset(this.distPos, this.offset);
        var cur_d = this.track.toCanvasWithOffset(this.distPos+d_dist, this.offset);
        var diff = math.subtract(cur_d, cur);
        var angle = math.acos(diff[0]/math.norm(diff));
        if(diff[1]<0){
            angle = math.pi*2-angle;
        }
        return angle;
    }

    draw(game){
        var canvasPos = this.getPositionOnCanvas();
        var offsets = this.getRotatedOffsets(this.getCurrentAngle());
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