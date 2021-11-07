import { createRouter, createWebHistory } from "vue-router";

import Home from './pages/Home.vue'
import Attractions from './pages/Attractions.vue'
import Search from './pages/Search.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/scene', component: Attractions },
    { path: '/search', component: Search },
  ]
})

export default router