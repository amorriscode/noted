// Setup the app
import Vue from 'vue';
import VueFire from 'vuefire';
import App from './App.vue';
import store from './store';
import router from './router';

Vue.use(VueFire);

const vm = new Vue({
  router,
  store,
  el: 'app',
  components: { App }
});
