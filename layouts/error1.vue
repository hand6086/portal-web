<!--
错误页，虽然在layouts目录，但应该看做一个page
@author yrf
@created 2019/11/02 15:54
-->
<!--
商品列表页面
@author zhaohuanling
@created 2019/10/12 10:32
-->
<template>
  <div class="error-container">
    <div class="left">
      <img src="../assets/images/error/img_500@2x.png">
    </div>
    <div class="right">
      <div class="status-title">500</div>
      <div class="comment">Sorry… 服务器开小差啦! 请点击重新加载~</div>
      <div class="reload" @click="reload">点击重新加载~</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error',
  data() {
    return {}
  },
  methods: {
    reload() {
      window.location.reload()
    }
  }
}
</script>

<style scoped lang="scss">
  .error-container{
    text-align: center;
    margin: 220px auto;
    width: 720px;
    &:after{
      content: '';
      display: block;
      clear: both;
    }
    > div{
      float: left;
    }
    .left{
      img{
        width: 330px;
      }
    }
    .right{
      letter-spacing: 1px;
      margin-left: 50px;
      .status-title{
        font-size: 120px;
        letter-spacing: 10px;
        line-height: 168px;
        color: #cccccc;
      }
      .comment{
        color: #888888;
        margin-top: 30px;
      }
      .reload{
        margin-top: 70px;
        color: #16BC83;
        cursor: pointer;
      }
    }
  }
</style>
