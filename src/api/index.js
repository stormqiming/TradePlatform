// 当前的这个模块：API进行统一管理
import requests from './request.js'
import mockRequest from './mockAjax'

// 三级联动的接口
///api/product/getBaseCategoryList get请求，无参数
// 发请求:axios发请求，返回结果是Promise对象
export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' });

// 获取banner(Home首页轮播图接口)
export const reqGetBannerList = () => mockRequest({ url: '/banner', method: 'get' });
// 获取floor数据
export const reqFloorList = () => mockRequest({ url: '/floor', method: 'get' });

// 获取搜索模块数据 地址：/api/list  请求方式：post  参数：需要带参数
// 当前这个接口，给服务器传递参数params，至少是一个空对象
export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params })

// 获取产品详情信息的接口 URL:/api/item/{skuId} 请求方式:get
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' })

// 将产品添加到购物车中(更新某一个产品的个数)
// api/cart/addToCart/{skuId}/{skuNum}
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

// 获取购物车列表数据的接口
// URL:/api/car/cartlist method:'get'
export const reqCartList = () => requests({ url: '/car/cartlist', method: 'get' })