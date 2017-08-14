"use strict";

var loadPokemonData = function(id, type){
    var url = this.url[type]+id+'/';
    return this.axios.get(url)
        .then( pokemon => pokemon.data )
        .catch( error => {
            this.errorHandle.exception('pokeApiError', error, loadPokemonData)
        });
    
};

export default loadPokemonData;