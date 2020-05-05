<template>
  <div class="navigation" :style="underBorder ? 'border-bottom: 2px solid #16BC83;' : ''">
    <div class="navigation-content">
      <div class="navigation-content-a navigation-content-other">
        <i class="el-icon-menu"></i>&nbsp;商品分类
        <ul class="navigation-content-ul" :style="showNav ? 'display:block;' : ''">
          <li v-for="(item,index) in nextNav" :key="index" class="navigation-content-li">
            <div class="navigation-content-ul-left">
              <p class="navigation-content-ul-left-title">
                {{ item.name }}
              </p>
              <nuxt-link v-for="(items,indexs) in item.children" v-show="indexs < 2" :key="indexs" class="navigation-content-ul-left-a" :to="{path: '/list.html', query:{province: items.parentId, city: items.parentId, districtId: items.id} }">
                {{ items.name }}
              </nuxt-link>
            </div>
            <div class="navigation-content-ul-right">
              <i class="el-icon-arrow-right"></i>
            </div>
            <div class="navigation-content-ul-div">
              <el-row style="height: 100%">
                <el-col :span="16">
                  <el-row v-for="(itemi,indexi) in item.children" :key="indexi" class="navigation-content-ul-div-center-title-group">
                    <el-col :span="4">
                      <!--<span class="navigation-content-ul-div-center-title">{{ itemi.name }}:</span>-->
                      <nuxt-link class="district" :to="{path: '/list.html', query:{province: item.parentId, city: itemi.parentId, districtId: itemi.id} }">{{ itemi.name }}</nuxt-link>
                    </el-col>
                    <!--<el-col :span="20" class="navigation-content-ul-div-center-a-group">
                      <span v-for="(itemii,indexii) in itemi.children" :key="indexii">
                        <a v-if="itemii.relyValue" class="navigation-content-ul-div-center-a" :href="`/list.html?cat=${itemii.relyValue}`">{{ itemii.name }}</a>
                        <span v-else class="navigation-content-ul-div-center-a">{{ itemii.name }}</span>
                      </span>
                    </el-col>-->
                  </el-row>&nbsp;
                </el-col>
                <!--<el-col :span="8" class="navigation-content-ul-div-right-img">
                  <a v-if="$store.state.adv.adNavigate.linkUrl" :href="$store.state.adv.adNavigate.linkUrl" target="_blank">
                    <img :src="`${$store.state.imgServer}${$store.state.adv.adNavigate.pic}`" width="100%" height="100%" :alt="$store.state.adv.adNavigate.name">
                  </a>
                  <img v-else :src="`${$store.state.imgServer}${$store.state.adv.adNavigate.pic}`" width="100%" height="100%" :alt="$store.state.adv.adNavigate.name">
                </el-col>-->
              </el-row>
            </div>
          </li>
        </ul>
      </div>
      <!--<a class="navigation-content-a" :style="underBorder ? 'border-bottom: none' : ''" :class="routeUrl == '/' ? 'navigation-content-check' : ''" href="/">
        首页
      </a>-->
      <a
        v-for="(item,index) in primaryNav"
        :key="index"
        :style="underBorder ? 'border-bottom: none' : ''"
        class="navigation-content-a"
        :class="routeUrl === item.url ? 'navigation-content-check' : ''"
        :href="item.url"
      >
        {{ item.name }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QyNav',
  props: {
    showNav: { type: Boolean, default: false },
    fromFound: { type: Boolean, default: false },
    underBorder: { type: Boolean, default: false }
  },
  data() {
    return {
      primaryNav: [],
      nextNav: [],
      routeUrl: ''
    }
  },
  async created() {
    if (this.fromFound) {
      this.routeUrl = '/found/hoursecase.html'
    } else {
      this.routeUrl = this.$route.path
    }
    if (this.$store.state.nav && this.$store.state.nav.firsenav && this.$store.state.nav.lastnav) {
      this.primaryNav = this.$store.state.nav.firsenav
      this.nextNav = this.$store.state.nav.lastnav
    } else {
      // 动态导航一级菜单数据获取
      /* const primaryNav = this.$axios.get('/portal/api/web/v1/smsHomeModels/').then((data) => {
        if (data.data) {
          return data
        } else {
          return { data: [] }
        }
      }).catch((e) => {
        return { data: [] }
      }) */
      // 动态导航二三级菜单数据获取
      const nextNav = this.$axios.get('/portal/api/web/v1/pmsProductNav/queryAll').then((data) => {
        console.log(data)
        if (data.data) {
          return data
        } else {
          return { data: [] }
        }
      }).catch((e) => {
        return { data: [] }
      })
      let resultList = []
      try {
        const promiseList = [nextNav]
        resultList = await Promise.all(promiseList)
      } catch (e) {
        console.log('页面数据加载错误：' + e)
      }
      this.primaryNav = [] // resultList[0].data
      this.nextNav = resultList[0].data
    }
  }
}
</script>

<style scoped lang="scss">
  .navigation {
    background: #fff;
    .navigation-content{
      width: 1200px;
      margin: 0 auto;
      height: 32px;
      .navigation-content-a{
        display: inline-block;
        height: 32px;
        line-height: 32px;
        font-size: 16px;
        color: #333;
        margin-left: 50px;
        border-bottom: 1px solid transparent;
        &:hover{
          color: $theme-color;
          border-bottom-color: $theme-color;
        }
      }
      .navigation-content-check {
        color: $theme-color;
        border-bottom-color: $theme-color;
      }
      .navigation-content-other {
        position: relative;
        width: 182px;
        background: $theme-color;
        margin-left: 0;
        color: #fff;
        text-align: center;
        cursor: pointer;
        &:hover{
          color: #fff;
          .navigation-content-ul {
            display: block;
          }
        }
        .navigation-content-ul {
          position: absolute;
          left: 0;
          padding: 10px 0 0;
          width: 182px;
          min-height: 480px;
          background: rgba(51,51,51,0.5);
          z-index: 999;
          display: none;
          cursor: default;
          position: relative;
          .navigation-content-li {
            height: 58px;
            text-align: left;
            padding: 10px 10px 10px 20px;
            font-size: 12px;
            line-height: 20px;
            cursor: pointer;
            .navigation-content-ul-left{
              float: left;
              .navigation-content-ul-left-title {
                font-size: 14px;
              }
              .navigation-content-ul-left-a{
                display: inline-block;
                width: 54px;
                font-size: 12px;
                color: #fff;
                margin-right: 15px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                &:hover{
                  color: $theme-color;
                }
              }
            }
            .navigation-content-ul-right {
              float: right;
              line-height: 40px;
            }
            &:hover{
              background: #fff;
              .navigation-content-ul-left-title{
                color: #333;
              }
              .navigation-content-ul-right{
                color: #333;
              }
              .navigation-content-ul-left-a{
                color: #333;
              }
              .navigation-content-ul-div {
                display: block;
              }
            }
            .navigation-content-ul-div{
              position: absolute;
              left: 182px;
              top: 0;
              width: 450px;
              min-height: 480px;
              padding: 30px 20px;
              box-shadow: 6px 2px 10px rgba(0,0,0,0.3);
              background: rgba(255,255,255,0.9);
              z-index: 999;
              display: none;
              cursor: default;
              .navigation-content-ul-div-center-title-group{
                margin: 10px 0;
                .district{
                  cursor: pointer;
                  &:hover{
                    color: $theme-color;
                  }
                }
                .navigation-content-ul-div-center-title{
                  font-size: 14px;
                  font-weight: bold;
                  color: #333;
                }
                .navigation-content-ul-div-center-a-group{
                  padding-bottom: 10px;
                  margin-bottom: 14px;
                  border-bottom: 1px dashed #DDDDDD;
                  .navigation-content-ul-div-center-a{
                    display: inline-block;
                    color: #333;
                    margin: 0 8px 4px;
                    &:hover{
                      color: $theme-color;
                    }
                  }
                }
                &:last-child{
                  .navigation-content-ul-div-center-a-group{
                    border-bottom: none;
                  }
                }
              }
              .navigation-content-ul-div-right-img {
                height: 420px;
                padding-left: 10px;
              }
            }
          }
        }
      }

    }
  }
</style>
