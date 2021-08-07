import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import pokemon from "../api/pokemon";
export default new Vuex.Store({
  state: {
    pokemonList: [],
    pokeBalls: 30,
    currentPage: 1,
    currentCatch: 0,
    myCatch: [],
    loadMore: 15,
    displayStartLimit: 0,
    displayStopLimit: 50,
    display: [],
    outOfBound: [false, false],
    totalDisplay: 50,
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
    UPDATE_PAGE(state, offset) {
      state.displayStartLimit = state.displayStopLimit;
      state.displayStopLimit = state.displayStartLimit + offset;
      console.log("start:" + state.displayStartLimit);
      console.log("stop:" + state.displayStopLimit);
      if (state.displayStopLimit < state.myCatch.length) {
        state.display = state.myCatch.slice(
          state.displayStartLimit,
          state.displayStopLimit
        );
      }
    },
    UPDATE_PAGE_R(state, offset) {
      state.displayStopLimit = state.displayStartLimit;
      state.displayStartLimit = state.displayStopLimit + offset;
      console.log("start:" + state.displayStartLimit);
      console.log("stop:" + state.displayStopLimit);
      if (state.displayStopLimit < state.myCatch.length) {
        state.display = state.myCatch.slice(
          state.displayStartLimit,
          state.displayStopLimit
        );
      }
    },
    UPDATE_DISPLAY(state, payload) {
      state.display = payload;
      console.log(state.display);
    },
    UPDATE_BOUND(state, payload) {
      state.outOfBound = payload; // [lower, higher]
    },
    INITIAL_DISPLAY(state, limit) {
      state.display = [];
      state.display = state.myCatch.slice(0, limit);
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
      state.currentCatch = state.myCatch.length;
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
    updatePage({ commit }, offset) {
      commit("UPDATE_PAGE", offset); // 0th -> limit, 1st -> offset
    },
    updatePageReverse({ commit }, offset) {
      commit("UPDATE_PAGE_R", offset); // 0th -> limit, 1st -> offset
    },
    updateDisplay({ commit }, payload) {
      commit("UPDATE_DISPLAY", payload);
    },
    updateBound({ commit }, payload) {
      commit("UPDATE_BOUND", payload);
    },
    initialDisplay({ commit }, limit) {
      commit("INITIAL_DISPLAY", limit);
    },
  },
  getters: {
    catchZones: (state) => {
      if (state.currentCatch > 0) {
        console.log("getter");
        console.log(Math.round(state.currentCatch / state.pokeBalls));
        return Math.round(state.currentCatch / state.pokeBalls);
      }
    },
  },
  modules: {},
});
