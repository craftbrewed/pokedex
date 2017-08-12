"use strict";

export var initializePokedex = ({commit, dispatch : dispatch, getters}) => {
    return dispatch('fetchPokedex').then( function(response) {
        //var id = response[0].pokemon_species.url.split('/').filter(s => s !== "").pop();
        dispatch('fetchPokemon', getters.currentId);
    } );
};

export var updateIndex = ({getters, commit, dispatch : dispatch}, idx) =>{
    commit('shift', idx);
    dispatch('fetchPokemon', getters.currentId);
};