<template>
  <section class="story">
    <div class="story__container">
      <h1 class="story__title">{{ story.Name }}</h1>
      <div class="story__imgs">
        <img :src="story.Picture.PictureUrl1">
      </div>
      <div class="story__content">
        <div class="story__info">
          <div class="story__info--description">
            <h2 v-if="type == 'restaurant'">美食資訊</h2>
            <h2 v-else-if="type == 'hotel'">觀光資訊</h2>
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
              <span>暫無地址資訊</span>
            </div>
          </div>
          <div class="story__info--keyword">
            <h2>關鍵字標籤</h2>
            <div v-if="story.Class">
              <button>{{ story.Class }}</button>
            </div>
            <p v-else>暫無關鍵字標籤</p>
          </div>
        </div>
        <div class="story__side">
          <div class="story__side--map">
            <img src="@/assets/img/food.jpg" alt="">
          </div>
          <div class="story__side--hot">
            <h2>熱門景點</h2>
            <ul>
              <li>
                <img src="@/assets/img/food.jpg" alt="">
                <h3>正紀中崎本舖</h3>
              </li>
              <li>
                <img src="@/assets/img/food.jpg" alt="">
                <h3>正紀中崎本舖</h3>
              </li>
              <li>
                <img src="@/assets/img/food.jpg" alt="">
                <h3>正紀中崎本舖</h3>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
export default {
  props: ['storyId'],
  setup(props) {
    const store = useStore()
    const route = useRoute()
    const story = computed(() => store.getters.restaurant.find(item => item.ID === props.storyId))
    const type = computed(() => route.query.type)

    console.log(store.getters.restaurant)
    
    return {
      story,
      type
    }

  }
}
</script>