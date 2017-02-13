// Setup the app
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueFire from 'vuefire';
import App from './App.vue';

Vue.use(VueFire);
Vue.use(VueRouter);

// Import store
import store from './store';

// Setup routes
import Login from './components/Login.vue';
import Signup from './components/Signup.vue';
import Notes from './components/Notes.vue';

const routes = [
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/notes', component: Notes }
]

const router = new VueRouter({
  routes
})

// Go to the login page if user isn't logged in
router.beforeEach((to, from, next) => {
  if (store.state.user) return next();

  // Allow users to signup
  if (to.path === '/signup') return next();

  // Don't change route if it's already set to /login
  if (to.path !== '/login') {
    next('/login');
  } else {
    next();
  }
});

const vm = new Vue({
  router,
  store,
  el: 'app',
  components: { App }
});
