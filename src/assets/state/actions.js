"use strict";
const debounce = require('debounce-promise');

let promiseToDispatch = function(o){
    return o.dispatch('fetchPokemon', o.getters.currentId);
};

let debouncedDispatch = debounce(promiseToDispatch, 250, {
    'leading'  : true,
    'trailing' : true
});



export var initializePokedex = ({commit, dispatch : dispatch, getters}) => {
    return dispatch('fetchPokedex').then( function(response) {
        dispatch('fetchPokemon', getters.currentId);
    } );
};

export var updateIndex = ({getters, commit, dispatch : dispatch}, idx) =>{
    commit('shift', idx);
    return debouncedDispatch({dispatch, getters});
};