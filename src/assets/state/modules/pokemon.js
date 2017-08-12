"use strict";
import _PokeApi from '../../pokeApiWrapper';
var extend = require('lodash/extend'),
    PokeApi = new _PokeApi();

var state = {
    pokeCache: JSON.parse(localStorage.getItem('pokeCache')) || {},
    pokemon: {}
};

var getters = {
    current : state => state.pokemon
};

var mutations = {
    update (state, pokemon){
        state.pokemon = pokemon;
    },
    cachePokemon (state, pokeObject){
        state.pokeCache = state.pokeCache || {};
        state.pokeCache[pokeObject.id] = pokeObject.data;
        localStorage.setItem( 'pokeCache', JSON.stringify(state.pokeCache) );
    }
};

var actions = {
    fetchPokemon({commit, state}, id){
        var response = state.pokeCache[id];
        if(!response){
            response = Promise.all([
                PokeApi.loadPokemonData(id, 'pokemon'),
                PokeApi.loadPokemonData(id, 'species')
            ]).then( responseArray => {
                var data = extend(responseArray[0], responseArray[1]);
                commit('cachePokemon', {
                    id : id,
                    data: data
                });
                commit('update', data);
            });
        }else{
            commit('update', response);
            response = Promise.resolve(response);
        }

        return response;
    }
};
export default {
    state,
    actions,
    getters,
    mutations
}