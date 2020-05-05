/**
 * 校验udid是否为空，空则从服务端获取
 */
export default {
  mounted() {
    console.log('check udid')
    const cookieName = 'udid'
    if (this.$cookies) {
      if (!this.$cookies.get(cookieName)) {
        this.$axios.post('/portal/api/web/v1/umsMember/udid').then((resp) => {
          if (resp.success === 1) {
            // this.$cookies.set(cookieName, resp.data)
          }
        })
      }
    }
  }
}
