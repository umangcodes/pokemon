<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <Pagination
          :center="currentPage"
          :bound="outOfBound"
          @nextPage="loadNext"
          @previousPage="loadPrevious"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4" v-for="data in display" :key="data.id">
        <Card :pokemon="data" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Pagination
          :center="currentPage"
          :bound="outOfBound"
          @nextPage="loadNext"
          @previousPage="loadPrevious"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Card from "@/components/cards/card.vue";
import Pagination from "@/components/pagination.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      myCards: [],
    };
  },
  components: {
    Card,
    Pagination,
  },
  computed: {
    ...mapState([
      "currentPage",
      "outOfBound",
      "displayStartLimit",
      "displayStopLimit",
      "display",
    ]),
  },
  methods: {
    loadNext(e) {
      this.$store.dispatch("updatePage", {
        offset: 30,
        page_number: e.updatePage,
      });
      this.$store.dispatch("updateBound", [false, false]);
      this.$store.dispatch("updateDisplay", [
        this.$store.state.displayStartLimit,
        this.$store.state.displayStopLimit,
      ]);
      if (
        this.$store.state.currentCatch - 90 <
        this.$store.state.displayStopLimit
      ) {
        console.log("Catch more triggered");
        this.$store.dispatch("catchMorePokemons");
      }
    },
    loadPrevious(e) {
      this.$store.dispatch("updateCurrentPage", e.updatePage);
      if (this.$store.state.currentPage > 1) {
        this.$store.dispatch("updatePageReverse", {
          offset: -30,
          page_number: e.updatePage,
        });
      } else if (
        this.$store.state.currentPage > 0 &&
        this.$store.state.outOfBound[0] == false
      ) {
        this.$store.dispatch("updateBound", [true, false]);
        this.$store.dispatch("updatePageReverse", {
          offset: -50,
          page_number: 1,
        });
      }
      this.$store.dispatch("updateDisplay", [
        this.$store.state.displayStartLimit,
        this.$store.state.displayStopLimit,
      ]);
    },
  },
  async created() {
    console.log("View 2 created");
    if (this.$store.state.currentCatch == 0) {
      await this.$store.dispatch("firstCall");
      this.$store.dispatch("updateDisplay", [
        0,
        this.$store.state.firstLoadDisplay,
      ]);
    }
    // this.$store.dispatch("updateDisplay", [
    //   this.$store.state.displayStartLimit,
    //   this.$store.state.displayStopLimit,
    // ]);
  },
};
</script>

<style scoped></style>
