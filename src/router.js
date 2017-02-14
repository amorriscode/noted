import Vue from 'vue'
import VueRouter from 'vue-router';
import auth from './auth'

Vue.use(VueRouter);

// Setup routes
import Login from './components/Login.vue';
import Signup from './components/Signup.vue';
import Notes from './components/notes/Notes.vue';

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
  // Logout the users
  if (to.path === '/logout') auth.logout();

  if (auth.isAuthenticated()) return next();

  // Allow users to signup
  if (to.path === '/signup' || to.path === '/login') return next();

  next('/login');
});

export default router;
