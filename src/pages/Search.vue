<template>
  <section class="search">
    <div class="banner">
      <img src="../assets/img/scene.jpg" alt="banner">
      <img class="banner__mask" src="../assets/img/bannerMask.png" alt="banner">
      <h1>搜尋台灣</h1> 

      <form class="form">
        <base-search></base-search>
        <div class="form__btn">
          <button class="btn btn--1">類別</button>
          <button class="btn btn--2">搜尋</button>
          <button class="btn btn--3">進階搜尋</button>
        </div>
      </form>

      <div class="main">
        <div class="main__scene">
          <h2 class="main__title main__title--1">熱門景點</h2>
        </div>

        <div class="main__scene">
          <h2 class="main__title main__title--2">必吃美食</h2>
        </div>

        <div class="main__scene">
          <h2 class="main__title main__title--3">優質住宿</h2>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import baseSearch from '../components/UI/BaseSearch.vue'
export default {
  components: {
    baseSearch
  }
}
</script>