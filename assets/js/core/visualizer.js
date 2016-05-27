"use strict";

import "../lib/raf";

import Vector from "./vector";
import Line from "./line";
import Circle from "./circle";

const MAX_RADIUS = 320;

const LINE_COUNT = 180;
const LINE_WIDTH = 1;
const LINE_HEIGHT = 30;
const LINE_COLOR = "#0f0f0f";

const CIRCLE_RADIUS = 1;
const CIRCLE_COUNT = 360;
const CIRCLE_COLOR = "#0f0f0f";

let canvas = $("#visualize");
let context = canvas[0].getContext("2d");

let [cx, cy] = [0, 0];

let linesTopLap = [];
let linesBottomLap = [];
let circles = [];

let invervalID = 0;

class Visualizer{

    constructor(options){
        this.analyzer = options.analyzer;
        this.frequencyDomain = options.frequencyDomain;
        this.timeDomain = options.timeDomain;

        this.setDimension();
        this.setupLines();
        this.setupCircles();

        $(window).on("resize", (e) => { this.handleResize(e) });
    }
    start(){
        this.loop();
    }
    stop(){
        this.stopLoop();
    }
    handleResize(e){
        this.setDimension();
        return false;
    }
    setDimension(){
        cx = window.innerWidth / 2;
        cy = window.innerHeight / 2;

        canvas[0].width = window.innerWidth;
        canvas[0].height = window.innerHeight;
    }
    setupLines(){
        for(let i = 0; i < LINE_COUNT; i++){
            let angle = (360 / LINE_COUNT) * i;

            let topPoint = Vector.getByAngle(angle + 90, MAX_RADIUS);
            topPoint.add({x: cx, y: cy});

            let midPoint = Vector.getByAngle(angle + 90, MAX_RADIUS - LINE_HEIGHT);
            midPoint.add({x: cx, y: cy});

            let botPoint = Vector.getByAngle(angle + 90, MAX_RADIUS - LINE_HEIGHT * 2);
            botPoint.add({x: cx, y: cy});

            let topLine = new Line(midPoint, topPoint, {
                width: LINE_WIDTH,
                height: LINE_HEIGHT,
                color: LINE_COLOR
            });
            let botLine = new Line(midPoint, botPoint, {
                width: LINE_WIDTH,
                height: LINE_HEIGHT,
                color: LINE_COLOR
            });

            topLine.draw(context, 0);
            botLine.draw(context, 0);

            linesTopLap[i] = topLine;
            linesBottomLap[i] = botLine
        }
    }
    setupCircles(){
        for(let i = 0; i < CIRCLE_COUNT; i++){
            let angle = (360 / CIRCLE_COUNT) * i;
            let vector = Vector.getByAngle(angle + 90, MAX_RADIUS - LINE_HEIGHT);
            vector.add({x: cx, y: cy});

            let circle = new Circle(vector, {
                radius: CIRCLE_RADIUS,
                color: CIRCLE_COLOR
            });
            circle.draw(context);

            circles[i] = circle;
        }
    }
    clear(){
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
    update(){
        this.analyzer.getByteFrequencyData(this.frequencyDomain);
        this.analyzer.getByteTimeDomainData(this.timeDomain);

        for(let i = 0; i < LINE_COUNT; i++){
            let angle = (360 / LINE_COUNT) * i;
            let freqPercent = this.frequencyDomain[i] / 256;

            let topPoint = Vector.getByAngle(angle + 90, (MAX_RADIUS - LINE_HEIGHT * freqPercent));
            topPoint.add({x: cx, y: cy});

            let midPoint = Vector.getByAngle(angle + 90, MAX_RADIUS - LINE_HEIGHT);
            midPoint.add({x: cx, y: cy});

            let botPoint = Vector.getByAngle(angle + 90, (MAX_RADIUS - (LINE_HEIGHT * 2) + LINE_HEIGHT * freqPercent));
            botPoint.add({x: cx, y: cy});

            linesTopLap[i] = new Line(midPoint, topPoint, {
                width: LINE_WIDTH,
                height: LINE_HEIGHT,
                color: LINE_COLOR
            });
            linesBottomLap[i] = new Line(midPoint, botPoint, {
                width: LINE_WIDTH,
                height: LINE_HEIGHT,
                color: LINE_COLOR
            });
        }

        for(let i = 0; i < CIRCLE_COUNT; i++){
            let angle = (360 / CIRCLE_COUNT) * i;
            let timePercent = this.timeDomain[i] / 256;

            let vector = Vector.getByAngle(angle + 90, MAX_RADIUS - (LINE_HEIGHT * 2 * timePercent));
            vector.add({x: cx, y: cy});

            circles[i] = new Circle(vector, {
                radius: CIRCLE_RADIUS,
                color: CIRCLE_COLOR
            });
        }
    }
    render(){
        for(let i = 0; i < LINE_COUNT; i++){
            linesTopLap[i].draw(context);
            linesBottomLap[i].draw(context);
        }
        for(let i = 0; i < CIRCLE_COUNT; i++){
            circles[i].draw(context);
        }
    }
    loop(){
        this.clear();
        this.update();
        this.render();
        invervalID = requestAnimationFrame(() => { this.loop() });
    }
    stopLoop(){
        cancelAnimationFrame(invervalID);
    }

}

export default Visualizer;