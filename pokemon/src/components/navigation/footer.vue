<template>
  <v-footer color="primary1" padless>
    <v-row justify="center" no-gutters height="100">
      <v-btn
        v-for="link in links"
        :key="link.id"
        color="white"
        text
        plain
        rounded
        :to="link.url"
      >
        {{ link.title }}
      </v-btn>
      <v-col
        class="primary py-2 text-center white--text"
        cols="12"
        height="120"
      >
        {{ new Date().getFullYear() }} — <strong>Umang A</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { id: "99", title: "home", url: "/home" },
        { id: "99", title: "view", url: "/view1" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
