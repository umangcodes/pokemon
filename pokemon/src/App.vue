<template>
  <div class="overflow-hidden min-h-screen bg-gray-200">
    <app-nav />
    <router-view />
  </div>
</template>

<script>
import Vue from "vue";
import AppNav from "@/components/app-nav.vue";
export default Vue.extend({
  components: { AppNav },
});
</script>
