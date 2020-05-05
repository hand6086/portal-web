<template>
  <div class="category">
    <!--关键字查询-->
    <div class="key-header">
      <div class="super-category">
        全部结果
        <i class="el-icon-arrow-right"></i>
      </div>
      <span>{{ keyWord }}</span>
    </div>
    <div class="key-content-main">
      <div class="category-row" v-if="rows && rows.length>1">
        <div class="left">
          <span class="category-column-key">分类:</span>
        </div>
        <div :class="['right']">
          <div style="line-height: 50px">
            <a
              v-for="(arrItem,index2) in rows"
              :ref="'col'+index"
              :key="index2"
              :class="[categoryColumn,{'column-opacity':showLength<=index2}, {checked: arrItem.id == catId}]"
              @click="columClick(index2,arrItem)"
            >
              {{ arrItem.name }}
            </a>
          </div>
        </div>
        <div v-if="showMoreBtn" class="column-more" @click="rowClick(item,index)">
          更多
          <i class="el-icon-arrow-down"></i>
        </div>
            </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Category',
  props: {
    rows: {
      type: Array
    },
    chooseList: {
      type: Array
    },
    url: {
      type: String
    },
    keyWord: {
      type: String
    }
  },
  data() {
    return {
      catId: 0, // 分类id
      showLength: 100,
      keyWords: '', // 搜索关键字
      closeMore: false, // 更多按钮显示
      categoryColumn: 'category-column-key', // 类名
      cateOpacity: 'cate-opacity',
      ev: [], // 筛选属性值
      showMoreCates: false,
      cateDisabled: true,
      showMoreBtn: false // 是否显示更多按钮
    }
  },
  watch: {
    rows: {
      handler(newVal, oldVal) {
        this.itemLength()
      },
      immediate: true
    }
  },
  computed: {
    /**
     * 是否显示更多按钮
     * */
    isShowMoreBtn() {
      if (this.rows && this.rows.length > 4) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    /**
     * 根据属性值所占屏幕宽度，计算一行应显示的属性值数量
     * */
    itemLength() {
      this.$nextTick(() => {
        const arr = this.$refs.col
        let sumWidth = 0
        if (arr) {
          for (let i = 0; i < arr.length; i++) {
            sumWidth = sumWidth + parseInt(arr[i].clientWidth) + 10
            if (sumWidth > 900) {
              this.showLength = i
              this.showMoreBtn = true
              break
            } else if (i === arr.length - 1) {
              this.showLength = 100
              this.showMoreBtn = false
            }
          }
        }
      })
    },

    /**
     * 类目点击，重新查询商品信息
     * */
    categoryClick(val) {
      this.showMoreCates = false
      this.$emit('url-change', val.url)
    },
    /**
     * 分行数显示类目数据
     * */
    getRows() {
      if (this.closeMore) {
        return this.rows
      } else {
        return this.rows.slice(0, 4)
      }
    },
    handleClose(tag, index) {
      this.$emit('url-change', tag.deleteUrl)
    },
    /**
     * 更多按钮点击事件
     * */
    rowClick() {
      if (this.showLength === 100) {
        this.itemLength()
      } else {
        this.showLength = 100
      }
    },
    /**
     * 属性值点击事件
     * @
     * */
    columClick(columnIndex, column) {
      if (column.url && !column.url.includes('rows')) {
        column.url = column.url + '&rows=60'
      }
      const arrPath = column.url ? column.url.split('?') : ''
      if (arrPath && arrPath.length === 2) {
        window.location.href = '/list.html?' + arrPath[1]
      } else {
        window.location.href = '/list.html?page=1&rows=60'
      }
    },
    /**
     * 获取更多类目信息
     * */
    getMoreCategories(type) {
      this.closeMore = !this.closeMore
    }
  }
}
</script>
<style lang="scss">
  .category {
    $qup-border:1px solid #16BC83;
    $default-border:1px solid #f5f5f5;
    $qup-color:#16BC83;
    $default-color:#333333;
    .key-header{
      height: 30px;
      display: flex;
      font-size: 12px;
      .super-category{
        margin-right: 5px;
      }
      *{
        align-self: center;
      }
    }
    background: #ffffff;
    .key-content-main{
      .content-category{
        border: 1px solid #f5f5f5;
        border-bottom: none;
      }
      .category-row {
        -webkit-transition: height 1000ms linear 500ms;
        width: 100%;
        border-top: 1px solid #ddd;
        height: 50px;
        .category-column-key {
          display: inline-block;
          font-size:12px;
          font-weight:400;
          color:#333333;
          padding: 2px 10px;
          text-align: center;
          cursor: pointer;
          margin-right: 10px;
          line-height: 50px;
        }
        .left{
          text-align: left;
          float: left;
          width: 100px;
          padding-left: 20px;
          height: 48px;
          line-height: 48px;
          .category-column-key{
            font-weight: 600;
          }
        }
        .right{
          display: flex;
          flex-wrap:wrap;
          line-height: 50px;
          width: 900px;
          float: left;
          justify-content: flex-start;
          text-align: left;
          padding-left: 20px;
          *{
            align-self: center;
          }
          .category-column-key{
            line-height: 22px;
            font-size: 12px;
            &:hover{
              color: $theme-color;
            }
          }
          .category-column-key:first-child{
            background-color: #16BC83;
            color: #ffffff;
            margin-right: 20px;
            line-height: 22px;
          }
        }

        .column-more{
          cursor: pointer;
          float: right;
          font-size: 12px;
          line-height: 50px;
        }
        .column-opacity{
          margin-right: 15px;
          display: none;
        }
        .checked{
          background-color: #16BC83!important;
          color: #ffffff!important;
        }
        .category-column-key .checked:hover{
          color: #ffffff!important;
        }
        .uncheck{
          color:#333333!important;
          background: #ffffff!important;
        }
      }
      /*.category-row:last-child{*/
      /*  border-bottom: none!important;*/
      /*}*/
      .category-row>*{
        align-self: center;
      }
    }
    .category-more{
      text-align: center;
      font-size:12px;
      font-family:PingFangSC-Regular,PingFangSC;
      font-weight:400;
      color:rgba(51,51,51,1);
      line-height:17px;
      letter-spacing:1px;
      padding-bottom: 20px;
      div{
        display: inline-block;
        cursor: pointer;
        width:160px;
        height:30px;
        line-height: 30px;
        background:rgba(245,245,245,1);
      }
      .el-icon-arrow-down{
        font-size: 14px;
        vertical-align: middle;
      }
    }
  }

</style>
