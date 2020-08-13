<template>
  <div>
    <scroll class="content" ref="scroll">
      <div>
        <cart-list-item v-for="(item, index) in cartList" :key="index" :item-info="item"></cart-list-item>
      </div>
    </scroll>
  <bottom-bar></bottom-bar>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  import CartListItem from './CartListItem'
  import BottomBar from './BottomBar'
  import {mapGetters} from 'vuex'
  import {debounce} from 'common/utiles'

	export default {
		name: "CartList",
    components: {
      Scroll, 
      CartListItem,
      BottomBar
    },
    computed: {
      ...mapGetters(['cartList']),
    },
    mounted() {
      //解决购物车再次点击better-scroll不能上滑bug
      const refresh = debounce(this.$refs.scroll.refresh(), 50)
      this.itemImageListener = () => {
        refresh()
      }
      this.$bus.$on('imgLoad', this.itemImageListener)
    },
    activated() {
      this.$refs.scroll.refresh()
    },
    diactivated() {
      this.$bus.$off('imgLoad', this.itemImageListener)
    }
	}
</script>

<style scoped>
  .content {
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 95px;
  }
</style>
