import { createRouter, createWebHistory } from "vue-router";

import Home from './pages/Home.vue'
import Typical from './pages/Typical.vue'
import Stories from './pages/Stories.vue'
import Story from './pages/Story.vue'
import StoryMap from './pages/StoryMap.vue'
import Explore from './pages/Explore.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/typical', component: Typical },
    { path: '/stories', component: Stories},
    { path: '/stories/:storyId', props:true ,component: Story },
    { path: '/storymap', component: StoryMap },
    { path: '/explore', component: Explore },
    { path: '/:notFound(.*)', redirect: '/home' },
  ],

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { left: 0, top: 0} // vue3
  }
})

export default router