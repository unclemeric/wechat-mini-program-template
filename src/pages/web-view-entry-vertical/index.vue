<template>
  <div class="container-view reading-situation-list" style="height: 100px; overflow: hidden">
    <web-view v-if="sessionKey" :src="`https://www.xxxx.cn/xxx/#/${entry}?${queryParams}`"></web-view>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import Taro from '@tarojs/taro'
import qs from 'qs'
import request from '../../utils/request'
import Api from '../../api/index'

import './index.less'
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
