<!--
步骤条组件
@author yrf
@created 2019/10/11 17:26
-->
<template>
  <div>
    <div
      v-for="(item, index) in steps"
      :key="item"
      class="step"
      :style="{width: 1/steps.length*100 + '%'}"
      :class="{less:activeStep > (index+1),greater: activeStep < (index+1)}"
    >
      <div class="step-header">
        <div class="step-line"></div>
        <div class="step-number-flag">
          {{ index + 1 }}
        </div>
      </div>
      <div class="step-text">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QupStep',
  props: {
    /* 所有步骤 */
    steps: {
      type: Array,
      default() {
        return ['我的购物车', '填写订单信息', '成功提交订单']
      }
    },
    /* 当前激活步骤 */
    activeStep: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped lang="scss">
  $less-color: #9EEDD1;
  $greater-color: #D8D8D8;
  $greater-font-color: #888888;

  .step{
    /*width: 33.33333%;*/
    float: left;
    .step-header{
      position: relative;
      height: 20px;
      .step-line{
        position: absolute;
        width: 100%;
        top: 7.5px;
        height: 5px;
        background: $theme-color;
      }
      .step-number-flag{
        position: absolute;
        left: calc(50% - 10px);
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: $theme-color;
        color: $background-font-color;
        text-align: center;
        font-size: 12px;
        line-height: 20px;
      }
    }
    .step-text{
      margin-top: 10px;
      text-align: center;
      color: $theme-color;
      font-size: 12px;
    }
    &:first-child{
      .step-line{
        border-radius: 3px 0 0 3px;
      }
    }
    &:last-child{
      .step-line{
        border-radius: 0 3px 3px 0;
      }
    }
  }
  .less{
    .step-header{
      .step-line{
        background: $less-color;
      }
      .step-number-flag{
        background: $less-color;
      }
    }
    .step-text{
      color: $less-color;
    }
  }
  .greater{
    .step-header{
      .step-line{
        background: $greater-color;
      }
      .step-number-flag{
        background: $greater-color;
      }
    }
    .step-text{
      color: $greater-font-color;
    }
  }
</style>
