<!--
选中/未选中样式组件，（右下角带斜三角形样式的组件）
@author yrf
@created 2019/10/12 11:26
-->
<template>
  <div class="selected" :class="{active: active}">
    {{ text }}
    <img v-if="active" src="../assets/images/item/icon_selection.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'QupSelectorBtn',
  props: {
    text: {
      type: String,
      default: '收货人'
    },
    active: Boolean
  },
  data() {
    return {}
  }
}
</script>

<style scoped lang="scss">
  $side-length: 8px;
  .selected {
    background: #fff;
    position: relative;
    border: 1px solid #cccccc;
    text-align: center;
    color: $theme-font-color;
    cursor: pointer;
    &.active{
      //border: 2px solid $theme-color;
      border-color: $theme-color;
      color: $theme-color;
      img {
        width: 14px;
        height: 14px;
        position: absolute;
        right: 0;
        bottom: 0;
      }
      /**
      .right-bottom-flag{
        position: absolute;
        right: -1px;
        bottom: -1px;
        border-right: $side-length solid $theme-color;
        border-bottom: $side-length solid $theme-color;
        border-top: $side-length solid transparent;
        border-left: $side-length solid transparent;
      }
      .icon{
        position: absolute;
        right: 0px;
        bottom: -1px;
        font-size: 10px;
        color: $background-font-color;
      } */
    }
  }
</style>
