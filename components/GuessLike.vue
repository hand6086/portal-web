<template>
  <div class="guesslike">
    <h3 class="guesslike-title">
      <img src="../static/icon/icon_like.png" width="320px" height="22px">
      <!--<span class="guesslike-title-line"></span><i class="el-icon-star-off guesslike-title-icon"></i>猜你喜欢<span class="guesslike-title-line"></span>-->
    </h3>
    <div class="guesslike-content">
      <el-row :gutter="20">
        <el-col v-for="(item,index) in guessLike" :key="index" :span="5">
          <div class="guesslike-content-item">
            <nuxt-link :to="`/item/${item.productId}.html`" target="_blank">
              <div class="guesslike-content-item-img">
                <img :src="`${$store.state.imgServer}${item.skuPic}_400x400.png`" width="100%" height="100%">
              </div>
              <h1 class="guesslike-content-item-title">
                {{ item.productName }}
              </h1>
              <p class="guesslike-content-item-cny">
                ¥{{ item.skuPrice }}
              </p>
            </nuxt-link>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GuessLike',
  data() {
    return {
      // guessLike: []
    }
  },
  computed: {
    guessLike() {
      return this.$store.state.guessLike.list
    }
  }
  /* created() {
    // 猜你喜欢产品数据获取
    if (this.$store.state.guessLike && this.$store.state.guessLike.list) {
      this.guessLike = this.$store.state.guessLike.list
    } else {
      this.$axios.get('/portal/api/web/v1/pmsProduct/guessYouLike').then((data) => {
        // return data
        this.guessLike = data.data
      }).catch((e) => {
        // return { data: [{}] }
        this.guessLike = [{}]
      })
    }
  } */
}
</script>

<style scoped lang="scss">
.guesslike{
  .guesslike-title{
    margin: 22px 0 16px;
    text-align: center;
    font-size: 24px;
    color: #888888;
    .guesslike-title-line{
      display: inline-block;
      width: 80px;
      height: 2px;
      background: #888888;
      margin-bottom: 6px;
      &:first-child{
        margin-right: 15px;
      }
      &:last-child{
        margin-left: 15px;
      }
    }
    .guesslike-title-icon{
      margin-right: 10px;
      color: $theme-color;
    }
  }
  .guesslike-content{
    width: 1200px;
    margin: 0 auto;
    .el-col-5 {
      width: 20%;
    }
    .guesslike-content-item{
      height: 300px;
      background: #fff;
      padding: 20px;
      margin-bottom: 20px;
      border: 1px solid transparent;
      &:hover{
        border-color: $theme-color;
        box-shadow: 2px 2px 5px rgba(00,00,00,0.1);
      }
      .guesslike-content-item-img{
        height: 182px;
      }
      .guesslike-content-item-title{
        font-size: 12px;
        font-weight: normal;
        color: #333;
        margin: 10px 0;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        height: 32px;
      }
      .guesslike-content-item-cny{
        font-size: 18px;
        color: #FF4F4F;
      }
    }
  }
}
</style>
