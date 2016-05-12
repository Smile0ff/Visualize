"use strict";

import Vector from "./vector";

class Circle{

    constructor(vector = new Vector(), options = {}){
        this.position = vector;
        this.radius = options.radius || 10;
    }
    draw(context){
        context.save();

        context.fillStyle = "#fff";

        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        context.closePath();

        context.fill();

        context.restore();
    }

}

export default Circle;