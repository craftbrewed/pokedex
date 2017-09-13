"use strict";

var loadPokemonData = function(id, type){
    let url = this.url[type]+id+'/';
    return this.axios.get(url, {
        cancelToken : new this.axios.CancelToken( (c) => {
            this.requests.add(type, c);
        })
    })
        .catch( error => {
            if(this.axios.isCancel(error)){
                throw error
            }else{
                this.errorHandle.exception('pokeApiError', error, loadPokemonData)
            }
        })
        .then( (pokemon) => {
            this.requests.remove(type);
            return pokemon.data;
        });

};

export default loadPokemonData;