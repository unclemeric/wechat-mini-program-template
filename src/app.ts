import { createApp } from 'vue'
// import Taro from '@tarojs/taro'
import { createPinia } from 'pinia'
import {
  Button,
  Toast,
  Layout,
  SearchBar,
  Row,
  TextArea,
  Col,
  Tag,
  Icon,
  Input,
  Uploader,
  Collapse,
  CollapseItem,
  Progress,
  Form,
  FormItem,
  InputNumber,
  Tabbar,
  TabbarItem,
  Cell,
  CellGroup,
  Dialog,
  Popup,
  OverLay,
  Empty,
  Radio,
  RadioGroup,
  ActionSheet,
  Grid,
  GridItem,
  Checkbox,
  CheckboxGroup,
  ImagePreview,
  DatePicker,
  Picker,
  Tabs,
  TabPane,
  Divider
} from '@nutui/nutui-taro'
import '@nutui/nutui-taro/dist/style.css'
// import './assets/iconfont/music.css'

import './app.less'

const App = createApp({
  onShow(options) {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

App.use(createPinia())
  .use(Button)
  .use(Toast)
  .use(Layout)
  .use(Row)
  .use(Col)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Icon)
  .use(Input)
  .use(Uploader)
  .use(Progress)
  .use(Form)
  .use(FormItem)
  .use(SearchBar)
  .use(Cell)
  .use(Grid)
  .use(GridItem)
  .use(Empty)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Radio)
  .use(RadioGroup)
  .use(InputNumber)
  .use(CellGroup)
  .use(Dialog)
  .use(Popup)
  .use(OverLay)
  .use(Collapse)
  .use(CollapseItem)
  .use(ActionSheet)
  .use(Tag)
  .use(TextArea)
  .use(ImagePreview)
  .use(DatePicker)
  .use(Picker)
  .use(Tabs)
  .use(TabPane)
  .use(Divider)

// Taro.loadFontFace({
//   global: true,
//   family: 'fangsongJT',
//   source: 'url("字体网络地址")',
//   success: (res) => {
//   },
//   fail: (res) => {
//   },
// })

export default App
