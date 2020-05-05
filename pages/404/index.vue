<!--
错误页
@author yrf
@created 2019/10/10 16:05
-->
<template>
  <div class="main">
    <!--诶呀~，网站开小差了，我们正在批评教育，客官请稍后-->
    <img class="error-img" src="./img/img_404@2x.png">
    <div class="error-msg">Error,页面找不到啦! 请点击返回首页或者刷新页面重试~</div>
    <div class="error-btn-bar">
      <el-button @click="goHome">返回首页</el-button>
      <el-button type="primary" @click="refresh">刷新页面</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {}
  },
  head() {
    return {
      title: '404'
    }
  },
  methods: {
    goHome() {
      window.location.href = '/'
    },
    refresh() {
      if (this.$route.query.referrer) {
        window.location.href = this.$route.query.referrer
      } else {
        window.location.reload()
      }
    }
  }
}
</script>

<style scoped>
  .main{
    text-align: center;
  }
  .error-img{
    width: 440px;
    margin-top: 180px;
  }
  .error-msg{
    padding-top: 20px;
    font-size: 16px;
    color: #888888;
  }
  .error-btn-bar{
    margin-top: 60px;
  }
  .error-btn-bar .el-button{
    width: 140px;
    border-radius: 20px;
  }
</style>
