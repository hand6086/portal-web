<template>
  <div class="makeappointment">
    <div v-show="appointentShow" class="makeappointment-minimize" @click="openAppointment">
      <div class="makeappointment-minimize-left">
        <i class="el-icon-edit-outline"></i>
      </div>
      <div class="makeappointment-minimize-center">
        免费<br>预约
      </div>
      <div class="makeappointment-minimize-right">
        <i class="el-icon-thumb"></i>
      </div>
    </div>
    <div v-show="!appointentShow" class="makeappointment-maximize">
      <div class="makeappointment-maximize-content">
        <el-row>
          <el-col :span="4">
            &nbsp;
            <div class="makeappointment-maximize-content-img">
              <img src="../assets/images/index/YOYO.png" width="100%" height="100%">
            </div>
          </el-col>
          <el-col :span="6">
            <div class="makeappointment-maximize-content-text">
              <span class="makeappointment-maximize-content-text-big">0</span>元获取装修效果图
            </div>
          </el-col>
          <el-col :span="10">
            <div class="makeappointment-maximize-content-form">
              <el-form ref="appointmentForm" :inline="true">
                <el-form-item prop="name">
                  <el-input v-model="appointmentUser.name" size="mini" class="makeappointment-maximize-content-form-name" placeholder="请输入您的姓名"></el-input>
                </el-form-item><el-form-item prop="phone">
                  <el-input v-model="appointmentUser.phone" size="mini" class="makeappointment-maximize-content-form-phone" placeholder="请输入您的手机/电话"></el-input>
                </el-form-item>
              </el-form>
              <div>
                <AddressSelect v-model="appointmentAddress" class="makeappointment-maximize-content-form-select" view="province" attr-key="provinceCode" /><AddressSelect v-model="appointmentAddress" class="makeappointment-maximize-content-form-select" view="city" attr-key="cityCode" :parent-code="appointmentAddress.provinceCode" /><AddressSelect v-model="appointmentAddress" class="makeappointment-maximize-content-form-select" view="district" attr-key="districtCode" :parent-code="appointmentAddress.cityCode" />
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="makeappointment-maximize-content-btn">
              <a class="makeappointment-maximize-content-btn-a" @click="makeAppointment">免费预约</a>
              <a class="makeappointment-maximize-content-btn-esc" @click="closeAppointment"><i class="el-icon-circle-close"></i></a>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!--<div v-show="goTopShow" class="makeappointment-top" @click="goTop">
      &lt;!&ndash;<i class="el-icon-upload2"></i>&ndash;&gt;
      <img src="../assets/images/index/icon_top.png" width="22px" height="22px">
    </div>-->
  </div>
</template>

<script>
import AddressSelect from '~/components/AddressSelect'
export default {
  name: 'MakeAppointment',
  components: { AddressSelect },
  data() {
    return {
      appointentShow: false,
      scrollTop: '',
      goTopShow: false,
      appointmentAddress: {},
      copyAppointmentAddress: {},
      appointmentUser: {
        name: '',
        phone: ''
      }
    }
  },
  async created() {
    if (this.$store.state.headerFooter && this.$store.state.headerFooter.address) {
      this.appointmentAddress = this.$store.state.headerFooter.address
      this.copyAppointmentAddress = this.$store.state.headerFooter.address
    } else {
      // 地址定位数据获取
      const addressData = this.$axios.get('/portal/api/web/v1/umsMember/getLocation')
      let resultList = []
      try {
        const promiseList = [addressData]
        resultList = await Promise.all(promiseList)
      } catch (e) {
        console.log('页面数据加载错误：' + e)
      }
      this.appointmentAddress = resultList[0].data
      this.copyAppointmentAddress = resultList[0].data
    }
  },
  mounted() {
    // window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    // window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    /**
     * desc 关闭页面下方广告
     * @author wangyue
     * @date 2019/10/16
     * @params
     */
    closeAppointment() {
      this.appointentShow = true
    },
    /**
     * desc 打开页面下方广告
     * @author wangyue
     * @date 2019/10/16
     * @params
     */
    openAppointment() {
      this.appointentShow = false
    },
    /**
     * desc 根据滚动条位置判断是否显示返回顶部按钮
     * @author wangyue
     * @date 2019/10/16
     * @params
     */
    /* handleScroll() {
      this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (this.scrollTop > 500) {
        this.goTopShow = true
      } else {
        this.goTopShow = false
      }
    }, */
    /**
     * desc 返回顶部方法
     * @author wangyue
     * @date 2019/10/16
     * @params
     */
    /* goTop() {
      let timer = null; const _that = this
      cancelAnimationFrame(timer)
      timer = requestAnimationFrame(function fn() {
        if (_that.scrollTop > 0) {
          _that.scrollTop -= 50
          document.body.scrollTop = document.documentElement.scrollTop = _that.scrollTop
          timer = requestAnimationFrame(fn)
        } else {
          cancelAnimationFrame(timer)
          _that.goTopShow = false
        }
      })
    }, */
    /**
     * desc 免费预约方法
     * @author wangyue
     * @date 2019/10/16
     * @params
     */
    async makeAppointment() {
      if (!this.appointmentUser.name) {
        this.$message.error('请输入您的姓名')
        return
      } else if (this.appointmentUser.name.length > 30) {
        this.$message.error('姓名不可超过30字符')
        return
      }
      const pattern = /^1[345678]\d{9}$/
      if (!pattern.test(this.appointmentUser.phone)) {
        this.$message.error('请输入正确的电话号码')
        return
      }
      try {
        const url = '/portal/api/web/v1/smsAppointmentInfo'
        const data = await this.$axios.post(url, {
          name: this.appointmentUser.name,
          phoneNumber: this.appointmentUser.phone,
          province: this.appointmentAddress.provinceCode,
          city: this.appointmentAddress.cityCode,
          region: this.appointmentAddress.districtCode,
          source: 'free_design'
        })
        if (data.success === 1) {
          this.$message.success('预约成功！')
          this.appointmentAddress = JSON.parse(JSON.stringify(this.copyAppointmentAddress))
          this.appointmentUser = { name: '', phone: '' }
        } else {
          this.$message.error('预约失败，失败原因：' + data.msg)
        }
      } catch (e) {
        this.$message.error(e.toString())
      }
    }
  }
}
</script>

<style scoped lang="scss">
.makeappointment{
  .makeappointment-minimize{
    position: fixed;
    left: 0;
    bottom: 200px;
    z-index: 9999;
    width: 130px;
    height: 52px;
    border-top-right-radius: 26px;
    border-bottom-right-radius: 26px;
    background: #AAAAAA;
    cursor: pointer;
    .makeappointment-minimize-left{
      float: left;
      width: 54px;
      height: 52px;
      font-size: 28px;
      line-height: 52px;
      text-align: center;
      background: $theme-color;
      color: #fff;
      position: relative;
      &:before{
        content: '';
        display: block;
        width: 10px;
        height: 10px;
        background: $theme-color;
        transform: rotate(45deg);
        -ms-transform: rotate(45deg); /* IE 9 */
        position: absolute;
        right: -5px;
        top: 24px;
      }
    }
    .makeappointment-minimize-center{
      float: left;
      font-size: 16px;
      color: #fff;
      margin: 4px 8px 0 12px;
    }
    .makeappointment-minimize-right{
      float: left;
      font-size: 16px;
      color: #fff;
      line-height: 52px;
    }
  }
  .makeappointment-maximize{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 1000;
    width: 100%;
    height: 80px;
    background: rgba(0,0,0,0.6);
    background-size: 100% 100%;
    .makeappointment-maximize-content{
      width: 1200px;
      margin: 0 auto;
      position: relative;
      .makeappointment-maximize-content-img{
        width: 96px;
        height: 126px;
        position: absolute;
        left: 0;
        bottom: 0;
      }
      .makeappointment-maximize-content-text{
        font-size: 24px;
        font-weight: bold;
        color: #FFE713;
        line-height: 80px;
        .makeappointment-maximize-content-text-big{
          font-size: 36px;
        }
      }
      .makeappointment-maximize-content-form{
        padding-top: 2px;
        .makeappointment-maximize-content-form-name{
          width: 140px;
        }
        .makeappointment-maximize-content-form-phone{
          width: 290px;
        }
        .makeappointment-maximize-content-form-select{
          width: 140px;
          margin-right: 10px;
        }
      }
      .makeappointment-maximize-content-btn{
        position: relative;
        .makeappointment-maximize-content-btn-a{
          margin-top: 20px;
          display: inline-block;
          width: 150px;
          height: 40px;
          text-align: center;
          line-height: 36px;
          background: #FFE713;
          font-size: 18px;
          font-weight: bold;
          color: #333;
          cursor: pointer;
          border-radius:2px;
        }
        .makeappointment-maximize-content-btn-esc{
          position: absolute;
          right: -10px;
          top: 28px;
          font-size: 24px;
          color: #fff;
          cursor: pointer;
        }
      }
    }
  }
  .makeappointment-top{
    position: fixed;
    right: 0;
    bottom: 160px;
    z-index: 9999;
    width: 60px;
    height: 40px;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    background: $theme-color;
    font-size: 24px;
    color: #fff;
    line-height: 40px;
    padding-left: 20px;
    padding-top: 2px;
    cursor: pointer;
  }
}
</style>
