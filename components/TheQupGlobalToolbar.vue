<!--
页面右侧工具栏
@author yrf
@created 2019/11/06 9:44
-->
<template>
  <div class="global-toolbar-container">
    <div class="toolbar">
      <div class="group-1">
        <!-- 会员中心 -->
        <div class="item personal-center">
          <el-tooltip effect="dark" content="会员中心" placement="left">
            <a href="/user.html">
              <img src="../assets/images/thetoolbar/icon_personal@2x.png"/>
            </a>
          </el-tooltip>
        </div>
        <div class="divider"></div>
        <!-- 购物车 -->
        <div class="item shop-cart">
          <div id="globalShopCartImg" @click="changeShowCart">
            <img src="../assets/images/thetoolbar/icon_shopcar1@2x.png"/>
            <p>购</p>
            <p>物</p>
            <p>车</p>
            <div class="shop-cart-count">{{ $store.state.shopCart.count }}</div>
          </div>
        </div>
        <div class="divider"></div>
        <!-- 预约 -->
        <div class="item appointment">
          <el-tooltip effect="dark" content="我的预约" placement="left">
            <a href="/user/appointment.html">
              <img src="../assets/images/thetoolbar/icon_appointment@2x.png"/>
            </a>
          </el-tooltip>
        </div>
        <div class="divider"></div>
        <!-- 客服 -->
        <div class="item service">
          <el-tooltip effect="dark" content="联系客服" placement="left">
            <a>
              <img src="../assets/images/thetoolbar/icon_service@2x.png"/>
            </a>
          </el-tooltip>
        </div>
      </div>
      <div class="group-2">
        <!-- 二维码 -->
        <div class="item qrcode">
          <el-tooltip effect="dark" content="下载二维码" placement="left">
            <a>
              <img src="../assets/images/thetoolbar/icon_qrcode@2x.png"/>
            </a>
          </el-tooltip>
        </div>
        <div class="divider"></div>
        <!-- 回到顶部 -->
        <div class="item top">
          <el-tooltip effect="dark" content="回到顶部" placement="left">
            <div @click="goTop">
              <img src="../assets/images/thetoolbar/icon_top@2x.png"/>
            </div>
          </el-tooltip>
        </div>
        <div class="divider"></div>
        <!-- 反馈 -->
        <div class="item feedback">
          <el-tooltip effect="dark" content="反馈" placement="left">
            <a>
              <img src="../assets/images/thetoolbar/icon_feedback@2x.png"/>
            </a>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div :class="{hide: !showCart}" class="shop-cart-list">
      <div>
        <el-scrollbar class="scroll-class" wrap-class="warp-class" :native="false">
          <div v-for="item in cartList" :key="item.id" class="goods-item">
            <!-- 商品图片 -->
            <div class="goods-img">
              <nuxt-link :to="'/item/'+item.productId+'.html'" target="_blank" :title="item.productName">
                <img :src="$store.state.imgServer+item.productPic+'_80x80.jpg'" :alt="item.productName">
              </nuxt-link>
            </div>
            <!-- 商品标题 -->
            <div class="goods-msg">
              <div class="p-name">
                <nuxt-link :to="'/item/'+item.productId+'.html'" target="_blank" :title="item.productName">
                  {{ item.productName }}
                </nuxt-link>
              </div>
              <div class="p-sub-text">
                <span class="price">￥{{ item.productPrice }}</span>
                <span class="qty">x{{ item.productQuantity }}</span>
                <el-button type="text" class="del-btn" @click="removeFromCart(item)">删除</el-button>
              </div>
            </div>
          </div>
          <div v-if="!cartList.length" class="no-list-tip">
            <img src="../assets/images/img_empty_shopping_cart.png"/>
            <p>购物车中还没有商品，赶紧选购吧！</p>
          </div>
        </el-scrollbar>
        <div class="shop-cart-footer">
          <div class="count-text">共<span class="emphasize"> {{ $store.state.shopCart.num }} </span>件商品，共计<span class="emphasize"> ￥{{ $store.state.shopCart.price }}</span></div>
          <a href="/cart.html" target="_blank">
            <div class="goto-cart-btn">去购物车结算</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheQupGlobalToolbar',
  data() {
    return {
      scrollTop: '',
      goTopShow: false,
      showCart: false
    }
  },
  computed: {
    cartList() {
      return this.$store.state.shopCart.list
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    // 点击其他区域时收起购物车面板
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.showCart = false
      }
    })
    window.vm = this
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    /**
     * desc 根据滚动条位置判断是否显示返回顶部按钮
     * @author wangyue
     * @date 2019/10/16
     * @params
     */
    handleScroll() {
      this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (this.scrollTop > 500) {
        this.goTopShow = true
      } else {
        this.goTopShow = false
      }
    },
    /**
     * desc 返回顶部方法
     * @author wangyue
     * @date 2019/10/16
     * @params
     */
    goTop() {
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
    },
    /**
     * 从购物车中删除商品
     * @param item
     */
    removeFromCart(item) {
      this.$store.dispatch('shopCart/REMOVE', { ids: [item.id], ctx: this })
    },
    changeShowCart() {
      this.showCart = !this.showCart
      if (this.showCart) {
        this.$store.dispatch('shopCart/GET_LIST', this)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.global-toolbar-container{
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 2001;
  .toolbar{
    height: 100%;
    width: 35px;
    padding-top: 220px;
    background: #555555;
    position: relative;
    float: left;
    .group-2{
      position: absolute;
      bottom: 0;
      width: 100%;
    }
    .item{
      padding: 10px 0;
      text-align: center;
      color: #fff;
      font-size: 12px;
      &:hover{
        background: $theme-color;
      }
      img{
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
      &.shop-cart{
        .shop-cart-count{
          border-radius: 8px;
          background: #F15643;
          color: #fff;
          font-size: 10px;
          padding: 2px 4px;
          width: 20px;
          margin: 4px auto;
        }
        p{
          color: #fff;
          line-height: 18px;
          cursor: pointer;
        }
      }
    }
    .divider{
      width: 24px;
      height: 1px;
      background: #777777;
      margin: auto;
    }
  }
  .shop-cart-list{
    width: 300px;
    height: 100%;
    float: left;
    background: #ffffff;
    transition: .3s;
    &.hide{
      width: 0;
      overflow: hidden;
    }
    >div{
      width: 300px;
      height: 100%;
    }
    .scroll-class{
      height: calc(100% - 74px);
    }
    /deep/ .warp-class{
      overflow-x: hidden;
    }
    .goods-item{
      padding: 20px 0;
      margin: 0 10px;
      border-bottom: 1px dashed #ddd;
      &:last-child{
        border-bottom: 0;
      }
      .goods-img{
        position: relative;
        float: left;
        width: 80px;
        height: 80px;
        *border: 1px solid #eee;
        margin-right: 10px;
        background: #fff;
        padding: 0;
        text-align: center;
        overflow: hidden;
        .not-support-sale{
          display: none;
          position: absolute;
          bottom: 0;
          font-size: 12px;
          background: black;
          opacity: 0.5;
          color: white;
          text-align: center;
          width: 100%;
          height: 100%;
          background-size: 40px 40px;
          background-repeat: no-repeat;
          background-position: 20px;
          &.invalid{
            display: block;
            // background-image: url("./img/icon_invalid@2x.png");
          }
          &.soldout{
            display: block;
            // background-image: url("./img/img_soldout@2x.png");
          }
        }
      }
      .goods-msg{
        &:after{
          content: "";
          clear: both;
          display: block;
        }
        .p-name{
          height: 50px;
          font-size: 12px;
          color: $theme-font-color;
          overflow: hidden;
          a:hover{
            color: $theme-color;
          }
        }
        .p-sub-text{
          font-size: 12px;
          margin-top: 16px;
          &:after{
            content: '';
            display: block;
            clear: both;
          }
          .price{
            color: #F15643;
            margin-right: 16px;
          }
          .qty{
            color: #888888;
          }
          .del-btn{
            float: right;
            padding-top: 0;
          }
        }
      }
    }
    .no-list-tip{
      text-align: center;
      margin-top: 50px;
      img{
        width: 40px;
      }
      p{
        margin-top: 20px;
        color: #888888;
        font-size: 14px;
      }
    }
    .shop-cart-footer{
      font-size: 12px;
      background: #f5f5f5;
      position: relative;
      padding: 8px 10px;
      text-align: center;
      .emphasize{
        color: #F15643;
      }
      .goto-cart-btn{
        width: 100%;
        margin-top: 10px;
        padding: 8px 16px;
        color: #ffffff;
        background: $theme-color;
      }
    }
  }
}
</style>
