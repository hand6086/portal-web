const state = () => ({
  hotwords: null,
  qrcode: null,
  servicelist: null,
  linklist: null,
  address: null
})

const mutations = {
  /**
   * 初始化搜索热词
   * @param state
   * @param list
   */
  setHotWords(state, list) {
    if (list) {
      state.hotwords = list
    }
  },
  /**
   * 初始化二维码
   * @param state
   * @param list
   */
  setQrCode(state, list) {
    if (list) {
      state.qrcode = list
    }
  },
  /**
   * 初始化服务保障
   * @param state
   * @param list
   */
  setServiceList(state, list) {
    if (list) {
      state.servicelist = list
    }
  },
  /**
   * 初始化文章链接
   * @param state
   * @param list
   */
  setLinkList(state, list) {
    if (list) {
      state.linklist = list
    }
  },
  /**
   * 初始化文章链接
   * @param state
   * @param list
   */
  setAddress(state, list) {
    if (list) {
      state.address = list
    }
  }
}

const actions = {
  /**
   * 查询主导航信息
   * @param commit
   * @return {Promise<void>}
   * @constructor
   */
  GET_DATA({ commit }, ctx) {
    /* // 热词搜索
    const hotWords = this.$axios.get('/portal/api/web/v1/smsSearchHotWord/').then((data) => {
      return data
    }).catch((e) => {
      return { data: { records: [] } }
    })
    // 获取二维码
    const qrCode = this.$axios.get('/portal/api/web/v1/smsQrCode/').then((data) => {
      return data
    }).catch((e) => {
      return { data: { records: [] } }
    })
    // 获取服务保障
    const serviceList = this.$axios.get('/portal/api/web/v1/smsHomeModService/').then((data) => {
      return data
    }).catch((e) => {
      return { data: { records: [] } }
    })
    // 获取文章链接
    const linkList = this.$axios.get('/portal/api/web/v1/smsHomeModHelp/').then((data) => {
      return data
    }).catch((e) => {
      return { data: { records: [] } }
    })
    // 地址定位数据获取
    const addressData = this.$axios.get('/portal/api/web/v1/umsMember/getLocation').then((data) => {
      return data
    }).catch((e) => {
      return { data: {} }
    })
    let resultList = []
    try {
      const promiseList = [hotWords, qrCode, serviceList, linkList, addressData]
      resultList = await Promise.all(promiseList)
      console.log(resultList)
    } catch (e) {
      console.log('页面数据加载错误：' + e)
    } */
    commit('setHotWords', [])
    commit('setQrCode', [])
    commit('setServiceList', [])
    commit('setLinkList', [])
    commit('setAddress', [])
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
