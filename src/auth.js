import store from './store'

export default {
    authenticated: false,

    isAuthenticated() {
      // Make the user login persist
      const notedUser = JSON.parse(localStorage.getItem('noted_user'));
      if (notedUser && !store.state.user) {
        store.commit('setUser', notedUser);
      }

      if (store.state.user) return true;
    },

    logout() {

    }
}