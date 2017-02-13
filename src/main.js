// Setup the app
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueFire from 'vuefire';
import Vuex from 'vuex'
import App from './App.vue';

Vue.use(VueFire);
Vue.use(VueRouter);
Vue.use(Vuex)

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

// Setup store
const store = new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    setUser (state, payload) {
      console.log(state,payload);
      state.user = payload;
    }
  }
})

const vm = new Vue({
  router,
  store,
  el: 'app',
  components: { App }
});
