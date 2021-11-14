<template>
  <section class="typical">
    <div class="banner" v-if="type == 'scenicSpot'">
      <img src="@/assets/img/scene.jpg" alt="banner">
      <div class="title">
        <i class="fas fa-mountain"></i>
        <h2>必遊景點</h2>
        <div class="title__btns">
          <router-link to="/stories">
            <button class="title__btn title__btn--1">
                <i class="fas fa-search"></i>
                <span>深入探索</span>
            </button>
          </router-link>
          <router-link to="/storymap">
            <button class="title__btn title__btn--1">
              <i class="fas fa-map-marker-alt"></i>
              <span>地圖快搜</span>
            </button>
          </router-link>
        </div>
      </div>
    </div>

    <div class="banner" v-else-if="type == 'restaurant'">
      <img src="@/assets/img/food.jpg" alt="banner">
      <div class="title">
        <i class="fas fa-utensils"></i>
        <h2>特色美食</h2>
        <div class="title__btns">
          <router-link to="/stories">
            <button class="title__btn title__btn--2">
                <i class="fas fa-search"></i>
                <span>深入探索</span>
            </button>
          </router-link>
          <router-link to="/storymap">
            <button class="title__btn title__btn--2">
              <i class="fas fa-map-marker-alt"></i>
              <span>地圖快搜</span>
            </button>
          </router-link>
        </div>
      </div>
    </div>

    <div class="banner" v-else>
      <img src="@/assets/img/room.jpg" alt="banner">
      <div class="title">
        <i class="fas fa-car"></i>
        <h2>住宿特搜</h2>
        <div class="title__btns">
          <router-link to="/stories">
            <button class="title__btn title__btn--3">
                <i class="fas fa-search"></i>
                <span>深入探索</span>
            </button>
          </router-link>
          <router-link to="/storymap">
            <button class="title__btn title__btn--3">
              <i class="fas fa-map-marker-alt"></i>
              <span>地圖快搜</span>
            </button>
          </router-link>
        </div>
      </div>
    </div>
    

    <div v-if="isLoading">
      <base-spinner></base-spinner>
    </div>

    <div class="typical" v-else>
      <div class="typical__content">
        <div class="typical__block"></div>
        <div class="typical__cardBox">
          <div class="typical__titleBox">
            <h2 class="typical__title typical__title--1" v-if="type == 'scenicSpot'">
              <span>熱門景點 TOP 3</span>
            </h2>
            <h2 class="typical__title typical__title--2" v-else-if="type === 'restaurant'">
              <span>熱門美食 TOP3</span>
              <i class="fas fa-utensils"></i>
            </h2>
            <h2 class="typical__title typical__title--3" v-else>
              <span>熱門旅宿 TOP3</span>
              <i class="fas fa-car"></i>
            </h2>
          </div>

          <div class="typical__top" v-if="type == 'scenicSpot'">
            <div class="typical__top--img">
              <router-link to="/stories/C1_315081000H_020196?type=scenicSpot">
                <h3>蛇山</h3>
                <img src="@/assets/img/typical01.jpg">
              </router-link>
            </div>
            <div class="typical__top--img">
              <router-link to="/stories/C1_315081100H_000438?type=scenicSpot">
                <h3>月牙灣</h3>
                <img src="@/assets/img/typical02.jpg">
              </router-link>
            </div>
            <div class="typical__top--img">
              <router-link to="/stories/C1_315081000H_020194?type=scenicSpot">
                <h3>菜浦澳</h3>
                <img src="@/assets/img/typical03.jpg">
              </router-link>
            </div>
          </div>

          <div class="typical__top" v-else-if="type == 'restaurant'">
            <div class="typical__top--img">
              <router-link to="/stories/C3_315081100H_000592?type=restaurant">
                <h3>膨鼠紅茶</h3>
                <img src="@/assets/img/typical04.jpg">
              </router-link>
            </div>
            <div class="typical__top--img">
              <router-link to="/stories/C3_315081600H_000309?type=restaurant">
                <h3>新塭蚵嗲</h3>
                <img src="@/assets/img/typical05.jpg">
              </router-link>
            </div>
            <div class="typical__top--img">
              <router-link to="/stories/C3_315081600H_000349?type=restaurant">
                <h3>東石水煎包</h3>
                <img src="@/assets/img/typical06.jpg">
              </router-link>
            </div>
          </div>

          <div class="typical__top" v-else>
            <div class="typical__top--img">
              <router-link to="/stories/C4_315080000H_000774?type=hotel">
                <h3>欣采民宿</h3>
                <img src="@/assets/img/typical07.jpg">
              </router-link>
            </div>
            <div class="typical__top--img">
              <router-link to="/stories/C4_315080000H_000193?type=hotel">
                <h3>慧來農莊</h3>
                <img src="@/assets/img/typical08.jpg">
              </router-link>
            </div>
            <div class="typical__top--img">
              <router-link to="/stories/C4_315080000H_021457?type=hotel">
                <h3>南院旅墅</h3>
                <img src="@/assets/img/typical09.jpg">
              </router-link>
            </div>
          </div>

          <h2 class="typical__title typical__title--1">
            <span>特色景點</span>
          </h2>

          <ul class="typical__cards">
            <card-item
            v-for="res in pageResults"
            :key="res.ID"
            :id="res.ID"
            :name="res.Name"
            :address="res.Address"
            :phone="res.Phone"
            :picture="res.Picture.PictureUrl1"
            :type="type"
            >
            </card-item>
          </ul>
        </div>
      </div>
      <div class="pages">
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
  </section>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { RES_PER_PAGE } from "../config.js"
import CardItem from '../components/CardItem.vue'
export default {
  components: {
    CardItem,
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const typicalPerPage = RES_PER_PAGE
    const selected = ref(null)
    const curPage = ref(1)
    const pageResults = ref(null)
    const pageVal = ref(3)
    const isLoading = ref(false)


    const scenicSpot = computed(() => store.getters.scenicSpot)
    const restaurant = computed(() => store.getters.restaurant)
    const hotel = computed(() => store.getters.hotel)

    const numPages = computed(() => Math.ceil(hotel.value.length / typicalPerPage))
    const type = computed(() => route.query.type)

    function calPage() {
      if(curPage.value >= 3) {
        pageVal.value = curPage.value
      }

      if(curPage.value >= numPages.value -2 ) {
        pageVal.value = numPages.value -2
      }
    }

    function goto(val) {
      curPage.value += val
    }

    function changePage(val) {
      curPage.value = val
    }

    function setPageResults(page) {
      // page(1)抓取 0 - 7 的陣列項目 | page(2)抓取 8 - 15 的陣列項目
      const start = (page -1) * typicalPerPage // 0
      const end = page * typicalPerPage // 7
      
      pageResults.value = selected.value.slice(start, end)
    }

    watch(curPage, () => {
      calPage()
      setPageResults(curPage.value)
    })
    
    async function getData() {
      isLoading.value = true
      try {
        if(type.value == 'restaurant') {
          await store.dispatch('setRestaurant', null)
          selected.value = restaurant.value
        }else if(type.value == 'hotel'){
          await store.dispatch('setHotel', null)
          selected.value = hotel.value
        }else {
          await store.dispatch('setScenicSpot', null)
          selected.value = scenicSpot.value
        }
      } catch (error) {
        console.log(error)
      }

      setPageResults(1)
      isLoading.value = false
    }

    getData()

    return {
      type,
      curPage,
      numPages,
      pageResults,
      goto,
      changePage,
      pageVal,
      isLoading
    }
  }
}
</script>
