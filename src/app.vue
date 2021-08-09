<template>
  <div class="overflow-hidden min-h-screen bg-gray-200">
    <app-nav />
    <router-view />
  </div>
</template>

<script>
import AppNav from "@/components/app-nav.vue";
export default {
  components: { AppNav },
};
</script>
