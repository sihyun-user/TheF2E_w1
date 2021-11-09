<template>
  <div v-show="show" class="filter">
    <div class="filter__content">
      <div class="filter__type filter__wrap">
        <h2 class="filter__title">類別</h2>
        <div class="filter__items">
          <input type="radio" name="type" id="restaurant" value="restaurant" checked v-model="filterType">
          <label for="restaurant">美食</label>
          <input type="radio" name="type" id="hotel" value="hotel" v-model="filterType">
          <label for="hotel">住宿</label>
          <input type="radio" name="type" id="scenicSpot" value="scenicSpot" v-model="filterType">
          <label for="scenicSpot">觀光</label>
        </div>
      </div>
      <div class="filter__hot filter__wrap">
        <h2 class="filter__title">熱門分類</h2>
        <div class="filter__items">
          <input type="checkbox" name="hot" id="hot-1" value="牛肉麵" v-model="filterHot">
          <label for="hot-1">牛肉麵</label>
          <input type="checkbox" name="hot" id="hot-2" value="海鮮" v-model="filterHot">
          <label for="hot-2">海鮮餐廳</label>
        </div>
      </div>
      <div class="filter__city filter__wrap">
        <h2 class="filter__title">城市</h2>
        <ul class="filter__items">
          <li v-for="city in cityData" :key="city.id">
            <input type="radio" name="city" :id="city.id" :value="city.id"  v-model="filterCity">
            <label :for="city.id">{{ city.name }}</label>
          </li>
        </ul>
      </div>
      <div class="filter__btns">
        <button class="filter__btns--clear" @click="claerFilter">清除全部</button>
        <button @click="submitFilter" class="filter__btns--search">查詢</button>
      </div>
      <i class="filter__close fas fa-times" @click="tryClose"></i>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import CITY_DATA from '../city-data.js'
export default {
  emits: ['update-filter', 'close'],
  setup(_,context) {
    const cityData = CITY_DATA
    const filterType = ref('restaurant')
    const filterHot = ref([])
    const filterCity = ref('')
    const show = ref(true)

    function claerFilter() {
      filterType.value = 'restaurant'
      filterHot.value = []
      filterCity.value = ''
    }

    function submitFilter() {
      const updatedFilters = {
        type: filterType.value,
        hot: filterHot.value,
        city: filterCity.value
      }

      context.emit('update-filter', updatedFilters)
      tryClose()
    }

    function tryClose () {
      claerFilter()
      context.emit('close', false)
    }
    
    return {
      cityData,
      filterType,
      filterHot,
      filterCity,
      show,
      claerFilter,
      submitFilter,
      tryClose
    }
  }
}
</script>