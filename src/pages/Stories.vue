<template>
  <section class="stories">
    <div class="banner">
      <img src="@/assets/img/scene.jpg" alt="banner">
      <div class="banner__mask">
        <img src="@/assets/img/bannerMask.png">
      </div>
      <h1>搜尋台灣</h1> 


      <section class="form">
        <div class="form__search">
          <input type="search" @input="enterSearch" :value="enteredSearchTerm" placeholder="請輸入關鍵字" />
        </div>
        <div class="form__menu">
          <div class="form__select">
            <select name="type" id="type-select" v-model="selectedType">
              <option value="restaurant">美食</option>
              <option value="hotel">住宿</option>
              <option value="scenicSpot">觀光</option>
            </select>
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
        </div>
      </section>
    </div>

    <div class="main" v-if="!isSearch">
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>

      <div class="main__container" v-else>
        <div class="main__wrap">
        <h2 class="main__title main__title--1">
          <span>熱門景點</span>
          <i class="fas fa-mountain"></i>
        </h2>
        <ul class="main__cards">
          <card-item
          v-for="hot in hotScenicSpot"
          :key="hot.ID"
          :id="hot.ID"
          :name="hot.Name"
          :address="hot.Address"
          :phone="hot.Phone"
          :picture="hot.Picture.PictureUrl1"
          type="scenicSpot"
          >
          </card-item>
        </ul>
        </div>

        <div class="main__wrap">
          <h2 class="main__title main__title--2">
            <span>必吃美食</span>
            <i class="fas fa-utensils"></i>
          </h2>
          <ul class="main__cards">
            <card-item
            v-for="hot in hotRestaurant"
            :key="hot.ID"
            :id="hot.ID"
            :name="hot.Name"
            :address="hot.Address"
            :phone="hot.Phone"
            :picture="hot.Picture.PictureUrl1"
            type="restaurant"
            >
            </card-item> 
          </ul>
        </div>

        <div class="main__wrap">
          <h2 class="main__title main__title--3">
            <span>優質住宿</span>
            <i class="fas fa-car"></i>
          </h2>
          <ul class="main__cards">
            <card-item
            v-for="hot in hotHotel"
            :key="hot.ID"
            :id="hot.ID"
            :name="hot.Name"
            :address="hot.Address"
            :phone="hot.Phone"
            :picture="hot.Picture.PictureUrl1"
            type="hotel"
            >
            </card-item>
          </ul>
        </div>
      </div>
    </div>
    

    <search-results v-else :selected="finalSearch" :type="selectedType"></search-results>

    <search-filter v-show="show" @update-filter="updatedFilters" @close="handleClose"></search-filter>
  </section>
  <div v-show="show" class="mask"></div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { RADOM_PAGENUM, POPULAR_PAGENUM } from "../config.js"
import CardItem from '../components/CardItem.vue'
import searchResults from '../components/searchResults.vue'
import SearchFilter from '../components/SearchFilter.vue'
export default {
  components: {
    CardItem,
    searchResults,
    SearchFilter
  },
  setup() {
    const store = useStore()
    const selectedType = ref('restaurant')
    const selectedCity = ref(null)
    const isSearch = ref(false)
    const finalSearch = ref(null)
    const enteredSearchTerm = ref('')
    const show = ref(false)
    const isLoading =ref(null)
    const hotHotel = ref(null)
    const hotScenicSpot = ref(null)
    const hotRestaurant = ref(null)

    const scenicSpot = computed(() => store.getters.scenicSpot)
    const restaurant = computed(() => store.getters.restaurant)
    const hotel = computed(() => store.getters.hotel)

    function enterSearch(event) {
      enteredSearchTerm.value = event.target.value
    }

    async function goSearch() {
      let data = []

      if(selectedCity.value) {
        if (selectedType.value === 'scenicSpot') {
          await store.dispatch('setScenicSpot', selectedCity.value)
        } else if (selectedType.value === 'restaurant') {
          await store.dispatch('setRestaurant', selectedCity.value)
        } else if (selectedType.value === 'hotel') {
          await store.dispatch('setHotel', selectedCity.value)
        }
      }else {
        if (selectedType.value === 'scenicSpot') {
          await store.dispatch('setScenicSpot', null)
        } else if (selectedType.value === 'restaurant') {
          await store.dispatch('setRestaurant', null)
        } else if (selectedType.value === 'hotel') {
          await store.dispatch('setHotel', null)
        }
      }

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

      isSearch.value = true
      selectedCity.value = null
      enteredSearchTerm.value = ''
      finalSearch.value = data
    }

    function updatedFilters(val) {
      selectedType.value = val.type
      selectedCity.value = val.city
      enteredSearchTerm.value = val.keyword
      goSearch()
    }

    function handleShow() {
      show.value = true
    }

    function handleClose(val) {
      show.value = val
    }

    /* 抽取熱門項目開始 */
    function setPopular() {
      hotRestaurant.value = getPopular(restaurant.value)
      hotHotel.value = getPopular(hotel.value)
      hotScenicSpot.value = getPopular(scenicSpot.value)
    }
    
    // 隨機抽取8個熱門項目
    function getPopular(type) {
      let num = POPULAR_PAGENUM
      let radom = []
      for (let i = 0; i < RADOM_PAGENUM ; i++) {
        radom.push(i)
      }
      radom.sort(() => {
        return Math.random()-0.5;
      })
      radom.length = num

      let popular = []
      for(let i = 0; i < num ; i++) {
        let num = radom[i]
        popular.push(type[num])
      }
      return popular
    }
    /* 抽取熱門項目結束 */

    async function getData() {
      isLoading.value = true
      try {
        await store.dispatch('setScenicSpot', null)
        await store.dispatch('setRestaurant', null)
        await store.dispatch('setHotel', null)

        setPopular()
      } catch (error) {
        console.log(error)
      }
      isLoading.value = false
    }
    
    getData()
    
    
    return {
      selectedType,
      isSearch,
      finalSearch,
      enteredSearchTerm,
      show,
      scenicSpot,
      restaurant,
      hotel,
      goSearch,
      getData,
      enterSearch,
      updatedFilters,
      handleShow,
      handleClose,
      isLoading,
      hotRestaurant,
      hotHotel,
      hotScenicSpot
    }
  }
}
</script>