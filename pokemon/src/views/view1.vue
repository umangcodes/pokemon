<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="4" v-for="data in localPokemons" :key="data.id">
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

export default {
  data() {
    return {
      currentLoad: 0,
      localPokemons: [],
    };
  },
  components: {
    Card,
  },
  computed: {},
  methods: {
    async createSlice(limitArray) {
      const array = await this.$store.state.myCatch.slice(
        limitArray[0],
        limitArray[1]
      );
      console.log(array);
      return array;
    },
    async catchMore() {
      this.currentLoad += 15;
      this.localPokemons = await this.createSlice([
        0,
        this.$store.state.firstLoadDisplay + this.currentLoad,
      ]);
      this.$store.dispatch("catchMorePokemons", 15);
    },
  },
  async created() {
    console.log("View 1 created");
    if (this.$store.state.currentCatch == 0) {
      await this.$store.dispatch("firstCall");
      this.localPokemons = await this.createSlice([
        0,
        this.$store.state.firstLoadDisplay + this.currentLoad,
      ]);
    } else {
      this.currentLoad = 0;
      this.localPokemons = await this.createSlice([
        0,
        this.$store.state.firstLoadDisplay + this.currentLoad,
      ]);
    }
  },
};
</script>

<style scoped></style>
