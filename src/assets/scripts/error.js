"use strict";

//Handles errors like a fucking boss

var errorHandle = (function () {
    //revealing module because we might want to use some closure variables here... 
    // if it turns out to not be the case, it's easily refactored into a plain object,
    var openTicketLink = "https://github.com/craftbrewed/pokedex/support",
        //keep track for try again
        errorCount = 0,
        errorMax = 5,
        dialogMessage = {canClose : false};

    return {
        pokeApiError: function (requestType, url, error, retryCallback) {
            //check for retry
            if(errorCount < errorMax){
                errorCount += 1;
                setTimeout(retryCallback, (200 * errorCount) );
            }else{
                errorCount = 0;
                log.write('error', 'Could not', requestType, url, "\n\texited with:", error.request, error.response, error.message);

                //ok, let's diagnose the error...
                if(error.response){
                    dialogMessage = Pokedex.app.$lodash.extend(diaglogMessage, {
                        'title' :  "Looks like something went wrong with a request to the pokeapi...",
                        'status' : error.status,
                        'body' : "Either something moved, or we messed up :(. Please let us know! <a href=\""+openTicketLink+"\" Open a ticket </a>"
                    });
                }else if(error.request){
                    dialogMessage = Pokedex.app.$lodash.extend(dialogMessage, {
                        'title' : "Uh-oh! Can't reach the PokeApi server.",
                        'body' : "Check your internet connection."
                    });
                }

                Pokedex.dispatch.$emit('modalOpen', dialogMessage);
            }
        },
        pokedexServerError: function (requestType, url, error, retryCallback){

        }
    }
});

export default errorHandle;
