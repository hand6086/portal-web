const state = () => ({
  firsenav: null,
  lastnav: null
})

const mutations = {
  /**
   * 初始化列表
   * @param state
   * @param list
   */
  setFirsenav(state, list) {
    if (list) {
      state.firsenav = list
    }
  },
  /**
   * 初始化列表
   * @param state
   * @param list
   */
  setLastnav(state, list) {
    if (list) {
      state.lastnav = list
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
  async GET_NAV({ commit }, ctx) {
    // 动态导航一级菜单数据获取
    /* const primaryNav = this.$axios.get('/portal/api/web/v1/smsHomeModels/').then((data) => {
      if (data.data) {
        return data
      } else {
        return { data: [] }
      }
    }).catch((e) => {
      return { data: [] }
    }) */
    // 动态导航二三级菜单数据获取
    const nextNav = this.$axios.get('/portal/api/action/portal/productNav/queryAll').then((data) => {
      // console.log(data)
      if (data.data) {
        return data
      } else {
        return { data: [] }
      }
    }).catch((e) => {
      return { data: [] }
    })
    let resultList = []
    try {
      const promiseList = [nextNav]
      resultList = await Promise.all(promiseList)
    } catch (e) {
      console.log('页面数据加载错误：' + e)
    }
    commit('setFirsenav', [])
    commit('setLastnav', resultList[0].data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
