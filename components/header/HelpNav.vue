<template>
  <div class="header-nav">
    <div class="nav-header">
      <span>常见问题分类</span>
    </div>
    <div class="nav-content">
      <div v-for="(nav, index) in navs" :key="index" class="nav-item">
        <div class="nav-name item" @click="selectNav(nav.id)">
          <span>{{ nav.name }}</span>
          <i v-show="currentExpandNav !== nav.id" class="el-icon-caret-bottom"></i>
          <i v-show="currentExpandNav === nav.id" class="el-icon-caret-top"></i>
        </div>
        <template v-if="currentExpandNav === nav.id">
          <div v-for="(child, index1) in nav.items" :key="index1" class="nav-child item">
            <div class="child-name">
              <span>{{ child }}</span>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelpNav',
  data() {
    return {
      navs: [
        { id: '1', name: '消费者帮助', items: [ '发货方式', '配货运费说明', '配送时效' ] },
        { id: '2', name: '配送方式', items: [ '发货方式', '配货运费说明', '配送时效' ] },
        { id: '3', name: '消费者帮助', items: [ '发货方式', '配货运费说明', '配送时效' ] }
      ],
      currentExpandNav: '1'
    }
  },
  async created() {
    // 获取当前nav
  },
  methods: {
    /**
     * 展开关闭分类
     */
    selectNav(id) {
      this.currentExpandNav = this.currentExpandNav === id ? '' : id
    }
  }
}
</script>

<style scoped lang="scss">
  .header-nav{
    margin: 0 auto;
    width: 182px;
    background:rgba(255,255,255,1);
    box-shadow:2px 2px 6px 0 rgba(0,0,0,0.1);
    font-size:14px;
    font-weight:600;
    color:#333;
    line-height:20px;
    letter-spacing:1px;
    display: block;
    float: left;
    .item {
      height: 40px;
      width: 100%;
      line-height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px 0 30px;
      cursor: pointer;
    }
    .nav-header {
      background: $theme-color;
      color: #ffffff;
      font-size: 16px;
      text-align: center;
      line-height: 40px;
    }
    .nav-name {
      background: #E1E1E1;
    }
  }
</style>
