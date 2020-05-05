const state = () => ({
  adTop: {}, // 顶部广告位
  adHead: {}, // 头部广告位
  adBanner: {}, // 页面banner
  adNavigate: {}, // 导航菜单广告位
  adBottom: {}, // 底部广告
  adLogin: {}, // 登录背景
  adPosters: {}, // 小海报
  adFullHouse: {} // 全屋购结构图
})

const mutations = {
  /**
   * 初始化设置购物车
   * @param state
   * @param list
   */
  setAdv(state, adv) {
    if (adv) {
      Object.keys(adv).forEach((key) => {
        state[key] = adv[key]
      })
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
  async GET_ADV({ commit }, { list, ctx }) {
    const adv = {}
    const promiseList = []
    list.forEach((item) => {
      promiseList.push(ctx.$axios.post('/portal/api/web/v1/pmsAdvertisement/queryByLocationAndUrl', {
        url: item.url,
        locationCode: item.locationCode
      }))
    })
    const resultList = await Promise.all(promiseList)
    resultList.forEach((item) => {
      if (item.data.locationCode) {
        const key = item.data.locationCode.replace(/_(\w)/g, function(all, letter) {
          return letter.toUpperCase()
        })
        adv[key] = item.data
      }
    })
    commit('setAdv', adv)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
