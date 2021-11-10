<template>
  <header>
    <nav>
      <div class="logo">
        <router-link to="/home"><img src="@/assets/img/logo.png" alt="logo"></router-link>
      </div>
      <ul class="menu">
        <div class="menu__links">
          <router-link to="/">探索台灣</router-link>
          <router-link to="/">旅遊地圖</router-link>
        </div>
        <div class="menu__tools">
          <div class="menu__tools-search">
            <router-link to="/stories">
              <i class="fas fa-search"></i>
            </router-link>
          </div>
          <div class="menu__tools-heart">
            <i class="far fa-heart"></i>
          </div>
        </div>
      </ul>
    </nav>
  </header>
</template>