<!--订单详情页面头部布局，去掉导航栏-->
<template>
  <div style="background: #f5f5f5">
    <UserHeaderTop></UserHeaderTop>
    <!--页面头部-->
    <UserSearch></UserSearch>
    <div class="content">
      <nuxt style="margin: 20px auto"></nuxt>
    </div>
    <!--页面尾部-->
    <Footer></Footer>
  </div>
</template>
<script>
import Footer from '../components/footer/Footer'
import UserHeaderTop from '../components/header/UserHeaderTop'
import UserSearch from '../components/header/UserSearch'
export default {
  name: 'HeaderSearchCenter',
  components: { Footer, UserHeaderTop, UserSearch }
}
</script>
<style scoped lang="scss">
  .content{
    background: #f5f5f5;
    width: 1200px!important;
    margin: 0 auto!important;
  }
</style>
