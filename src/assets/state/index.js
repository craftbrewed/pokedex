"use strict";
import Vue from 'vue';
import Vuex from 'vuex';

import * as actions from './actions';
import * as getters from './getters';

import pokemon from './modules/pokemon';
import pokedex from './modules/pokedex';

Vue.use(Vuex);

export default new Vuex.Store({
    actions,
    getters,
    modules: {
        pokemon,
        pokedex
    }
})