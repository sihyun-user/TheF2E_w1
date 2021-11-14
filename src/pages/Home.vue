<template>
  <section class="home">
    <img class="banner" src="@/assets/img/banner.jpg" alt="banner">
    <h1>帶您探索台灣之美</h1>
    <div class="main">
      <router-link to="/typical?type=scenicSpot">
        <div class="main__wrap">
          <h2 class="main__title main__title--1">必遊景點</h2>
          <img src="@/assets/img/scene.jpg" alt="scene">
        </div>
      </router-link>
      <router-link to="/typical?type=restaurant">
        <div class="main__wrap">
          <h2 class="main__title main__title--2">特色美食</h2>
          <img src="@/assets/img/food.jpg" alt="food">
        </div>
      </router-link>
      <router-link to="/typical?type=hotel">
        <div class="main__wrap">
          <h2 class="main__title main__title--3">住宿特搜</h2>
          <img src="@/assets/img/room.jpg" alt="room">
        </div>
      </router-link>
    </div>
  </section>
</template>
