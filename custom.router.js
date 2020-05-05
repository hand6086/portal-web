/**
 * 自定义路由配置，由于默认路由不能带.html后缀，这里相当于多定义一次可带.html后缀的路由
 */
const error = [
  {
    // 错误页
    name: '404.html',
    path: '*',
    component: 'pages/404/index.vue'
  }
]
module.exports = [
  // 首页
  {
    name: 'index.html',
    path: '/index.html',
    component: 'pages/index.vue'
  },
  {
    // 列表页
    name: 'list.html',
    path: '/list.html',
    component: 'pages/list/index.vue'
  },
  ...error
]
