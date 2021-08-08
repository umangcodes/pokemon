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
      <v-col cols="12" md="4" v-for="data in myCards" :key="data.id">
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
import { mapGetters } from "vuex";
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
    ]),
    ...mapGetters(["catchZones", "display"]),
  },
  methods: {
    loadNext(e) {
      this.$store.dispatch("updatePage", {
        offset: 30,
        page_number: e.updatePage,
      });
      this.myCards = this.$store.state.myCatch.slice(
        this.$store.state.displayStartLimit,
        this.$store.state.displayStopLimit
      );
      this.$store.dispatch("updateBound", [false, false]);
      this.$store.dispatch("updateDisplay", this.myCards);
    },
    loadPrevious(e) {
      // refactor todo: illegal : dispatch an action
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
      this.myCards = this.$store.state.myCatch.slice(
        this.$store.state.displayStartLimit,
        this.$store.state.displayStopLimit
      );
      this.$store.dispatch("updateDisplay", this.myCards);
    },
  },
  async created() {
    console.log("View 2 created");
    this.myCards = this.$store.state.myCatch.slice(
      this.$store.state.displayStartLimit,
      this.$store.state.displayStopLimit
    );
    this.$store.dispatch("updateDisplay", this.myCards);
  },
};
</script>

<style scoped></style>
