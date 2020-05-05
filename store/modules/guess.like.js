const state = () => ({
  list: null
})

const mutations = {
  /**
   * 初始化列表
   * @param state
   * @param list
   */
  setList(state, list) {
    if (list) {
      state.list = list
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
  GET_LIST({ commit }, ctx) {
    /* const { data } = await this.$axios.get('/portal/api/web/v1/pmsProduct/guessYouLike').then((data) => {
      return data
    }).catch((e) => {
      return { data: [] }
    }) */
    commit('setList', [])
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
