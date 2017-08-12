"use strict";

var loadSpeciesData = function(id){
    var url = this.apiUrls.species+id;
    
    return this.axios.get(url)
        .then(data => data)
        .catch( error =>{
            this.errorHandle.exception('pokeApiError', error, loadSpeciesData);
        });
};

export default loadSpeciesData;