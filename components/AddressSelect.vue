<template>
  <div class="address-select">
    <el-select v-model="lv_val" :size="size" class="address-select-item" placeholder="请选择" :style="`width: ${width}px`">
      <el-option v-for="(item,index) in data" :key="index" :label="item.name" :value="item.code"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'AddressSelect',
  props: {
    value: {}, // 绑定存值对象
    view: { type: String }, // 绑定类型
    attrKey: { type: String }, // 对象绑定的key值
    parentCode: {}, // 父级地址的code值
    width: { type: Number },
    size: { type: String, default: 'mini' }
  },
  data() {
    return {
      lv_val: '',
      data: []
    }
  },
  watch: {
    value: {
      handler(val) {
        this.lv_val = val[this.attrKey]
      },
      immediate: true
    },
    parentCode: {
      handler(newVal, oldVale) {
        if (newVal !== oldVale) {
          if (oldVale) {
            const obj = JSON.parse(JSON.stringify(this.value))
            if (obj[this.attrKey]) { delete obj[this.attrKey] }
            this.$emit('input', obj)
          }
          this.resetData()
        }
      },
      immediate: true
    },
    lv_val: {
      handler(val) {
        const obj = JSON.parse(JSON.stringify(this.value))
        obj[this.attrKey] = val
        this.$emit('input', obj)
      },
      immediate: true
    }
  },
  created() {
    this.resetData()
  },
  methods: {
    /**
     * desc 获取地址数据
     * @author wangyue
     * @date 2019/10/15
     * @params
     */
    async resetData() {
      if (this.view === 'province') {
        try {
          const url = '/portal/api/web/v1/productDetail/getLevel?level=2'
          const resp = await this.$axios.get(url)
          if (resp.success === 1) {
            this.data = resp.data
          } else {
            this.$message.error('地址数据获取失败：' + resp.msg)
          }
        } catch (e) {
          this.$message.error(e.toString())
        }
      } else if (this.parentCode) {
        try {
          const url = '/portal/api/web/v1/region/detail?code=' + this.parentCode
          const resp = await this.$axios.get(url)
          if (resp.success === 1) {
            this.data = resp.data
          } else {
            this.$message.error('地址数据获取失败：' + resp.msg)
          }
        } catch (e) {
          this.$message.error(e.toString())
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.address-select{
  display: inline-block;
  .address-select-item{
  }
}
</style>
