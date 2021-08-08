<template>
  <v-card class="rounded-xl">
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon :disabled="bound[0]" @click="previousPage()"
        ><v-icon>mdi-chevron-left</v-icon></v-btn
      >
      <v-spacer></v-spacer>
      Current Page: {{ $store.state.currentPage }}
      <v-spacer></v-spacer>

      <v-btn icon @click="nextPage()"><v-icon>mdi-chevron-right</v-icon></v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      pages: [],
      outOfBounds: false,
    };
  },
  props: { center: Number, bound: Array },
  methods: {
    nextPage() {
      console.log("np");
      this.$emit("nextPage", { updatePage: this.center + 1 });
      this.pages = this.createRange();
    },
    previousPage() {
      console.log("pp");
      if (this.center - 1 > 0) {
        this.pages = this.createRange();
        // console.log("Pagination Comp: " + this.center);
        this.$emit("previousPage", { updatePage: this.center - 1 });
      } else {
        // console.log("Pagination Comp: " + this.center);
        this.pages = this.createRange();
        this.$emit("previousPage", { updatePage: this.center });
      }
    },
    createRange() {
      let array = [];
      for (
        let iterator = this.center - 2;
        iterator <= this.center + 2;
        iterator++
      ) {
        if (iterator > 0) {
          array.push(iterator);
        }
      }
      return array;
    },
  },
  created() {
    this.pages = this.createRange();
  },
};
</script>

<style scoped></style>
