const state = () => ({
  logoUrl: ''
})
const mutations = {
  /**
   * 初始化数据
   */
  setLogo(state, logoUrl) {
    if (logoUrl) {
      state.logoUrl = logoUrl
    }
  }
}

const actions = {
  /**
   * 查询页面上需要服务器端渲染的图标图片
   * @param wangyue
   * @return
   * @constructor
   */
  async GET_LOGO({ commit }, ctx) {
    const { data } = await ctx.$axios.get('/portal/api/action/portal/homeManage/smsHomeLogo')
    commit('setLogo', data.pic)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
