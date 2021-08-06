<template>
  <v-app-bar color="primary" dark app dense elevate-on-scroll>
    <v-toolbar-title
      ><v-btn text rounded plain to="/home" style=""
        ><v-icon>mdi-pokemon-go</v-icon> Pokemon challenge</v-btn
      >
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text rounded to="/home">Home</v-btn>
    <v-menu open-on-hover top offset-x>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text rounded to="#" v-bind="attrs" v-on="on"> Views </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="view in views" :key="view.id">
          <v-list-item-title
            ><v-btn text :to="view.url">{{
              view.title
            }}</v-btn></v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      views: [
        { id: "91", title: "view 1", url: "/view1" },
        { id: "92", title: "view 2", url: "/view2" },
      ],
    };
  },
};
</script>

<style scoped></style>
