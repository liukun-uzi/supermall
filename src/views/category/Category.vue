<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <tab-menu :categories="categories"
              @itemClick="selectItem"></tab-menu>
      <scroll id="tab-content" :data="[categoryData]" ref="scroll">
        <div>
          <tab-content-category :subcategories="showSubcategory" @contentImgLoad="contentImgLoad"></tab-content-category>
          <tab-control :titles="['综合', '新品', '销量']"
                       @tabClick="tabClick"></tab-control>
          <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import TabControl from 'components/content/tabControl/TabControl'
  
  import TabMenu from './childComps/TabMenu'
  import TabContentCategory from './childComps/TabContentCategory'
  import TabContentDetail from './childComps/TabContentDetail'
  
  import {getCategory, getSubcategory, getCategoryDetail} from 'network/category'
  import {tabControlMixin} from "common/mixin";
  import {debounce} from 'common/utiles'
  

  export default {
    name: "Category",
    components: {
      NavBar,
      TabMenu,
      Scroll,
      TabContentCategory,
      TabControl,
      TabContentDetail
    },
    mixins: [tabControlMixin],
    data() {
		  return {
		    categories: [],
        categoryData: {
        },
        currentIndex: -1
      }
    },
    created() {
		  // 1.请求分类数据
      this.getCategory()
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
    activated() {
      this.$refs.scroll.refresh()
    },
    diactivated() {
      this.$bus.$off('itemImageLoad', this.itemImageListener)
    },
    computed: {
      showSubcategory() {
		    if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
      showCategoryDetail() {
		    if (this.currentIndex === -1) return []
		    return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    
    methods: {
      getCategory() {
        getCategory().then(res => {
          // 1.获取分类数据
          this.categories = res.data.category.list
          for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          this.getSubcategories(0)
        })
      },
      getSubcategories(index) {
        this.currentIndex = index
        const mKey = this.categories[index].maitKey
        getSubcategory(mKey).then(res => {
          this.categoryData[index].subcategories = res.data
          this.categoryData = {...this.categoryData}
          this.getCategoryDetail('pop')
          this.getCategoryDetail('sell')
          this.getCategoryDetail('new')
        })
      },
      getCategoryDetail(type) {
		    // 1.获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        // 2.发送请求,传入miniWallkey和type
		    getCategoryDetail(miniWallkey, type).then(res => {
		      // 3.将获取的数据保存下来
		      this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },
      selectItem(index) {
        this.getSubcategories(index)
      },
      contentImgLoad() {
        this.$refs.scroll.refresh()
      }
    }
  }
</script>

<style scoped>
  #category {
    height: 100vh;
  }

  .nav-bar {
    position: relative;
    z-index: 9;
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }
  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    display: flex;
  }
  #tab-content {
    height: 100%;
    flex: 1;
  }
</style>