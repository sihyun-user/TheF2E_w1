<template>
  <section class="search">
    <div class="banner">
      <img src="@/assets/img/scene.jpg" alt="banner">
      <img class="banner__mask" src="@/assets/img/bannerMask.png" alt="banner">
      <h1>搜尋台灣</h1> 

      <form class="form">
        <div class="inputSearch">
          <input type="search" @input="search" :value="searchTerm" placeholder="請輸入關鍵字" />
        </div>
        <div class="form__btn">
          <button class="btn btn--1">類別</button>
          <button class="btn btn--2">搜尋</button>
          <button class="btn btn--3">進階搜尋</button>
        </div>
      </form>
    </div>

    <div class="main">
      <div class="main__wrap">
        <h2 class="main__title main__title--1">熱門景點</h2>
        <ul class="main__cards">
          <li>
            <base-card></base-card>
          </li>
        </ul>
      </div>

      <div class="main__wrap">
        <h2 class="main__title main__title--2">必吃美食</h2>
        <ul class="main__cards">
          <li>
            <base-card></base-card>
          </li>
        </ul>
      </div>

      <div class="main__wrap">
        <h2 class="main__title main__title--3">優質住宿</h2>
        <ul class="main__cards">
          <li>
            <base-card></base-card>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import BaseCard from '../components/UI/BaseCard.vue'
export default {
  components: {
    BaseCard
  }
}
</script>