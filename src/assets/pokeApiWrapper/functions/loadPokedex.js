"use strict";

var loadPokedex = function(dexNumber) {
    //safety first;
    dexNumber = (typeof dexNumber === 'undefined') ? 1 : dexNumber;
    
    var completeCollection = JSON.parse(localStorage.getItem('pokedex')) || {}, 
        currentCollection = completeCollection[ dexNumber ],
        result = null;

        if(!currentCollection){
            result = new Promise((resolve, reject) => {
                var url = Pokedex.apiUrls.pokedex+dexNumber+'/';
                this.axios.get(url).then(pokedex => {
                    currentCollection = pokedex.data.pokemon_entries;
                    completeCollection[this.currentPokedex] = currentCollection;
                    localStorage.setItem('pokedex', JSON.stringify(completeCollection));
                    resolve({
                        completeCollection : completeCollection,
                        currentCollection : currentCollection
                    });
                }).catch( e => {
                    this.errorHandle.exception('pokeApiError', e, loadPokedex);
                    reject();
                });
            });
        }else{
            result = Promise.resolve({
                completeCollection : completeCollection,
                currentCollection : currentCollection
            })
        }

    return result;
};

module.exports = loadPokedex;