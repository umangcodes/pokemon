<template>
  <div class="flex flex-wrap -m-4 p-2">
    <div
      v-for="pokemon in pokemons"
      :key="pokemon.id"
      class="w-full md:w-1/2 lg:w-1/4 p-2"
    >
      <pokemon-card :pokemon="pokemon" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import pokemonCard from "./pokemon-card.vue";
export default Vue.extend({
  components: { pokemonCard },
  props: {
    pokemons: {
      required: true,
    },
  },
});
</script>
