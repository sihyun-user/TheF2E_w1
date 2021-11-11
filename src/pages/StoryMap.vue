<template>
  <section class="storymap">
    <div class="map" ref="divRef"></div>
    <div class="mapWrap">
      <div class="card mapCard" v-if="selectedMark">
        <div class="card__heart">
          <i class="far fa-heart"></i>
        </div>
        <div class="card__pic">
          <img :src="selectedMark.picture" alt="card">
        </div>
        <div class="card__content">
          <div class="card__title">
            <h2>{{ selectedMark.name }}</h2>
            <div class="card__phone">
              <i class="fas fa-phone-alt"></i>
              <span v-if="selectedMark.phone">
                {{ selectedMark.phone }}
              </span>
              <span v-else>暫無電話資訊</span>
            </div>
          </div>
          <div class="card__address">
            <i class="fas fa-map-marker-alt"></i>
            <p v-if="selectedMark.address">
              {{ selectedMark.address }}
            </p>
            <p v-else>暫無地址資訊</p>
          </div>
          <router-link
          :to="storyDetailsLink"
          class="mapCard__btn">
          深入了解
          </router-link>
        </div>
      </div>
    </div>
    <div class="aside">
      <div class="aside__search">
        <form @submit.prevent="submitForm" class="form">
          <div class="form__location" @click="setlocation">
            <img src="@/assets/img/location.png">
          </div>
          <div class="form__search">
            <input type="search" @input="enterSearch" :value="enteredSearchTerm" placeholder="請輸入關鍵字" />
          </div>
          <div class="form__menu">
            <button type="submit" class="form__btn form__btn--1" @click="goSearch">搜尋</button>
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

      <span class="aside__infonum">共有{{ searchCards.length }}筆資料</span>

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
                <span>{{ res.Phone }}</span>
              </div>
              <div class="aside__card-address">
                <i class="fas fa-map-marker-alt"></i>
                <span>{{ res.Address }}</span>
              </div>
            </div>
          </li>
        </ul>
        
        <div class="aside__notFoundCards" v-if="searchCards.length == 0">
          <p v-if="selectedType == 'restaurant'">目前沒有美食資料，請重新查詢</p>
          <p v-else-if="selectedType == 'hotel'">目前沒有住宿資料，請重新查詢</p>
          <p v-else>目前沒有觀光資料，請重新查詢</p>
        </div>
      </div>

      <div class="aside__pages" v-if="searchCards.length != 0">
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

    <search-filter v-show="show" @update-filter="updatedFilters" @close="handleClose"></search-filter>
  </section>
  <div v-show="show" class="mask"></div>
</template>

<script>
import { ref, computed , watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { RES_MAP_PAGE } from "../config.js"
import SearchFilter from '../components/SearchFilter.vue'
export default {
  components: {
    SearchFilter
  },
  setup() {
    const store = useStore()
    const resultsPerPage = RES_MAP_PAGE
    const enteredSearchTerm = ref('')
    const selectedType = ref('restaurant')
    const searchCards = ref(null)
    const story = ref(null)
    const curPage = ref(1)
    const pageResults = ref(null)
    const map = ref(null)
    const divRef = ref(null)
    const selectedMark = ref(null)
    const infowindowVal = ref(null)
    const selectedCity = ref(null)
    const show = ref(false)
    const locationVal = ref(false)

    const scenicSpot = computed(() => store.getters.scenicSpot)
    const restaurant = computed(() => store.getters.restaurant)
    const hotel = computed(() => store.getters.hotel)

    const storyDetailsLink = computed(() => {
      return `/stories/${selectedMark.value.id}?type=${selectedMark.value.type}`
    })

    const typeCards = computed(() => {
      let search = []
      if(selectedType.value == 'restaurant') {
        search = restaurant.value
      }else if(selectedType.value == 'scenicSpot'){
        search = scenicSpot.value
      }else {
        search = hotel.value
      }

      return search
    })
    
    function enterSearch(event){
      enteredSearchTerm.value = event.target.value
    }

    function goSearch() {
      let filterData = []

      if(enteredSearchTerm.value) {
        filterData = typeCards.value.filter((item) => 
          item.Name.indexOf(enteredSearchTerm.value) > -1
        )
      }else {
        filterData = typeCards.value
      }

      searchCards.value = filterData
    }
    goSearch()

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

      const selected = positions.value.find((card) => card.id === cardId)
      selectedMark.value = selected
      initMap()
    }

    /* 抓取頁數開始 */
    const numPages = computed(() => Math.ceil(searchCards.value.length / resultsPerPage))

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
      
      pageResults.value = searchCards.value.slice(start, end)
    }

    watch(curPage, () => setPageResults(curPage.value))

    watch(selectedType , (newVal) => {
      if(newVal == selectedType.value) {
        curPage.value = 1
        selectedMark.value = null
        goSearch()
        setPageResults(curPage.value)
      }
    })

    watch(searchCards , () => {
      setPageResults(curPage.value)
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

    /* 撈取地圖資料開始 */
    const positions = computed(() => store.getters.positions)

    function initPosition() {
      store.dispatch('setPositions', searchCards.value)
    }

    async function initMap(loca = null) {
      try {
        const zoomVal = selectedMark.value ? 17 : 9
        
        let centerVal
        if(selectedMark.value && !loca) {
          centerVal = { lat: selectedMark.value.lat, lng: selectedMark.value.lng }
        }else if(!selectedMark.value && loca) {
          centerVal = loca
        }else {
          centerVal = { lat: 23.97565, lng: 120.9738819 }
        }
        
        // const centerVal = selectedMark.value ? 
        // { lat: selectedMark.value.lat, lng: selectedMark.value.lng } : { lat: 23.97565, lng: 120.9738819 }

        map.value = new window.google.maps.Map(divRef.value, {
          zoom: zoomVal,
          mapTypeId: 'terrain',
          center: centerVal,
          disableDefaultUI: false,
        })

        positions.value.forEach((el) => {
          const marker = new window.google.maps.Marker({
            position: { lat: el.lat, lng: el.lng },
            map: map.value
          })

          const infowindow = new window.google.maps.InfoWindow({
            content: `
            <div id="content">
              <p class="infowindow">${el.name}</p>
            </div>
          `,
            width: 200,
          });

          marker.addListener('click', () => {
            const selected = positions.value.find((card) => card.id === el.id)
            selectedMark.value = selected

            if (infowindowVal.value) infowindowVal.value.close()
            infowindow.open(map.value, marker)
            infowindowVal.value = infowindow
          });
        })
      } catch (error) {
        alert('地圖發生錯誤，請稍後再嘗試!')
        console.log(error)
      }
    }

    function getlocation() {
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error)
      } else {
        alert('你的裝置不支援地理位置功能。')
      }

      function error() {
        alert('無法取得你的地理位置')
      }

      function success(position) {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }

        locationVal.value = location
      }
    }
    getlocation()

    function setlocation() {
      if (locationVal.value == null) {
        return
      }

      initMap(locationVal.value)
    }


    initPosition()

    /* 撈取地圖資料結束 */


    /* 進階篩選開始 */
    async function submitForm() {
      await goSearch(20)
      selectedCity.value = null
      enteredSearchTerm.value = ''
    }

    function updatedFilters(val) {
      selectedType.value = val.type
      selectedCity.value = val.city
      enteredSearchTerm.value = val.keyword
      submitForm()
    }

    function handleShow() {
      show.value = true
    }

    function handleClose(val) {
      show.value = val
    }

    /* 進階篩選結束 */


    onMounted(() => {
      initMap()
    })

    return {
      show,
      divRef,
      enteredSearchTerm,
      storyDetailsLink,
      selectedType,
      selectType,
      searchCards,
      selectedCard,
      curPage,
      numPages,
      pageResults,
      goto,
      changePage,
      enterSearch,
      goSearch,
      selectedMark,
      updatedFilters,
      handleShow,
      handleClose,
      setlocation,
    }
  }
}
</script>