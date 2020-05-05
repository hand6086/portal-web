<template>
  <div style="background: #f5f5f5">
    <UserHeaderTop></UserHeaderTop>
    <nuxt></nuxt>
    <!--页面尾部-->
    <Footer></Footer>
  </div>
</template>

<script>
import UserHeaderTop from '../components/header/UserHeaderTop'
import Footer from '../components/footer/Footer'
export default {
  name: 'PayHeaderLayout',
  components: { Footer, UserHeaderTop }
}
</script>

<style scoped lang="scss">

</style>
