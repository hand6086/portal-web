<!--页面头部-->
<template>
  <div>
    <HeaderTop></HeaderTop>
    <!--页面头部-->
    <SearchCenter></SearchCenter>
<!--    <div class="content">-->
<!--&lt;!&ndash;      <HeaderAdv></HeaderAdv>&ndash;&gt;-->
<!--      <nuxt style="float: right" />-->
<!--      <div style="clear: both;"></div>-->
<!--    </div>-->
    <nuxt />
    <!--页面尾部-->
<!--    <Footer></Footer>-->
  </div>
</template>
<script>
// import Footer from '~/components/footer/Footer'
import HeaderTop from '~/components/header/HeaderTop'
import SearchCenter from '~/components/header/SearchCenter'
// import HeaderAdv from '~/components/header/HeaderAdv'
export default {
  name: 'HeaderSearchCenter',
  components: { SearchCenter, HeaderTop }
}
</script>
<style lang="scss">
</style>
