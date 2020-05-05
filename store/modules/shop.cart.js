const state = () => ({
  list: [], // 购物车商品 [{prod: {}, count:1}]
  count: 0, // 商品类型个数
  num: 0, // 商品个数
  price: 0 // 商品总价格
})

const mutations = {
  /**
   * 初始化设置购物车
   * @param state
   * @param list
   */
  init(state, { list, count, num, price }) {
    if (list) {
      state.list = list
      state.count = count
      state.num = num
      state.price = price
    } else {
      state.count = -1
    }
  },
  /**
   * 加购物车
   * @param state
   * @param obj
   */
  add(state, obj) {
    const existItem = state.list.find((item) => {
      return item.prod.id === obj.prod.id
    })
    if (existItem) {
      existItem.count += obj.count
      state.count += obj.count
    } else {
      state.list.unshift(obj)
      state.count += obj.count
    }
  },
  /**
   * 从购物车中移除
   * @param state
   * @param obj
   */
  remove(state, obj) {
    const existItem = state.list.find((item) => {
      return item.prod.id === obj.prod.id
    })
    if (existItem) {
      if (existItem.count <= obj.count) {
        state.list.splice(state.list.indexOf(existItem), 1)
        state.count -= existItem.count
      } else {
        existItem.count -= obj.count
        state.count -= obj.count
      }
    }
  }
}

const actions = {
  async GET_COUNT({ commit }, ctx) {
    const udid = ctx.app.$cookies.get('udid')
    if (udid) {
      const { data } = await ctx.$axios.post('/portal/api/web/v1/omsCartItem/queryNumber', { udid })
      if (data) {
        commit('init', { count: data, list: [] })
      }
    }
  },
  /**
   * 获取购物车列表
   * @param state
   * @param obj
   */
  async GET_LIST({ commit }, ctx) {
    // 用户购物车
    const addr = ctx.$cookies.get('address')
    const addrCode = addr.streetCode || addr.districtCode || addr.cityCode || addr.provinceCode
    const cart = ctx.$axios.post('/portal/api/web/v1/omsCartItem/query', {
      deliveryAddrCode: addrCode
    })
    let resultList = []
    try {
      const promiseList = [cart]
      resultList = await Promise.all(promiseList)
    } catch (e) {
      console.log('页面数据加载错误：' + e)
    }
    const cartArr = resultList[0].data
    let arr = []
    if (cartArr.length > 0) {
      cartArr.forEach((item) => {
        arr = arr.concat(item.omsCartItemList)
      })
    }
    let cartAllPrice = 0
    let cartAllNum = 0
    if (arr.length > 0) {
      arr.forEach((item) => {
        cartAllPrice = cartAllPrice + item.promotionPrice * item.productQuantity
        cartAllNum = cartAllNum + item.productQuantity
      })
    }
    commit('init', { count: arr.length, list: arr, num: cartAllNum, price: cartAllPrice })
  },
  /**
   * 将商品加入购物车
   * @param dispatch
   * @param ids
   * @param ctx
   * @return {Promise<void>}
   * @constructor
   */
  async ADD({ dispatch }, { row, ctx }) {
    try {
      const deliveryType = row.deliveryCode
      const subDeliveryType = row.freightPrice.list.filter(type => type.isDefalut === 'Y')[0].subDeliverType
      const param = {
        productId: row.id,
        productSkuId: row.skuId,
        quantity: 1,
        deliveryType,
        subDeliveryType
      }
      await ctx.$axios.post(`/portal/api/web/v1/omsCartItem/batchAdd`, param)
      dispatch('GET_LIST', ctx)
    } catch (e) {
      console.error('从购物车中移除失败')
    }
  },
  /**
   * 从购物车中删除商品
   * @param dispatch
   * @param ids
   * @param ctx
   * @return {Promise<void>}
   * @constructor
   */
  async REMOVE({ dispatch }, { ids, ctx }) {
    try {
      await ctx.$axios.post('/portal/api/web/v1/omsCartItem/delete', { ids })
      dispatch('GET_LIST', ctx)
    } catch (e) {
      console.error('从购物车中移除失败')
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
