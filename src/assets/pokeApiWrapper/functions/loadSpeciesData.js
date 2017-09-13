"use strict";

var loadSpeciesData = function(id){
    var url = this.apiUrls.species+id;
    
    return this.axios.get(url, {
        cancelToken : new this.axios.CancelToken( (c) => {
            this.requests.add('loadSpeciesData', c);
        })
    })
        .then((data) => {
            this.requests.remove('loadSpeciesData');
            return data
        })
        .catch( error =>{
            if(!this.axios.isCancel(error)){
                this.errorHandle.exception('pokeApiError', error, loadSpeciesData);
            }
        });
};

export default loadSpeciesData;