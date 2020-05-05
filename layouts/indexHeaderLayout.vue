<!--页面头部-->
<template>
  <div>
    <div style="background: #D560FA;">
      <div v-if="$store.state.adv.adTop.pic && showAdv" class="top-img">
        <a v-if="$store.state.adv.adTop.linkUrl" :href="$store.state.adv.adTop.linkUrl" target="_blank">
          <img :src="`${$store.state.imgServer}${$store.state.adv.adTop.pic}`" width="100%" height="100%" :alt="$store.state.adv.adTop.name">
        </a>
        <img v-else :src="`${$store.state.imgServer}${$store.state.adv.adTop.pic}`" width="100%" height="100%" :alt="$store.state.adv.adTop.name">
        <div class="top-img-icon" @click="showAdv = false">
          <i class="el-icon-close"></i>
        </div>
      </div>
    </div>
    <HeaderTop></HeaderTop>
    <!--页面头部-->
    <SearchCenter></SearchCenter>
    <nuxt />
    <!--页面尾部-->
    <Footer></Footer>
  </div>
</template>
<script>
import Footer from '~/components/footer/Footer'
import HeaderTop from '~/components/header/HeaderTop'
import SearchCenter from '~/components/header/SearchCenter'
export default {
  name: 'HeaderSearchCenter',
  components: { Footer, HeaderTop, SearchCenter },
  data() {
    return {
      showAdv: true
    }
  }
}
</script>
<style lang="scss">
  .top-img{
    width: 1200px;
    height: 86px;
    margin: 0 auto;
    background: #D560FA;
    position: relative;
    .top-img-icon{
      position: absolute;
      top: 10px;
      right: 20px;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: rgba(0,0,0,0.5);
      text-align: center;
      line-height: 22px;
      color: #fff;
      cursor: pointer;
    }
  }
</style>
