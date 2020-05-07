<template>
  <div :class="['header-top',{closeImgTop: closeImg}]">
    <el-row v-if="!closeImg" class="header-top-advert-box">
      <img src="../../assets/images/fullhouse/header_adv.png" width="1200px" height="60px" alt="">
      <i class="el-icon-circle-close header-top-center-cancel" @click="closeAdv"></i>
    </el-row>
    <el-row class="header-top-center">
      <el-col :span="10">
        <i class="header-top-center-icon el-icon-location"></i>
        <a href="#">{{ layoutAddress.province }}·{{ layoutAddress.city }}</a>
      </el-col>
      <el-col :span="14" class="header-top-center-right">
        <a v-if="nickname" :href="'/user.html'">{{ nickname }}，您好！</a>
        <nuxt-link v-else to="/login.html">
          你好，请登录/注册
        </nuxt-link>
        <span v-if="nickname" style="cursor:pointer;" @click="exit">退出</span>
        <span>|</span>
        <a href="/user/order.html">我的订单</a>
        <span>|</span>
        <div class="service-box">
          <div
            :class="['selected',{active :showMoreCompany},{activeSelectedCom :showMoreCompany}]"
            @mouseover="showMoreCompany = true"
            @mouseout="showMoreCompany = false">
            企业采购
            <i class="el-icon-arrow-down"></i>
          </div>
          <div
            v-show="showMoreCompany"
            class="more-cate"
            style="left:0px"
            @mouseover="showMoreCompany = true"
            @mouseout="showMoreCompany = false"
          >
            <el-row>
              <el-col :span="12" v-for="i in 6" :key="i">企业购</el-col>
            </el-row>
          </div>
        </div>
        <span>|</span>
        <div class="service-box">
          <div
            :class="['selected',{active :showMore},{activeSelected :showMore}]"
            @mouseover="showMore = true"
            @mouseout="showMore = false">
            客服服务
            <i class="el-icon-arrow-down"></i>
          </div>
          <div
            v-show="showMore"
            class="more-cate"
            style="left:0px"
            @mouseover="showMore = true"
            @mouseout="showMore = false"
          >
            <p>客户</p>
            <el-row>
              <el-col :span="12" v-for="i in 6" :key="i">帮助中心</el-col>
            </el-row>
            <p>商户</p>
            <el-row>
              <el-col :span="12" v-for="j in 6" :key="j">合作招商</el-col>
            </el-row>
          </div>
        </div>
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
      nickname: '',
      closeImg: false,
      showMore: false,
      boxshow: false,
      showMoreCompany: false
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
    },

    closeAdv() {
      this.closeImg = true
    }
  }
}
</script>

<style scoped lang="scss">
  $qup-border:1px solid #16BC83;
  $default-border:1px solid #f5f5f5;
  $qup-color:#16BC83;
  $default-color:#333333;
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
    height: 108px;
    background: #e3e4e5;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;

    .header-top-advert-box{
      position: relative;
      width: 100%;
      height: 80px;
      background: #f1f3f0!important;
      text-align: center;
      cursor: pointer;
      img{
        /*width: 100%;*/
        height: 100%;
      }
      .el-icon-circle-close{
        position: absolute;
        top: 10px;
        right: 80px;
        font-size: 20px;
        z-index: 10;
      }

    }
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
      .service-box{
        position: relative;
        display: inline-block;
        *{
          align-self: center;
        }
      }
      .more-cate{
        padding: 10px 0 10px 8px;
        position: absolute;
        left: 22px;
        top: 27px;
        border: $qup-border;
        background-color: #fff;
        width: 180px;
        color: $default-color;
        z-index: 3;
        .el-row{
          width: 180px;
          padding: 0 10px;
          .el-col-12 {
            text-align: left;
          }
        }
        span{
          font-size: 12px;
          margin-left: 10px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        span:hover{
          color: $qup-color;
        }
        p{
          text-align: left;
          font-weight: 600;
        }
      }
      .selected{
        height: 28px;
        position: relative;
        border: 1px solid #e3e4e5;
        /*background: #ffffff;*/
        cursor: pointer;
        z-index: 2;
        display: inline-block;
        padding: 0 3px;
        font-size: 12px;
        *{
          align-self: center;
        }
      }
      .active{
        border:$qup-border;
        color: $default-color;
        border-bottom: 1px solid #ffffff;
        z-index:10;
        .el-icon-arrow-up{
          color: $qup-color!important;
        }
      }
      .activeSelectedCom{
        background: #ffffff;
      }
      .activeSelected {
        background: #ffffff;
      }
    }

  }
.closeImgTop{
  height: 28px!important;
}
  .boxA{
    width: 20px;
    height: 200px;
    position: absolute;
    background-color:black;
  }
  .box{
    position: absolute;
    z-index: 90;
  }
  /*.boxA:hover .box{*/
  /*  height:200px;width: 200px;*/
  /*  display: block;*/
  /*  background-color:black;*/

  /*}*/
  /*.boxA:hover .draw-enter-active, .draw-leave-active {*/
  /*  transition: all 1s ease;*/
  /*}*/
  /*.boxA:hover .draw-enter, .draw-leave-to !* .fade-leave-active below version 2.1.8 *! {*/
  /*  width: 20px;*/
  /*  height: 200px;*/
  /*}*/

  .box{
    height:200px;width: 200px;
    display: block;
    background-color:black;

  }
  .draw-enter-active, .draw-leave-active {
    transition: all 1s ease;
  }
   .draw-enter, .draw-leave-to /* .fade-leave-active below version 2.1.8 */ {
    width: 20px;
    height: 200px;
  }
</style>
