"use strict";

var loadPokemonData = function(id, type, cancelable){
    cancelable = (typeof cancelable === 'undefined') ? true : cancelable;
    let url = this.url[type]+id+'/';
    return this.axios.get(url, {
        cancelToken : new this.axios.CancelToken( (c) => {
            if(cancelable){
                this.requests.add(type, c);
            }
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