import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    detailed: false,
    config: null,
  },
  mutations: {
    detailed(state, value) {
      state.detailed = value;
    },
    config(state, value) {
      state.config = value;
    },
  },
  getters: {
    config(state) {
      return state.config;
    },
  },
  actions: {
    async loadConfig({ commit }) {
      const response = await fetch('/api/v1/config');
      commit('config', await response.json());
    },
  },
});
