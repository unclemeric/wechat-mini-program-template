import { createApp } from 'vue'
import { createPinia } from 'pinia'
import CustomNav from './components/custom-nav/index.vue'
import CustomInput from './components/custom-input/index.vue'

import './app.scss'

const App = createApp({
  onShow(options) {
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

App.use(createPinia())
App.use(CustomNav).use(CustomInput)

export default App
