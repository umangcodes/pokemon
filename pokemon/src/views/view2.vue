<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <Pagination
          :center="currentPageNumber"
          :bound="pageBounds"
          @nextPage="loadNext"
          @previousPage="loadPrevious"
          @pageClick="loadPage"
          :pageRange="totalPages"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4" v-for="data in localPokemons" :key="data.id">
        <Card :pokemon="data" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Pagination
          :center="currentPageNumber"
          :bound="pageBounds"
          @nextPage="loadNext"
          @previousPage="loadPrevious"
          @pageClick="loadPage"
          :pageRange="totalPages"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Card from "@/components/cards/card.vue";
import Pagination from "@/components/pagination.vue";
export default {
  data() {
    return {
      myCards: [],
      localPokemons: [],
      currentPageNumber: 1,
      pageBounds: [true, false],
    };
  },
  components: {
    Card,
    Pagination,
  },
  computed: {
    totalPages() {
      let pages = Math.round(this.$store.state.currentInventory / 40);
      console.log(`total pages: ${pages}`);
      return pages;
    },
  },
  methods: {
    async createSlice(limitArray) {
      const array = await this.$store.state.myInventory.slice(
        limitArray[0],
        limitArray[1]
      );
      console.log(array);
      return array;
    },
    generateOffset() {
      const offset =
        this.$store.state.firstLoadDisplay + (this.currentPageNumber - 2) * 30;
      console.log(offset);
      return offset;
    },
    generateLimit() {
      const limit =
        this.$store.state.firstLoadDisplay + (this.currentPageNumber - 1) * 30;
      console.log(limit);
      return limit;
    },
    async loadNext(e) {
      this.pageBounds[0] = false;
      this.currentPageNumber = e.updatePage;
      console.log(this.currentPageNumber);
      if (this.currentPageNumber >= this.$store.state.totalPages) {
        console.log("page bound update");
        this.pageBounds = [false, true];
        console.log(this.pageBounds);
      }
      console.log("new method accessed.");
      this.localPokemons = await this.createSlice([
        this.generateOffset(),
        this.generateLimit(),
      ]);
      console.log(this.localPokemons);
      // again call api to fetch 30 more.
      //this.$store.dispatch("")
      // capture more pokemons
    },
    async loadPrevious(e) {
      this.currentPageNumber = e.updatePage;
      console.log(this.currentPageNumber);
      if (this.currentPageNumber <= 1) {
        console.log("page bound update");
        this.pageBounds[0] = true;
        console.log(this.pageBounds);
        this.localPokemons = await this.createSlice([
          0,
          this.$store.state.firstLoadDisplay,
        ]);
      } else {
        console.log("new method accessed.");
        this.localPokemons = await this.createSlice([
          this.generateOffset(),
          this.generateLimit(),
        ]);
        console.log(this.localPokemons);
        this.pageBounds[1] = false;
      }
    },
    async loadPage(e) {
      console.log(e);
      this.currentPageNumber = e;
      console.log(this.currentPageNumber);
      if (this.currentPageNumber >= this.$store.state.totalPages) {
        console.log("page bound update");
        this.pageBounds = [false, true];
        console.log(this.pageBounds);
      }
      if (this.currentPageNumber == 1) {
        this.pageBounds = [true, false];
        this.localPokemons = await this.createSlice([
          0,
          this.$store.state.firstLoadDisplay,
        ]);
      } else {
        this.pageBounds = [false, false];
        console.log("new method accessed.");
        this.localPokemons = await this.createSlice([
          this.generateOffset(),
          this.generateLimit(),
        ]);
        console.log(this.localPokemons);
      }
    },
  },
  async created() {
    this.currentPageNumber = this.$route.query.page || 1;
    console.log("View 2 created");
    if (this.$store.state.currentInventory == 0) {
      await this.$store.dispatch("firstCall");
    }
    this.localPokemons = await this.createSlice([
      0,
      this.$store.state.firstLoadDisplay,
    ]);
    console.log("local Pokemons");
    console.log(this.localPokemons);
  },
};
</script>

<style scoped></style>
