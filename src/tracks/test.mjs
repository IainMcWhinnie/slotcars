
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
        var pos = this.getMainTrackPos(dist);
        var nmal = this.getNormal(dist);
        return [pos[0]+outwardsOffset*nmal[0], 
                pos[1]+outwardsOffset*nmal[1]];
    }

    getNormal(dist){
        var norm = math.sqrt(math.sin(2*math.pi*dist)**2 + 
                            math.cos(4*math.pi*dist)**2);
        var unitTangent = [1/norm * -1*math.sin(2*math.pi*dist),
                1/norm * math.cos(4*math.pi*dist)];
        return [-unitTangent[1],unitTangent[0]];
    }
}

// All you need for a track is a function
// and an inner and outer offset function

export { Test };