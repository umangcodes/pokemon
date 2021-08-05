<template>
  <v-card elevation="10">
    <v-img
      class="white--text align-end"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    >
      <v-card-title>{{ pokemon.name }}</v-card-title>
      <v-card-subtitle
        >{{ pokemon.type }} || {{ pokemon.height }} || {{ pokemon.weight }}
      </v-card-subtitle></v-img
    >
  </v-card>
</template>

<script>
export default {
  props: ["pokemon"],
};
</script>

<style lang="scss" scoped></style>
