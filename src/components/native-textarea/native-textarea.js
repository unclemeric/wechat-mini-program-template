Component({
  properties: {
    value: {
      type: String,
      value: '',
    },
  },
  data: {
    isFocus: false,
    height: 60,
  },
  methods: {
    changeHandle(e) {
      const { value } = e.detail
      this.triggerEvent('change', value)
    },
    blurHandle(e) {
      this.setData({
        isFocus: false,
      })
    },
    reactionHeight(e) {
      const { height = 0, heightRpx = 0, lineCount = 0 } = e.detail
      let h = this.data.height > height ? this.data.height : height + 50
      this.setData({
        height: h,
      })
    },
    focusHandle(e) {
      this.setData({
        isFocus: true,
      })
    },
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
    },
    ready: function() {
      // 在组件在视图层布局完成后执行
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})
