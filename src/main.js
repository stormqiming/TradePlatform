import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router/index.js'
// 三级联动的组件---全局组件
import TypeNav from '@/components/TypeNav/index.vue'
import Carousel from '@/components/Carousel/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import { MessageBox } from 'element-ui'
// 第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);
// 引入仓库
import store from '@/store/index.js'
// 引入mockServe.js---mock数据
import '@/mock/mockServe.js'
// 引入swiper样式
import 'swiper/css/swiper.css'

// 统一接收接口api文件夹里面全部请求函数
// 统一引入
import * as API from '@/api/index.js'

// ElementUI注册组件的时候,还有一种写法,挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

new Vue({
    render: h => h(App),
    // 全局事件总线$bus配置
    beforeCreate() {
        Vue.prototype.$bus = this
        Vue.prototype.$API = API
    },
    // 注册路由,底下的写法KV一致省略V【router小写的】
    // 注册路由信息：当这里书写router的时候，组件身上都拥有$route,$router属性
    // $route:一般获取路由信息【路径，query,params等等】
    // $router:一般进行编程式导航进行路由跳转【push|replace】
    router,
    // 注册仓库:组件实例身上会多了一个属性$store
    store
}).$mount('#app')