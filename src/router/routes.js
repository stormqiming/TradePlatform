    // 引入路由组件
    import Home from '@/pages/Home/index.vue'
    import Search from '@/pages/Search/index.vue'
    import Login from '@/pages/Login/index.vue'
    import Register from '@/pages/Register/index.vue'
    import Detail from '@/pages/Detail/index.vue'
    import AddCartSuccess from '@/pages/AddCartSuccess/index.vue'
    import ShopCart from '@/pages/ShopCart/index.vue'
    // 路由配置信息
    export default [
        // 重定向：在项目跑起来的时候，访问'/'，立马让他重定向到首页
        { path: '/', redirect: '/home' },
        { path: '/home', component: Home, meta: { show: true } },
        {
            path: '/search/:keyword?',
            component: Search,
            meta: { show: true },
            name: 'search',
            // 路由组件能不能传递props数据？
            // 1.布尔值写法:params
            // props: true
            // 2.对象写法
            // props: { a: 1, b: 2 }
            // 3.函数写法：可以把params,query参数，通过props传递给路由组件
            props: ($route) => ({
                keyword: $route.params.keyword,
                k: $route.query.k
            })
        },
        { path: '/login', component: Login, meta: { show: false } },
        { path: '/register', component: Register, meta: { show: false } },
        { path: '/detail/:skuId', component: Detail, meta: { show: true } },
        { path: '/addcartsuccess', component: AddCartSuccess, meta: { show: true }, name: 'addcartsuccess' },
        { path: '/shopcart', component: ShopCart, meta: { show: true } }
    ]