<template>
  <view class="login-page">
    <!-- <div :style="`height: ${navHeight}px`"></div> -->
     <CustomNav/>
    <div class="logo-box">
      <div class="logo-bg"><image :src="logoImg" class="logo"/></div>
      <div>
        <image :src="logoTxtImg" class="logo-en-name"/>
        <view class="logo-cn-name">工具工单管理</view>
      </div>
    </div>
    <div>
      <button open-type="getPhoneNumber" @getphonenumber="getphonenumber" style="width: 85.6vw;height: 100rpx;line-height: 100rpx;border-radius: 52rpx;background: #4B75E0FF;box-shadow: 0 5.84px 11.68px 0 #386aa56e;color: #fff;font-size: 28rpx;margin-bottom: 45rpx;">微信一键登录</button>
      <!-- <button open-type="getUserInfo" @getuserinfo="getuserinfo" style="width: 85.6vw;height: 100rpx;line-height: 100rpx;border-radius: 52rpx;background: #4B75E0FF;box-shadow: 0 5.84px 11.68px 0 #386aa56e;color: #fff;font-size: 28rpx;margin-bottom: 45rpx;">微信一键登录</button> -->
      <button style="width: 85.6vw;height: 100rpx;line-height: 100rpx;border-radius: 52rpx;background: #ffffff;box-shadow: 0 10rpx 24rpx 0 #00000024;color: #333;font-size: 28rpx;margin-bottom: 45rpx;" @click="pageToMobileLogin">手机登录</button>
    </div>
  </view>
</template>

<script lang="ts" setup>
import './index.scss'
import logoImg from '../../assets/images/logo.png'
import logoTxtImg from '../../assets/images/logo-txt.png'
import Taro from '@tarojs/taro'

const getphonenumber = (e)=>{
 console.log(e.detail)
}
const pageToMobileLogin = ()=> {
  Taro.navigateTo({
    url: '/pages/mobile-login/index'
  })
}
</script>
