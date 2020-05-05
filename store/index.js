import Vuex from 'vuex'
import shopCart from './modules/shop.cart'
import user from './modules/user'
import logo from './modules/logo'
import address from './modules/address'
import guessLike from './modules/guess.like'
import headerFooter from './modules/header.footer'
import nav from './modules/nav'
import region from './modules/region'
import adv from './modules/adv'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      imgServer: '',
      baiduMapAPI: '//api.map.baidu.com/api?v=2.0&ak=dmvfGri1HZgfjP7K8COtNDoeruybyM0w'
      // env: process.env.NODE_ENV
    }),
    modules: {
      shopCart,
      user,
      logo,
      address,
      region, // 行政区域，使用的页面自行初始化
      guessLike, // 使用的页面自行获取
      headerFooter,
      nav,
      adv
    },
    actions: {
      /**
       * 每个页面都会调用的初始化方法
       * @param dispatch
       * @param ctx
       * @return {Promise<void>}
       */
      async nuxtServerInit({ dispatch }, ctx) {
        const promiseList = []
        promiseList.push(dispatch('user/GET_USER', ctx))
        promiseList.push(dispatch('shopCart/GET_COUNT', ctx))
        promiseList.push(dispatch('logo/GET_LOGO', ctx))
        promiseList.push(dispatch('address/GET_ADDRESS', ctx))
        await Promise.all(promiseList)
      }
    }
  })
}
export default createStore
