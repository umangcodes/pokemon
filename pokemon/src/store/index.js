import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    pokemons: [],
    total: 0,
  },

  getters: {
    pageCount(state) {
      return Math.ceil(state.total / 30);
    },
  },

  mutations: {
    ADD_POKEMONS(state, pokemons) {
      state.pokemons = state.pokemons.concat(pokemons);
    },

    SET_LOADING(state, loading) {
      state.loading = loading;
    },

    SET_POKEMONS(state, pokemons) {
      state.pokemons = pokemons;
    },

    SET_TOTAL(state, total) {
      state.total = total;
    },
  },

  actions: {
    async loadMorePokemons({ state, commit }, limit) {
      commit("SET_LOADING", true);
      const queryOptions = { limit, offset: state.pokemons.length };
      commit("ADD_POKEMONS", await context.pokemonRepository.get(queryOptions));
      commit("SET_LOADING", false);
    },

    async loadPokemons({ commit }, queryOptions) {
      commit("SET_LOADING", true);
      commit("SET_POKEMONS", await context.pokemonRepository.get(queryOptions));
      commit("SET_LOADING", false);
    },

    async loadTotal({ commit }) {
      commit("SET_LOADING", true);
      commit("SET_TOTAL", await context.pokemonRepository.count());
      commit("SET_LOADING", false);
    },
  },
});
