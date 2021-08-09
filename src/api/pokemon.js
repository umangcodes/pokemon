async function getPokemonFromUrl(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const response = await fetch(url);
  return response.json();
}

function transformPokemon(pokemon) {
  return {
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.sprites.front_default,
    height: pokemon.height,
    weight: pokemon.weight,
  };
}

export default {
  async countPokemons() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon");
    const { count } = await response.json();
    return count;
  },

  async getPokemons({ offset, limit }) {
    const pokemonPromises = await Array.from({ length: limit || 20 }, (_, i) =>
      getPokemonFromUrl(i + 1 + (offset || 0))
    );
    const pokemons = await Promise.all(pokemonPromises);
    return pokemons.map(transformPokemon);
  },
};
