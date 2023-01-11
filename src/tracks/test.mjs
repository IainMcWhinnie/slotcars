
class Test{
    constructor(){
        this.N = 128;
    }

    init(){
        
    }

    getMainTrackPos(dist){
        return [2*math.cos(2*math.pi*dist), math.sin(4*math.pi*dist)];
    }

    getOffsetTrackPos(dist, outwardsOffset){
        var scalar = (1+outwardsOffset);
        return [2*math.cos(2*math.pi*dist)*scalar, math.sin(4*math.pi*dist)*scalar];
    }
}

// All you need for a track is a function
// and an inner and outer offset function

export { Test };