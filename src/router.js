import { createRouter, createWebHistory } from "vue-router";

import Home from './pages/Home.vue'
import Attractions from './pages/Attractions.vue'
import Stories from './pages/Stories.vue'
import Story from './pages/Story.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/scene', component: Attractions },
    { path: '/stories', component: Stories},
    { path: '/stories/:storyId', props:true ,component: Story },
    { path: '/:notFound(.*)', redirect: '/home' },
  ]
})

export default router