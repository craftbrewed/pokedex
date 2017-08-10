"use strict";

import axios from 'axios';

axios.interceptors.response.use(function(config){
    //here is the global haltState manager. If it's set to true and we've gotten to here, it means there was
    // a successfull retry and now we exit out of all the errors
    if(Pokedex.haltState){
        Pokedex.dispatch.$emit('setHaltState', false);
    }
    return config;
}, function(error){
    return Promise.reject(error)
});

var pokeApi = function() {

};

pokeApi.prototype.axios = axios;
pokeApi.prototype.url = {
    pokemon: 'https://pokeapi.co/api/v2/pokemon/',
    pokedex: 'https://pokeapi.co/api/v2/pokedex/'
};

pokeApi.prototype.loadPokedex = require('./functions/loadPokedex');

export default pokeApi;