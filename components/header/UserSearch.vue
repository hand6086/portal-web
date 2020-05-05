<template>
  <div class="header-content-all">
    <div class="header-content">
        <div class="header-content-left">
          <a href="/">
            <img :src="`${$store.state.imgServer}${$store.state.logo.logoUrl}`" alt="助农产品" width="100%">
          </a>
        </div>
        <div class="header-content-center">
          <a :href="'/user.html'">
            <div class="center-sub">首页</div>
          </a>
          <div class="center-sub">
            <div
              :class="['c-setting',{'active' :showMore}]"
              @mouseover="showMore = true"
              @mouseout="showMore = false">
              账户设置
              <i class="el-icon-arrow-down" v-show="!showMore"></i>
              <i class="el-icon-arrow-up" v-show="showMore"></i>
            </div>
            <div
              class="c-setting-content"
              @mouseover="showMore = true"
              @mouseout="showMore = false"
              v-show="showMore"
            >
              <div style="width:100%;">
                <a href="/user/info.html">个人信息</a>
                <a href="/user/phone.html">修改手机号码</a>
              </div>
            </div>

          </div>
          <div class="header-content-right-left">
            <el-autocomplete
              v-model="layoutSearchValue"
              size="medium"
              class="header-content-right-input"
              prefix-icon="el-icon-search"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入商品名称..."
              :select-when-unmatched="true"
              @select="handleSelect"
            ></el-autocomplete>
            <div class="header-content-right-left-btn">
              <el-button type="primary" size="medium" class="header-content-right-button" @click="handleSelect">
                搜&nbsp;索
              </el-button>
            </div>
          </div>
        </div>
        <div class="header-content-right">
          <div class="header-content-right-cart">
            <div class="header-content-right-cart-btn">
              <el-badge :value="$store.state.shopCart.count" class="item">
                <a class="header-content-right-badge" href="#"><i class="el-icon-shopping-cart-1"></i></a>
              </el-badge>
              <nuxt-link to="/cart.html">
                我的购物车
              </nuxt-link>
            </div>
          <div class="header-content-right-cart-content">
            <div v-show="cartList.length > 0" class="header-content-right-cart-content-items">
              <el-row v-for="(item, index) in cartList" :key="index" class="header-content-right-cart-content-item">
                <el-col :span="5">
                  <div class="header-content-right-cart-content-img">
                    <img :src="`${$store.state.imgServer}${item.productPic}`" width="100%" height="100%">
                  </div>
                </el-col>
                <el-col :span="19" class="header-content-right-cart-content-right">
                  <h1 class="header-content-right-cart-content-title">
                    {{ item.productName }}
                  </h1>
                  <p class="header-content-right-cart-content-p">
                    <span class="header-content-right-cart-content-cny">¥{{ item.promotionPrice }}</span>
                    <span>×{{ item.productQuantity }}</span>
                    <el-button class="header-content-right-cart-content-btn" type="text" size="mini" @click="deleteCartItem(item.id,index)">
                      删除
                    </el-button>
                  </p>
                </el-col>
              </el-row>
            </div>
            <div v-show="cartList.length > 0" class="header-content-right-cart-content-footer">
              共{{ cartAllNum }}件商品, 共计<span class="header-content-right-cart-content-footer-cny">¥{{ cartAllPrice }}</span>
              <el-button class="header-content-right-cart-content-footer-btn" type="primary" size="mini" @click="goToCart">
                去结算
              </el-button>
            </div>
            <div v-show="cartList.length === 0" class="header-content-right-cart-content-no">
              <img src="../../static/icon/img_empty_shopping_cart.png" style="float: left;margin-left: 14px" width="40px" height="40px">
              购物车中还没有商品，赶紧选购吧！
            </div>
          </div>
        </div>
      </div>
    <div style="clear: both;"></div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'UserSearch',
  data() {
    return {
      layoutLogoUrl: '',
      layoutSearchValue: '',
      showMore: false,
      cartList: [],
      cartAllNum: 0,
      cartAllPrice: 0
    }
  },
  async created() {
    // 页面logo数据获取
    const logoData = this.$axios.get('/portal/api/action/portal/homeManage/smsHomeLogo')
    // 用户购物车
    const addr = this.$cookies.get('address')
    const addrCode = addr.streetCode || addr.districtCode || addr.cityCode || addr.provinceCode
    const cart = this.$axios.post('/portal/api/web/v1/omsCartItem/query', {
      deliveryAddrCode: addrCode
    })
    let resultList = []
    try {
      const promiseList = [logoData, cart]
      resultList = await Promise.all(promiseList)
    } catch (e) {
      console.log('页面数据加载错误：' + e)
    }
    this.layoutLogoUrl = resultList[0].data.pic
    const cartArr = resultList[1].data
    let arr = []
    if (cartArr.length > 0) {
      cartArr.forEach((item) => {
        arr = arr.concat(item.omsCartItemList)
      })
    }
    this.cartList = arr
    if (arr.length > 0) {
      arr.forEach((item) => {
        this.cartAllPrice = this.cartAllPrice + item.totalPrice
        this.cartAllNum = this.cartAllNum + item.productQuantity
      })
    }
  },
  methods: {
    /**
     * desc 页面头尾部分搜索提示方法
     * @author wangyue
     * @date 2019/10/16
     * @params
     */
    async querySearchAsync(queryString, cb) {
      if (queryString) {
        try {
          const url = '/portal/api/web/v1/index/search?searchValue=' + queryString
          const data = await this.$axios.get(encodeURI(url), {})
          if (data.success === 1) {
            data.data.forEach((item) => {
              item.value = item.name
            })
            const list = data.data
            cb(list)
          } else {
            const arr = []
            cb(arr)
          }
        } catch (e) {
          this.$message.error(e.toString())
        }
      } else {
        const arr = []
        cb(arr)
      }
    },
    /**
     * desc 页面头部搜索框搜索
     * @author wangyue
     * @date 2019/10/16
     * @params
     */
    handleSelect(row) {
      sessionStorage.setItem('searchValue', this.layoutSearchValue)
      if (row.id) {
        window.location.href = `/list.html?cat=${row.id}`
      } else {
        window.location.href = `/list.html?keyword=${encodeURI(this.layoutSearchValue)}`
      }
    },
    /**
     * desc 删除购物车物品
     * @author wangyue
     * @date 2019/11/4
     * @params
     */
    deleteCartItem(id, index) {
      this.$confirm('确认删除该商品？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(
        async() => {
          try {
            const arr = []
            arr.push(id)
            const url = `/portal/api/web/v1/omsCartItem/delete`
            const resp = await this.$axios.post(url, {
              ids: arr
            })
            if (resp.success === 1) {
              this.cartList.splice(index, 1)
              this.$store.commit('shopCart/init', { list: [], count: this.cartList.length }) // 更新头部购物车商品数量
              this.cartAllPrice = 0
              this.cartAllNum = 0
              this.cartList.forEach((item) => {
                this.cartAllPrice = this.cartAllPrice + item.totalPrice
                this.cartAllNum = this.cartAllNum + item.productQuantity
              })
              this.$message.success('删除成功')
            } else {
              this.$message.error('删除失败：' + resp.msg)
            }
          } catch (e) {
            this.$message.error(e.toString())
          }
        }
      )
    },
    /**
     * desc 跳入购物车物品
     * @author wangyue
     * @date 2019/11/4
     * @params
     */
    goToCart() {
      window.location.href = '/cart.html'
    }
  }
}
</script>

<style scoped lang="scss">
  .header-content-all{
    background: #fff;
    .header-content {
      width: 1200px;
      /*height: 90px;*/
      height: 80px;
      /*padding-top: 14px;*/
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      background: #ffffff;
      *{
        align-self: center;
      }
      .header-content-left {
        width: 182px;
        float: left;
        /*margin-right: 194px;*/

        h3 {
          margin: 14px 0 0;
          text-align: center;
          font-size: 16px;
          color: #019E77;
          font-weight: normal;
        }
      }
      .header-content-center{
        .center-sub{
          display: inline-block;
          margin-right: 83px;
          cursor: pointer;
        }
        .center-sub:nth-child(2){
          position: relative;
          margin-right: 0;
          .c-setting{
            height: 30px;
            margin-right: 83px;
          }
          .c-setting-content{
            position: absolute;
            top: 30px;
            left: 0px;
            width: 100px;
            box-shadow: 0px 0px 3px 3px #f5f5f5;
            padding: 10px;
            background: #fff;
            a{
              display: block;
              line-height: 2;
              font-size: 12px;
              &:hover{
                color: $theme-color;
              }
            }
          }
        }
        .center-sub:nth-child(2)::before{
            z-index: 1;
            top: 10px;
            margin-left: -5px;
            width: 10px;
            height: 10px;
        }
        .active{
          color: $theme-color;
        }
        .header-content-right-left {
          display: inline-block;

          .header-content-right-input {
            width: 380px;

            /deep/.el-input__inner {
              border-radius: 0;
              border-color: $theme-color;
            }
          }
          .header-content-right-left-btn {
            display: inline-block;
            vertical-align: middle;
            line-height: 80px;
            margin-left: -5px;
            margin-top: -5px;
            .header-content-right-button {
              margin-left: -1px;
            }
          }

          p {
            font-size: 12px;
            color: #999;
            margin: 16px 0 0;

            a {
              color: #999;
              font-size: 12px;

              &:hover {
                color: $theme-color;
              }
            }

            span {
              margin: 0 10px;
            }
          }
        }
      }
      .header-content-right {
        .header-content-right-cart {
          float: left;
          position: relative;
          .header-content-right-cart-btn{
            padding: 10px 10px 2px;
            background: #fff;
            border:1px solid rgba(255,255,255,1);
            border-bottom: none;
            z-index: 10;
            position: relative;
            width: 130px;
          }
          .header-content-right-cart-content{
            display: none;
            position: absolute;
            left: -170px;
            top: 49px;
            width: 300px;
            min-height: 100px;
            background: #fff;
            box-shadow:0px 0px 8px 0px rgba(0,0,0,0.1);
            border:1px solid rgba(204,204,204,1);
            z-index: 9;
            padding: 14px 0;
            padding-bottom: 46px;
            .header-content-right-cart-content-items{
              max-height: 360px;
              overflow: hidden;
              overflow-y: auto;
              padding: 0 14px;
              .header-content-right-cart-content-item{
                padding: 14px 0;
                border-top: 1px dashed #DDDDDD;
                .header-content-right-cart-content-img{
                  width: 56px;
                  height: 56px;
                }
                .header-content-right-cart-content-right{
                  padding-left: 10px;
                  font-size: 12px;
                  .header-content-right-cart-content-title{
                    font-size: 12px;
                    font-weight: normal;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    height: 34px;
                    line-height: 16px;
                    color: #333;
                  }
                  .header-content-right-cart-content-p{
                    color: #888888;
                    height: 28px;
                    line-height: 28px;
                    .header-content-right-cart-content-cny{
                      color: #FF4F4F;
                      margin-right: 10px;
                    }
                    .header-content-right-cart-content-btn{
                      float: right;
                    }
                  }
                }
                &:first-child{
                  border-top: none;
                }
              }
            }
            .header-content-right-cart-content-footer{
              background: #F5F5F5;
              position: absolute;
              left: 0;
              bottom: 0;
              width: 100%;
              padding: 10px;
              height: 48px;
              line-height: 30px;
              font-size: 12px;
              color: #333;
              .header-content-right-cart-content-footer-cny{
                color: #FF4F4F;
              }
              .header-content-right-cart-content-footer-btn{
                float: right;
              }
            }
            .header-content-right-cart-content-no{
              font-size: 12px;
              text-align: center;
              color: #888;
              line-height: 40px;
            }
          }
          &:hover{
            .header-content-right-cart-btn{
              border:1px solid rgba(204,204,204,1);
              border-bottom: none;
            }
            .header-content-right-cart-content{
              display: block;
            }
          }
        }
        a {
          font-size: 14px;
          color: $theme-color;
        }

        .header-content-right-badge {
          font-size: 28px;
        }
      }
    }
  }
</style>
