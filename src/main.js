// Setup the app
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueFire from 'vuefire';
import App from './App.vue';

Vue.use(VueFire);
Vue.use(VueRouter);

// Setup routes
import Login from './components/Login.vue';

const routes = [
  { path: '/login', component: Login }
]

const router = new VueRouter({
  routes
})

const vm = new Vue({
  router,
  el: 'app',
  components: { App }
});
