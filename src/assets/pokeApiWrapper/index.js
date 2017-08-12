"use strict";

import axios from 'axios';
import loadPokedex from './functions/loadPokedex';
import loadPokemonData from './functions/loadPokemonData';
import errorHandle from '../scripts/error';

//axios config
axios.interceptors.response.use(function(config){
    //here is the global haltState manager. If it's set to true and we've gotten to here, it means there was
    // a successful retry and now we exit out of all the errors
    if(Pokedex.haltState){
        Pokedex.dispatch.$emit('setHaltState', false);
    }
    return config;
}, function(error){
    return Promise.reject(error)
});

var PokeApi = function() {

};

PokeApi.prototype.axios = axios;
PokeApi.prototype.errorHandle = errorHandle;

PokeApi.prototype.url = {
    pokemon: 'https://pokeapi.co/api/v2/pokemon/',
    species: 'https://pokeapi.co/api/v2/pokemon-species/',
    pokedex: 'https://pokeapi.co/api/v2/pokedex/'
};

PokeApi.prototype.loadPokedex = loadPokedex;
PokeApi.prototype.loadPokemonData = loadPokemonData;

export default PokeApi;