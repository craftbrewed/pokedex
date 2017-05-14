import Vue from 'vue'
import App from './App.vue'

//require('../node_modules/flexboxgrid/css/flexboxgrid.css');
require('./assets/styles/modules/grid.scss');
require('./assets/fonts/pokefont/stylesheet.css');
require('./assets/styles/modules/helpers.scss');

Vue.mixin({
  created(){

  },
  methods: {
    pad: require('./mixins/pad'),
    debounce: require('lodash/debounce')
  }
});
window.Pokedex = {};
Pokedex.dispatch = new Vue();

new Vue({
  el: '#app',
  render: h => h(App)
});


