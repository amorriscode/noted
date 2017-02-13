import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// Setup store
export default new Vuex.Store({
  state: {
    user: null,
  },
  getters: {
    uid: state => {
      if (state.user) return state.user.uid;
      return false;
    }
  },
  mutations: {
    setUser (state, payload) {
      localStorage.setItem('noted_user', JSON.stringify(payload));
      state.user = payload;
    },
    logoutUser (state) {
      localStorage.removeItem('noted_user');
      state.user = null;
    },
  }
})