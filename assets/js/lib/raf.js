"use strict";

function raf(){
    let lastTime = 0;
    let vendors = ["ms", "moz", "webkit", "o"];

    for(let vendor of vendors){
        if(window.requestAnimationFrame) return;

        window.requestAnimationFrame = window[vendor + "RequestAnimationFrame"];
        window.cancelAnimationFrame = window[vendor + "CancelAnimationFrame"] || window[vendor + "CancelRequestAnimationFrame"];
    }

    if(!window.requestAnimationFrame){
        window.requestAnimationFrame = function(callback, element){
            let currTime = Date.now();
            let timeToCall = Math.max(0, 16 - (currTime - lastTime));

            let id = window.setTimeout(() => {
            callback(currTime + timeToCall);
            }, timeToCall);

            lastTime = currTime + timeToCall;

            return id;
        }
    }
 
    if(!window.cancelAnimationFrame){
        window.cancelAnimationFrame = function(id){ clearTimeout(id); }
    }

}

export default raf();