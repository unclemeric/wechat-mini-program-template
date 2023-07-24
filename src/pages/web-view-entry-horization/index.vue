<template>
  <view>
    <web-view v-if="sessionKey" :src="`https://www.xxxx.cn/xxx/#/${entry}?${queryParams}`"></web-view>
  </view>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import Taro from '@tarojs/taro'
import qs from 'qs'
import Api from '../../api/index'

import './index.scss'
import { IsIPhoneX, SessionKey, wxAlert, wxConfirm } from '../../utils/index'

export default {
  setup() {
    let instance = Taro.getCurrentInstance()
    const state = reactive({
      isIPhoneX: false,
      sessionKey: '',
      prefix: Api.api_prefix,
      entry: instance.router.params.entry,
      queryParams: '',
      navigateHeight: 0,
    })

    onMounted(() => {
      state.navigateHeight = Taro.getStorageSync('navigateHeight')
      IsIPhoneX((isIPhoneX = false, safeBottom = 0) => {
        const sessionKey = wx.getStorageSync(SessionKey)
        let params = {
          isIphx: isIPhoneX ? 1 : 0,
          mrg: safeBottom,
          sessionKey,
          id: instance.router.params.id,
          childId: instance.router.params.familyId,
          shelfName: instance.router.params.shelfName,
          liuhai: state.navigateHeight,
        }
        if (!params.id) {
          delete params.id
        }
        if (!params.childId) {
          delete params.childId
        }
        if (!params.shelfName) {
          delete params.shelfName
        }
        state.sessionKey = sessionKey
        state.queryParams = qs.stringify(params)
      })
    })
    return {
      ...toRefs(state),
    }
  },
}
</script>
<style lang="less"></style>
