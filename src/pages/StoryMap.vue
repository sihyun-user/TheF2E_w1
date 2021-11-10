<template>
  <section class="storymap">
    <div class="map " ref="mapDivRef"></div>
    <div class="aside">
      <div class="aside__search">
        <form @submit.prevent="submitForm" class="form">
          <div class="form__location">
            <img src="@/assets/img/location.png">
          </div>
          <div class="form__search">
            <input type="search" placeholder="請輸入關鍵字" />
          </div>
          <div class="form__menu">
            <div class="form__select">
              <select name="type" id="type-select" v-model="selectedType">
                <option value="restaurant">美食</option>
                <option value="hotel">住宿</option>
                <option value="scenicSpot">觀光</option>
              </select>
            </div>
            <button type="submit" class="form__btn form__btn--1">搜尋</button>
            <button type="button" class="form__btn form__btn--2" @click="handleShow">進階搜尋</button>
          </div>
        </form>
      </div>

      <ul class="aside__type">
        <li class="aside__type--1" 
        :class="{ curType: selectedType == 'restaurant' }"
        @click="selectType('restaurant')"
        >
          <i class="fas fa-utensils"></i>
          <span>美食</span>
        </li>
        <li class="aside__type--2"
        :class="{ curType: selectedType == 'hotel' }" 
        @click="selectType('hotel')"
        >
          <i class="fas fa-car"></i>
          <span>住宿</span>
        </li>
        <li class="aside__type--3"
        :class="{ curType: selectedType == 'scenicSpot' }"
        @click="selectType('scenicSpot')"
        >
          <i class="fas fa-mountain"></i>
          <span>觀光</span>
        </li>
      </ul>

      <span class="aside__infonum">共有{{ selected.length }}筆資料</span>

      <div class="aside__cardWrap">
        <ul>
          <li 
          class="aside__card" 
          v-for="res in pageResults"
          :key="res.ID"
          @click="selectedCard(res.ID)"
          >
            <img :src="res.Picture.PictureUrl1">
            <div class="aside__card-content">
              <h1>{{ res.Name }}</h1>
              <div class="aside__card-phone">
                <i class="fas fa-phone-alt"></i>
                <span>{{ res.Phone }}}</span>
              </div>
              <div class="aside__card-address">
                <i class="fas fa-map-marker-alt"></i>
                <span>{{ res.Address }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="aside__pages" v-if="selected.length != 0">
        <div class="aside__pages-btn aside__pages-lastOff">
          <button class="aside__pages-btn--gray" v-if="curPage == 1">
            <i class="fas fa-angle-double-left"></i>
          </button>
          <button @click="changePage(1)" v-else>
            <i class="fas fa-angle-double-left"></i>
          </button>
        </div>

        <div class="aside__pages-btn aside__pages-last">
          <button class="aside__pages-btn--gray" v-if="curPage == 1">
            <i class="fas fa-angle-left"></i>
          </button>
          <button @click="goto(-1)" v-else>
            <i class="fas fa-angle-left"></i>
          </button>
        </div>
        
        <ul class="aside__pages--other" v-if="numPages < 9">
          <li 
          v-for="(num, index) in numPages" 
          :key="index" 
          :class="{ curPageStyle: num == curPage }"
          @click="changePage(num)"
          >
          {{ num }}</li>
        </ul>
        <ul class="aside__pages--other" v-else>
          <li 
          v-for="num in 3" 
          :key="num" 
          :class="{ curPageStyle: num == curPage }"
          @click="changePage(num)" 
          >
          {{ num }}
          </li>
          <li>...</li>
          <li 
          v-for="(num, index) in 3" 
          :key="num" 
          :class="{ curPageStyle: curPage == numPages + (index - 2) }"
          @click="changePage(numPages + (index - 2))" 
          >
          {{ numPages + (index - 2) }}
          </li> 
        </ul>

        <div class="aside__pages-btn aside__pages-next">
          <button class="aside__pages-btn--gray" v-if="curPage == numPages">
            <i class="fas fa-angle-right"></i>
          </button>
          <button @click="goto(1)" v-else>
            <i class="fas fa-angle-right"></i>
          </button>
        </div>

        <div class="aside__pages-btn aside__pages-nextOff">
          <button class="aside__pages-btn--gray" v-if="curPage == numPages">
            <i class="fas fa-angle-double-right"></i>
          </button>
          <button @click="changePage(numPages)" v-else>
            <i class="fas fa-angle-double-right"></i>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed , watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { RES_PER_PAGE } from "../config.js"
export default {
  setup() {
    const store =useStore()
    const resultsPerPage = RES_PER_PAGE
    const selectedType = ref('restaurant')
    const story = ref(null)
    const curPage = ref(1)
    const pageResults = ref(null)
    const map = ref(null)
    const marker = ref(null)
    const mapDivRef = ref(null)

    const scenicSpot = computed(() => store.getters.scenicSpot)
    const restaurant = computed(() => store.getters.restaurant)
    const hotel = computed(() => store.getters.hotel)

    const selected = computed(() =>{
      let select = []
      if(selectedType.value == 'restaurant') {
        select = restaurant.value
      }else if(selectedType.value == 'scenicSpot'){
        select = scenicSpot.value
      }else {
        select = hotel.value
      }

      return select
    })
    
    
    function selectType (type){
      selectedType.value = type
    }

    function selectedCard (cardId) {
      if(selectedType.value == 'restaurant') {
        story.value = restaurant.value.find(item => item.ID === cardId)
      }else if(selectedType.value == 'hotel'){
        story.value = hotel.value.find(item => item.ID === cardId)
      }else {
        story.value = scenicSpot.value.find(item => item.ID === cardId)
      }

      console.log(story.value)
    }

    function initMap() {
      map.value = new window.google.maps.Map(mapDivRef.value, {
        zoom:  16,
        mapTypeId: 'terrain',
        center: { lat: 25.0652969, lng: 121.6410026 },
        disableDefaultUI: false,
      })

      marker.value = new window.google.maps.Marker({
        position: { lat: 25.0652969, lng: 121.6410026 },
        map: map.value
      })
    }

    /* 抓取頁數開始 */
    const numPages = computed(() => Math.ceil(selected.value.length / resultsPerPage))

    function goto(val) {
      curPage.value += val
    }

    function changePage(val) {
      curPage.value = val
    }

    function setPageResults(page) {
      // page(1)抓取 0 - 7 的陣列項目 | page(2)抓取 8 - 15 的陣列項目
      const start = (page -1) * resultsPerPage // 0
      const end = page * resultsPerPage // 7
      
      pageResults.value= selected.value.slice(start, end)
    }

    watch(curPage, () => setPageResults(curPage.value))

    watch(selectedType , (newVal) => {
      console.log(newVal)
      if(newVal == selectedType.value) {
        curPage.value = 1
      }
    })

    setPageResults(1)
    /* 抓取頁數結束 */

    function getData(val = null) {
      const paramData = {
        val: val,
        city: null
      }

      store.dispatch('setScenicSpot', paramData)
      store.dispatch('setRestaurant', paramData)
      store.dispatch('setHotel', paramData)
    }

    getData(20)

    onMounted(() => {
      initMap(mapDivRef.value)
    })

    return {
      mapDivRef,
      selected,
      selectedType,
      selectType,
      selectedCard,
      curPage,
      numPages,
      pageResults,
      goto,
      changePage,
    }
  }
}
</script>