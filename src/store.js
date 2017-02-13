import Vue from 'vue';
import Vuex from 'vuex';
import firebaseApp from './firebaseApp';

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
      state.user = payload;
    },
  }
})