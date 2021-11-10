<template>
  <section class="story">
    <div class="story__banner">
      <h1 class="story__title">{{ story.Name }}</h1>
      <div class="story__imgs">
        <ul>
          <li v-for="(pic, index) in picture" :key="index" v-show="index == curimg">
            <img :src="story.Picture[pic]">
          </li>
        </ul>
        <button class="story__imgs-btn story__imgs-btn--prev" @click="changePicture(-1)">
          <i class="fas fa-chevron-left"></i>
        </button>
        <button class="story__imgs-btn story__imgs-btn--next" @click="changePicture(+1)">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
    <div class="story__container">
      <div class="story__content">
        <div class="story__info">
          <div class="story__info--description">
            <h2 v-if="type == 'restaurant'">美食資訊</h2>
            <h2 v-else-if="type == 'hotel'">住宿資訊</h2>
            <h2 v-else>觀光資訊</h2>

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
            <div v-if="story.Class">
              <button>{{ story.Class }}</button>
            </div>
            <div v-if="story.Class1">
              <button>{{ story.Class1 }}</button>
              <button v-if="story.Class2">{{ story.Class2 }}</button>
              <button v-if="story.Class3">{{ story.Class3 }}</button>
            </div>
            <p v-else>暫無關鍵字標籤</p>
          </div>
        </div>
        <div class="story__side">
          <div class="story__side--map" ref="mapDivRef"></div>
          <div class="story__side--hot">
            <div class="story__side--hot-title">
              <h2 v-if="type == 'restaurant'">熱門美食</h2>
              <h2 v-else-if="type == 'hotel'">熱門住宿</h2>
              <h2 v-else>熱門景點</h2>
            </div>
            <ul>
              <li v-for="pop in popular" :key="pop.ID">
                <router-link to="" @click="getStoryLink(pop.ID)">
                  <img :src="pop.Picture.PictureUrl1">
                  <h3>{{ pop.Name }}</h3>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter ,onBeforeRouteUpdate } from 'vue-router'
import { RADOM_NUMBER } from '../config.js';
export default {
  props: ['storyId'],
  setup(props) {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const map = ref(null)
    const marker = ref(null)
    const mapDivRef = ref(null)
    const curimg = ref(0)

    const scenicSpot = computed(() => store.getters.scenicSpot)
    const restaurant = computed(() => store.getters.restaurant)
    const hotel = computed(() => store.getters.hotel)

    const type = computed(() => route.query.type)

    const story = computed(() => {
      let story = []
      if(type.value == 'restaurant') {
        story = restaurant.value.find(item => item.ID === props.storyId)
      }else if(type.value == 'hotel'){
        story = hotel.value.find(item => item.ID === props.storyId)
      }else {
        story = scenicSpot.value.find(item => item.ID === props.storyId)
      }

      return story
    })

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
    
    const position = computed(() => {
      let pos = {
        lat: story.value.Position.PositionLat,
        lng: story.value.Position.PositionLon
      }

      return pos
    })
    
    const popular = computed(() => {
      let popular = []
      if(type.value == 'restaurant') {
        popular = getPopular(restaurant.value)
      }else if(type.value == 'hotel'){
        popular = getPopular(hotel.value)
      }else {
        popular = getPopular(scenicSpot.value)
      }

      return popular
    })
    
    // 隨機抽取5個熱門項目
    function getPopular(type) {
      let num = 5
      let radom = []
      for (let i = 0; i < RADOM_NUMBER ; i++) {
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

    function changePicture(num) {
      curimg.value += num

      console.log(curimg.value)
    }

    function getStoryLink(id) {
      router.push(`/stories/${id}?type=${type.value}`)
    }

    onBeforeRouteUpdate(() => {})
    
    function initMap() {
      map.value = new window.google.maps.Map(mapDivRef.value, {
        zoom:  16,
        mapTypeId: 'terrain',
        center: position.value,
        disableDefaultUI: false,
      })

      marker.value = new window.google.maps.Marker({
        position: position.value,
        map: map.value
      })
    }

    onMounted(() => {
      initMap(mapDivRef.value)
    })
    
    return {
      curimg,
      mapDivRef,
      story,
      type,
      popular,
      getStoryLink,
      picture,
      changePicture
    }

  }
}
</script>