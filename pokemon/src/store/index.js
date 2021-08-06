import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import pokemon from "../api/pokemon";
export default new Vuex.Store({
  state: {
    pokemonList: [],
    pokeBallsAvailable: 30,
    currentPage: 1,
    currentCatch: 0,
    myCatch: [],
    loadMore: 15,
  },
  mutations: {
    UPDATE_LIST(state, payload) {
      state.pokemonList = payload;

      // console.log("updated list");
      console.log(state.pokemonList);
      console.log(state.currentCatch);
    },
    APPEND_LIST(state, payload) {
      state.myCatch.push(...payload);
      state.currentCatch = state.myCatch.length;
      console.log(state.currentCatch);
    },
  },
  actions: {
    //inital fetch
    async update_list({ state, commit }) {
      let res = await pokemon.catchThemFifty(); // refactor to call the api just once
      commit("UPDATE_LIST", res.data.results);
      let list = [];
      for (let iterator = 0; iterator < state.pokemonList.length; iterator++) {
        let res = await pokemon.catchOne(state.pokemonList[iterator].name);
        list.push(res.data);
      }
      console.log(list);
      commit("APPEND_LIST", list);
    },
    //subsequent fetch using load more button
    async catchMorePokemons({ state, commit }) {
      let res = await pokemon.catchThem(state.loadMore, state.currentCatch);
      state.currentCatch += state.loadMore;
      commit("UPDATE_LIST", res.data.results);
      let list = [];
      for (let iterator = 0; iterator < state.pokemonList.length; iterator++) {
        let res = await pokemon.catchOne(state.pokemonList[iterator].name);
        list.push(res.data);
      }
      commit("APPEND_LIST", list);
    },
  },
  getters: {
    catchZone: (state) => {
      return state.currentPage * state.pokeBallsAvailable;
    },
  },
  modules: {},
});
