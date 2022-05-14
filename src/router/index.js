// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.js'
// 引入store
import store from '@/store/index.js'
// 使用插件
Vue.use(VueRouter);
// 先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
    // 重写push|replace
    // 第一个参数：告诉原来push方法，你往哪里跳转(传递那些参数)
VueRouter.prototype.push = function(location, resolve, reject) {
    if (resolve && reject) {
        // call|apply相同点：都可以调用函数一次，都可以改变函数上下文一次
        // call|apply不同点：传递参数：call传递参数用逗号隔开，apply方法执行传递数组
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => {}, () => {})
    }
}
VueRouter.prototype.replace = function(location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, resolve, reject)
    }
}

// 配置路由
let router = new VueRouter({
    // 配置路由
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
});

// 全局前置守卫(在路由跳转之前进行判断)
router.beforeEach(async(to, from, next) => {
    // to:可以获取到你要跳转到那个路由信息
    // from:可以获取到你从那个路由来的
    // next:放行函数


    // 用户登录了，才会有token，未登录，一定不会有token
    let token = store.state.user.token;
    // 用户信息
    let name = store.state.user.userInfo.name;
    if (token) {
        // 用户已经登录了，还想去login(不放行,停留在首页)
        if (to.path == '/login') {
            next('/home');
        } else {
            // 登录了，但去的不是login
            // 如果用户名已有
            if (name) {
                next();
            } else {
                // 没有用户信息，派发action让仓库存储用户信息再跳转
                try {
                    // 获取用户信息成功
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    // token失效了，获取不到用户信息，重新登录
                    // 清除token
                    await store.dispatch('userLogOut');
                    next('/login')
                }
            }
        }
    } else {
        // 未登录:不能去交易相关，不能去支付相关【pay|paysuccess】，不能去个人中心
        // 未登录去上面这些路由---重定向到登录
        // 去的不是上面这些路由【home|search\shopcart】---放行
        let toPath = to.path;
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            // 把未登录的时候想去没有去成的信息，存储与地址栏中【路由】
            next('/login?redirect=' + toPath);
        } else {
            next();
        }

    }
});

export default router