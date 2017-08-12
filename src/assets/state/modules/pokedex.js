"use strict";
import  _PokeApi from '../../pokeApiWrapper';
var PokeApi = new _PokeApi;

var state = {
    collectionCache : JSON.parse(localStorage.getItem('pokedex')) || {},
    collection : [],
    idx : 0,
    dexNumber: 6
};

var getters = {
    fromCurrentIdx: (state) => {
        return state.collection[ state.idx ];
    },
    currentId: (state, getters) =>{
        if(getters.fromCurrentIdx){
            return getters.fromCurrentIdx.pokemon_species.url.split('/').filter(s => s !== "").pop();
        }
    }
};
var mutations = {
    setDex(state, dex){
        state.collection =dex;
        state.idx = 0;
    },
    cachePokedex(state, response){
        state.collectionCache[ state.dexNumber ] = response;
        localStorage.setItem( 'pokedex', JSON.stringify(state.collectionCache) );
    },
    shift(state, idx){
        state.idx = idx;
    }
};
var actions = {
    fetchPokedex({commit, state}){

        var collection = state.collectionCache,
            cached = collection[ state.dexNumber ],
            response = null;
        if( !cached ){
            response = PokeApi.loadPokedex(state.dexNumber).then(data =>{
                commit('cachePokedex', data);
                commit('setDex', data);
                return data;
            })
        }else{
            response = Promise.resolve(cached);
            commit('setDex', cached);
        }
        return response;
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}
