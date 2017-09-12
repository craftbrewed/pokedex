"use strict";

const loadEncounters = function(url){
    return this.axios.get(this.url.root+url).then((response) => {
        return response.data.filter( (encounter) => {
            if( encounter.version_details.name == "pearl" ){
                return encounter.location_area.name;
            }
        } );
    });
};

export default loadEncounters;