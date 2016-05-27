"use strict";

import "jquery";
import "es6-promise";
import "fetch";

//import loadSound from "./loadSound";
//import Visualizer from "./visualizer";

/*loadSound("sound/zamukaya-kryg.mp3").then((arrayBuffer) => {
    new Visualizer(arrayBuffer);
});*/

import Player from "./player";

let player = new Player("./sound/rain_fall_down.mp3");
let playButton = document.querySelector("#play");
let isPlay = true;

playButton.addEventListener("click", (e) => {
    isPlay ? player.stop() : player.play();
    isPlay = !isPlay;
}, false);
