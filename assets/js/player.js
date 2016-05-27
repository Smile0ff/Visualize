"use strict";

import Loader from "./core/loader";
import Audio from "./core/audio";
import Visualizer from "./core/visualizer";

class Player extends Audio{

    constructor(url){
        super();

        this.loader = new Loader(url);
        this.visualizer = new Visualizer({
            analyzer: this.analyzer,
            frequencyDomain: this.frequencyDomain,
            timeDomain: this.timeDomain
        });

        this.loader
            .load()
            .then(super.decode.bind(this))
            .then((buffer) => {
                this.buffer = buffer;
                this.play();
            })
            .catch((error) => {
                console.log(error);
            });
    }
    play(){
        this.startTime = this.audioContext.currentTime;
        super.connect();
        this.source.start(0, this.offsetTime % this.buffer.duration);
        this.visualizer.start();
    }
    stop(){
        this.source.stop();
        this.visualizer.stop();
        this.offsetTime += this.audioContext.currentTime - this.startTime;
    }

}

export default Player;