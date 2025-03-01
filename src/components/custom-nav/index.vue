<template>
  <div :style="`height: ${navHeight}px;padding:`">
    <div :style="`height: ${statusBarHeight}px`"></div>
    <div :style="`position:relative;padding: ${navTop - statusBarHeight}px ${navRight}px;font-size: ${fontSize * 2}rpx;color:${color};display: flex;align-items: center;justify-content: center;min-height: 60rpx;`">
      <div v-if="title">{{ title }}</div>
      <image v-if="showBack" @tap="tapHandle" :style="`position: absolute;width: 60rpx;height:60rpx;left: ${navRight}px;top: ${navTop - statusBarHeight}px`" :src="color === 'white' ? ArrowLeftWhite : ArrowLeft"/>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs } from "vue"
import { getStatusBarHeight } from "../../utils"
import ArrowLeft from '../../assets/images/icon-arrow-left.png'
import ArrowLeftWhite from '../../assets/images/icon-arrow-left-w.png'
import "./index.scss"
import Taro from "@tarojs/taro"

export default {
  props: {
    color: {
      type: String,
      default: () => "black",
      validator: (value: string) => ["black", "white"].includes(value),
    },
    fontSize: {
      type: Number,
      default: () => 20,
    },
    showBack: {
      type: Boolean,
      default: () => false,
    },
    title: {
      type: String,
      default: () => "",
    },
  },
  setup(props, _context) {
    const { navHeight, navRight, navTop, statusBarHeight } =
      getStatusBarHeight()
    const { showBack, title, color } = props
    const data = reactive({
      navHeight,
      navRight,
      navTop,
      statusBarHeight,
      showBack,
      title,
      color
    })
    function tapHandle() {
      Taro.navigateBack()
    }
    return {
      ...toRefs(data),
      ArrowLeft,
      ArrowLeftWhite,
      tapHandle
    }
  },
}
</script>
<style lang="less"></style>
