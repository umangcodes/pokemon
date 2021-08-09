<template>
  <div class="max-w-6xl mx-auto p-2">
    <div class="p-2">
      <pokemon-grid :pokemons="pokemons" />
    </div>

    <div class="p-2">
      <app-button @click="loadMoreHandler"> Load More </app-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AppButton from "@/components/app-button.vue";
import PokemonGrid from "@/components/pokemon-grid.vue";

export default {
  components: {
    AppButton,
    PokemonGrid,
  },
  computed: { ...mapState(["pokemons"]) },
  created() {
    this.$store.dispatch("loadPokemons", { limit: 50 });
  },
  methods: {
    loadMoreHandler() {
      this.$store.dispatch("loadMorePokemons", 15);
    },
  },
};
</script>
