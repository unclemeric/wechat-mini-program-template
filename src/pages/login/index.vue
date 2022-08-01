<template>
  <div class="login-page">
    <p>歌曲的语言有：{{ store.Languages.join('、') }}</p>
    <ul>
      <li v-for="item in store.playList" style="display: flex;justify-content: space-around;">
        <div style="">{{ item.id }}</div>
        <div>{{ item.name }}</div>
        <div>{{ item.languages }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, onBeforeUnmount } from 'vue'
// import Taro from '@tarojs/taro'
import './index.less'
import { useMainStore } from '../../store'

export default {
  setup() {
    const store = useMainStore()
    // let instance = Taro.getCurrentInstance()
    // const shareToken = instance.router.params.shareToken || ''
    store.addSong('一生有你-水木年华')
    return {
      store,
      // ...toRefs(state),
    }
  },
}
</script>
<style lang="less">
.foot-bt {
  display: flex;
  // width: 260px;
  justify-content: space-between;
  flex-direction: row;
}
</style>
