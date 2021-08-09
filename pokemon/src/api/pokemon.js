import axios from "axios";
const pokemonApi = axios.create({
  baseURL: `https://pokeapi.co/api/v2/pokemon`,
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  async countPokemons() {
    return this.pokemons.length;
  },
  async callApi(){
    let res = await pokemonApi.get(
      `/?limit=${queryOptions.limit || 150}&offset=${queryOptions.offset}`
    );
    
    let pokemons = res.data.results.slice(start, end);
    let array = [];
    for (let i = start; i < end; i += 1) {
      let res = await pokemonApi.get(`/${pokemons[i].name}`);
      console.log(res.data);
      array.push(res.data);
    }
    

    return pokemons;

  },
  async getPokemons(queryOptions) {
    const start = queryOptions.offset || 0;
    const end = start + (queryOptions.limit || 50);
    pokemons = array.slice(start, end);
  },
};
