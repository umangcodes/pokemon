<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <Header />

    <v-main id="main-sheet" class="overflow-y-auto" max-height="600">
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from "./components/navigation/header.vue";
import Footer from "./components/navigation/footer.vue";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
};
</script>
