<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="4" v-for="data in myCatch" :key="data.id">
        <Card :pokemon="data" />
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-btn text rounded @click="catchMore()">Go catch more!</v-btn>
    </v-row>
  </v-container>
</template>

<script>
import Card from "@/components/cards/card.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  components: {
    Card,
  },
  computed: {
    ...mapState(["myCatch"]),
  },
  methods: {
    catchMore() {
      console.log("button clicked");
    },
  },
};
</script>

<style scoped></style>
