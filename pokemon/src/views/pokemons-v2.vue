<template>
  <div class="max-w-6xl mx-auto p-2">
    <div class="p-2">
      <pokemon-grid :pokemons="pokemons" />
    </div>

    <div class="p-2">
      <pokemon-pagination :count="pageCount" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapState } from "vuex";
import PokemonGrid from "@/components/pokemon-grid.vue";
import PokemonPagination from "@/components/pokemon-pagination.vue";
export default Vue.extend({
  components: {
    PokemonGrid,
    PokemonPagination,
  },
  computed: {
    ...mapGetters(["pageCount"]),
    ...mapState(["pokemons"]),
  },
  async beforeRouteUpdate(to, from, next) {
    if (!to.params.page) this.redirectToPage("1");
    else await this.loadPokemonsBasedOnPage(to.params.page);
    next();
  },
  async created() {
    if (!this.$route.params.page) this.redirectToPage("1");
    else await this.loadPokemonsBasedOnPage(this.$route.params.page);
  },
  methods: {
    async loadPokemonsBasedOnPage(page: string) {
      const pageNum = Number(page);
      const offset = 30 * (pageNum - 1);
      await this.$store.dispatch("loadPokemons", { offset, limit: 30 });
      await this.$store.dispatch("loadTotal");
    },
    redirectToPage(page: string) {
      this.$router.push({ name: "pokemons-v2", params: { page } });
    },
  },
});
</script>
