<template>
  <div class="header-nav">
    <div>
      <div>
        我的订单
        <a href="/user/order.html" :class="{active:routePath.includes( '/user/order.html')}">全部订单</a>
        <a href="/user/comments/list.html" :class="{active:routePath === '/user/comments/list.html'}">晒单评价</a>
      </div>
      <div>
        我的足迹
        <a href="/user/footprint.html" :class="{active:routePath === '/user/footprint.html'}">我的足迹</a>
      </div>
      <div>
        我的收藏
        <a href="/user/collectprod.html" :class="{active:routePath === '/user/collectprod.html'}">收藏商品</a>
        <a href="/user/collectcontent.html" :class="{active:routePath === '/user/collectcontent.html'}">收藏内容</a>
      </div>
      <div>
        我的活动
        <a href="/user/appointment.html" :class="{active:routePath === '/user/appointment.html'}">我的预约</a>
      </div>
      <div>
        退款/售后
        <a href="/user/refundlist.html" :class="{active:routePath === '/user/refundlist.html'}">退款/售后</a>
      </div>
    </div>
  </div>
<!--    <div style="clear: both;"></div>-->

</template>

<script>
export default {
  name: 'UserNav',
  data() {
    return {
      routePath: ''
    }
  },
  created() {
    this.routePath = this.$route.path
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
      .header-nav{
        margin: 0 auto;
        width: 182px;
        padding: 10px 30px;
        background:rgba(255,255,255,1);
        box-shadow:2px 2px 6px 0px rgba(0,0,0,0.1);
        font-size:14px;
        font-weight:600;
        color:#333;
        line-height:20px;
        letter-spacing:1px;
        display: block;
        float: left;
        line-height: 2;
        a{
          font-size:12px;
          font-weight:400;
          color:rgba(51,51,51,1);
          letter-spacing:1px;
          display: block;
          &:hover{
            color: $theme-color;
          }
        }
        .active{
          color: $theme-color;
        }
      }
</style>
