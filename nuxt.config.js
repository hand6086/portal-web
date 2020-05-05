const customRouter = require('./custom.router')
module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    // 'element-ui/lib/theme-chalk/index.css',
    '@/assets/styles/element_theme/index.css',
    '@/assets/styles/main.scss'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '@/plugins/element-ui', ssr: true },
    '@/plugins/axios'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // 服务端获取cookie
    'cookie-universal-nuxt'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true // Can be also an object with default options
  },

  proxy: {
    '/portal/api': {
      logLevel: 'debug',
      target: 'http://47.105.146.145',
      // target: 'http://testapi.quanyou.com.cn',
      // target: 'http://192.168.99.136:7002',
      changeOrigin: true,
      pathRewrite: {
        // '^/portal/api/web': '/app',
        '^/portal/api': '/portal'
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    styleResources: {
      scss: './assets/styles/main.scss'
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  /**
   * 配置额外路由，适配前端.html后缀
   */
  router: {
    extendRoutes(routes, resolve) {
      customRouter.forEach((item) => {
        item.component = resolve(__dirname, item.component)
        routes.push(item)
      })

      /* routes.push({
        name: 'error.html',
        path: '/error.html',
        component: resolve(__dirname, 'pages/error/index.vue')
      }) */
    }
  }
}
