<template>
  <view class="mobile-login-page">
    <!-- <div :style="`height: ${navHeight}px`"></div> -->
    <CustomNav show-back/>
    <div class="container">
      <div class="title">手机号登录</div>
      <CustomInput placeholder="请输入手机号码" :left-icon="userIcon" v-model="mobile"/>
      <CustomInput placeholder="请输入验证码" :left-icon="lockIcon">
        <template #right>
          <div class="text blue" @click="getSMSCode">获取验证码</div>
        </template>
      </CustomInput>
      <div style="display: flex;justify-content: flex-end;margin: 40rpx 0 50rpx;">
        <div class="forget-pwd text blue" style="font-size: 26rpx;">忘记密码</div>
      </div>
      <button open-type="getPhoneNumber" @getphonenumber="getphonenumber" style="width: 85.6vw;height: 100rpx;line-height: 100rpx;border-radius: 52rpx;background: #4B75E0FF;box-shadow: 0 5.84px 11.68px 0 #386aa56e;color: #fff;font-size: 28rpx;margin-bottom: 45rpx;">登录</button>
    </div>
  </view>
</template>

<script lang="ts" setup>
import './index.scss'
import userIcon from '../../assets/images/icon-user.png'
import lockIcon from '../../assets/images/icon-lock.png'
import { ref } from 'vue';

const mobile = ref('')

const getphonenumber = (e)=>{
 console.log(e.detail)
}

const getSMSCode= () => {
  console.log('get sms code')
  console.log(mobile.value)
}
</script>
