<template>
  <v-app-bar color="primary" dark app dense elevate-on-scroll>
    <v-toolbar-title
      ><v-btn text rounded plain to="/"
        ><v-icon>mdi-pokemon-go</v-icon> Pokemon challenge</v-btn
      >
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <div v-for="view in views" :key="view.id">
      <v-btn text :to="view.url">{{ view.title }}</v-btn>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      views: [
        { id: "91", title: "view 1", url: "/" },
        { id: "92", title: "view 2", url: "/view2" },
      ],
    };
  },
};
</script>

<style scoped></style>
