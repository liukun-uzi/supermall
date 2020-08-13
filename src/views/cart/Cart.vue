<template>
  <div class="home">
    <nav-bar class="navbar"><div slot="center">购物车({{cartLength}})</div></nav-bar>
    <cart-list></cart-list>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import cartList from './childComps/CartList'
  import {mapGetters} from 'vuex'

  export default {
    name: 'Cart',
    components: {
      NavBar,
      cartList
    },
    computed: {
      ...mapGetters(['cartLength']),
    },
    
  }
</script>

<style scoped>
  .navbar {
    position: relative;
    background-color: var(--color-tint);
    color: #fff;
    z-index: 9;
  }
</style>