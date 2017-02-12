import Vue from 'vue';
import VueFire from 'vuefire';
import App from './App.vue';

Vue.use(VueFire);


const vm = new Vue({
  el: 'app',
  components: { App },
});
