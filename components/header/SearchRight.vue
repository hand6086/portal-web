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
            搜索
          </el-button>
        </div>
      </div>
    </div>
    <div style="clear: both;"></div>
  </div>
</template>

<script>
export default {
  name: 'SearchRight',
  data() {
    return {
      layoutSearchValue: ''
    }
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
     * desc 页面头部搜索框点击提示部分内容触发方法
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
        .header-content-right-left {
          float: right;
          margin-top: 14px;
          .header-content-right-input {
            float: left;
            width: 380px;

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
        }
      }
    }
  }
</style>
