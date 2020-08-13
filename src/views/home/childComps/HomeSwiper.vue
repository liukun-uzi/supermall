<template>
  <swiper>
      <swiper-item :key="item.acm" v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
 import {Swiper, SwiperItem} from 'components/common/swiper'
export default {
  name: 'HomeSwiper',
  props:{
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isLoad: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoad() {
      if(!this.isLoad) {
        //发送第一次（总共有四次，第一次发送完了后面三次不发）
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  }
}
</script>