"use strict";

import Vector from "./vector";

class Line{

    constructor(startPointVector = new Vector(), endPointVector = new Vector(), options = {}){
        this.startPoint = startPointVector;
        this.endPoint = endPointVector;

        this.lineWidth = options.width || 2;
        this.lineHeight = options.height || 10;
        this.lineColor = options.color || "#fff";
    }
    draw(context){
        context.save();

        context.lineWidth = this.lineWidth;
        context.strokeStyle = this.lineColor;
        
        context.beginPath();
        context.moveTo(this.startPoint.x, this.startPoint.y);
        context.lineTo(this.endPoint.x, this.endPoint.y);
        context.closePath();

        context.stroke();

        context.restore();
    }

}

export default Line;