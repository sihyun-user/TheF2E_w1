<template>
  <div class="loding" v-if="isLoading">
    <base-spinner></base-spinner>
  </div>
  <section class="story" v-else>
    <div class="story__banner">
      <h1 class="story__title">{{ story.Name }}</h1>
      <div class="story__imgs">
        <ul>
          <li v-for="(pic, index) in picture" :key="index" v-show="index == curimg">
            <button 
            class="story__imgs-btn story__imgs-btn--prev" 
            @click="changePicture(-1)" 
            v-if="curimg !== 0"
            >
              <i class="fas fa-chevron-left"></i>
            </button>
            <img :src="story.Picture[pic]">
            <button 
            class="story__imgs-btn story__imgs-btn--next" 
            @click="changePicture(+1)"
            v-if="curimg !== picture.length-1"
            >
              <i class="fas fa-chevron-right"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div class="story__container">
      <div class="story__content">
        <div class="story__info">
          <div class="story__info--description">
            <h2 v-if="type == 'restaurant'">美食資訊</h2>
            <h2 v-else-if="type == 'hotel'">住宿資訊</h2>
            <h2 v-else>景點資訊</h2>

            <p v-if="story.Description">{{ story.Description }}</p>
            <p v-else>暫無描述資訊</p>
          </div>
          <div class="story__info--details">
            <h2>詳細資訊</h2>
            <div v-if="story.OpenTime">
              <i class="fas fa-clock"></i>
              <span v-if="story.OpenTime">{{ story.OpenTime }}</span>
              <span v-else>暫無營業時間資訊</span>
            </div>
            <div>
              <i class="fas fa-phone-alt"></i>
              <span v-if="story.Phone">{{ story.Phone }}</span>
              <span v-else>暫無電話資訊</span>
            </div>
            <div>
              <i class="fas fa-map-marker-alt"></i>
              <span v-if="story.Address">{{ story.Address }}</span>
              <span v-else>暫無地址資訊</span>
            </div>
          </div>
          <div class="story__info--keyword">
            <h2>關鍵字標籤</h2>
            <button v-if="story.Class">{{ story.Class }}</button>
            <ul v-else-if="markClass.length > 0">
              <li v-for="(mark, index) in markClass" :key="index">
                <button>{{ story[mark] }}</button>
              </li>
            </ul>
            <p v-else>暫無關鍵字標籤</p>
          </div>
        </div>
        <div class="story__side">
          <div class="story__side--hot">
            <div class="story__side--hot-title">
              <h2 v-if="type == 'restaurant'">熱門美食</h2>
              <h2 v-else-if="type == 'hotel'">熱門住宿</h2>
              <h2 v-else>熱門景點</h2>
            </div>
            <ul>
              <li v-for="pop in popular" :key="pop.ID">
                <div @click="getStoryLink(pop.ID)">
                  <img :src="pop.Picture.PictureUrl1">
                  <h3>{{ pop.Name }}</h3>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

import { RADOM_STORYNUM, POPULAR_STORYNUM, API_URL, FILTER_PIC } from '../config.js'
import getAuthorizationHeader from '../helpers.js'
export default {
  props: ['storyId'],
  setup(props) {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const curimg = ref(0)
    const isLoading = ref(null)
    const pageVal = ref(ref)
    const story = ref(null)

    const hot = computed(() => store.getters.hot)

    const type = computed(() => route.query.type)


    function getStory() {
      story.value = pageVal.value.find(item => item.ID === props.storyId)
    }

    const picture = computed(() => {
      let imgs = []
      let storyPic = story.value.Picture
      for(let i = 1; i < 10; i++) {
        let picUrl = `PictureUrl${i}`

        if(storyPic[picUrl] == undefined) {
          break
        }
        imgs.push(`PictureUrl${i}`)
      }
      return imgs
    })
    
    const markClass = computed(() => {
      let marks = []
      for(let i = 1; i < 10; i++) {
        let mark = `Class${i}`
        if(story.value[mark] == undefined) {
          break
        }
        marks.push(`Class${i}`)
      }
      return marks
    })
    
    const popular = computed(() => getPopular())
    
    // 隨機抽取5個熱門項目
    function getHotData() {
      store.dispatch('setHot', type.value)
    }
    getHotData()

    function getPopular() {
      let num = POPULAR_STORYNUM
      let radom = []
      for (let i = 0; i < RADOM_STORYNUM ; i++) {
        radom.push(i)
      }
      radom.sort(() => {
        return Math.random()-0.5;
      })
      radom.length = num

      let popular = []
      for(let i = 0; i < num ; i++) {
        let num = radom[i]
        popular.push(hot.value[num])
      }
      return popular
    }

    function changePicture(num) {
      curimg.value += num
    }

    function getStoryLink(id) {
      let val = pageVal.value.find(item => item.ID === id)
      router.push(`/stories/${val.ID}?type=${type.value}`)
      getData()
    }

    async function getData() {
      isLoading.value = true
      try {
        if (type.value === 'scenicSpot') {
          await setPage('scenicSpot')
        } else if (type.value === 'restaurant') {
          await setPage('restaurant')
        } else if (type.value === 'hotel') {
          await setPage('hotel')
        }
      } catch (error) {
        console.log(error)
      }
      getStory()
      isLoading.value = false
    }

    async function setPage(type) {
      let API
      if(type == 'restaurant') {
        API = `${API_URL}/v2/Tourism/Restaurant?$format=JSON&${FILTER_PIC}`
      }else if(type == 'hotel') {
        API = `${API_URL}/v2/Tourism/Hotel?&$format=JSON&${FILTER_PIC}`
      }else {
        API = `${API_URL}/v2/Tourism/ScenicSpot?$format=JSON&${FILTER_PIC}`
      }
      const response = await fetch(API, {
        headers: getAuthorizationHeader()
      })

      if(!response.ok) {
        alert('取得熱門資料失敗')
      }
      
      const responseData = await response.json()

      pageVal.value = responseData
    }

    getData()
  
    
    return {
      curimg,
      story,
      type,
      popular,
      getStoryLink,
      picture,
      markClass,
      changePicture,
      isLoading
    }

  }
}
</script>

<style scoped>
.loding {
  height: 100vh !important;
}
</style>