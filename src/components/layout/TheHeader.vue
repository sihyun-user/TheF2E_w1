<template>
  <header>
    <nav>
      <div class="logo">
        <router-link to="home"><img src="@/assets/img/logo.png" alt="logo"></router-link>
      </div>
      <ul class="menu">
        <div class="menu__links">
          <router-link to="/">探索台灣</router-link>
          <router-link to="/">旅遊地圖</router-link>
        </div>
        <div class="menu__tools">
          <div class="menu__tools-search">
            <transition name="searchAni">
              <input type="text" placeholder="全站搜尋" v-if="isSearch">
            </transition>
            <i class="fas fa-search" @click="isSearch = !isSearch"></i>
          </div>
          <div class="menu__tools-heart">
            <i class="far fa-heart"></i>
          </div>
        </div>
      </ul>
    </nav>
  </header>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const isSearch = ref (false)

    return { isSearch }
  }
}
</script>

<style scoped>
.searchAni-enter-active,
.searchAni-leave-active {
  transition: all .6s ease;
}

.searchAni-enter-from,
.searchAni-leave-to {
  width: 0;
}

.searchAni-enter-to,
.searchAni-leave-from {
  width: 100%;
}
</style>