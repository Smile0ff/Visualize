"use strict";

function loadSound(url){
    return fetch(url, {
        method: "GET",
        mode: "same-origin"
    })
    .then((response) => {
        if(response.ok && response.statusText === "OK"){
            return response.arrayBuffer();
        }
    });
}

export default loadSound;