"use strict";

window.AudioContext = window.AudioContext || window.webkitAudioContext;

class Audio{

    constructor(arrayBuffer){
        this.audioContext = new AudioContext();
        this.analyzer = this.audioContext.createAnalyser();
        this.analyzer.smoothingTimeConstant = .5;
        this.analyzer.fftSize = 1024;
        this.arrayBuffer = arrayBuffer;
        this.buffer = null;
        this.source = null;

        this.frequencyDomain = new Uint8Array(this.analyzer.frequencyBinCount);
        this.timeDomain = new Uint8Array(this.analyzer.frequencyBinCount);
    }

    decode(){
        if(!this.arrayBuffer) return;
        let isDone = false;

        return new Promise((resolve, reject) => {

            this.audioContext.decodeAudioData(this.arrayBuffer, (decodedArrayBuffer) => {
                this.buffer = decodedArrayBuffer;
                isDone = true;
                resolve(isDone);
            });

        }, (e) => {
            isDone = false;
            reject(isDone)
        });
        
    }

    connect(){
        this.source = this.audioContext.createBufferSource();
        this.source.buffer = this.buffer;
        this.source.loop = true;

        this.source.connect(this.analyzer);
        this.analyzer.connect(this.audioContext.destination);
    }

    play(){
        this.connect();
        this.source.start(0);
    }

    stop(){
        if(!this.source) return;
        this.source.stop(0);
    }

}

export default Audio;