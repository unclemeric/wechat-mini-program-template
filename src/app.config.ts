export default {
  pages: [
    'pages/index/index',
    "pages/web-view-entry-vertical/index", // webview纵向页面
    "pages/web-view-entry-horization/index", // webview横向页面
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
    enablePullDownRefresh: false
  }
}
