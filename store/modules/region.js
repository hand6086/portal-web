const state = () => ({
  address: [] // 所有行政地址
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
   * 获取所有行政区域地址并设置到store
   * @param commit
   * @param ctx
   * @returns {Promise<void>}
   * @constructor
   */
  async GET_ALL_REGION({ commit }, ctx) {
    const { data } = await ctx.$axios.get('/portal/api/web/v1/region/')
    if (data) {
      commit('setAddress', data)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
