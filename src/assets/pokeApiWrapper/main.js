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

var apiCalls = {
    urls: {
        pokemon: 'https://pokeapi.co/api/v2/pokemon/',
        pokedex: 'https://pokeapi.co/api/v2/pokedex/'
    },
    axios: axios,
    loadPokedex : require('./loadPokedex')
};

export default apiCalls;