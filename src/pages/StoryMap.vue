<template>
  <section class="storymap">
    <div class="map" ref="divRef"></div>
    <div class="mapWrap">
      <div class="card mapCard" v-if="selectedMark">
        <div class="card__close" @click="selectedMark = null">
          <i class="fas fa-times"></i>
        </div>
        <div class="card__pic">
          <img :src="selectedMark.Picture.PictureUrl1" @error="$event.target.src='https://redthread.uoregon.edu/files/original/affd16fd5264cab9197da4cd1a996f820e601ee4.png'" alt="card">
        </div>
        <div class="card__content">
          <div class="card__title">
            <h2>{{ selectedMark.Name }}</h2>
            <div class="card__phone">
              <i class="fas fa-phone-alt"></i>
              <span v-if="selectedMark.Phone">
                {{ selectedMark.Phone }}
              </span>
              <span v-else>暫無電話資訊</span>
            </div>
          </div>
          <div class="card__address">
            <i class="fas fa-map-marker-alt"></i>
            <p v-if="selectedMark.Address">
              {{ selectedMark.Address }}
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
        <section class="form">
          <!-- <div class="form__location" @click="setlocation">
            <img src="@/assets/img/location.png">
          </div> -->
          <div class="form__search">
            <input type="search" @input="enterSearch" :value="enteredSearchTerm" placeholder="請輸入關鍵字" />
          </div>
          <div class="form__btnsPC">
            <button class="form__btnsPC--1" @click="goSearch">搜尋</button>
            <button class="form__btnsPC--2" @click="handleShow">進階搜尋</button>
          </div>

          <div class="form__btnsMobile">
            <button class="form__btnsMobile--1" @click="goSearch">
              <i class="fas fa-search"></i>
            </button>
            <button class="form__btnsMobile--2" @click="handleShow">
              <i class="fas fa-bars"></i>
            </button>
          </div>
        </section>
      </div>

      <ul class="aside__type">
        <li class="aside__type--1" v-if="selectedType == 'restaurant'">
          <i class="fas fa-utensils"></i>
          <span>美食</span>
        </li>
        <li class="aside__type--2" v-else-if="selectedType == 'hotel'">
          <i class="fas fa-car"></i>
          <span>住宿</span>
        </li>
        <li class="aside__type--3" v-else>
          <i class="fas fa-mountain"></i>
          <span>景點</span>
        </li>
      </ul>

      <span class="aside__infonum">共有{{ searchCards.length }}筆資料</span>

      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>

      <div class="aside__cardWrap" v-else>
        <ul>
          <li 
          v-for="res in pageResults"
          :key="res.ID"
          @click="selectedCard(res.ID)"
          class="aside__card"
          :class="[
          { curCard: isActiveID ==  res.ID },
          { cardSide1: selectedType == 'restaurant' },
          { cardSide2: selectedType == 'hotel' },
          { cardSide3: selectedType == 'scenicSpot' }
          ]"
          >
            <img :src="res.Picture.PictureUrl1" @error="$event.target.src='https://redthread.uoregon.edu/files/original/affd16fd5264cab9197da4cd1a996f820e601ee4.png'">
            <div class="aside__card-content">
              <h1>{{ res.Name }}</h1>
              <div class="aside__card-phone">
                <i class="fas fa-phone-alt"></i>
                <span v-if="res.Phone">{{ res.Phone }}</span>
                <span v-else>暫無電話資訊</span>
              </div>
              <div class="aside__card-address">
                <i class="fas fa-map-marker-alt"></i>
                <span v-if="res.Address">{{ res.Address }}</span>
                <span v-else>暫無地址資訊</span>
              </div>
            </div>
          </li>
        </ul>
        
        <div class="aside__notFoundCards" v-if="searchCards.length == 0">
          <p v-if="selectedType == 'restaurant'">目前沒有美食資料，請重新查詢</p>
          <p v-else-if="selectedType == 'hotel'">目前沒有住宿資料，請重新查詢</p>
          <p v-else>目前沒有觀景點資料，請重新查詢</p>
        </div>
      </div>

      <div class="pages" v-if="searchCards.length != 0">
        <div class="pages-btn pages-lastOff">
          <button class="pages-btn--gray" v-if="curPage == 1">
            <i class="fas fa-angle-double-left"></i>
          </button>
          <button @click="changePage(1)" v-else>
            <i class="fas fa-angle-double-left"></i>
          </button>
        </div>

        <div class="pages-btn pages-last">
          <button class="pages-btn--gray" v-if="curPage == 1">
            <i class="fas fa-angle-left"></i>
          </button>
          <button @click="goto(-1)" v-else>
            <i class="fas fa-angle-left"></i>
          </button>
        </div>
        
        <ul class="pages--other" v-if="numPages < 9">
          <li 
          v-for="(num, index) in numPages" 
          :key="index" 
          :class="{ curPage: num == curPage }"
          @click="changePage(num)"
          >
          {{ num }}</li>
        </ul>
        <ul class="pages--other" v-else>
        <li :class="{ curPage: 1 == curPage }" @click="changePage(1)" >1</li>
        <li :class="{ curPage: 2 == curPage }" @click="changePage(2)" >2</li>
        <li :class="{ curPage: pageVal == curPage }" @click="changePage(pageVal)">
          {{ pageVal }}
        </li>
        <li>...</li>
        <li
        :class="{ curPage: curPage == numPages-1 }"
        @click="changePage(numPages-1)" 
        >
        {{ numPages-1 }}
        </li>
        <li
        :class="{ curPage: curPage == numPages}"
        @click="changePage(numPages)" 
        >
        {{ numPages }}
        </li> 
      </ul>

        <div class="pages-btn pages-next">
          <button class="pages-btn--gray" v-if="curPage == numPages">
            <i class="fas fa-angle-right"></i>
          </button>
          <button @click="goto(1)" v-else>
            <i class="fas fa-angle-right"></i>
          </button>
        </div>

        <div class="pages-btn pages-nextOff">
          <button class="pages-btn--gray" v-if="curPage == numPages">
            <i class="fas fa-angle-double-right"></i>
          </button>
          <button @click="changePage(numPages)" v-else>
            <i class="fas fa-angle-double-right"></i>
          </button>
        </div>
      </div>
    </div>

    <search-filter class="search-filter" v-show="show" :show-Keyword="false" @update-filter="updatedFilters" @close="handleClose"></search-filter>
  </section>
  <div v-show="show" class="mask"></div>
  <div v-show="selectedMark" class="cardmask"></div>
</template>

<script>
import { ref, computed , watch } from 'vue'
import { useStore } from 'vuex'
import { RES_MAP_PAGE } from "../config.js"
import CITY_DATA from '../city-data.js'
import SearchFilter from '../components/SearchFilter.vue'
export default {
  components: {
    SearchFilter
  },
  setup() {
    const store = useStore()
    const resultsPerPage = RES_MAP_PAGE
    const cityData = CITY_DATA
    const enteredSearchTerm = ref('')
    const selectedType = ref('restaurant')
    const searchCards = ref(null)
    const story = ref(null)
    const curPage = ref(1)
    const pageResults = ref(null)
    const pageVal = ref(3)
    const map = ref(null)
    const divRef = ref(null)
    const selectedMark = ref(null)
    const infowindowVal = ref(null)
    const selectedCity = ref(null)
    const show = ref(false)
    // const locationVal = ref(null)
    const locaCenter = ref()
    const positions = ref(null)
    const isActiveID = ref(false)
    const isLoading = ref(false)
    let markers = []

    const scenicSpot = computed(() => store.getters.scenicSpot)
    const restaurant = computed(() => store.getters.restaurant)
    const hotel = computed(() => store.getters.hotel)

    const storyDetailsLink = computed(() => {
      return `/stories/${selectedMark.value.ID}?type=${selectedType.value}`
    })

    
    function enterSearch(event){
      enteredSearchTerm.value = event.target.value
    }

    async function goSearch() {
      let data = []

      if(enteredSearchTerm.value) {
        if (selectedType.value === 'scenicSpot') {
          data = scenicSpot.value.filter((item) => 
            item.Name.indexOf(enteredSearchTerm.value) > -1
          )
        } else if (selectedType.value === 'restaurant') {
          data = restaurant.value.filter((item) => 
            item.Name.indexOf(enteredSearchTerm.value) > -1
          )
        } else if (selectedType.value === 'hotel') {
          data = hotel.value.filter((item) => 
            item.Name.indexOf(enteredSearchTerm.value) > -1
          )
        }

        enteredSearchTerm.value = ''
      }else {
        if (selectedType.value === 'scenicSpot') {
          data = scenicSpot.value
        } else if (selectedType.value === 'restaurant') {
          data = restaurant.value
        } else if (selectedType.value === 'hotel') {
          data = hotel.value
        }
      }

      searchCards.value = data
    }
    goSearch()

    function selectedCard (cardId) {
      if(selectedType.value == 'restaurant') {
        story.value = restaurant.value.find(item => item.ID === cardId)
      }else if(selectedType.value == 'hotel'){
        story.value = hotel.value.find(item => item.ID === cardId)
      }else {
        story.value = scenicSpot.value.find(item => item.ID === cardId)
      }

      const selected = positions.value.find((card) => card.ID === cardId)
      selectedMark.value = selected
      isActiveID.value = selected.ID
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

    function calPage() {
      if(curPage.value >= 3) {
        pageVal.value = curPage.value
      }

      if(curPage.value >= numPages.value -2 ) {
        pageVal.value = numPages.value -2
      }
    }

    watch(curPage, () => {
      calPage()
      setPageResults(curPage.value)
    })

    watch(selectedType , (newVal) => {
      if(newVal == selectedType.value) {
        curPage.value = 1
        setPageResults(curPage.value)
      }
    })

    watch(searchCards , () => {
      setPageResults(curPage.value)
    })

    setPageResults(1)
    /* 抓取頁數結束 */

    async function getData() {
      isLoading.value = true
      try {
        if (selectedType.value === 'scenicSpot') {
          await store.dispatch('setScenicSpot', null)
          positions.value = scenicSpot.value
        } else if (selectedType.value === 'restaurant') {
          await store.dispatch('setRestaurant', null)
          positions.value = restaurant.value
        } else if (selectedType.value === 'hotel') {
          await store.dispatch('setHotel', null)
          positions.value = hotel.value
        }
      } catch (error) {
        console.log(error)
      }
      
      resetCenter()
      initMap()
      setMarker()
      goSearch()
      isLoading.value = false
    }

    getData()

    /* 撈取地圖資料開始 */
    async function initMap() {
      try { 
        const centerVal = locaCenter.value

        map.value = new window.google.maps.Map(divRef.value, {
          zoom: selectedCity.value ? 11 : 8,
          mapTypeId: 'terrain',
          center: centerVal,
          disableDefaultUI: false,
        })

    
      } catch (error) {
        alert('地圖發生錯誤，請稍後再嘗試!')
        console.log(error)
      }
    }

    function resetCenter(setPos = null) {
      if(setPos) {
        locaCenter.value = setPos
      }else{
        if(selectedCity.value) {
          const city = cityData.find((city) => city.id == selectedCity.value)
          locaCenter.value = city.center
        }else{
          locaCenter.value = { lat: 23.97565, lng: 120.9738 }
        }
      }

    }

    function deleteMarkers() {
      markers.forEach(marker => marker.setMap(null))
      markers = []
    }

    function setMarker() {
      deleteMarkers()

      positions.value.forEach((el) => {
        const marker = new window.google.maps.Marker({
          position: { lat: el.Position.PositionLat, lng: el.Position.PositionLon },
          map: map.value
        })

        markers.push(marker)

        const infowindow = new window.google.maps.InfoWindow({
          content: `
          <div id="content">
            <p class="infowindow">${el.Name}</p>
          </div>
        `,
          width: 200,
        })

        marker.addListener('click', () => {
          const selected = positions.value.find((card) => card.ID === el.ID)
          selectedMark.value = selected
          isActiveID.value = selected.ID

          if (infowindowVal.value) infowindowVal.value.close()
          infowindow.open(map.value, marker)
          infowindowVal.value = infowindow
        });
      })
    }

    /* 撈取地圖資料結束 */


    /* 進階篩選開始 */
    async function submitForm() {
      if(selectedCity.value) {
        if (selectedType.value === 'scenicSpot') {
          await store.dispatch('setScenicSpot', selectedCity.value)
          positions.value = scenicSpot.value
        } else if (selectedType.value === 'restaurant') {
          await store.dispatch('setRestaurant', selectedCity.value)
          positions.value = restaurant.value
        } else if (selectedType.value === 'hotel') {
          await store.dispatch('setHotel', selectedCity.value)
          positions.value = hotel.value
        }
      }

      goSearch()
      resetCenter()
      initMap()
      setMarker()
      selectedCity.value = null
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

    return {
      show,
      divRef,
      isActiveID,
      enteredSearchTerm,
      storyDetailsLink,
      selectedType,
      searchCards,
      selectedCard,
      curPage,
      numPages,
      pageVal,
      pageResults,
      goto,
      changePage,
      enterSearch,
      selectedMark,
      updatedFilters,
      handleShow,
      handleClose,
      submitForm,
      goSearch,
      isLoading
    }
  }
}
</script>

