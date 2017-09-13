"use strict";

/*
This stands between registered requests, and cancels stale ones.

This way, when multiple requests fall through the debouncing cracks
 we'll cancel old ones
 */
const requestHandler = function () {
    let requestQueue = {};

    const add = function(request, cancelToken){
        if(requestQueue[request]){
            cancel(request);
        }
        requestQueue[request] = cancelToken;
    };

    const remove = function(request){
        delete requestQueue[request];
    };

    const clear = function(){
        requestQueue = {};
    };

    const cancel = function(request){
        if(requestQueue[request]){
            requestQueue[request]();
            remove(request);
        }
    };

    const cancelAll = function(){
        for(let request in requestQueue){
            if( requestQueue.hasOwnProperty(request) ){
                cancel(request);
            }
        }
    };

    return {
        add,
        remove,
        clear,
        cancel,
        cancelAll
    };
};

export default requestHandler;