<template>
  <div class="header-content-all">
    <div class="header-content">
      <div class="header-content-left">
        <a href="/">
          <img :src="`${$store.state.imgServer}${$store.state.logo.logoUrl}`" alt="助农产品" width="100%" height="64px">
        </a>
      </div>
      <div class="header-content-right">
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
          ></el-autocomplete><el-button type="primary" size="medium" class="header-content-right-button" @click="handleSelect">
            搜&nbsp;索
          </el-button>
          <div style="clear: both"></div>
          <p>
            <a v-for="(item,index) in hotWordsList" :key="index" :href="item.url">{{ item.name }}</a>
          </p>
        </div>
        <div class="header-content-right-cart">
          <div class="header-content-right-cart-btn" @mouseenter="getCartList">
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
              共{{ $store.state.shopCart.num }}件商品, 共计<span class="header-content-right-cart-content-footer-cny">¥{{ $store.state.shopCart.price }}</span>
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
    </div>
    <div style="clear: both;"></div>
  </div>
</template>

<script>
export default {
  name: 'HeaderContent',
  data() {
    return {
      layoutSearchValue: '',
      hotWordsList: []
    }
  },
  computed: {
    cartList() {
      return this.$store.state.shopCart.list
    }
  },
  created() {
    // 热词搜索
    if (this.$store.state.headerFooter && this.$store.state.headerFooter.hotwords) {
      this.hotWordsList = this.$store.state.headerFooter.hotwords
    } else {
      this.$axios.get('/portal/api/web/v1/smsSearchHotWord/').then((data) => {
        this.hotWordsList = data.data.records
      }).catch((e) => {
        this.hotWordsList = [{}]
      })
    }
    this.getCartList()
  },
  mounted() {
    // 获取storage中是否储存存储值
    const val = window.sessionStorage.getItem('searchValue')
    if (val) {
      this.layoutSearchValue = val
    }
    window.sessionStorage.removeItem('searchValue')
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
      window.sessionStorage.setItem('searchValue', this.layoutSearchValue)
      if (row.id) {
        window.location.href = `/list.html?cat=${row.id}`
      } else {
        window.location.href = `/list.html?keyword=${encodeURI(this.layoutSearchValue)}`
      }
    },
    /**
     * desc 获取用户购物车列表
     * @author wangyue
     * @date 2019/11/6
     * @params
     */
    getCartList() {
      this.$store.dispatch('shopCart/GET_LIST', this)
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
              this.$store.dispatch('shopCart/GET_LIST', this)
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
      height: 90px;
      padding-top: 14px;
      margin: 0 auto;

      .header-content-left {
        width: 182px;
        float: left;
        margin-right: 194px;

        h3 {
          margin: 14px 0 0;
          text-align: center;
          font-size: 16px;
          color: #019E77;
          font-weight: normal;
        }
      }

      .header-content-right {
        float: left;
        .header-content-right-left {
          float: left;
          margin-right: 66px;

          .header-content-right-input {
            width: 430px;
            float: left;

            /deep/.el-input__inner {
              border-radius: 0;
              border-color: $theme-color;
            }
          }

          .header-content-right-button {
            float: left;
            height: 36px;
            margin-left: -1px;
          }

          p {
            font-size: 12px;
            color: #999;
            margin: 16px 0 0;

            a {
              display: inline-block;
              padding: 0 14px;
              border-right: 1px solid #999;
              color: #999;
              font-size: 12px;
              &:first-child{
                padding-left: 0;
              }
              &:last-child{
                border-right: none;
              }
              &:hover {
                color: #EA5404;
              }
            }
          }
        }
        .header-content-right-cart {
          float: left;
          position: relative;
          .header-content-right-cart-btn{
            height: 42px;
            line-height: 42px;
            width: 120px;
            text-align: center;
            padding-top: 2px;
            background: #fff;
            border:1px solid rgba(255,255,255,1);
            border-bottom: none;
            z-index: 10;
            position: relative;
            /deep/ .el-badge__content.is-fixed{
              top: 8px;
              right: 14px;
            }
          }
          .header-content-right-cart-content{
            display: none;
            position: absolute;
            left: 0;
            top: 41px;
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
