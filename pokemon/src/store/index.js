import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import pokemon from "../api/pokemon";
export default new Vuex.Store({
  state: {
    pokemons: [], // api call data store !! imp[list]
    myInventory: [], // api call data store !! imp[details]
    currentInventory: 0, // api call data store !! imp[length of my Inventory ]
    display: [], // cards to render
    // view 1
    firstLoadDisplay: 50,
    loadMore: 15,
    pokemonsPerPage: 30,
    totalPages: 5,
  },
  mutations: {
    UPDATE_LIST(state, payload) {
      state.pokemons = payload;
      console.log(state.pokemons);
      console.log(state.currentInventory);
    }, // updates pokemons
    APPEND_LIST(state, payload) {
      state.myInventory.push(...payload);
      state.currentInventory = state.myInventory.length;
      console.log(state.currentInventory);
    }, // updates my Inventory
    UPDATE_DISPLAY(state, limit) {
      state.display = [];
      console.log(limit);
      state.display = state.myInventory.slice(limit[0], limit[1]);
    }, // updates display
    UPDATE_CURRENT_CAPTURE(state, payload) {
      state.currentInventory = payload;
    }, // length of my Inventory
  },
  actions: {
    async firstCall({ state, commit }) {
      console.log("store first call");
      let res = await pokemon.captureThemFirst(); // get names
      commit("UPDATE_LIST", res.data.results); // store names
      let list = []; // temp list
      for (let iterator = 0; iterator < state.pokemons.length; iterator++) {
        let res = await pokemon.captureOne(state.pokemons[iterator].name);
        list.push(res.data); //  get details
      }
      commit("APPEND_LIST", list); // update mycapture and currentInventory
    },
    async captureMorePokemons({ state, commit }, captureMore) {
      commit("UPDATE_CURRENT_CAPTURE", state.myInventory.length);
      let res = await pokemon.captureThem(captureMore, state.currentInventory);
      state.currentInventory += captureMore;
      commit("UPDATE_LIST", res.data.results);
      let list = [];
      for (let iterator = 0; iterator < state.pokemons.length; iterator++) {
        let res = await pokemon.captureOne(state.pokemons[iterator].name);
        list.push(res.data);
      }
      commit("APPEND_LIST", list);
    },
  },
});
