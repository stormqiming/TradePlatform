import { reqGetSearchInfo } from '@/api/index.js'
// search模块的小仓库
// state:仓库存储数据的地方
const state = {
    //存储搜索模块的数据
    searchList: {}
};
// mutations:修改state的唯一手段
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
    }
};
// action:处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    // 获取search模块数据
    async getSearchList({ commit }, params = {}) {
        // 当前这个reqGetSearchInfo这个函数在调用获取服务器数据的时候，至少传递一个参数(空对象)
        // params形参：是当用户派发action的时候，第二个参数传递过来，至少是一个空对象
        let result = await reqGetSearchInfo(params);
        if (result.code === 200) {
            commit('GETSEARCHLIST', result.data);
        }
    }
};
// getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便(简化数据而生)
// 可以把我们将来在组件中需要用的数据简化一下
const getters = {
    // 当前形参state是，当前仓库中的state,并非大仓库中的那个state
    goodsList(state) {
        // state.searchList.goodsList如果服务器数据回来了，没问题是一个数组
        // 假如没有网，返回的是undefined,所以，计算新的属性的属性值至少给来一个数组
        return state.searchList.goodsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList
    },
    attrsList(state) {
        return state.searchList.attrsList
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}