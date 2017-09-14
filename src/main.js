//Vue, Vue Plugins, and App Entry Point
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import store from './assets/state';
import errorHandle from './assets/scripts/error';
import log from './assets/scripts/log'
import keydown from './assets/eventListeners/keydown';
import PokeApi from './assets/pokeApiWrapper/';
import routes from './assets/scripts/routes';
import WaveSurfer from 'wavesurfer.js';
import lodash from './assets/scripts/lodash-loader';
import ApiScraper from './assets/scripts/pokeapiscraper';
//Import global styles
require('./assets/scripts/style-loader.js');

Vue.use(VueRouter);
Vue.prototype.$lodash = lodash;
Vue.prototype.$WaveSurver = WaveSurfer;
Vue.prototype.pokeApi = new PokeApi();
Vue.prototype.eventObject = {
    keydown : keydown
};
Vue.prototype.errorHandle = errorHandle();
Vue.prototype.scraper = new ApiScraper();
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

const router = new VueRouter({
    routes : routes(App)
});

window.Pokedex = {};
Pokedex.haltState = false;
Pokedex.EventBus = new Vue();
Pokedex.config = {
    currentPokedex : 6
};
Pokedex.app = new Vue({
    router,
    el: '#app',
    store,
    render: h => h(App)
});


