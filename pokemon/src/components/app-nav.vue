<template>
  <nav class="flex items-center justify-between">
    <div class="p-4">
      <router-link :to="{ name: 'home' }">
        <div class="bg-gray-400 rounded-full h-12 w-12" />
      </router-link>
    </div>

    <div class="p-2">
      <router-link class="p-2" :to="{ name: 'pokemons-v1' }"
        >Pokemons V1</router-link
      >
      <router-link class="p-2" :to="{ name: 'pokemons-v2' }"
        >Pokemons V2</router-link
      >
      <router-link class="p-2" :to="{ name: 'about' }">About</router-link>
    </div>
  </nav>
</template>
