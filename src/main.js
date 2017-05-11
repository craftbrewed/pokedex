import Vue from 'vue'
import App from './App.vue'
require('./assets/styles/modules/grid.scss');
require('./assets/fonts/pokefont/stylesheet.css');

new Vue({
  el: '#app',
  render: h => h(App)
});
