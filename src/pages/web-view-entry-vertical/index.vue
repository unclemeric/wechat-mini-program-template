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
      sessionKey: '',
      prefix: Api.api_prefix,
      entry: instance.router.params.entry,
      id: '',
      queryParams: '',
    })

    onMounted(() => {
      IsIPhoneX((isIPhoneX, safeBottom) => {
        const sessionKey = wx.getStorageSync(SessionKey)
        let params = {
          isIphx: isIPhoneX ? 1 : 0,
          mrg: safeBottom,
          sessionKey,
          id: instance.router.params.id,
          childId: instance.router.params.familyId,
        }
        if (!params.id) {
          delete params.id
        }
        if (!params.childId) {
          delete params.childId
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
