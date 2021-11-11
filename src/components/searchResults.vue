<template>
  <div class="results">
    <div class="results__content">
      <div class="results__block"></div>
      <div class="results__cardBox">
        <div class="results__titleBox">
          <h2 v-if="selectedType === 'scenicSpot'" class="results__title results__title--1">熱門景點</h2>
          <h2 v-else-if="selectedType === 'restaurant'" class="results__title results__title--2">必吃美食</h2>
          <h2 v-else class="results__title results__title--3">優質住宿</h2>
        </div>

        <ul class="results__marks">
          <li>夜市</li>
          <li>中壢區</li>
        </ul>

        <ul class="results__cards">
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
  
        <p v-if="selected.length == 0" class="results__error">沒有搜尋到任何東西，請再重新搜尋</p>
      </div>
    </div>
    <div class="results__pages" v-if="selected.length != 0">
      <div class="results__pages-btn results__pages-lastOff">
        <button class="results__pages-btn--gray" v-if="curPage == 1">
          <i class="fas fa-angle-double-left"></i>
        </button>
        <button @click="changePage(1)" v-else>
          <i class="fas fa-angle-double-left"></i>
        </button>
      </div>

      <div class="results__pages-btn results__pages-last">
        <button class="results__pages-btn--gray" v-if="curPage == 1">
          <i class="fas fa-angle-left"></i>
        </button>
        <button @click="goto(-1)" v-else>
          <i class="fas fa-angle-left"></i>
        </button>
      </div>
      
      <ul class="results__pages--other" v-if="numPages < 9">
        <li 
        v-for="(num, index) in numPages" 
        :key="index" 
        :class="{ curPageStyle: num == curPage }"
        @click="changePage(num)"
        >
        {{ num }}</li>
      </ul>
      <ul class="results__pages--other" v-else>
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

      <div class="results__pages-btn results__pages-next">
        <button class="results__pages-btn--gray" v-if="curPage == numPages">
          <i class="fas fa-angle-right"></i>
        </button>
        <button @click="goto(1)" v-else>
          <i class="fas fa-angle-right"></i>
        </button>
      </div>

      <div class="results__pages-btn results__pages-nextOff">
        <button class="results__pages-btn--gray" v-if="curPage == numPages">
          <i class="fas fa-angle-double-right"></i>
        </button>
        <button @click="changePage(numPages)" v-else>
          <i class="fas fa-angle-double-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, ref, toRefs, watch } from 'vue'
import { RES_PER_PAGE } from "../config.js"
import CardItem from '../components/CardItem.vue'
export default {
  props: ['selected', 'type'],
  components: {
    CardItem,
  },
  setup(props) {
    const resultsPerPage = RES_PER_PAGE
    const { selected, type } = toRefs(props)
    const selectedType = ref('restaurant')
    const curPage = ref(1)
    const pageResults = ref(null)

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

    watch(selected, () => {
      selectedType.value = type.value
      setPageResults(1)
    })

    watch(curPage, () => setPageResults(curPage.value))

    watch(selectedType , (newVal) => {
      if(newVal == selectedType.value) {
        curPage.value = 1
      }
    })

    setPageResults(1)

    return {
      selectedType,
      curPage,
      numPages,
      pageResults,
      goto,
      changePage
    }
  }
}
</script>