<template>
  <div class="results">
    <div class="results__content">
      <div class="results__block"></div>
      <div class="results__cardBox">
        <h2 class="results__title results__title--1">熱門景點</h2>
        <ul class="results__marks">
          <li>夜市</li>
          <li>中壢區</li>
        </ul>

        <ul class="results__cards">
          <card-item
          v-for="select in selected"
          :key="select.ID"
          :name="select.Name"
          :address="select.Address"
          :phone="select.Phone"
          :picture="select.Picture.PictureUrl1"
          >
          </card-item>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import CardItem from '../components/CardItem.vue'
export default {
  props: ['selected'],
  components: {
    CardItem
  }
}
</script>