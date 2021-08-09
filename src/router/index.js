import Vue from "vue";
import VueRouter from "vue-router";
import About from "@/views/about.vue";
import Home from "@/views/home.vue";
import PokemonsV1 from "@/views/pokemons-v1.vue";
import PokemonsV2 from "@/views/pokemons-v2.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },

  {
    path: "/about",
    name: "about",
    component: About,
  },

  {
    path: "/pokemons-v1",
    name: "pokemons-v1",
    component: PokemonsV1,
  },

  {
    path: "/pokemons-v2/:page?",
    name: "pokemons-v2",
    component: PokemonsV2,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: () => ({ x: 0, y: 0 }),
});

export default router;
