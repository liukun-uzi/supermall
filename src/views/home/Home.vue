<template>
  <div class="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control" v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll" 
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true" 
            @pullingUp="loadMore">
    <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends" @remImageLoad="remImageLoad" />
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']" 
       @tabClick="tabClick"
       ref="tabControl2"/>
      <goods-list :goods="showGoods"/>  
    </scroll>  
      
    <!-- 监听组件点击 必须要加修饰符.native -->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'


  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import {getHomeMultidata, getHomeGoods} from 'network/home'
  import {debounce} from 'common/utiles'

  export default {
    name: 'Home',
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {
            page:0,
            list: []
          },
          'new': {
            page:0,
            list: []
          },
          'sell': {
            page:0,
            list: []
          }
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      // 请求首页的数据
      this.getHomeMultidata();
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      //图片加载完成的事件监听
      const refresh = debounce(this.$refs.scroll.refresh, 50)
      //对监听的事件进行保存
      this.itemImageListener = () => {
        refresh()
      }
      this.$bus.$on('itemImageLoad', this.itemImageListener)
    },
    //活跃状态
    activated() {
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
    },
    // 离开状态
    deactivated() {
      //保存我们的y值
      this.saveY = this.$refs.scroll.getScrollY()
      //取消全局事件的监听
      this.$bus.$off('itemImageLoad',this.itemImageListener)
    },
    methods: {
      //事件监听
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2: 
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      // 获取轮播图和推荐数据
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page +1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          this.$refs.scroll.finishPullUp()
          // this.$refs.scroll && this.$refs.scroll.scroll.refresh()
        })
      },
      // 监听回到顶部的显示和隐藏
      contentScroll(position) {
        //判断backTop是否显示
        this.isShowBackTop = (-position.y) > 1000
        //决定tabcontrol是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      // 回到顶部按钮点击
      backClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      // 加载更多
      loadMore() {
        this.getHomeGoods(this.currentType)
        // 解决badscroll里面的上拉加载不能上滑bug
        this.$refs.scroll.refresh()
      },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        console.log(this.tabOffsetTop);
      },
      remImageLoad() {
         this.swiperImageLoad()
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
   .tab-control {
    position: relative;
    z-index: 9; 
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>