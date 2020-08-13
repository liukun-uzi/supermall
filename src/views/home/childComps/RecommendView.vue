<template>
  <div class="recommend">
    <div v-for="item in recommends" :key="item.acm" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="remImageLoad">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendView',
  props: {
    recommends: {
      type: Array,
      default() {
        recommends
      }
    },
  },
  data() {
    return {
      isLoad: false
    }
  },
  components: {

  },
  methods: {
   remImageLoad() {
     if(!this.isLoad) {
      this.$emit('remImageLoad')
      this.isLoad = true
     }
     
   }
 }
}
</script>

<style scoped>
  .recommend {
    display: flex;
    text-align: center;
    font-size: 12px;
    padding: 10px 0 20px;
    border-bottom: 8px solid rgb(236, 235, 235);
  }

  .recommend-item {
    flex: 1;
  }
  .recommend-item img {
    width: 90%;
    height: auto;
    margin-bottom: 5px;
  }
</style>