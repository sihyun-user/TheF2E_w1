<template>
  <section class="search">
    <div class="banner">
      <img src="@/assets/img/scene.jpg" alt="banner">
      <img class="banner__mask" src="@/assets/img/bannerMask.png" alt="banner">
      <h1>搜尋台灣</h1> 

      <form @submit.prevent="submitForm" class="form">
        <div class="inputSearch">
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
          <button type="submit" class="form__btn form__btn--1">搜尋</button>
          <button type="button" class="form__btn form__btn--2" @click="handleShow">進階搜尋</button>
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
            v-for="res in restaurant"
            :key="res.ID"
            :name="res.Name"
            :address="res.Address"
            :phone="res.Phone"
            :picture="res.Picture.PictureUrl1"
            >
            </card-item> 
          </ul>
        </div>

        <div class="main__wrap">
          <h2 class="main__title main__title--3">優質住宿</h2>
          <ul class="main__cards">
            <card-item
            v-for="hot in hotel"
            :key="hot.ID"
            :name="hot.Name"
            :address="hot.Address"
            :phone="hot.Phone"
            :picture="hot.Picture.PictureUrl1"
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
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex';
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

    const scenicSpot = computed(() => store.getters.scenicSpot)
    const restaurant = computed(() => store.getters.restaurant)
    const hotel = computed(() => store.getters.hotel)

    function enterSearch(event) {
      enteredSearchTerm.value = event.target.value
    }

    function availableData(val) {
      let data = []

      if(enteredSearchTerm.value) {
        if (val === 'scenicSpot') {
          data = scenicSpot.value.filter((item) => 
            item.Name.indexOf(enteredSearchTerm.value) > -1
          )
        } else if (val === 'restaurant') {
          data = restaurant.value.filter((item) => 
            item.Name.indexOf(enteredSearchTerm.value) > -1
          )
        } else if (val === 'hotel') {
          data = hotel.value.filter((item) => 
            item.Name.indexOf(enteredSearchTerm.value) > -1
          )
        }
      }else {
        if (val === 'scenicSpot') {
          data = scenicSpot.value
        } else if (val === 'restaurant') {
          data = restaurant.value
        } else if (val === 'hotel') {
          data = hotel.value
        }
      }

      finalSearch.value = data
    }

    async function goSearch(val = null) {
      const paramData ={
        val: val,
        city: selectedCity.value
      }
      
      if (selectedType.value === 'scenicSpot') {
        await store.dispatch('setScenicSpot', paramData)
      } else if (selectedType.value === 'restaurant') {
        await store.dispatch('setRestaurant', paramData)
      } else if (selectedType.value === 'hotel') {
        await store.dispatch('setHotel', paramData)
      }

      isSearch.value = true
      availableData(selectedType.value)
    }

    async function submitForm() {
      await goSearch(8)
      selectedCity.value = null
      enteredSearchTerm.value = ''
    }

    function updatedFilters(val) {
      selectedType.value = val.type
      selectedCity.value = val.city
    }

    watch(selectedCity, () =>{
      goSearch()
    })

    function handleShow() {
      show.value = true
    }

    function handleClose(val) {
      show.value = val
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
      submitForm
    }
  }
}
</script>