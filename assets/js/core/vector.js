"use strict";

class Vector{

    constructor(x = 0, y = 0){
        this.x = x;
        this.y = y;
    }

    add(vector = {}){
        this.x += vector.x;
        this.y += vector.y;
    }
    getDistance(vector){
        return Math.sqrt(
            Math.pow(this.x - vector.x, 2) + Math.pow(this.y - y, 2)
        );
    }
    static getByAngle(angle, distance){
        return new Vector(
            Math.cos(angle * Math.PI / 180) * distance,
            Math.sin(angle * Math.PI / 180) * distance
        );
    }

}

export default Vector;