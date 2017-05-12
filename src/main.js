import Vue from 'vue'
import App from './App.vue'


require('./assets/styles/modules/grid.scss');
require('./assets/fonts/pokefont/stylesheet.css');
require('./assets/styles/modules/helpers.scss');

Vue.mixin({
  methods: {
    pad: require('./mixins/pad')
  }
});
new Vue({
  el: '#app',
  render: h => h(App)
});
