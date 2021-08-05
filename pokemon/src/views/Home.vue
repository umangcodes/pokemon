<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="4" v-for="data in testData" :key="data.id">
        <Card :pokemon="data" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Card from "@/components/cards/card.vue";
export default {
  name: "Home",
  components: {
    Card,
  },

  data() {
    return {
      testData: [
        { id: "5", name: "bbsaur", type: "ground", height: "na", weight: "na" },
        { id: "10", name: "charlie", type: "air", height: "na", weight: "na" },
      ],
    };
  },
};
</script>
