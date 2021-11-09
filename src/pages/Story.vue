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
            <h2>景點資訊</h2>
            <p>
              {{ story.Description }}
            </p>
          </div>
          <div class="story__info--details">
            <h2>詳細資訊</h2>
            <div v-if="story.OpenTime">
              <i class="fas fa-clock"></i>
              <span>{{ story.OpenTime }}</span>
            </div>
            <div>
              <i class="fas fa-phone-alt"></i>
              <span>{{ story.Phone }}</span>
            </div>
            <div>
              <i class="fas fa-map-marker-alt"></i>
              <span>{{ story.Address }}</span>
            </div>
          </div>
          <div class="story__info--keyword">
            <h2>關鍵字標籤</h2>
            <div>
              <button>{{ story.Class }}</button>
            </div>
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
export default {
  props: ['storyId'],
  setup(props) {
    const store = useStore()
    const story = computed(() => store.getters.restaurant.find(item => item.ID === props.storyId))
    
    return {
      story
    }

  }
}
</script>