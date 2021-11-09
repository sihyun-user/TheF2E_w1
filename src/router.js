import { createRouter, createWebHistory } from "vue-router";

import Home from './pages/Home.vue'
import Attractions from './pages/Attractions.vue'
import Search from './pages/Search.vue'
import Story from './pages/Story.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/scene', component: Attractions },
    { path: '/search', component: Search },
    { path: '/story', component: Story },
  ]
})

export default router