<template>
  <li class="card">
    <div class="card__pic">
      <img :src="picture" alt="card">
    </div>
    <div class="card__heart">
      <i class="far fa-heart"></i>
    </div>
    <div class="card__content">
      <div class="card__title">
        <h2>{{ name }}</h2>
        <div class="card__phone" v-if="phone">
          <i class="fas fa-phone-alt"></i>
          <span>{{ phone }}</span>
        </div>
      </div>
      <div class="card__address">
        <i class="fas fa-map-marker-alt"></i>
        <p>{{ address }}</p>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: ['name', 'address', 'phone', 'picture']
}
</script>

