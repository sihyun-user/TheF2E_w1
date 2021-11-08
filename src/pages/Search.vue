<template>
  <section class="search">
    <div class="banner">
      <img src="@/assets/img/scene.jpg" alt="banner">
      <img class="banner__mask" src="@/assets/img/bannerMask.png" alt="banner">
      <h1>搜尋台灣</h1> 

      <form class="form">
        <div class="inputSearch">
          <input type="search" @input="enterSearch" :value="enteredSearchTerm" placeholder="請輸入關鍵字" />
        </div>
        <div class="form__menu">
          <div class="form__select">
            <select name="type" id="type-select" v-model="selectedType">
              <option value="美食">美食</option>
              <option value="住宿">住宿</option>
              <option value="觀光">觀光</option>
            </select>
          </div>
          <button type="button" @click="goSearch" class="form__btn form__btn--1">搜尋</button>
          <button class="form__btn form__btn--2">進階搜尋</button>
        </div>
      </form>
    </div>

    <div class="main" v-if="!isSearch">
      <div class="main__container">
        <div class="main__wrap">
        <h2 class="main__title main__title--1">熱門景點</h2>
        <ul class="main__cards">
          <card-item
          v-for="spot in scenicSpot"
          :key="spot.ID"
          :name="spot.Name"
          :address="spot.Address"
          :phone="spot.Phone"
          :picture="spot.Picture.PictureUrl1"
          >
          </card-item>
        </ul>
        </div>

        <div class="main__wrap">
          <h2 class="main__title main__title--2">必吃美食</h2>
          <ul class="main__cards">
            <card-item
            v-for="spot in restaurant"
            :key="spot.ID"
            :name="spot.Name"
            :address="spot.Address"
            :phone="spot.Phone"
            :picture="spot.Picture.PictureUrl1"
            >
            </card-item> 
          </ul>
        </div>

        <div class="main__wrap">
          <h2 class="main__title main__title--3">優質住宿</h2>
          <ul class="main__cards">
            <card-item
            v-for="spot in hotel"
            :key="spot.ID"
            :name="spot.Name"
            :address="spot.Address"
            :phone="spot.Phone"
            :picture="spot.Picture.PictureUrl1"
            >
            </card-item>
          </ul>
        </div>
      </div>
    </div>

    <search-results v-else :selected="finalSearch" :type="selectedType"></search-results>
  </section>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex';
import CardItem from '../components/CardItem.vue'
import searchResults from '../components/searchResults.vue'
export default {
  components: {
    CardItem,
    searchResults
  },
  setup() {
    const store = useStore()
    const selectedType = ref('美食')
    const isSearch = ref(false)
    const finalSearch = ref(null)
    const enteredSearchTerm = ref('')

    const scenicSpot = computed(() => store.getters.scenicSpot)
    const restaurant = computed(() => store.getters.restaurant)
    const hotel = computed(() => store.getters.hotel)

    function enterSearch(event) {
      enteredSearchTerm.value = event.target.value
    }

    function availableData(val) {
      let data = []

      if(enteredSearchTerm.value) {
        if (val === '觀光') {
          data = scenicSpot.value.filter((item) => 
            item.Name.indexOf(enteredSearchTerm.value) > -1
          )
        } else if (val === '美食') {
          data = restaurant.value.filter((item) => 
            item.Name.indexOf(enteredSearchTerm.value) > -1
          )
        } else if (val === '住宿') {
          data = hotel.value.filter((item) => 
            item.Name.indexOf(enteredSearchTerm.value) > -1
          )
        }
      }else {
        if (val === '觀光') {
          data = scenicSpot.value
        } else if (val === '美食') {
          data = restaurant.value
        } else if (val === '住宿') {
          data = hotel.value
        }
      }

      finalSearch.value = data
    }

    async function goSearch() {
      if (selectedType.value === '觀光') {
        await store.dispatch('setScenicSpot', 2)
      } else if (selectedType.value === '美食') {
        await store.dispatch('setRestaurant', 8)
      } else if (selectedType.value === '住宿') {
        await store.dispatch('setHotel', 8)
      }

      availableData(selectedType.value)

      isSearch.value = true
      enteredSearchTerm.value = ''
    }

    function getData(val) {
      store.dispatch('setScenicSpot', val)
      store.dispatch('setRestaurant', val)
      store.dispatch('setHotel', val)
    }
    
    // getData(10)
    

    return {
      selectedType,
      isSearch,
      finalSearch,
      enteredSearchTerm,
      scenicSpot,
      restaurant,
      hotel,
      goSearch,
      getData,
      enterSearch
    }
  }
}
</script>