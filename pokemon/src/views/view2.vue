<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card class="rounded-xl">
          <v-card-actions>
            <v-btn icon :disabled="outOfBounds"
              ><v-icon>mdi-chevron-left</v-icon></v-btn
            >
            <!-- <v-spacer></v-spacer> -->
            <div v-for="page in pages" :key="page">
              <v-btn icon> {{ page }} </v-btn>
            </div>
            <v-btn icon :disabled="outOfBounds"
              ><v-icon>mdi-chevron-right</v-icon></v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
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
  data() {
    return {
      outOfBounds: false,
      pages: [1, 2, 3, 4, 5, 6, 7],
    };
  },
  components: {
    Card,
  },
  computed: {
    ...mapState(["myCatch"]),
  },
};
</script>

<style lang="scss" scoped></style>
