"use strict";

window.AudioContext = window.AudioContext || window.webkitAudioContext;

class Audio{

    constructor(){
        this.audioContext = new AudioContext();
        this.analyzer = this.audioContext.createAnalyser();
        this.analyzer.smoothingTimeConstant = .5;
        this.analyzer.fftSize = 1024;
        this.buffer = null;
        this.source = null;

        this.startTime = 0;
        this.offsetTime = 0;

        this.frequencyDomain = new Uint8Array(this.analyzer.frequencyBinCount);
        this.timeDomain = new Uint8Array(this.analyzer.frequencyBinCount);
    }

    decode(arrayBuffer){
        if(!arrayBuffer) return;

        return new Promise((resolve, reject) => {

            this.audioContext.decodeAudioData(arrayBuffer, (buffer) => { resolve(buffer) });

        }, (e) => { reject(e) });
    }
    connect(){
        this.source = this.audioContext.createBufferSource();
        this.source.buffer = this.buffer;
        this.source.loop = true;

        this.source.connect(this.analyzer);
        this.analyzer.connect(this.audioContext.destination);
    }

}

export default Audio;