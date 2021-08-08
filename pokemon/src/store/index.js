import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import pokemon from "../api/pokemon";
export default new Vuex.Store({
  state: {
    pokemons: [], // api call data store !! imp[list]
    myCatch: [], // api call data store !! imp[details]
    currentCatch: 0, // api call data store !! imp[length of my catch ]
    display: [], // cards to render
    // view 1
    firstLoadDisplay: 50,
    loadMore: 15,
    currentLoad: 0,
    //view 2
    displayStartLimit: 0,
    displayStopLimit: 50,
    outOfBound: [true, false],
    currentPage: 1,
    totalDisplay: 50,
  },
  mutations: {
    UPDATE_LIST(state, payload) {
      state.pokemons = payload;
      console.log(state.pokemons);
      console.log(state.currentCatch);
    }, // updates pokemons
    APPEND_LIST(state, payload) {
      state.myCatch.push(...payload);
      state.currentCatch = state.myCatch.length;
      console.log(state.currentCatch);
    }, // updates my catch
    UPDATE_DISPLAY(state, limit) {
      state.display = [];
      console.log(limit);
      state.display = state.myCatch.slice(limit[0], limit[1]);
    }, // updates display
    UPDATE_CURRENT_CATCH(state, payload) {
      state.currentCatch = payload;
    }, // length of my catch

    // view 1 mutations
    UPDATE_CURRENT_LOAD(state, limit) {
      state.currentLoad += limit;
    }, // card limit for display after inital load
    RESET_CURRENT_LOAD(state) {
      state.currentLoad = 0;
    }, // reset card limit
    // view 2 mutations
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
      }
    }, // update page when next is clicked
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
    }, // update page when reversed is clicked
    UPDATE_CURRENT_PAGE(state, page) {
      state.currentPage = page;
    }, // update current page
    UPDATE_BOUND(state, payload) {
      state.outOfBound = payload; // [lower, higher]
    }, // update outOfBound
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
    updateCurrentLoad({ commit }, limit) {
      commit("UPDATE_CURRENT_LOAD", limit);
    },
    resetCurrentLoad({ commit }) {
      commit("RESET_CURRENT_LOAD");
    },
    updateDisplay({ commit }, limit) {
      commit("UPDATE_DISPLAY", limit);
    },
    updatePage({ commit }, parameters) {
      commit("UPDATE_PAGE", parameters);
    },
    updatePageReverse({ commit }, parameters) {
      commit("UPDATE_PAGE_R", parameters);
    },
    updateCurrentPage({ commit }, updatedPage) {
      commit("UPDATE_CURRENT_PAGE", updatedPage);
    },
    updateBound({ commit }, payload) {
      commit("UPDATE_BOUND", payload);
    },
  },
  getters: {},
  modules: {},
});
