import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import VueLazyload from 'vue-lazyload'
Vue.config.productionTip = false
// 添加事件总线
Vue.prototype.$bus = new Vue()
Vue.use(toast)
Vue.use(VueLazyload,{
  loading: require('assets/img/common/placeholder.png')
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
