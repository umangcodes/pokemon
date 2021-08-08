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
  props: { center: Number, bound: Array }, // center is alias for current page.
  methods: {
    nextPage() {
      console.log("Next page clicked!");
      this.$emit("nextPage", { updatePage: this.center + 1 });
      this.pages = this.createRange();
    },
    previousPage() {
      console.log("Previous button clicked!");
      if (this.center - 1 > 0) {
        // guard to avoid negative pages
        this.pages = this.createRange();
        this.$emit("previousPage", { updatePage: this.center - 1 });
      } else {
        // even if bound is not provided, this will emit the same page.
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
