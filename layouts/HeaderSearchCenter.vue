<!--页面头部-->
<template>
  <div>
    <!--<HeaderTop></HeaderTop>-->
    <!--页面头部-->
    <SearchCenter></SearchCenter>
    <nuxt />
    <!--页面尾部-->
    <!--<Footer></Footer>-->
  </div>
</template>
<script>
// import Footer from '~/components/footer/Footer'
// import HeaderTop from '~/components/header/HeaderTop'
import SearchCenter from '~/components/header/SearchCenter'
export default {
  name: 'HeaderSearchCenter',
  components: { SearchCenter }
}
</script>
<style lang="scss">
</style>
