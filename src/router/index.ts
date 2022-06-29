import { createRouter, createWebHistory } from "vue-router"

import Trending from "/src/components/Trending.vue"
import Searching from "/src/components/Searching.vue"

const routes = [
    {
        path: "/",
        name: "Trending",
        component: Trending,
    },
    {
      path: "/searching",
      name: "Searching",
      component: Searching,
  },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router