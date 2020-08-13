<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref=scroll
    @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo"
      @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="param" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <detail-recommend-info ref="recommend"  :recommend-list="recommends"></detail-recommend-info>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top class="back-top" v-show="isShowBackTop" @click.native="backClick"></back-top>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailRecommendInfo from './childComps/DetailRecommendInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
 
  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";
  import {debounce} from 'common/utiles'

  import {itemListenerMixin, backTopMixin} from 'common/mixin'
  import {mapActions} from 'vuex'


  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailRecommendInfo,
      Scroll,
      DetailBottomBar
    },
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],

        themeTopY: [],

      }
    },
    created() {
      //保存传入的iid
      this.iid = this.$route.params.iid
      getDetail(this.iid).then(res => {
        // 1.获取顶部的图片轮播数据
        const data = res.result;
        this.topImages = data.itemInfo.topImages
         // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)
        // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo
        // 5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        //6.获取评论的信息
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      }),
      getRecommend().then((res, err) => {
        if(err) return
        this.recommends = res.data.list
      })
      //4.给getThemeTopY赋值
      this.getThemeTopY = debounce(() => {

        this.themeTopY.push(0)
        this.themeTopY.push(this.$refs.param.$el.offsetTop)
        this.themeTopY.push(this.$refs.comment.$el.offsetTop)
        this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopY.push(Number.MAX_VALUE)

      },50) 

    },
    methods: {
      ...mapActions(['addCart']),
      imageLoad() {
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      contentScroll(position) {
        this.isShowBackTop = (-position.y) > 1000;
        const positionY = -position.y 
        let length = this.themeTopY.length
        for(let i=1; i<this.themeTopY.length - 1; i++) {
          if(this.currentIndex !== i && (positionY >= this.themeTopY[i] && positionY < this.themeTopY[i+1])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 300)
      },
      addToCart() {
        const obj = {}
        obj.iid = this.iid
        obj.imgURL = this.topImages[0]
        obj.title = this.goods.title
        obj.desc = this.goods.desc;
        obj.newPrice = this.goods.nowPrice;
        // 将商品添加到购物车里
        this.addCart(obj).then(res => {
          this.$toast.show(res, 1500)
        })
        // this.$store.dispatch('addCart', obj).then(res => {

        // })

      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    position: absolute;
    top: 44px;
    bottom: 60px;
    left: 0;
    right: 0;
  }
  .back-top {
    position: fixed;
    right: 10px;
    bottom: 65px;
  }
</style>