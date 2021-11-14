<template>
  <li class="card">
    <!-- <div class="card__heart">
      <i class="far fa-heart"></i>
    </div> -->
    <router-link :to="storyDetailsLink">
      <div class="card__pic" v-if="picture">
        <img :src="picture" alt="card" @error="$event.target.src='https://redthread.uoregon.edu/files/original/affd16fd5264cab9197da4cd1a996f820e601ee4.png'">
      </div>
      <div class="card__content">
        <div class="card__title">
          <h2>{{ name }}</h2>
          <div class="card__phone">
            <i class="fas fa-phone-alt"></i>
            <span v-if="phone">{{ phone }}</span>
            <span v-else>暫無電話資訊</span>
          </div>
        </div>
        <div class="card__address">
          <i class="fas fa-map-marker-alt"></i>
          <p v-if="address">{{ address }}</p>
          <p v-else>暫無地址資訊</p>
        </div>
      </div>
    </router-link>
  </li>
</template>

<script>
import { toRefs, computed } from 'vue'
export default {
  props: ['id', 'name', 'address', 'phone', 'picture', 'type'],
  setup(props) {
    const { id, type } = toRefs(props)

    const storyDetailsLink = computed(() => `/stories/${id.value}?type=${type.value}`)

    return {
      storyDetailsLink
    }
  }
}
</script>

