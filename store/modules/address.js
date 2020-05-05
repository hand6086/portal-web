const state = () => ({
  address: {} // 用户地址
})

const mutations = {
  setAddress(state, address) {
    if (address) {
      state.address = address
    }
  }
}

const actions = {
  /**
   * 当本地未保存配送地址时，获取地址，并保存在cookie中
   * @param commit
   * @param ctx
   * @returns {Promise<void>}
   * @constructor
   */
  GET_ADDRESS({ commit }, ctx) {
    const address = ctx.app.$cookies.get('address')
    if (!address) {
      const { data } = {
        'province': '四川省',
        'city': '成都市',
        'district': '青羊区',
        'address': '成飞大道189号',
        'provinceCode': '510000000000',
        'cityCode': '510100000000',
        'districtCode': '510105000000',
        'streetCode': '510105009000',
        'street': '光华街道',
        'lng': '103.96863009469124',
        'lat': '30.689064550639619'
      }
      // await ctx.$axios.get(`/portal/api/web/v1/region/address`)
      if (data) {
        ctx.app.$cookies.set('address', data)
        commit('setAddress', data)
      }
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
