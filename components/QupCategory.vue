<template>
  <div class="category">
    <!--类目搜索-->
    <div class="category-header">
      <!--上级类目-->
      <div class="super-category">
        {{ superCategory }}
        <i class="el-icon-arrow-right"></i>
      </div>
      <div class="item-categoty">
        <!--平级类目-->
        <div class="head-cate">
          <div
            :class="['category-selected',{active :showMoreCates}]"
            @mouseover="showMoreCates = true"
            @mouseout="showMoreCates = false"
          >
          <span v-for="(peer,pIndex) in categoryPeersDtos" v-show="peer.isChoose" :key="pIndex">
            {{ peer.name }}
            <i v-show="!showMoreCates" class="el-icon-arrow-down"></i>
            <i v-show="showMoreCates" class="el-icon-arrow-up"></i>
          </span>
          </div>
          <div
            v-show="showMoreCates"
            class="more-cate"
            style="left:0px"
            @mouseover="showMoreCates = true"
            @mouseout="showMoreCates = false"
          >
            <el-row>
              <el-col v-for="(peer,pIndex) in categoryPeersDtos" :key="pIndex" :span="8">
                <a class="head-cate-item" :href="'/list.html?cat='+peer.id">{{ peer.name }}</a>
              </el-col>
            </el-row>
          </div>
        </div>
        <div v-for="(tag,tIndex) in chooseItemList" :key="tIndex">
          <!--              已选属性-->
          <div v-if="tag.pmsProductScreenDTOS && tag.pmsProductScreenDTOS.length>0" class="head-cate">
            <i class="el-icon-arrow-right"></i>
            <div
              :class="['category-selected',{active :showMoreCates}]"
              @mouseover="showMoreCates = true"
              @mouseout="showMoreCates = false"
            >
            <span
              v-for="(subTag,sIndex) in tag.pmsProductScreenDTOS"
              v-show="subTag.isChoose"
              :key="sIndex"
            >
              {{ subTag.name }}
              <i v-show="!showMoreCates" class="el-icon-arrow-down"></i>
              <i v-show="showMoreCates" class="el-icon-arrow-up"></i>
            </span>
            </div>
            <div
              v-show="showMoreCates"
              class="more-cate"
              @mouseover="showMoreCates = true"
              @mouseout="showMoreCates = false"
            >
              <el-row>
                <el-col
                  v-for="(subTag,sIndex) in tag.pmsProductScreenDTOS"
                  v-show="subTag.isChoose"
                  :key="sIndex"
                  :span="8"
                >
                  <span class="head-cate-item" @click="subCategoryClick(subTag)">{{subTag.name}}</span>
                </el-col>
              </el-row>
            </div>
          </div>
          <!--      已选择的属性值-->
          <div v-else class="category-tags">
            <i class="el-icon-arrow-right"></i>
            <el-tag
              :key="tag.name"
              closable
              :type="tag.type"
              @close="handleClose(tag)"
            >
              <span>{{ tag.parentName }}: </span>
              <span style="color: #F15643;margin-left: 3px">{{ tag.name }}</span>
            </el-tag>
          </div>
        </div>

        <div v-if="isShowClear" class="clear-all" @click="clearAttribute">
          清空选择
        </div>
      </div>
    </div>
    <div style="clear: both;"></div>

    <div class="content-main">
      <div class="content-category">
        <el-row class="category-row"  v-for="(item,index) in getRows()" :key="index">
          <div class="left">
            <a class="category-column">{{ item.name }}:</a>
          </div>
          <div :class="['right']">
            <div style="line-height: 50px">
              <a
                v-for="(arrItem,index2) in item.pmsProductScreenDTOS"
                :ref="'col'+index"
                :key="index2"
                :class="[categoryColumn,{'column-opacity':ismoreList[index].showLength<=index2}, {checked: arrItem.isChoose},{uncheck:!arrItem.isChoose}]"
                @click="columClick(index,item,index2,arrItem)"
              >
                {{ arrItem.name }}
              </a>
            </div>
          </div>
          <div v-if="ismoreList[index].showMoreBtn" class="column-more" @click="rowClick(item,index)">
            更多
            <i class="el-icon-arrow-down"></i>
          </div>
        </el-row>

      </div>

    </div>
    <div v-if="isShowMoreBtn" class="category-more">
      <div v-if="closeMore" @click="getMoreCategories">
        <span>收起</span>
        <i class="el-icon-arrow-up"></i>
      </div>
      <div v-else @click="getMoreCategories">
        <span>更多筛选条件</span>
        <i class="el-icon-arrow-down"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Category',
  props: {
    param: {
      type: Object
    },
    rows: {
      type: Array
    },
    categorySuperiosDtos: {
      type: Array
    },
    categoryPeersDtos: {
      type: Array
    },
    chooseList: {
      type: Array
    },
    chooseItemList: {
      type: Array
    },
    url: {
      type: String
    },
    clearAttributeUrl: {
      type: String
    }
  },
  data() {
    return {
      closeMore: false, // 更多按钮显示
      categoryColumn: 'category-column', // 类名
      cateOpacity: 'cate-opacity',
      ev: [], // 筛选属性值
      showMoreCates: false,
      cateDisabled: true,
      ismoreList: []
    }
  },
  watch: {
    rows: {
      handler(newVal, oldVal) {
        if (this.rows) {
          this.rows.forEach((item, index) => {
            this.ismoreList.push({ showLength: 100, showMoreBtn: false })
            this.itemLength(item, index)
          })
        }
      },
      immediate: true
    }
  },

  computed: {
    /**
     * 是否显示更多按钮
     * */
    isShowMoreBtn() {
      if (this.rows && this.rows.length > 3) {
        return true
      } else {
        return false
      }
    },
    isShowClear() {
      if ((this.chooseList && this.chooseList.length) > 0 || (this.chooseItemList && this.chooseItemList.length > 0)) {
        return true
      } else {
        return false
      }
    },
    superCategory() {
      if (this.categorySuperiosDtos && this.categorySuperiosDtos.length > 0) {
        return this.categorySuperiosDtos[0].name
      }
      return '全部结果'
    }
  },
  methods: {
    itemLength(item, rowIndex) {
      this.$nextTick(() => {
        const arr = this.$refs['col' + rowIndex]
        let sumWidth = 0
        if (arr) {
          for (let i = 0; i < arr.length; i++) {
            sumWidth = sumWidth + parseInt(arr[i].clientWidth) + 20
            if (sumWidth > 1000 || arr[i].clientWidth === 0) {
              this.ismoreList[rowIndex].showLength = i
              this.ismoreList[rowIndex].showMoreBtn = true
              break
            } else if (i === arr.length - 1) {
              item = Object.assign({}, item, {
                showLength: 100,
                showMoreBtn: false
              })
            }
          }
        }
        return item
      })
    },
    /**
     * 清空选中
     * */
    clearAttribute() {
      const arrPath = this.clearAttributeUrl.split('?')
      if (arrPath && arrPath.length === 2) {
        window.location.href = '/list.html?' + arrPath[1]
      } else {
        window.location.href = '/list.html?page=1&rows=60'
      }
      // this.$emit('url-change', this.clearAttributeUrl)
    },
    subCategoryClick(val) {
      this.$emit('url-change', val.reqUrl)
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
      } else if (this.rows) {
        return this.rows.slice(0, 3)
      } else {
        return []
      }
    },
    /**
     * 取消某个属性值的筛选
     * */
    handleClose(tag, index) {
      const arrPath = tag.deleteUrl.split('?')
      if (arrPath && arrPath.length === 2) {
        window.location.href = '/list.html?' + arrPath[1]
      } else {
        window.location.href = '/list.html?page=1&rows=60'
      }
    },
    /**
     * 更多按钮点击事件，获取更多属性值
     * */
    rowClick(item, index) {
      if (this.ismoreList[index].showLength === 100) {
        this.itemLength(item, index)
      } else {
        this.ismoreList[index].showLength = 100
      }
    },
    /**
     * 属性值点击事件
     * @
     * */
    columClick(rowIndex, row, columnIndex, column) {
      const arrPath = column.reqUrl.split('?')
      if (arrPath && arrPath.length === 2) {
        window.location.href = '/list.html?' + arrPath[1]
      } else {
        window.location.href = '/list.html?page=1&rows=60'
      }
    },
    /**
     * 获取更多类目信息
     * */
    getMoreCategories() {
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
    .category-header{
      .super-category{
        margin-right: 5px;
        font-size: 12px;
        text-align: left;
        align-self: center;
        float: left;
        line-height: 25px;
      }
      .item-categoty{
        width: 1050px;
        line-height: 25px;
        display: inline-block;
        text-align: left;
        align-self: center;
        float: left;
        div{
          display: inline-block;
        }
        .el-icon-arrow-right{
          font-size: 12px;
        }
        .category-tags{
          .el-icon-arrow-right{
            margin-left: 5px;
          }
        }
      }
      .head-cate{
        position: relative;
        display: flex;
        *{
          align-self: center;
        }
      }
      .category-selected{
        height: 25px;
        position: relative;
        border: 1px dotted #cccccc;
        color: $default-color;
        background: #ffffff;
        cursor: pointer;
        z-index: 2;
        display: flex;
        padding: 0 10px;
        font-size: 12px;
        *{
          align-self: center;
        }
      }

      .head-cate-item{
        cursor: pointer;
        font-size: 12px;
      }
      .head-cate-item:hover{
        color: $qup-color!important;
      }
      .catedisable{
        cursor:  not-allowed;
        color: #888888;
      }
      .catedisable:hover{
        color: #888888 !important;
      }

      .active{
        border:$qup-border;
        color: $default-color;
        border-bottom: 1px solid #ffffff;
        z-index:10;
        .el-icon-arrow-up{
          color: $qup-color!important;
        }
      }
      .el-tag{
        background:rgba(255,246,245,1);
        border-radius: 0;
        border: 1px dotted #F15643;
        padding:0px 10px;
        line-height: 22px;
        height: 25px;
        color: #F15643!important;
        cursor: pointer;
      }
      .el-tag .el-tag__close {
        color: #F15643;
        height: 14px;
        width: 14px;
        line-height: 14px;
        border: 1px solid #F15643;
        margin-left: 5px;
        margin-right: 5px;
      }
      .el-tag:hover{
        .el-tag__close:hover{
          color: #F15643!important;
          background:rgba(255,246,245,1);
        }
      }
      .clear-all{
        color: $default-color;
        font-size: 12px;
        margin-left: 20px;
        cursor: pointer;
      }
      .clear-all:hover{
        color: $qup-color;
      }
      .more-cate{
        padding: 10px 0 10px 8px;
        position: absolute;
        left: 22px;
        top: 24px;
        border: $qup-border;
        background-color: #fff;
        width: 300px;
        color: $default-color;
        z-index: 3;
        .el-row{
          width: 300px;
          padding: 0 10px;
          .el-col-8 {
            text-align: left;
          }
        }
        span{
          font-size: 12px;
          margin-left: 10px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        span:hover{
          color: $qup-color;
        }
      }
      .more-cate:first-child{
        left: 5px!important;
      }
      .cate-opacity:before{
        opacity: 0!important;
      }
    }
    background: #ffffff;
    .content-main{
      margin-top: 10px;
      .content-category{
        border: 1px solid #dddddd;
        border-bottom: 0;
      }
      .category-row {
        -webkit-transition: height 1000ms linear 500ms;
        border-bottom: 1px solid #dddddd;
        width: 100%;
        .category-column {
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
          line-height: 50px;
          float: left;
          width: 150px;
          padding-left: 20px;
          background: #f5f5f5;
          .category-column{
            font-weight: 600;
          }
        }
        .right{
          display: flex;
          flex-wrap:wrap;
          width: 1000px;
          float: left;
          justify-content: flex-start;
          text-align: left;
          line-height: 50px;
          padding: 0 20px;
          *{
            align-self: center;
          }
          .category-column{
            line-height: 22px;
            font-size: 12px;
            &:hover{
              color: $theme-color!important;
            }
          }
          .category-column:first-child{
            background-color: #16BC83;
            color: #ffffff;
            margin-right: 20px;
            line-height: 22px;
          }
        }

        .column-more{
          cursor: pointer;
          line-height: 50px;
          font-size: 12px;
          float: right;
        }
        .column-opacity{
          margin-right: 15px;
          display: none;
        }
      }
      .checked{
        background-color: $theme-color!important;
        color: #ffffff!important;
      }
      .uncheck{
        color:#333333!important;
        background: #ffffff!important;
      }
      .category-row>*{
        align-self: center;
      }
    }
    .category-more{
      text-align: center;
      font-size:12px;
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
