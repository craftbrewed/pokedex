"use strict";

const loadEncounters = function(url){
    return this.axios.get(this.url.root+url).then((response) => {
        //map, filter
        let pearlEncounters = response.data.filter(encounter =>{
            return encounter.version_details.filter( detail => {
                return detail.version.name === 'pearl';
            }).length;
        });
        return pearlEncounters.map(encounter =>{
            return encounter.location_area.name;
        });
    });
};

export default loadEncounters;