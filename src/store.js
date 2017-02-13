import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

// Setup store
export default new Vuex.Store({
  state: {
    user: null,
  },
  getters: {
    uid: state => {
      return state.user.uid
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload;
    }
  }
})