/* globals */

"use strict";
var keydown = (function () {
    //define keydown event
    var _keydown = function(e){
        var event = '',
            action;
        switch(e.which){
            case 33:
                event = 'listItemChange';
                action = 'prevTen';
                break;
            case 34:
                event = 'listItemChange';
                action = 'nextTen';
                break;
            case 38:
                event = 'listItemChange';
                action = 'prev';
                break;
            case 40:
                event = 'listItemChange';
                action = 'next';
                break;
        }

        //broadcast that event

        if(event){
            console.log(event);
            Pokedex.dispatch.$emit(event, action);
        }
    };

    //bind the event to keydown on window
    window.addEventListener('keydown', _keydown);

    //return an object that allows the unbinding of the keydown event
    return {
        'remove' : function(){
            window.removeEventListener('keydown', _keydown);
        }
    }
})();

export default { keydown };