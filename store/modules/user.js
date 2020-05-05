const state = () => ({
  user: {}, // 用户对象
  nickname: '', // 用户昵称
  username: '', // 用户名
  birthday: '', // 生日
  phone: '' // 手机号
})

const mutations = {
  /**
   * 初始化设置购物车
   * @param state
   * @param list
   */
  setUser(state, user) {
    if (user) {
      state.nickname = user.nickname
      state.username = user.username
      state.birthday = user.birthday
      state.phone = user.phone
      state.user = user
    }
  }
}

const actions = {
  /**
   * 查询当前登录用户
   * @param commit
   * @return {Promise<void>}
   * @constructor
   */
  GET_USER({ commit }, ctx) {
    const { data } = {
      nickname: '昵称', // 用户昵称
      username: '用户名', // 用户名
      birthday: '19940213', // 生日
      phone: '13512345678' // 手机号
    } // await ctx.$axios.get('/portal/api/web/v1/umsMember/currentUmsMember')
    commit('setUser', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
