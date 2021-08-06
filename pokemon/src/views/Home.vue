<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="4" v-for="data in myCatch" :key="data.id">
        <Card :pokemon="data" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Card from "@/components/cards/card.vue";
import { mapState } from "vuex";
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
  computed: {
    ...mapState(["myCatch"]),
  },
  created() {
    if (this.$store.state.currentCatch == 0) {
      this.$store.dispatch("update_list");
    }
    // this.$store.dispatch("showEmAll");
  },
};
</script>
