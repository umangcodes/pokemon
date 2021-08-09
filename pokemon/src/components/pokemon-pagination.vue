<template>
  <div class="-m-1">
    <router-link
      v-for="i in count"
      :key="i"
      class="p-1"
      :to="{ name: 'pokemons-v2', params: { page: String(i) } }"
    >
      <app-button>{{ i }}</app-button>
    </router-link>
  </div>
</template>

<script>
import AppButton from "./app-button.vue";
export default {
  components: { AppButton },
  props: {
    count: {
      type: Number,
      required: true,
    },
  },
};
</script>
