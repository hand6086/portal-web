<template>
  <div class="qup-pagination">
    <el-pagination
      :page-size="rows"
      :current-page="page"
      :layout="layout"
      :total="total"
      :total-flag="totalFlag"
      :prev-text="prevText"
      :next-text="nextText"
      :pager-count="5"
      :hide-on-single-page="hideSingle"
      @current-change="handleCurrentChange"
    >
      <div class="pager-slot">
        <span class="pager-slot-text">共{{ pages }}页，到第</span>
        <el-input
          v-model="jumpPage"
          class="pager-input"
          @keyup.enter.native="confirmJump"
          type="number"
          onmousewheel="return false;"
          onkeypress="return( /[\d]/.test(String.fromCharCode(event.which || event.keyCode || window.event.keyCode) ) )"
        ></el-input>
        <span class="pager-slot-text">页</span>
        <el-button class="pager-btn" @click="confirmJump">
          确定
        </el-button>
      </div>
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'QupPagination',
  props: {
    page: {
      type: Number,
      required: true
    },
    rows: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    totalFlag: {
      type: Boolean,
      default: false
    },
    pagerCount: {
      type: Number,
      default: 5
    },
    hideSingle: {
      type: Boolean,
      default: false
    },
    prevText: {
      type: String,
      default: '|< 上一页'
    },
    nextText: {
      type: String,
      default: '下一页 >|'
    }
  },
  data() {
    return {
      jumpPage: null
    }
  },
  computed: {
    pageCount() {
      return this.pagerCount + 1
    },
    startRow() { // 开始条数
      if (this.page > 0) {
        return (this.page - 1) * this.rows + 1
      }
      return 0
    },
    endRow() { // 结束条数
      const endRow = this.page * this.rows
      if (endRow > this.total) {
        return this.total
      } else {
        return endRow
      }
    },
    currentTotal() {
      const endRow = this.page * this.rows
      if (endRow >= this.total || this.totalFlag) {
        // 行数*页数>=返回总数表示已到最后一页，或本来就统计了总数
        return this.total
      } else {
        return (this.total - 1) + '+'// 表示后面还有记录，但没统计出来
      }
    },
    pages() {
      return Math.ceil(this.total / this.rows)
    },
    layout() {
      return 'prev, pager, next, slot'// 分页时可跳转页
    }
  },
  methods: {
    confirmJump() {
      if (this.jumpPage) {
        this.page = this.jumpPage
        this.$emit('current-change', this.jumpPage)
      }
    },
    /**
     * 每页行数发生变化
     * @param val
     */
    handleSizeChange(val) {
      this.$emit('size-change', val)
    },
    /**
     * 页数发生变化
     * @param val
     */
    handleCurrentChange(val) {
      this.jumpPage = val
      this.$emit('current-change', val)
    }
  }
}
</script>
<style scoped lang="scss">
  .qup-pagination{
    $font-fa:PingFangSC-Regular,PingFangSC;
    $qup-color:#16BC83;
    $qup-border:1px solid #16BC83;
    margin: 10px 0!important;
    width: 100%;
    text-align: center;
    font-size:14px;
    font-family:$font-fa;
    font-weight:400;
    color:rgba(51,51,51,1);
    /deep/ .el-pagination .btn-prev,/deep/ .el-pagination .btn-next{
      width: 100px;
      height: 35px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(204,204,204,1);
    }

    /deep/ .el-pagination .btn-next{
      margin-left: 10px;
    }
    .el-pager li.btn-quicknext, .el-pager li.btn-quickprev{
      line-height: 35px;
    }
    /deep/ .el-pager li{
      width:35px;
      height:35px;
      background:rgba(245,245,245,1);
      border:1px solid rgba(204,204,204,1);
      color:rgba(51,51,51,1);
      margin-left: 10px;
      font-size:14px;
      font-family:$font-fa;
      font-weight:400;
      line-height: 35px;
    }
    /deep/ .el-pager li.el-icon{
      border: none;
      background-color: white;
    }
    /deep/ .el-pager li.more +li{
      display: none;
    }
    /deep/ .el-pager li.active+li{
      border-left: 1px solid rgba(204,204,204,1);
    }
    /deep/ .el-pager li.active + li:hover {
      border-left: $qup-border!important;
    }
    /deep/ .el-pager li.active,
    /deep/ .el-pager li:hover,
    /deep/ .el-pagination button:hover {
      color:$qup-color;
      border:$qup-border;
    }
    /deep/ .el-pager li.el-icon:hover{
      border: none;
    }
    /deep/ .el-pagination button{
      color:rgba(51,51,51,1);
    }
    .el-pagination button:disabled,.el-pagination button:disabled:hover{
      border:1px solid rgba(204,204,204,1);
      color:rgba(136,136,136,1);
    }
    .pager-slot{
      margin-left: 20px;
      display: inline-block;
      /deep/ input::-webkit-outer-spin-button,
      /deep/ input::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
      /deep/ input[type='number'] {
        -moz-appearance: textfield;
      }
    }
    .pager-slot-text{
      font-size:14px;
      font-family:$font-fa;
      font-weight:400;
      color:rgba(136,136,136,1);
      height: 35px!important;
      line-height: 35px!important;
    }
    /deep/ .el-pagination button, /deep/ .el-pagination span:not([class*=suffix]){
      min-width: 0;
    }
    .pager-input{
      width:60px;
      height:35px;
      background:rgba(255,255,255,1);
      font-family:$font-fa;
      font-weight:400;
      color:rgba(51,51,51,1);
    }
    /deep/ .el-pagination .el-input__inner{
      height: 35px;
      line-height: 35px;
      border:1px solid rgba(204,204,204,1);
      border-radius: 0;
    }
    /deep/ .el-pagination .el-input__inner:hover,/deep/ .el-pagination .el-input__inner:focus{
      border:$qup-border!important;
    }
    .pager-btn{
      width:72px!important;
      height:35px!important;
      background:rgba(245,245,245,1)!important;
      border:1px solid rgba(204,204,204,1)!important;
      border-radius: 0;
      font-family:$font-fa;
      font-weight:400!important;
      color:rgba(51,51,51,1)!important;
      margin-left: 10px;
    }
    .pager-btn:hover{
      color:$qup-color !important;
      border:$qup-border !important;
    }
  }
</style>
