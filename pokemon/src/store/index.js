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
    pokemonsPerPage: 30,
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
    async catchMorePokemons({ state, commit }, captureMore) {
      commit("UPDATE_CURRENT_CATCH", state.myCatch.length);
      let res = await pokemon.catchThem(captureMore, state.currentCatch);
      state.currentCatch += captureMore;
      commit("UPDATE_LIST", res.data.results);
      let list = [];
      for (let iterator = 0; iterator < state.pokemons.length; iterator++) {
        let res = await pokemon.catchOne(state.pokemons[iterator].name);
        list.push(res.data);
      }
      commit("APPEND_LIST", list);
    },
  },
});
