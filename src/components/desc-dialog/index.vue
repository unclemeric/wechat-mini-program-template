<template>
  <div class="mask">
    <div class="desc-dialog">
      <div :style="`width: ${width};background: #fff;margin: 0 auto;padding: 40rpx;border-radius: 10rpx;box-sizing: border-box; position: relative;`">
        <div class="desc-title" v-if="hasTitle">{{ title || '说明' }}</div>
        <div class="close-icon" @click="$emit('close', 0)"><nut-icon name="close" size="10" color="#ff9b09"></nut-icon></div>
        <slot></slot>
        <div :style="`display: flex;flex-direction: row;justify-content: ${showCancel ? 'space-between' : 'center'};width: 260px;margin: 0 auto;`">
          <div style="margin-top: 14px;width: 120px;" v-show="showCancel">
            <nut-button size="middle" @click="$emit('close', 0)" :color="cancelBtnColor" style="width:100%">取消</nut-button>
          </div>
          <div style="margin-top: 14px;width: 120px;" v-show="showButton">
            <nut-button size="middle" @click="$emit('close', 1)" :color="confirmBtnColor" style="width:100%">确定</nut-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import './index.less'
export default {
  props: {
    width: {
      type: String,
      default: () => '80%',
    },
    hasTitle: {
      type: Boolean,
      default: () => true,
    },
    title: {
      type: String,
    },
    showCancel: {
      type: Boolean,
      default: () => false,
    },
    cancelBtnColor: {
      type: String.apply,
      default: () => '#f65d0a',
    },
    confirmBtnColor: {
      type: String.apply,
      default: () => '#ff9b09',
    },
    showButton: {
      type: Boolean,
      default: () => true,
    },
  },
}
</script>
<style lang="less"></style>
