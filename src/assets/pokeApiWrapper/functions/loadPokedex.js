"use strict";

var loadPokedex = function(dexNumber) {
    console.log(this);
    //safety first;
    dexNumber = (typeof dexNumber === 'undefined') ? 1 : dexNumber;
    
    var completeCollection = JSON.parse(localStorage.getItem('pokedex')) || {}, 
        currentCollection = completeCollection[ dexNumber ],
        result = null;

        if(!currentCollection){
            result = new Promise((resolve, reject) => {
                var url = this.url.pokedex+dexNumber+'/';
                this.axios.get(url).then(pokedex => {
                    currentCollection = pokedex.data.pokemon_entries;
                    completeCollection[this.currentPokedex] = currentCollection;
                    localStorage.setItem('pokedex', JSON.stringify(completeCollection));
                    resolve(currentCollection);
                }).catch( e => {
                    this.errorHandle.exception('pokeApiError', e, loadPokedex);
                    reject();
                });
            });
        }else{
            result = Promise.resolve(currentCollection)
        }

    return result;
};

module.exports = loadPokedex;