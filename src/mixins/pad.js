/* globals */

"use strict";
module.exports = function ( n , p = 3 ){

    let nStr = n.toString();
    while(nStr.length < p){
        nStr = "0"+nStr;
    }

    return nStr;

};