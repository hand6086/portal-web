<!--页面头部-->
<template>
  <div>
    <user-header-top></user-header-top>
    <!--页面头部-->
    <SearchRight></SearchRight>
    <nuxt />
    <!--页面尾部-->
    <Footer></Footer>
  </div>
</template>
<script>
import UserHeaderTop from '../components/header/UserHeaderTop'
import Footer from '~/components/footer/Footer'
import SearchRight from '~/components/header/SearchRight'
export default {
  name: 'HeaderSearchCenter',
  components: { UserHeaderTop, Footer, SearchRight }
}
</script>
<style lang="scss">
</style>
