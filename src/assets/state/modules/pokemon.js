"use strict";
import _PokeApi from '../../pokeApiWrapper';
import PokeDataModule from '../../scripts/pokeDataModule';
let extend = require('lodash/extend'),
    merge  = require('lodash/merge'),
    isEmpty = require('lodash/isEmpty'),
    PokeApi = new _PokeApi(),
    pokeData = new PokeDataModule();

var state = {
    pokeCache: JSON.parse(localStorage.getItem('pokeCache')) || {},
    pokemon: {}
};

var getters = {
    currentLoaded : state => !isEmpty(state.pokemon),
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
                let fullResponse = extend(responseArray[0], responseArray[1]),
                    data = pokeData.filterFullPokeObject(fullResponse);

                console.log(merge({}, data));


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