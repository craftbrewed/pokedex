"use strict";
const pokeDataModule = function () {

};
pokeDataModule.prototype.pokeKeys =  [
    'flavor_text_entries',
    'height',
    'id',
    'location_area_encounters',
    'genera',
    'name',
    'order',
    'shape',
    'types',
    'weight'
];
pokeDataModule.prototype.pokeKeyFunctions = {
    'language' : (navigator.language || navigator.userLanguage).split('-')[0],
    'flavor_text_entries' : function(entries){
        return entries.filter(entry=> {
            return entry.language.name === this.language && entry.version.name === 'pearl'
        });
    },
    'genera' : function(genera){
        return genera.filter(gen =>{
            return gen.language.name === this.language;
        });
    }
};

pokeDataModule.prototype.filterFullPokeObject = function(obj){

    let _data = {};
    this.pokeKeys.forEach((key) => {
        if( obj[key] ){
            if(this.pokeKeyFunctions[key]){
                _data[key] = this.pokeKeyFunctions[key](obj[key]);
            }else{
                _data[key] = obj[key];
            }
        }
    });

    return _data;
};

module.exports = pokeDataModule;