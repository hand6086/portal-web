<!--
商品列表排序组件
@author zhaohuanling
@created 2019/10/14 10:32
-->
<template>
  <div class="prod-search">
    <div style="width:80px" :class="['search-item',{'item-active':sortType=='sort_sort'}]" @click="sortBySort">
      <span>人气</span>
    </div>
    <div :class="['search-item',{'item-active':sortType=='sort_price'}]" @click="sortByPrice">
      <span>价格</span>
      <div class="right-icon">
        <i :class="['el-icon-caret-top',{selected:sort=='sort_price_asc'}]"></i>
        <i :class="['el-icon-caret-bottom',{selected:sort=='sort_price_desc'}]"></i>
      </div>
    </div>
    <div :class="['search-item',{'item-active':sortType=='sort_sale'}]" @click="sortBySale">
      <span>销量</span>
      <div class="right-icon">
        <i :class="['el-icon-caret-top',{selected:sort=='sort_sale_asc'}]"></i>
        <i :class="['el-icon-caret-bottom',{selected:sort=='sort_sale_desc'}]"></i>
      </div>
    </div>
    <div
      :class="['price-group',{actived: showBtn}]"
      @mouseover="showBtn = true"
      @mouseout="showBtn = false"
    >
      <span>价格区间：</span>
      <div class="price-input">
        <el-input
          v-model="lowestPrice"
          type="number"
          onmousewheel="return false;"
          onkeypress="return( /[\d]/.test(String.fromCharCode(event.which || event.keyCode || window.event.keyCode) ) )"
          @keyup.enter.native="changeExprice"
        >
        </el-input>
        <span>¥</span>
      </div>
      <span class="price-line">—</span>
      <div
        class="price-input"
        @mouseover="showBtn = true"
        @mouseout="showBtn = false"
      >
        <el-input
          v-model="heighPrice"
          type="number"
          onmousewheel="return false;"
          onkeypress="return( /[\d]/.test(String.fromCharCode(event.which || event.keyCode || window.event.keyCode) ) )"
          @keyup.enter.native="changeExprice"
        >
        </el-input>
        <span>¥</span>
      </div>
      <el-button type="primary" v-show="showBtn" @click="changeExprice">确定</el-button>
      <el-button v-show="showBtn" @click="cleanPrice">清空</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProdSearch',
  props: {
    sortOrder: {
      type: String,
      default: 'sort_sort_desc'
    },
    heighest: {
      type: String,
      default: ''
    },
    lowest: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      sort: this.sortOrder,
      showBtn: false,
      exprice: '', // 价格区间
      filratePrice: '',
      heighPrice: this.heighest,
      lowestPrice: this.lowest
    }
  },
  computed: {
    sortType() {
      if (this.sort.includes('sort_sale')) {
        return 'sort_sale'
      } else if (this.sort.includes('sort_price')) {
        return 'sort_price'
      } else {
        return 'sort_sort'
      }
    }
  },
  methods: {
    filPrice() {
      let heighPrice = ''
      let lowestPrice = ''
      // 当最高价小于最低价时，自动更改两者价格
      if (this.lowestPrice && this.heighPrice && parseFloat(this.lowestPrice) > parseFloat(this.heighPrice)) {
        const temp = this.lowestPrice
        this.lowestPrice = this.heighPrice
        this.heighPrice = temp
      }
      if (!this.lowestPrice || this.lowestPrice === '') {
        lowestPrice = 0
      } else {
        lowestPrice = this.lowestPrice
      }
      if (!this.heighPrice || this.heighPrice === '') {
        heighPrice = '*'
      } else {
        heighPrice = this.heighPrice
      }
      this.filratePrice = lowestPrice + '_' + heighPrice
    },
    exPrices() {
      let lowestPrice = 'M'
      let heighPrice = 'L'
      // 当最高价小于最低价时，自动更改两者价格
      if (this.lowestPrice && this.heighPrice && parseFloat(this.lowestPrice) > parseFloat(this.heighPrice)) {
        const temp = this.lowestPrice
        this.lowestPrice = this.heighPrice
        this.heighPrice = temp
      }
      if (this.lowestPrice && this.lowestPrice !== '') {
        lowestPrice = lowestPrice + this.lowestPrice
      } else {
        lowestPrice = 'M0'
      }
      if (this.heighPrice && this.heighPrice !== '') {
        heighPrice = heighPrice + this.heighPrice
      } else {
        heighPrice = 'L*'
      }
      this.exprice = lowestPrice + heighPrice
    },
    /**
     * 清空价格选择
     * **/
    cleanPrice() {
      this.lowestPrice = ''
      this.heighPrice = ''
      this.changeExprice()
    },
    /**
     * 按照价格区间查找商品
     * */
    changeExprice() {
      this.exPrices()
      this.filPrice()
      this.$emit('high-change', this.heighPrice)
      this.$emit('low-change', this.lowestPrice)
      this.$emit('filrate-change', this.filratePrice)
      this.$emit('exprice-change', this.exprice)
    },
    /**
     * 根据销量排序
     * **/
    sortBySale() {
      if (this.sort.includes('sort_sale')) {
        if (this.sort === 'sort_sale_desc') {
          this.sort = 'sort_sale_asc'
        } else {
          this.sort = 'sort_sale_desc'
        }
      } else {
        this.sort = 'sort_sale_desc'
      }
      this.$emit('sort-change', this.sort)
    },
    /**
     * 根据销量排序
     * **/
    sortBySort() {
      this.sort = 'sort_sort_desc'
      this.$emit('sort-change', this.sort)
    },
    /**
     * 根据价格排序
     */
    sortByPrice() {
      if (this.sort.includes('sort_price')) {
        if (this.sort === 'sort_price_desc') {
          this.sort = 'sort_price_asc'
        } else {
          this.sort = 'sort_price_desc'
        }
      } else {
        this.sort = 'sort_price_asc'
      }
      this.$emit('sort-change', this.sort)
    }
  }
}
</script>
<style scoped lang="scss">
  .prod-search{
    background: #f5f5f5;
    padding: 10px 20px!important;
    height: 50px;
    display: flex;
    *{
      align-self: center;
      font-size: 12px;
      font-weight: 400;
    }
    .search-item{
      padding: 0 25px;
      border:1px solid rgba(204,204,204,1);
      line-height: 30px;
      height: 30px;
      display: flex;
      width: 98px;
      cursor: pointer;
      background: $background-font-color;
      span{
        height: 100%;
      }
      *{
        align-self: center;
      }
      [class*=" el-icon-"], [class^=el-icon-]{
        display: block;
        width: 8px;
        height: 5px;
      }
      .el-icon-caret-top{
        margin-top: 4px;
      }
      .el-icon-caret-bottom{
        margin-top: 2px;
      }
      .el-icon-caret-top:before,.el-icon-caret-bottom:before{
        font-size: 8px;
        color: #bebebd;
      }
      .selected:before{
        color: white;
      }
    }
    .search-item:hover{
      color: #F15643;
    }
    .item-active{
      background: #F15643;
      border-color: #F15643;
      color: #ffffff!important;
    }
    item-active:hover{
      color: #ffffff!important;
    }
    .search-item:first-child{
      justify-content: center;
    }
    .search-item:nth-child(2){
      border-left: 0;
      border-right: 0;
    }
    .right-icon{
      display: inline-block;
      height: 28px;
      margin-left: 10px;
    }
    .price-group{
      margin-left: 20px;
      padding: 0 20px 0 10px;
      background: #f5f5f5;
      display: flex;
      span{
        background: #f5f5f5;
        line-height: 30px\9;
      }
      /deep/ .el-input{
        width: 100px;
      }
      /deep/ .el-button{
        padding: 7px 20px;
        border-radius: 0px;
        margin-left: 10px;
      }
      /deep/ .el-input__inner{
        height: 30px;
        border-color: #CCCCCC;
      }
      /deep/ .el-input__inner:focus{
      border-color: $theme-color!important
      }
      .price-input{
        width: 100px;
        height: 30px;
        position: relative;
        display: flex;
        /deep/ input::-webkit-outer-spin-button,
        /deep/ input::-webkit-inner-spin-button {
          -webkit-appearance: none;
        }
        /deep/ input[type='number'] {
          -moz-appearance: textfield;
        }
        /deep/ input{
          line-height: 30px\9;
          @media screen and(-ms-high-contrast:active),(-ms-high-contrast:none){
            &{
              line-height: 30px;
            }
          }
        }
        span{
          position: absolute;
          left:5px;
          color: #888888;
          font-size: 12px;
          line-height: 30px\9;
          background: none!important\9;
          @media screen and(-ms-high-contrast:active),(-ms-high-contrast:none){
            &{
              line-height: 30px;
              background: none!important;
            }
          }
        }
      }
      .price-line{
        color: #CCCCCC;
        background: #f5f5f5;
        margin: 0 5px;
        line-height: 30px\9;
      }
    }
    .actived{
      background: #ffffff;
      height: 50px;
      box-shadow:0px 2px 4px 0px rgba(51,51,51,0.15);
      border:1px solid rgba(221,221,221,1);
      *{
        background: #ffffff;
      }
      span{
        background: #ffffff!important;
      }
      .el-button--primary{
        background: $theme-color;
      }
    }
  }
</style>
