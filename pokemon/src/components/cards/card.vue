<template>
  <v-card elevation="10" class="rounded-xl">
    <v-img
      contain
      class="black--text align-end"
      height="200px"
      :src="pokemon.sprites.front_default"
    >
      <v-card-title>{{ pokemon.name }}</v-card-title>
      <v-card-subtitle
        > H:{{ pokemon.height / 10 }}m || W:{{
          pokemon.weight / 10
        }}Kg
      </v-card-subtitle></v-img
    >
  </v-card>
</template>

<script>
export default {
  props: ["pokemon"],
  created() {
    // console.log(this.pokemon.name);
  },
};
</script>

<style lang="scss" scoped></style>
