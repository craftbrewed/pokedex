"use strict";
const uniq = require('lodash/uniq');

const loadEncounters = function(url, cancelable){
    cancelable = (typeof cancelable === 'undefined') ? true : cancelable;

    //check for magikarp error... :(
    if(url === '/api/v2/pokemon/129/encounters'){
        return Promise.resolve([]);
    }
    return this.axios.get(this.url.root+url,{
        cancelToken : new this.axios.CancelToken( (c) => {
            if(cancelable){
                this.requests.add('loadEncounters', c);
            }
        })
    }).then((response) => {
        //map, filter
        let pearlEncounters = response.data.filter(encounter =>{
            return encounter.version_details.filter( detail => {
                return detail.version.name === 'pearl';
            }).length;
        });
        return pearlEncounters.map(encounter =>{
            let pearlVInfo = encounter.version_details.filter(version => { return version.version.name === 'pearl' })[0];
            let conditions = uniq(pearlVInfo.encounter_details.map(encounter => {
                if(encounter.condition_values.length){
                    return encounter.condition_values[0].name;
                }else{
                    return "universal";
                }
            }));
            if(conditions.includes("universal")){
                conditions = ['universal'];
            }else{
                conditions.filter(condition =>{
                    return (condition === 'time-morning' ||
                            condition === 'time-day' ||
                            condition === 'time-night');
                })
            }
            return {
                conditions : conditions,
                name : encounter.location_area.name
            }
        });
    });
};

export default loadEncounters;