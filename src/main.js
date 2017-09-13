//Vue, Vue Plugins, and App Entry Point
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import store from './assets/state';

//Import Libraries for adding to the Vue prototype
import keydown from './assets/eventListeners/keydown';
import axios from 'axios';
import PokeApi from './assets/pokeApiWrapper/';
import routes from './assets/scripts/routes';
import WaveSurfer from 'wavesurfer.js';

//cherry pick lodash, we're already pushing what's acceptable for space
var _ = {
    'debounce' : require('lodash/debounce'),
    'extend'   : require('lodash/extend'),
    'throttle' : require('lodash/throttle'),
    'isFunction' : require('lodash/isFunction'),
    'isEmpty' : require('lodash/isEmpty')
};

import errorHandle from './assets/scripts/error';
import log from './assets/scripts/log'

Vue.use(VueRouter);

Vue.prototype.$lodash = _;
Vue.prototype.$WaveSurver = WaveSurfer;
Vue.prototype.axios = axios;
Vue.prototype.pokeApi = new PokeApi();
Vue.prototype.eventObject = {
    keydown : keydown
};

Vue.prototype.axios.interceptors.response.use(function(config){
    //here is the global haltState manager. If it's set to true and we've gotten to here, it means there was
    // a successfull retry and now we exit out of all the errors
    if(Pokedex.haltState){
        Pokedex.dispatch.$emit('setHaltState', false);
    }
    return config;
}, function(error){
    return Promise.reject(error)
});

Vue.prototype.errorHandle = errorHandle();

window.log = log(3);

//Import Style via a style loader
require('./assets/scripts/style-loader.js');

//...Mixins
Vue.mixin({
  created(){
      this.transEndEvt = this.whichTransitionEnd();
  },
  methods: {
      pad: require('./mixins/pad'),
      whichTransitionEnd: require('./mixins/transitionEnd')
  }
});
var router = new VueRouter({
    routes : routes(App)
});

window.Pokedex = {};
//=== This is used for stopping all function of the app, when an error occurs.
//      because there's no point in making more requests when one isn't working
Pokedex.haltState = false;
//====
Pokedex.dispatch = new Vue();
Pokedex.config = {
    currentPokedex : 6
};
Pokedex.apiUrls = {
    pokemon: 'https://pokeapi.co/api/v2/pokemon/',
    pokedex: 'https://pokeapi.co/api/v2/pokedex/'
};


Pokedex.app = new Vue({
    router,
    el: '#app',
    store,
    render: h => h(App)
});


