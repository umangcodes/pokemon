import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import pokemon from "../api/pokemon";
export default new Vuex.Store({
  state: {
    pokemonList: [],
    pokeBallsAvailable: 30,
    currentPage: 1,
    myCatch: [],
  },
  mutations: {
    UPDATE_LIST(state, payload) {
      state.pokemonList = payload.results;
      // console.log("updated list");
      console.log(state.pokemonList);
    },
    APPEND_LIST(state, payload) {
      state.myCatch = payload;
      console.log(state.myCatch);
    },
  },
  actions: {
    async update_list({ state, commit }) {
      let res = await pokemon.catchThemFifty();
      commit("UPDATE_LIST", res.data);
      let list = [];
      for (let iterator = 0; iterator < state.pokemonList.length; iterator++) {
        // console.log(state.pokemonList.length)
        // console.log(state.pokemonList[iterator]);
        let res = await pokemon.catchOne(state.pokemonList[iterator].name);
        // console.log("instance" + iterator);
        list.push(res.data);
      }
      console.log(list);
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
