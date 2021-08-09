<template>
  <v-card class="rounded-xl">
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon :disabled="bound[0]" @click="previousPage()"
        ><v-icon>mdi-chevron-left</v-icon></v-btn
      >
      <v-spacer></v-spacer>
      Current Page: {{ center }} ||
      <div v-for="page in pages" :key="page">
        <v-btn text @click="callSpecificPage">{{ page }}</v-btn>
      </div>
      <v-spacer></v-spacer>

      <v-btn icon :disabled="bound[1]" @click="nextPage()"
        ><v-icon>mdi-chevron-right</v-icon></v-btn
      >
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      pages: [],
    };
  },
  props: { center: Number, bound: Array, pageRange: Number }, // center is alias for current page.
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
    callSpecificPage(page) {
      this.$emit("pageClick", { specificPage: page });
    },
    createRange() {
      let array = [];
      for (let iterator = 0; iterator <= this.pageRange; iterator++) {
        if (iterator > 0) {
          array.push(iterator);
        }
      }
      console.log(`range: ${array}`);
      return array;
    },
  },
  async created() {
    console.log("pages" + this.pages);
    this.pages = await this.createRange();
    console.log("pages" + this.pages);
  },
};
</script>

<style scoped></style>
