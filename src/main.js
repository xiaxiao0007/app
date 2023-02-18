import Vue from 'vue'
import App from './App.vue'
// 三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
// 第一个参数：全局组件的名字 第二个参数：那一个组件; 注册全局组件
Vue.component(TypeNav.name,TypeNav);
Vue.component(Carousel.name,Carousel);
Vue.component(Pagination.name,Pagination)

// 引入MockServer.js----mock数据
import '@/mock/mockServe'

// 引入Swiper样式
import "swiper/css/swiper.css";

// 引入配置的路由
import router from '@/router';

// 引入仓库
import store from '@/store'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 注册全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this;
  }
  ,
  // 注册路由
  router:router,
  // 注册仓库：vc上有$store属性
  store:store
}).$mount('#app')
