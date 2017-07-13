/* globals */

"use strict";
var log = function (level) {
    //0 - nothing, 3 - (mostly) everything
    var logLevel = 3,
        history = [],
        logLevels = {
            0 : [],
            1 : ['error'],
            2 : ['log', 'warn', 'error'],
            3 : ['debug', 'info', 'log', 'warn', 'error']
        },
        setLogLevel = function(level){
            if( typeof(level) === 'undefined' || level > 3){
                level = 3;
            }
            
            if( level < 0 ){
                level = 0;
            }
            
            
            logLevel = level;
        },
        makeHistory = function(type, args){
            if( history.length > 500 ){
                log("warn", "Log history exceeded limit, clearing");
                clearLogHistory(true);
            }
            history.push({
                'logType' : type,
                'timestamp': Date.now(),
                'arguments' : args
            });
        },
        showLogHistory = function(n){
            var output = history,
                logType = (console.table) ? 'table' : 'log' ;

            n = (typeof n === 'undefined') ? output.length : n;

            if( n < output.length ){
                output = output.slice( output.length - n );
            }
            console[logType]( output );
        },
        clearLogHistory = function(show){
            show = (typeof show === 'undefined') ? true : show;
            log('info', "Clearing Log History");
            if(show)
                showLogHistory();

            history = [];

        },
        log = function(logType){

            var args = Array.prototype.slice.call(arguments, 1);
            makeHistory(log, args);
            if( logLevels[logLevel].indexOf(logType) === -1 ){
                return;
            }

            console[logType].apply(null, args);
        };
    
    setLogLevel(level);
    return {
        write : log,
        setLogLevel : setLogLevel,
        showLogHistory: showLogHistory,
        clearLogHistory : clearLogHistory
    };
};

export default log;