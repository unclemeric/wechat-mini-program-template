<template>
  <view class="mobile-login-page">
    <!-- <div :style="`height: ${navHeight}px`"></div> -->
    <CustomNav show-back/>
    <div class="container">
      <div class="title">账号密码登录</div>
      <CustomInput placeholder="请输入账号" :left-icon="userIcon" type="text" v-model="mobile"/>
      <CustomInput placeholder="请输入密码" :left-icon="lockIcon" type="password" v-model="password"/>
      <!-- <CustomInput placeholder="请输入验证码" :left-icon="lockIcon">
        <template #right>
          <div class="text blue" @click="getSMSCode">获取验证码</div>
        </template>
      </CustomInput> -->
      <div style="display: flex;justify-content: flex-end;margin: 40rpx 0 50rpx;">
        <div class="forget-pwd text blue" style="font-size: 26rpx;">忘记密码</div>
      </div>
      <button style="width: 85.6vw;height: 100rpx;line-height: 100rpx;border-radius: 52rpx;background: #4B75E0FF;box-shadow: 0 5.84px 11.68px 0 #386aa56e;color: #fff;font-size: 28rpx;margin-bottom: 45rpx;" @click="loginHandle">登录</button>
    </div>
  </view>
</template>

<script lang="ts" setup>
import './index.scss'
import userIcon from '../../assets/images/icon-user.png'
import lockIcon from '../../assets/images/icon-lock.png'
import { ref } from 'vue';
import { login } from '../../api/common'
import Taro from '@tarojs/taro';
import { cacheLoginInfo } from '../../utils/login';

const mobile = ref('admin')
const password = ref('admin123')

const loginHandle = async()=>{
  if(mobile.value === '' || password.value === '') {
    Taro.showToast({title: '请输入正确账号或密码'})
    return
  }
  Taro.showLoading({title: '登录中'})
  const res = await login({username: mobile.value, password: password.value})
  Taro.hideLoading()
  if(res.code !== 0) {
    Taro.showToast({title: res.msg})
    return
  }
  cacheLoginInfo(res.data)
  Taro.switchTab({url: '/pages/index/list/index'})
}

// const getSMSCode= () => {
//   console.log('get sms code')
//   console.log(mobile.value)
// }
</script>
