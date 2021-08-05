import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pokemonList: [],
  },
  mutations: {
    UPDATE_LIST(state, payload) {
      state.pokemonList = payload;
    },
  },
  actions: {
    update_list({ commit }, payload) {
      commit("UPDATE_LIST", payload);
    },
  },
  modules: {},
});
