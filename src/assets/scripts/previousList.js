"use strict";

var previousList = function(){
    this.list = [];
};

previousList.prototype.clear = function(){
    this.list.forEach( item => {
        item.classList.remove('n1', 'n2', 'n3');
    });

    this.list = [];
};

previousList.prototype.reset = function(current){
    this.clear();

    var previous = current.previousElementSibling,
        n = 0;

    while(previous && n++ < 3){
        previous.classList.add("n"+n);
        this.previousList.push(previous);
        previous = previous.previousElementSibling;
    }
};

previousList.prototype.shift = function(n){

};