"use strict";

//Handles errors like a fucking boss

var errorHandle = (function () {
    //revealing module because we might want to use some closure variables here... 
    // if it turns out to not be the case, it's easily refactored into a plain object,
    var openTicketLink = "https://github.com/craftbrewed/pokedex/support",
        //keep track for try again
        errorCount = 0,
        errorMax = 5,
        dialogMessage = {canClose : false},
        errorList = {
            unhandled: function(error){
                    return {
                    'title' : "Well this is embarrassing",
                    'body'  : "You've encountered something we are unprepared for...  Please let us know! <a href=\""+openTicketLink+"\"> Open a ticket </a>",
                    'status' : error.status
                    }
            },
            pokeApiError: error => {

                if(error.response){
                    dialogMessage = Pokedex.app.$lodash.extend(dialogMessage, {
                        'title' :  "Looks like something went wrong with a request to the pokeapi...",
                        'status' : error.status,
                        'body' : "Either something moved, or we messed up :(. Please let us know! <a href='"+openTicketLink+"       \"> Open a ticket </a>"
                    });
                }else if(error.request){
                    dialogMessage = Pokedex.app.$lodash.extend(dialogMessage, {
                        'title' : "Uh-oh! Can't reach the PokeApi server.",
                        'body' : "Check your internet connection."
                    });
                }

                return dialogMessage;
            }

        },
        retry = null,
        retryLastError =  function(){
            if(retry){
                _exception(retry.exception, retry.error, retry.callback);
            }
        },
        retryLoop = function(callback){
            if(errorCount < errorMax){
                errorCount+=1;
                setTimeout(callback, 100*errorCount);
                return false;
            }else{
                errorCount = 0;
                return true;
            }
        },
        pollForConnection = function(){
            setTimeout(retryLastError, 1500);
        },
        _exception = function(exception, error, callback){
            exception = (typeof exception === 'undefined' ) ? 'unhandled' : exception;
            if(!Pokedex.app.$lodash.isFunction(exception)){
                exception = (errorList[exception]) ? errorList[exception] : errorList['unhandled'];
            }

            var url = error.config.url,
                method = error.config.method;

            if(!Pokedex.haltState){
                Pokedex.dispatch.$emit('setHaltState', true);
            }

            if(retryLoop(callback)){
                log.write('error', 'Could not', method, url, "\n\texited with:", error.request, error.response, error.message);
                retry = {
                    callback : callback,
                    error: error,
                    exception: exception
                };
                Pokedex.dispatch.$emit('modalOpen', exception(error));
                pollForConnection();
            }

        };

    return {

        exception: _exception,
        retryLastError : retryLastError
    }
});

export default errorHandle;
