<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="4" v-for="data in display" :key="data.id">
        <Card :pokemon="data" />
      </v-col>
    </v-row>
    <v-row justify="center" align="center" class="pa-5" elevation="2">
      <v-btn text rounded @click="catchMore()"
        ><v-icon>mdi-chevron-right</v-icon>
        <v-icon>mdi-chevron-right</v-icon> Go catch more!
        <v-icon>mdi-chevron-left</v-icon>
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import Card from "@/components/cards/card.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  components: {
    Card,
  },
  computed: {
    ...mapState(["myCatch", "display"]),
  },
  methods: {
    catchMore() {
      console.log("button clicked");
      this.$store.state.currentLoad += this.$store.state.loadMore;
      this.$store.dispatch(
        "initialDisplay",
        this.$store.state.firstLoadDisplay + this.$store.state.currentLoad
      );
      this.$store.dispatch("catchMorePokemons");
    },
  },
  created() {
    this.$store.dispatch("initialDisplay", 50);
  },
};
</script>

<style scoped></style>
