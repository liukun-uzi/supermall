<template>
  <div class="goods">
    <goods-item v-for="item in goods" :key="item.index" :goods-item="item"/> 
  </div>
</template>

<script>

import GoodsItem from './GoodsItem'

  export default {
    name: 'GoodsList',
    props: {
      goods: {
          type: Array,
          default() {
          }
        }
    },
    components: {
      GoodsItem
    },

  }
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 0 2px 0;
  }
</style>