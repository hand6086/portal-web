<template>
  <div class="header-top">
    <el-row class="header-top-center">
      <el-col :span="12">
        <i class="header-top-center-icon el-icon-location"></i>
        <a href="#">{{ layoutAddress.province }}·{{ layoutAddress.city }}</a>
      </el-col>
      <el-col :span="12" class="header-top-center-right">
        <a v-if="nickname" :href="'/user.html'">{{ nickname }}，您好！</a>
        <nuxt-link v-else to="/login.html">
          你好，请登录/注册
        </nuxt-link>
        <span v-if="nickname" style="cursor:pointer;" @click="exit">退出</span>
        <span>|</span>
        <a href="/user/order.html">我的订单</a>
        <span>|</span>
        <el-popover
          placement="bottom"
          width="240"
          trigger="hover"
        >
          <div class="header-top-center-right-qr">
            <div class="header-top-center-right-qr-text">
              <p>手机APP下载</p>
              <div class="header-top-center-right-qr-text-img">
                <img v-if="qrCode[0]" :src="`${$store.state.imgServer}${qrCode[0].pic}`" width="100%" height="100%" alt="手机APP二维码">
              </div>
            </div>
            <div class="header-top-center-right-qr-text">
              <p>微信小程序</p>
              <div class="header-top-center-right-qr-text-img">
                <img v-if="qrCode[1]" :src="`${$store.state.imgServer}${qrCode[1].pic}`" width="100%" height="100%" alt="微信小程序二维码">
              </div>
            </div>
          </div>
          <a slot="reference" href="#">
            <i class="el-icon-mobile-phone"></i>
            下载手机APP
            <i class="el-icon-arrow-down"></i>
          </a>
        </el-popover>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'HeaderTop',
  data() {
    return {
      layoutAddress: {},
      qrCode: [],
      nickname: ''
    }
  },
  async created() {
    if (this.$store.state.user.nickname) {
      this.nickname = this.$store.state.user.nickname
    }
    if (this.$store.state.headerFooter && this.$store.state.headerFooter.address) {
      this.layoutAddress = this.$store.state.headerFooter.address
      this.qrCode = this.$store.state.headerFooter.qrcode
    } else {
      // 地址定位数据获取
      const addressData = this.$axios.get('/portal/api/web/v1/umsMember/getLocation')
      // 获取二维码
      const qrCode = this.$axios.get('/portal/api/web/v1/smsQrCode/')
      let resultList = []
      try {
        const promiseList = [addressData, qrCode]
        resultList = await Promise.all(promiseList)
      } catch (e) {
        console.log('页面数据加载错误：' + e)
      }
      this.layoutAddress = resultList[0].data
      this.qrCode = resultList[1].data.records
    }
  },
  methods: {
    /**
     * 退出登录
     */
    async exit() {
      try {
        await this.$axios.get('/portal/api/web/v1/umsMember/logout')
        window.location.href = '/login.html'
      } catch (e) {
        this.$message.error(e.message)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .header-top-center-right-qr{
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    .header-top-center-right-qr-text{
      display: inline-block;
      width: 104px;
      text-align: center;
    }
    .header-top-center-right-qr-text-img{
      height: 104px;
      margin-top: 15px;
      background: #979797;
    }
  }
  .header-top {
    width: 100%;
    height: 28px;
    background: #EEEEEE;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    .header-top-center {
      width: 1200px;
      margin: 0 auto;
      font-size: 12px;
      line-height: 28px;
      color: #888;
      .header-top-center-icon{
        color: $theme-color;
      }
      .header-top-center-right {
        text-align: right;
      }

      a {
        color: #888;
      }

      span {
        margin: 0 20px;
      }
    }
  }
</style>
