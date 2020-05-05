<template>
  <!--页面尾部-->
  <div class="footer">
    <div class="footer-top">
      <ul>
        <li v-for="(item,index) in serviceList" :key="index" :style="`width:${1200/serviceList.length}px`">
          <a v-if="item.url" :href="item.url" target="_blank">
            <img :src="`${$store.state.imgServer}${item.pic}`" width="100%" height="100%">
          </a>
          <img v-else :src="`${$store.state.imgServer}${item.pic}`" width="100%" height="100%">
        </li>
      </ul>
    </div>
    <div class="footer-center">
      <el-row>
        <el-col :span="6" class="footer-center-phone">
          <div class="footer-center-phone-text">
            <p>客户热线</p>
            <h4>400-8800-315</h4>
          </div>
        </el-col>
        <el-col :span="11">
          <el-row class="footer-center-a-group">
            <el-col v-for="(item,index) in linkList" :key="index" :span="6">
              <p class="footer-center-a-title">
                {{ item.title }}
              </p>
              <ul class="footer-center-a-item">
                <li v-for="(items,indexs) in item.smsHomeModHelpItemList" :key="indexs">
                  <a class="footer-center-a" :href="`/help.html?articleId=${items.contentId}`" target="_blank">{{ items.title }}</a>
                </li>
              </ul>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="7" class="footer-center-qr">
          <div class="footer-center-qr-text">
            <p>手机APP下载</p>
            <div>
              <img v-if="qrCode[0]" :src="`${$store.state.imgServer}${qrCode[0].pic}`" width="100%" height="100%" alt="手机APP二维码">
            </div>
          </div>
          <div class="footer-center-qr-text">
            <p>微信小程序</p>
            <div>
              <img v-if="qrCode[1]" :src="`${$store.state.imgServer}${qrCode[1].pic}`" width="100%" height="100%" alt="微信小程序二维码">
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="footer-bottom">
      ©成都市***有限公司  蜀ICP备***号-2
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      qrCode: [],
      serviceList: [],
      linkList: []
    }
  },
  async created() {
    if (this.$store.state.headerFooter && this.$store.state.headerFooter.qrcode) {
      this.qrCode = this.$store.state.headerFooter.qrcode
      this.serviceList = this.$store.state.headerFooter.servicelist
      this.linkList = this.$store.state.headerFooter.linklist
    } else {
      // 获取二维码
      const qrCode = this.$axios.get('/portal/api/web/v1/smsQrCode/')
      // 获取服务保障
      const serviceList = this.$axios.get('/portal/api/web/v1/smsHomeModService/')
      // 获取文章链接
      const linkList = this.$axios.get('/portal/api/web/v1/smsHomeModHelp/')
      let resultList = []
      try {
        const promiseList = [qrCode, serviceList, linkList]
        resultList = await Promise.all(promiseList)
      } catch (e) {
        console.log('页面数据加载错误：' + e)
      }
      this.qrCode = resultList[0].data.records
      this.serviceList = resultList[1].data.records
      this.linkList = resultList[2].data.records
    }
  }
}
</script>

<style scoped lang="scss">
  .footer{
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    background: #fff;
    .footer-top{
      ul{
        width: 1200px;
        height: 80px;
        list-style: none;
        margin: 0 auto;
        padding: 10px 0;
        border-bottom: 1px solid #F5F5F5;
        li{
          float: left;
          height: 60px;
        }
      }
    }
    .footer-center{
      .el-row{
        width: 1200px;
        height: 200px;
        margin: 0 auto;
        position: inherit;
        .el-col{
          font-size: 14px;
          color: #333;
          h4{
            font-size: 24px;
            font-weight: normal;
          }
        }
        .footer-center-phone{
          padding-top: 64px;
          padding-left: 60px;
          .footer-center-phone-text{
            line-height: 34px;
          }
        }
        .footer-center-a-group{
          width: 100%;
          padding-top: 30px;
          font-size: 16px;
          color: #333;
          .footer-center-a-title{
            margin-bottom: 10px;
            font-weight: bold;
          }
          .footer-center-a-item{
            .footer-center-a{
              font-size: 12px;
              color: #888;
              display: inline-block;
              width: 100%;
              height: 30px;
              line-height: 30px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }
        }
        .footer-center-qr{
          padding-top: 30px;
          .footer-center-qr-text{
            display: inline-block;
            width: 104px;
            text-align: center;
            div{
              height: 104px;
              margin-top: 15px;
              background: #979797;
            }
            &:nth-child(1){
               margin-right: 50px;
             }
          }
        }
      }
    }
    .footer-bottom{
      height: 50px;
      background: #333;
      color: #fff;
      font-size: 12px;
      text-align: center;
      line-height: 50px;
      margin-top: 70px;
    }
  }
</style>
