<template>
  <div class="bg-white overflow-hidden rounded-lg shadow-lg">
    <img class="w-full" :src="pokemon.image" />

    <p class="text-gray-700 p-4">
      {{ pokemon.name }} <br />
      H: {{ pokemon.height / 10 }}m || W: {{ pokemon.weight }}Kg
    </p>
  </div>
</template>

<script>
export default {
  props: {
    pokemon: {
      required: true,
    },
  },
};
</script>
