<template>
  <v-app>
    <Header />

    <v-main>
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
