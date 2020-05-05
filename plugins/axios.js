import qs from 'qs'

export default function({ $axios, redirect, app, route, error }, inject) {
  /* qs注入context.app, 以及vue实例 */
  app.$qs = qs
  inject('qs', qs)
  /**
   * 设置token
   */
  $axios.onRequest((config) => {
    config.timeout = 5000
    config.headers.terminalType = 'PC'
    config.withCredentials = true
    console.log('Making request to ' + config.url)
    return config
  })

  /**
   * 请求响应返回数据
   */
  $axios.onResponse((response) => {
    const res = response.data
    const status = parseInt(response.status) || 200
    const message = res.msg
    if (status !== 200) {
      console.error('Response status Error: ' + response.config.url)
      return Promise.reject(new Error(`网络请求异常${status}: ${message}`))
    } else if (res.success === 0) {
      if (res.code === '401') {
        redirect('/login.html')
        return res
      }
      console.error('Response Success Error: ' + response.config.url)
      return Promise.reject(new Error(res.msg))
    }
    return res
  })
  $axios.onError((e) => {
    const code = parseInt(e.response && e.response.status)
    if (code) {
      // redirect(302, '/error.html', { referrer: route.fullPath })
      console.error('Making request error ' + code + ': ' + e.response.config.url)
      console.error(e.response.data)
      if (code === 500) {
        error({ statusCode: code, message: 'Making request error: ' + e })
      }
    }
    console.error('Making request error: ' + e)
  })
}
