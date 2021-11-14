<template>
  <header class="headerPC">
    <nav>
      <div class="logo">
        <router-link to="/home"><img src="@/assets/img/logo.png" alt="logo"></router-link>
      </div>
      <ul class="menu">
        <div class="menu__links">
          <router-link to="/explore">探索台灣</router-link>
          <router-link to="/storymap">旅遊地圖</router-link>
        </div>
        <div class="menu__tools">
          <div class="menu__tools-search">
            <router-link to="/stories">
              <i class="fas fa-search"></i>
            </router-link>
          </div>
          <!-- <div class="menu__tools-heart">
            <i class="far fa-heart"></i>
          </div> -->
        </div>
      </ul>
    </nav>
  </header>

  <header class="headerMobile">
    <nav>
      <div class="icon">
        <i class="fas fa-bars" @click="openMenu"></i>
      </div>
      
      <div class="logo">
        <router-link to="/home"><img src="@/assets/img/logo.png" alt="logo"></router-link>
      </div>

      <div class="tools">
        <div class="tools__search">
          <router-link to="/stories">
            <i class="fas fa-search"></i>
          </router-link>
        </div>
        <!-- <div class="tools__heart">
          <i class="far fa-heart"></i>
        </div> -->
      </div>

      <div class="menu" v-show="isactive">
        <ul class="menu__links">
          <li :class="{ active: this.$route.path = '/stories' }">
            <router-link to="/stories">探索台灣</router-link>
          </li>
          <li :class="{ active: this.$route.path = '/storymap' }">
            <router-link to="/storymap">旅遊地圖</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>

  <div class="mask" v-show="isactive"></div>
</template>

<script>
import { ref } from'vue'
export default {
  setup() {
    const isactive = ref(false)

    function openMenu() {
      isactive.value = !isactive.value
    }

    return {
      isactive,
      openMenu
    }
  }
}
</script>