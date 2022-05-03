import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api/index.js'
// 封装游客身份模块uuid--->生成一个随机字符串(不能再变了)
import { getUUID } from '@/utils/uuid_token.js'
const state = {
    goodInfo: {},
    // 游客的临时身份
    uuid_token: getUUID()
}
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }


}
const actions = {
    // 获取产品信息的action
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId)
        if (result.code === 200) {
            commit('GETGOODINFO', result.data)
        }
    },
    // 将产品添加到购物车中
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        // 加入购物车返回的结果
        // 加入购物车以后(发请求),前台将参数带给服务器
        // 服务器写入数据成功,并没有返回其他的数据,只是返回code=200,代表这次操作成功
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        // 当前的这个函数如果执行,返回Promise
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    }
};

// getters简化数据而生
const getters = {
    // 路径导航简化的数据
    categoryView(state) {
        // 比如state.goodInfo初始状态是一个空对象,空对象的categoryView这个属性值是undefined
        // 当前计算出的categoryView属性值至少是一个空对象,假的报错不会出现了
        return state.goodInfo.categoryView || {}
    },
    // 简化产品信息的数据
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    // 产品售卖属性的简化
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }
}

export {
    state,
    mutations,
    actions,
    getters
}