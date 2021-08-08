import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import pokemon from "../api/pokemon";
export default new Vuex.Store({
  state: {
    pokemons: [],
    myCatch: [], // api call data store !! do not touch [details]
    currentCatch: 0, // api call data store !! do not touch [length of my catch ]
    display: [],

    displayStartLimit: 0,
    displayStopLimit: 50,
    outOfBound: [true, false],
    currentPage: 1,
    totalDisplay: 50,

    firstLoadDisplay: 50,
    loadMore: 15,
    currentLoad: 0,
  },
  mutations: {
    UPDATE_LIST(state, payload) {
      state.pokemons = payload;
      console.log(state.pokemons);
      console.log(state.currentCatch);
    },
    APPEND_LIST(state, payload) {
      state.myCatch.push(...payload);
      state.currentCatch = state.myCatch.length;
      console.log(state.currentCatch);
    },
    UPDATE_PAGE(state, { offset, page_number }) {
      state.currentPage = page_number;
      state.displayStartLimit = state.displayStopLimit;
      state.displayStopLimit = state.displayStartLimit + offset;
      console.log("start:" + state.displayStartLimit);
      console.log("stop:" + state.displayStopLimit);
      if (state.displayStopLimit < state.myCatch.length) {
        state.display = state.myCatch.slice(
          state.displayStartLimit,
          state.displayStopLimit
        );
      } else {
        //call api for more data
        // slice data
      }
    },
    UPDATE_PAGE_R(state, { offset, page_number }) {
      state.currentPage = page_number;
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
    UPDATE_BOUND(state, payload) {
      state.outOfBound = payload; // [lower, higher]
    },
    UPDATE_DISPLAY(state, limit) {
      state.display = [];
      state.display = state.myCatch.slice(0, limit);
    },
    UPDATE_CURRENT_LOAD(state, limit) {
      state.currentLoad += limit; // 0 initially
    },
    RESET_CURRENT_LOAD(state) {
      state.currentLoad = 0;
    },
    UPDATE_CURRENT_CATCH(state, payload) {
      state.currentCatch = payload;
    },
    UPDATE_CURRENT_PAGE(state, page) {
      state.currentPage = page;
    },
  },
  actions: {
    //inital fetch
    async firstCall({ state, commit }) {
      let res = await pokemon.catchThemFirst(); // get names
      commit("UPDATE_LIST", res.data.results); // store names
      let list = []; // temp list
      for (let iterator = 0; iterator < state.pokemons.length; iterator++) {
        let res = await pokemon.catchOne(state.pokemons[iterator].name);
        list.push(res.data); //  get details
      }
      commit("APPEND_LIST", list); // update myCatch and currentCatch
    },
    //subsequent fetch using load more button
    async catchMorePokemons({ state, commit }) {
      commit("UPDATE_CURRENT_CATCH", state.myCatch.length);
      let res = await pokemon.catchThem(state.loadMore, state.currentCatch);
      state.currentCatch += state.loadMore;
      commit("UPDATE_LIST", res.data.results);
      let list = [];
      for (let iterator = 0; iterator < state.pokemons.length; iterator++) {
        let res = await pokemon.catchOne(state.pokemons[iterator].name);
        list.push(res.data);
      }
      commit("APPEND_LIST", list);
    },
    updateDisplay({ commit }, limit) {
      commit("UPDATE_DISPLAY", limit);
    },
    updateCurrentLoad({ commit }, limit) {
      commit("UPDATE_CURRENT_LOAD", limit);
    },
    resetCurrentLoad({ commit }) {
      commit("RESET_CURRENT_LOAD");
    },
    updatePage({ commit }, parameters) {
      commit("UPDATE_PAGE", parameters);
    },
    updatePageReverse({ commit }, parameters) {
      commit("UPDATE_PAGE_R", parameters);
    },
    updateBound({ commit }, payload) {
      commit("UPDATE_BOUND", payload);
    },
    updateCurrentPage({ commit }, updatedPage) {
      commit("UPDATE_CURRENT_PAGE", updatedPage);
    },
  },
  getters: {},
  modules: {},
});
