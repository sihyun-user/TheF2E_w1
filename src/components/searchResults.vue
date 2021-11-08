<template>
  <div class="results">
    <div class="results__content">
      <div class="results__block"></div>
      <div class="results__cardBox">
        <div class="results__titleBox">
          <h2 v-if="selectedType === '觀光'" class="results__title results__title--1">熱門景點</h2>
          <h2 v-else-if="selectedType === '美食'" class="results__title results__title--2">必吃美食</h2>
          <h2 v-else class="results__title results__title--3">優質住宿</h2>
        </div>

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
  
        <p v-if="selected.length == 0" class="results__error">沒有搜尋到任何東西，請再重新搜尋</p>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, toRefs, watch } from 'vue'
import CardItem from '../components/CardItem.vue'
export default {
  props: ['selected', 'type'],
  components: {
    CardItem,
  },
  setup(props) {
    const { selected, type } = toRefs(props)
    const selectedType = ref('美食')


    watch(selected, () => {
      selectedType.value = type.value
    })

    return {
      selectedType
    }
  }
}
</script>