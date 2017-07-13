"use strict";

//Handles errors like a fucking boss

var errorHandle = (function (_) {
    //revealing module because we might want to use some closure variables here... 
    // if it turns out to not be the case, it's easily refactored into a plain object,
    var openTicketLink = "https://github.com/craftbrewed/pokedex/support",
        modalInfo = {
            version : "0.1",
            email: "contact@craftbrewed.io"
        },
        buildModalInfo = function(args){
            return _.extend(modalInfo, args);
        };
    return {
        pokeApiError: function (requestType, url, error) {
            log.write('error', 'Could not', requestType, url, "\n\texited with:", error.request, error.response, error.message);

            //ok, let's diagnose the error...
            var errorModalInfo = {};
            if(error.response){
                errorModalInfo.text =  "Looks like something went wrong with a request to the pokeapi...";
                errorModalInfo.status = error.status;
                errorModalInfo.suggestion = "Either something moved, or we messed up :(. Please let us know! <a href=\""+openTicketLink+"\" Open a ticket </a>";
            }else if(error.request){
                errorModalInfo.text = "Uh-oh! Can't reach the pokeapi server.";
                errorModalInfo.suggestion = ""
            }

        }
    }
});

export default errorHandle;
