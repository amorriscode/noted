// Setup the app
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueFire from 'vuefire';
import App from './App.vue';

Vue.use(VueFire);
Vue.use(VueRouter);

// Setup routes
import Login from './components/Login.vue';
import Notes from './components/Notes.vue';

const routes = [
  { path: '/login', component: Login },
  { path: '/notes', component: Notes }
]

const router = new VueRouter({
  routes
})

router.push('login');

const vm = new Vue({
  router,
  el: 'app',
  components: { App }
});
