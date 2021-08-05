import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import View1 from "@/views/view1.vue";
import View2 from "@/views/view1.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/view1",
    name: "view1",
    component: View1,
  },
  {
    path: "/view2",
    name: "view2",
    component: View2,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
