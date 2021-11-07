<template>
  <div class="inputSearch">
    <input type="search" @input="search" :value="searchTerm" placeholder="請輸入關鍵字" />
  </div>
</template>

<script>
export default {
  props: ['searchTerm'],
  emits: ['search'],
  setup(_,context) {

    function search(event) {
      context.emit('search', event.target.value);
    }

    return { search }
  }
};
</script>
