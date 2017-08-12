"use strict";

var loadPokedex = function(dexNumber) {
    //safety first;
    dexNumber = (typeof dexNumber === 'undefined') ? 1 : dexNumber;
    var url = this.url.pokedex+dexNumber;

    return this.axios.get(url)
        .then(pokedex => pokedex.data.pokemon_entries)
        .catch( error => {
            this.errorHandle.exception('pokeApiError', error, loadPokedex);
        });

};

export default loadPokedex;
