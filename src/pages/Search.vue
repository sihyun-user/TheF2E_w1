<template>
  <section class="search">
    <div class="banner">
      <img src="@/assets/img/scene.jpg" alt="banner">
      <img class="banner__mask" src="@/assets/img/bannerMask.png" alt="banner">
      <h1>搜尋台灣</h1> 

      <form class="form">
        <div class="inputSearch">
          <input type="search"  placeholder="請輸入關鍵字" />
        </div>
        <div class="form__menu">
          <div class="form__select">
            <select name="type" id="type-select">
              <option value="null">類別</option>
              <option value="restaurant">美食</option>
              <option value="scenicSpot">住宿</option>
              <option value="hotel">觀光</option>
            </select>
          </div>
          <button type="button" @click="getData(8)" class="form__btn form__btn--1">搜尋</button>
          <button class="form__btn form__btn--2">進階搜尋</button>
        </div>
      </form>
    </div>

    <div class="main">
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
  </section>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex';
import CardItem from '../components/CardItem.vue'
export default {
  components: {
    CardItem
  },
  setup() {
    const store = useStore()
    const selectedType = ref(null)

    const scenicSpot = computed(() => store.getters.scenicSpot)
    const restaurant = computed(() => store.getters.restaurant)
    const hotel = computed(() => store.getters.hotel)

    function getData(val) {
      store.dispatch('setScenicSpot', val)
      store.dispatch('setRestaurant', val)
      store.dispatch('setHotel', val)
    }

    // getData(10)
    

    return {
      selectedType,
      scenicSpot,
      restaurant,
      hotel,
      getData
    }
  }
}
</script>