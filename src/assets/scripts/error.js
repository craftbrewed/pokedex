"use strict";

//Handles errors like a fucking boss

var errorHandle = (function () {
    //revealing module because we might want to use some closure variables here... 
    // if it turns out to not be the case, it's easily refactored into a plain object,
    var openTicketLink = "https://github.com/craftbrewed/pokedex/support";

    return {
        pokeApiError: function (requestType, url, error) {
            log.write('error', 'Could not', requestType, url, "\n\texited with:", error.request, error.response, error.message);
            var dialogMessage = {canClose : false};
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
    }
});

export default errorHandle;
