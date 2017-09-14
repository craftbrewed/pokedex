/* globals */

"use strict";
var keydown = (function () {
    //define keydown event
    var _keydown = function(e){
        var event = '',
            action;
        switch(e.which){
            case 33: //Page Up
                event = 'listItemChange';
                action = -10;
                break;

            case 34: //Page Down
                event = 'listItemChange';
                action = 10;
                break;
            case 38: //Up Arrow
                event = 'listItemChange';
                action = -1;
                break;
            case 40: //Down Arrow
                event = 'listItemChange';
                action = 1;
                break;
        }

        //broadcast that event

        if(event){
            Pokedex.EventBus.$emit(event, action);
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