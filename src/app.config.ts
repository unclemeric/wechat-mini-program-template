export default {
  pages: [
    'pages/work-order/list/index',
    'pages/work-order/detail/index',
    'pages/index/detail/index',
    'pages/index/list/index',
    'pages/mobile-login/index',
    'pages/login/index',
  ],
  // subPackages: [
  //   {
  //     root: 'pages/baby-diary/', // 注意这个"/" 一定不能少 不然跳转会报错
  //     pages: [
  //       "index/index",
  //     ],
  //   },
  // ],
  // requiredBackgroundModes: ["audio"],
  permission: {
    // "scope.userLocation": {
    //   desc: "您的位置信息将用于小程序位置接口的效果展示",
    // },
    // "scope.userLocationBackground": {
    //   desc: "持续定位功能需要使用后台定位功能",
    // },
    "scope.camera": {
      desc: "您的相机拍照将用于上传照片功能",
    },
    "scope.writePhotoAlbum": { desc: "您的相册将用于保存拍摄的照片" },
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    enablePullDownRefresh: false,
    // navigationBarTitleFontSize: 18
  },
  tabBar: {
    custom: false,
    color: '#898989',
    selectedColor: '#4B75E0',
    backgroundColor: '#ffffff',
    list: [
      {
        pagePath: 'pages/index/list/index',
        text: '首页',
        iconPath: 'assets/images/nav-icon-1.png',
        selectedIconPath: 'assets/images/nav-icon-1-active.png'
      },
      {
        pagePath: 'pages/work-order/list/index',
        text: '工单',
        iconPath: 'assets/images/nav-icon-2.png',
        selectedIconPath: 'assets/images/nav-icon-2-active.png'
      },
      {
        pagePath: 'pages/mobile-login/index',
        text: '我的',
        iconPath: 'assets/images/nav-icon-3.png',
        selectedIconPath: 'assets/images/nav-icon-3-active.png'
      }
    ]
  }
}
