"use strict";

import axios from 'axios';
import requests from './functions/requestHandler';
import loadPokedex from './functions/loadPokedex';
import loadPokemonData from './functions/loadPokemonData';
import loadEncounters from './functions/loadEncounters';
import errorHandle from '../scripts/error';

//axios config
axios.interceptors.request.use(
    (config) => {
        return config;
    },
    error => {
        return Promise.reject(error)
    }
);


//Global halt state, i.e. when something goes wrong and we're ready for it.
axios.interceptors.response.use(function(config){
    if(Pokedex.haltState){
        Pokedex.dispatch.$emit('setHaltState', false);
    }
    return config;
}, function(error){
    return Promise.reject(error)
});

var PokeApi = function() {};
PokeApi.prototype.clearCacheDate = 1505346071219;
PokeApi.prototype.requests = requests();
PokeApi.prototype.axios       = axios;
PokeApi.prototype.errorHandle = errorHandle;
PokeApi.prototype.url = {
    root   : 'https://pokeapi.co',
    pokemon: 'https://pokeapi.co/api/v2/pokemon/',
    species: 'https://pokeapi.co/api/v2/pokemon-species/',
    pokedex: 'https://pokeapi.co/api/v2/pokedex/'
};

PokeApi.prototype.loadPokedex = loadPokedex;
PokeApi.prototype.loadPokemonData = loadPokemonData;
PokeApi.prototype.loadEncounters = loadEncounters;

export default PokeApi;