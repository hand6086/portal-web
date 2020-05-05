<!--页面头部-->
<template>
  <div style="background: #f5f5f5">
    <UserHeaderTop></UserHeaderTop>
    <!--页面头部-->
    <HelpSearch></HelpSearch>
    <div class="content">
      <HelpNav></HelpNav>
      <nuxt style="float: right" />
      <div style="clear: both;"></div>
    </div>
    <!--页面尾部-->
    <Footer></Footer>
  </div>
</template>
<script>
import Footer from '../components/footer/Footer'
import UserHeaderTop from '../components/header/UserHeaderTop'
import HelpSearch from '../components/header/HelpSearch'
import HelpNav from '../components/header/HelpNav'
export default {
  name: 'HelpHeaderLayout',
  components: { HelpNav, HelpSearch, Footer, UserHeaderTop },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    /**
     * 滚动事件监听函数
     */
    handleScroll() {
      const content = document.getElementsByClassName('content')[0]
      const nav = content.getElementsByClassName('header-nav')[0]
      const top = content.getBoundingClientRect().top
      if (top <= 0) {
        nav.style.position = 'fixed'
        nav.style.top = '20px'
        nav.style.zIndex = 30
      } else {
        nav.style.position = 'relative'
        nav.style.top = 0
      }
    }
  }
}
</script>
<style scoped lang="scss">
  .content{
    background: #f5f5f5;
    width: $content-width !important;
    margin: 0 auto !important;
    padding-top: 20px;
  }
</style>
