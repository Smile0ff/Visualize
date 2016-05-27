"use strict";

class Loader{

    constructor(url){
        this.url = url;
    }
    load(){
        return fetch(this.url).then((response) => {
            if(!response.ok) return;
            return response.arrayBuffer();
        });
    }

}

export default Loader;