//Vue, Vue Plugins, and App Entry Point
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';

//Import Libraries for adding to the Vue prototype
import keydown from './assets/eventListeners/keydown';
import axios from 'axios';
import debounce from 'lodash';
import errorHandle from './assets/scripts/error';

Vue.prototype.$lodash = _;
Vue.prototype.axios = axios;
Vue.prototype.eventObject = {
    keydown : keydown
};
Vue.prototype.errorHandle = errorHandle;

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


