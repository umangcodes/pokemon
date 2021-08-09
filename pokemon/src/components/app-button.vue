<template>
  <button
    class="border border-gray-600 rounded-lg px-4 py-2"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>
