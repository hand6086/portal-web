<template>
  <div class="header-content-all">
    <div class="header-content">
      <div class="header-content-left">
        <a href="/">
          <img :src="`${$store.state.imgServer}${layoutLogoUrl}`" alt="助农产品" width="100%">
        </a>
      </div>
      <div class="header-content-right">
        <div class="center-sub">
          帮助中心
        </div>
        <div class="header-content-right-search">
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
          <el-button type="primary" size="medium" class="header-content-right-button" @click="handleSelect">
            搜&nbsp;索
          </el-button>
        </div>
      </div>
    </div>
    <div style="clear: both;"></div>
  </div>
</template>

<script>
export default {
  name: 'HelpSearch',
  data() {
    return {
      layoutLogoUrl: '',
      layoutSearchValue: '',
      showMore: false
    }
  },
  async created() {
    // 页面logo数据获取
    const logoData = this.$axios.get('/portal/api/action/portal/homeManage/smsHomeLogo')
    let resultList = []
    try {
      const promiseList = [logoData]
      resultList = await Promise.all(promiseList)
    } catch (e) {
      console.log('页面数据加载错误：' + e)
    }
    this.layoutLogoUrl = resultList[0].data.pic
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
          const data = await this.$axios.get(url)
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
    }
  }
}
</script>

<style scoped lang="scss">
  .header-content-all{
    background: #fff;
    .header-content {
      width: 1200px;
      height: 88px;
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
      }
      .header-content-right{
        float: left;
        width: calc(100% - 182px);
        display: flex;
        justify-content: space-between;
        padding-left: 20px;
        .center-sub{
          font-size: 20px;
        }
        .active{
          color: $theme-color;
        }
        .header-content-right-search {
          display: flex;
          .header-content-right-input {
            width: 380px;
            /deep/.el-input__inner {
              border-radius: 0;
              border-color: $theme-color;
            }
          }
          .header-content-right-button {
            margin-left: -1px;
          }
        }
      }
    }
  }
</style>
