


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

  },
  methods: {
    pad: require('./mixins/pad')
  }
});

/*
 Define common libraries in the Vue prototype
 */
//===========================================
Vue.prototype.$lodash = _;
Vue.prototype.axios = axios;
//===========================================


window.Pokedex = {};
Pokedex.dispatch = new Vue();

new Vue({
  el: '#app',
  render: h => h(App)
});


