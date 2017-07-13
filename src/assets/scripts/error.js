"use strict";

//Defines error states

var errorHandle = ((function () {
    //revealing module because we might want to use some closure variables here... 
    // if it turns out to not be the case, it's easily refactored into a plain object,
    return {
        pokeApiError: function (requestType, url, errorCode) {
            log.write('error', 'Could not', requestType, url, "\n\texited with:", errorCode);
        }
    }
}))();

export default errorHandle;
