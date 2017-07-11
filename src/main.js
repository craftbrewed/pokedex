


import Vue from 'vue'
import App from './App.vue'

require('./assets/styles/modules/grid.scss');
require('./assets/fonts/pokefont/stylesheet.css');
require('./assets/styles/modules/helpers.scss');

var _ = require('lodash');
import keydown from './assets/eventListeners/keydown';
import axios from 'axios';



Vue.mixin({
  created(){
      this.transEndEvt = this.whichTransitionEnd();
  },
  methods: {
      pad: require('./mixins/pad'),
      whichTransitionEnd: require('./mixins/transitionEnd')
  }
});

/*
 Define common libraries in the Vue prototype
 */
//===========================================
Vue.prototype.$lodash = _;
Vue.prototype.axios = axios;
Vue.prototype.eventtObject = {
    keydown : keydown
};
//===========================================


window.Pokedex = {};
Pokedex.dispatch = new Vue();
Pokedex.apiUrls = {
    pokemon: 'https://pokeapi.co/api/v2/pokemon/',
    pokedex: 'https://pokeapi.co/api/v2/pokedex/'
};

new Vue({
  el: '#app',
  render: h => h(App)
});


