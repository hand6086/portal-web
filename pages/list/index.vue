<!--
商品列表页面
@author zhaohuanling
@created 2019/10/12 10:32
-->
<template>
  <div class="qup-list-content">
    <div class="list-content">
      <navigation :under-border="true"></navigation>
      <div class="content-main">
        <!--类目筛选查询-->
        <div class="content-category">
          <qup-category
            v-if="!isKeyWords"
            :rows="propertyList"
            :choose-list="chooseList"
            :choose-item-list="chooseItemList"
            :category-superios-dtos="categorySuperiosDtos"
            :category-peers-dtos="categoryPeersDtos"
            :url="url"
            :clear-attribute-url="clearAttributeUrl"
          >
          </qup-category>
          <keyWordsSearch
            v-if="isKeyWords"
            :rows="propertyList"
            :key-word="keyword"
            :url="url"
          ></keyWordsSearch>
        </div>
        <div style="clear: both;"></div>

        <!--排序-->
        <!--<div class="content-sort">-->
          <!--<qup-prod-search-->
            <!--:lowest="mPrice"-->
            <!--:heighest="lPrice"-->
            <!--:sort-order="sort"-->
            <!--@exprice-change="expriceChange"-->
            <!--@sort-change="sortChange"-->
          <!--&gt;-->
          <!--</qup-prod-search>-->
        <!--</div>-->
        <!--商品列表-->
        <div v-if="rows && rows.length>0" class="prod-list">
          <el-row v-for="(line,index) in getLines(rows)" :key="index" :gutter="20" class="prod-row">
            <el-col v-for="(item) in line" :key="item.productId" :span="5">
              <div class="prod-item">
                <a href="###">
                  <div class="item-img" :data="item.imgType" @click="changeImg(item)">
                    <img
                      :class="{'img-active':item.imgType === 'display'}"
                      :src="item.productDetails[0].productPic"
                      :alt="item.productName"
                    >
                    <img
                      :class="{'img-active':item.imgType !== 'display'}"
                      :src="item.productDetails[1].productPic"
                      :alt="item.productName"
                    >
                  </div>
                  <div class="item-price">
                    ¥{{ item.price }}
                  </div>
                  <div class="item-des">
                    {{ item.productName }}
                  </div>
                  <div class="item-des">
                    {{ item.comments }}
                  </div>
                </a>
                <div style="margin-top: 10px" class="prod-tags">
                  <span v-for="(tag,tagIndex) in item.pmsProductLabelDtos" :key="tagIndex" :class="['item-tag',tag.className]">
                    {{ tag.labelName }}
                  </span>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div v-else class="no-data-tip">
          暂未查询到{{ keyword }}相关商品数据
        </div>
        <!--分页-->
        <qup-pagination
          :page="page"
          :rows="pageSize"
          :total="total"
          :total-flag="totalFlag"
          @current-change="setPage"
        >
        </qup-pagination>
      </div>
    </div>
    <!--<div class="guess-like">-->
      <!--&lt;!&ndash;猜你喜欢&ndash;&gt;-->
      <!--<GuessLike></GuessLike>-->
    <!--</div>-->
  </div>
</template>

<script>
import QupCategory from '../../components/QupCategory'
import Navigation from '../../components/Navigation'
import QupPagination from '../../components/QupPagination'
// import QupProdSearch from '../../components/QupProdSearch'
// import GuessLike from '../../components/GuessLike'
import keyWordsSearch from '../../components/list/keyWordsSearch'
import udid from '../../mixins/udid'
// import TheQupGlobalToolbar from '../../components/TheQupGlobalToolbar'

/**
 * 随机生成商品标签样式
 * @param item
 * @param index
 * @returns {[]}
 */
function tagClassName(item, index) {
  const count = 5
  const Arr = []
  // 给原数组Arr赋值
  for (let i = 0; i < count; i++) {
    Arr[i] = i + 1
  }
  Arr.sort(() => {
    return 0.5 - Math.random()
  })
  const classNames = []
  Arr.forEach((item, index) => {
    if (item === 1) {
      classNames.push('item-tag-green')
    } else if (item === 2) {
      classNames.push('item-tag-green-hollow')
    } else if (item === 3) {
      classNames.push('item-tag-red-hollow')
    } else if (item === 4) {
      classNames.push('item-tag-yellow-hollow')
    } else if (item === 5) {
      classNames.push('item-tag-blue-hollow')
    }
  })
  return classNames
}
function getProdList(data, catId, keyword, url, page, pageSize, ev, exprice, brandId, sort) {
  // const rows = data.solrProductDtos.records || [] // 商品信息
  const rows = data.records
  rows.forEach((item) => {
    item.imgType = 'display'
  })
  const htmlInfoDTO = data.htmlInfoDTO || {} // 商品信息
  // const total = data.solrProductDtos.totalRows || 0 // 商品总数
  const total = 0
  const chooseList = [] // 已选择的平级类目
  let propertyList = [] // 属性 list
  const chooseItemList = [] // 已选中的 属性值list
  const categorySuperiosDtos = data.categorySuperiosDtos || [] // 上级类目list
  const categoryPeersDtos = data.categoryPeersDtos || [] // 平级类目list
  const clearAttributeUrl = data.clearAttributeUrl || '' // 平级类目list
  let isKeyWords = false // 平级类目list
  if ((categorySuperiosDtos && categorySuperiosDtos.length !== 0) || (categoryPeersDtos && categoryPeersDtos.length !== 0)) {
    isKeyWords = false
  } else {
    isKeyWords = true
  }
  if (isKeyWords) {
    propertyList = data.productCategoryFacetDtos
    if (propertyList) {
      propertyList.splice(0, 0, { id: 0, name: '全部' })
    }
  } else if (data.productScreenDTOList && !isKeyWords) {
    data.productScreenDTOList.forEach((item) => {
      if (item.isChoose) {
        chooseList.push(item)
        const pmsProductScreenDTOS = item.pmsProductScreenDTOS ? item.pmsProductScreenDTOS : []
        pmsProductScreenDTOS.forEach((choose, index) => {
          if (choose.isChoose) {
            choose.parentId = item.id
            choose.parentName = item.name
            choose.deleteUrl = item.deleteUrl
            chooseItemList.push(choose)
          }
        })
      } else {
        propertyList.push(item)
      }
    })
  }
  // 商品标签类名
  rows.forEach((prod) => {
    if (prod.pmsProductLabelDtos) {
      prod.tagClassNames = tagClassName(prod)
      prod.pmsProductLabelDtos.forEach((tag, index) => {
        tag.className = prod.tagClassNames[index]
      })
    }
  })
  return { rows,
    htmlInfoDTO,
    total,
    chooseList,
    chooseItemList,
    propertyList,
    categorySuperiosDtos,
    categoryPeersDtos,
    clearAttributeUrl,
    isKeyWords,
    catId,
    keyword,
    url,
    page,
    pageSize,
    ev,
    exprice,
    brandId,
    sort
  }
}

export default {
  name: 'Index',
  layout: 'HeaderSearchCenter',
  components: { QupCategory, Navigation, QupPagination, keyWordsSearch },
  mixins: [udid],
  head() {
    return {
      title: this.htmlInfoDTO ? this.htmlInfoDTO.searchtTtle : '商品列表',
      meta: [
        { hid: 'Keywords', name: 'Keywords', content: this.htmlInfoDTO ? this.htmlInfoDTO.searchKeywords : '' },
        { name: 'Description', content: this.htmlInfoDTO ? this.htmlInfoDTO.searchDescription : '' }
      ]
    }
  },
  data() {
    return {
      prodCols: 5, // 列表每行默认显示4条数据
      page: 1, // 默认第一页
      pageSize: 60, // 请求数据数量
      totalFlag: true, // 显示总数
      ev: '', // 属性值查询条件
      url: '/portal/product/list?rows=60&page=1', // 默认url地址
      exprice: null // 价格区间
    }
  },
  computed: {
    lPrice() {
      if (this.exprice) {
        const arrPrice = this.exprice.split('L')
        if (arrPrice.length === 2) {
          if (arrPrice[1] === '*') {
            return ''
          } else {
            return arrPrice[1]
          }
        }
      }
      return ''
    },
    mPrice() {
      if (this.exprice) {
        let arrPrice = this.exprice.split('L')
        if (arrPrice.length === 2) {
          arrPrice = arrPrice[0].split('M')
          if (arrPrice.length === 2) {
            if (arrPrice[1] === '0') {
              return ''
            } else {
              return arrPrice[1]
            }
          }
        }
      }
      return ''
    },
    params() {
      const pathArr = []
      let path = ''
      if (this.catId) {
        pathArr.push('cat=' + this.catId)
      }
      if (this.keyword) {
        pathArr.push('keyword=' + this.keyword)
      }
      if (this.page) {
        pathArr.push('page=' + this.page)
      }
      if (this.pageSize) {
        pathArr.push('rows=' + this.pageSize)
      }
      if (this.ev) {
        pathArr.push('ev=' + this.ev)
      }
      if (this.exprice) {
        pathArr.push('exprice=' + this.exprice)
      }
      if (this.sort) {
        pathArr.push('sort=' + this.sort)
      }
      if (this.brandId) {
        pathArr.push('brandId=' + this.brandId)
      }
      path = pathArr.join('&')
      return path
    }
  },
  async asyncData(ctx) {
    try {
      const catId = ctx.route.query.cat ? ctx.route.query.cat : null
      const keyword = ctx.route.query.keyword ? ctx.route.query.keyword : null
      const page = ctx.route.query.page ? parseInt(ctx.route.query.page) : 1
      const pageSize = ctx.route.query.rows ? parseInt(ctx.route.query.rows) : 60
      const ev = ctx.route.query.ev ? ctx.route.query.ev : null
      const exprice = ctx.route.query.exprice ? ctx.route.query.exprice : null
      const sort = ctx.route.query.sort ? ctx.route.query.sort : 'sort_sort_desc'
      const brandId = ctx.route.query.brandId ? ctx.route.query.brandId : null
      const provinceId = ctx.route.query.provinceId ? ctx.route.query.provinceId : null
      const cityId = ctx.route.query.cityId ? ctx.route.query.cityId : null
      const districtId = ctx.route.query.districtId ? ctx.route.query.districtId : null
      let url = '/portal/api/action/portal/product/list?page=' + page + '&rows=' + pageSize
      if (catId) {
        url = url + '&cat=' + catId
      }
      if (keyword) {
        url = url + '&keyword=' + keyword
      }
      if (ev) {
        url = url + '&ev=' + ev
      }
      if (exprice) {
        url = url + '&exprice=' + exprice
      }
      if (brandId) {
        url = url + '&brandId=' + brandId
      }
      if (provinceId) {
        url = url + '&provinceId=' + provinceId
      }
      if (cityId) {
        url = url + '&cityId=' + cityId
      }
      if (districtId) {
        url = url + '&districtId=' + districtId
      }
      const res = await ctx.$axios.get(encodeURI(url), {})
      let data = { solrProductDtos: {} }
      if (res.data) {
        data = res.data
      }
      return getProdList(data, catId, keyword, url, page, pageSize, ev, exprice, brandId, sort)
    } catch (e) {
      ctx.error({ statusCode: 500, message: '' + e })
    }
  },
  async fetch(ctx) {
    const promiseList = []
    // promiseList.push(ctx.store.dispatch('guessLike/GET_LIST', ctx)) // 页面中用到猜你喜欢组件时加入
    // promiseList.push(ctx.store.dispatch('headerFooter/GET_DATA', ctx)) // 页面中用到header/footer的layout时加入
    promiseList.push(ctx.store.dispatch('nav/GET_NAV', ctx)) // 页面中用到导航组件时加入
    await Promise.all(promiseList)
  },
  methods: {
    /**
     * 切换二维码图片
     */
    changeImg(item) {
      item.imgType = (item.imgType === 'display' ? 'qrCode' : 'display')
    },
    /**
     * @desc 价格筛选
     * @auth zhaohuanling
     * @param val 价格区间
     */
    expriceChange(val) {
      this.exprice = val
      this.page = 1
      window.location.href = '/list.html?' + this.params
    },
    /**
     * @desc 排序
     * @auth zhaohuanling
     * @param val 排序方式
     */
    sortChange(val) {
      this.sort = val
      this.page = 1
      window.location.href = '/list.html?' + this.params
    },
    /**
     * @desc 分页跳转
     * @auth zhaohuanling
     * @param page 页数
     */
    setPage(page) {
      this.page = page
      window.location.href = '/list.html?' + this.params
    },
    /**
     * @desc 根据列数拆分为行数组
     * @auth zhaohuanling
     * @param data 列表数据
     */
    getLines(data) {
      const lines = []
      if (data) {
        data.forEach((row, index) => {
          const lIndex = Math.floor(index / this.prodCols)
          if (!lines[lIndex]) {
            lines[lIndex] = []
          }
          const line = lines[lIndex]
          // this.$set(row, 'imgType', 'display')
          line[index % this.prodCols] = row
        })
      }
      return lines
    }
  }
}
</script>

<style scoped lang="scss">
  .qup-list-content{
    *{
      padding: 0;
      margin: 0;
    }
    .list-content{
      width: 100%;
      background: $background-font-color;
      .content-category{
        width: 100%;
        text-align: center;
        background:$background-font-color;
      }
      .content-img{
        width: 100%;
        height: 468px;
        img{
          width: 100%;
          height: 468px;
        }
      }
      .content-main{
        min-width: 1200px;
        max-width: 1200px;
        margin: 0 auto;
        background: $background-font-color;
        padding: 20px 0;
        .prod-list{
          width: 1200px;
          margin: 0 auto;
          padding-top: 20px;
          .prod-row{
            margin-left: -5px;
            margin-right: -5px;
            .el-col-5{
              width: 20%;
            }
            .prod-item{
              margin-bottom: 20px;
              border: 1px solid #f5f5f5;
              width: 224px;
              padding: 10px;
              height: 360px;
              &:hover{
                border-color: $theme-color;
                box-shadow: 2px 2px 5px rgba(00,00,00,0.1);
                border-radius:4px;
              }
              .item-img{
                width: 100%;
                height: 204px;
                text-align: center;
                position: relative;
                img{
                  width: 204px;
                  height: 204px;
                  position: absolute;
                  left:0;
                  top:0;
                  transform:perspective(600px) rotateY(90deg);
                  opacity: 0;
                  transition: all .5s ease;
                }
                .img-active{
                  transform:perspective(600px)  rotateY(0deg);
                  opacity: 1;
                }
              }
              .item-price{
                font-size:14px;
                font-weight:500;
                color:rgba(255,79,79,1);
                margin: 10px 0;
                line-height: 20px;
              }
              .item-des{
                font-size:12px;
                font-weight:400;
                color:rgba(51,51,51,1);
                line-height:22px;
                letter-spacing:1px;
                /*white-space: nowrap;*/
                overflow: hidden;
                text-overflow: ellipsis;
                height: 45px;
              }
              .prod-tags{
                .item-tag{
                  line-height: 20px;
                  height:20px;
                  border-radius:2px;
                  font-size:12px;
                  font-weight:400;
                  text-align: center;
                  padding: 2px 10px;
                  margin: 10px 10px 10px 0;
                }
                .item-tag-green{
                  border: 1px solid $theme-color;
                  background: $theme-color;
                  color: #ffffff;
                }
                .item-tag-green-hollow{
                  background: #ffffff;
                  color: $theme-color;
                  border:1px solid $theme-color;
                }
                .item-tag-red-hollow{
                  background: #ffffff;
                  color: #F15643;
                  border:1px solid #F15643;
                }
                .item-tag-yellow-hollow{
                  background: #ffffff;
                  color: #FFAB00;
                  border:1px solid #FFAB00;
                }
                .item-tag-blue-hollow{
                  background: #ffffff;
                  color: #3196FA;
                  border:1px solid #3196FA;
                }
              }
            }
          }
        }
        .no-data-tip{
          text-align: center;
          font-size: 20px;
          color: #cccccc;
          padding: 40px;
        }
      }
    }
    .guess-like{
      background: #f5f5f5;
      padding-top: 5px;
    }
  }
</style>
