"use strict";

import "jquery";
import "es6-promise";
import "fetch";

import loadSound from "./loadSound";
import Visualizer from "./visualizer";

loadSound("sound/rain_fall_down.mp3").then((arrayBuffer) => {
    new Visualizer(arrayBuffer);
});