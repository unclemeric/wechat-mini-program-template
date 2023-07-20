import Taro from "@tarojs/taro";
import { SessionKey,reLogin } from "./index";
import Api from '../api/index'

const baseURL = Api.api_prefix;
let cnt = 0;
let timeoutCnt = 0

function request(method, url, data:any) {
  return new Promise(function (resolve, reject) {
    // if (!Store.state.token) {
    //   return Taro.navigateTo({
    //     url: "/pages/login/index",
    //   });
    // }  
    let header = {
      "content-type": "application/json",
    };
    header["Authorization"] = Taro.getStorageSync(SessionKey) || '';
    // header["X-Auth-Token"] ='eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxMjQ1NjIyMjM4Mjg0OTYzODQwIiwic3ViIjoiU1VQUExJRVIiLCJpYXQiOjE2Mzg4NDg1NTUsIkxvZ2lubmFtZSI6IuiwouaYpeiKsyIsIk1vYmlsZSI6IjE1OTcwODg0MDU4IiwiUGFyZW50SWQiOjEyNDU2MjIyMzgxMjEzODU5ODQsIk5pZCI6IjM2MjEzMjE5NzEwNDA2MjkxMSIsIlBhcmVudE5pZCI6IjM2MjEzMjE5NzEwNDA2MjkxMSIsIkFkbWluIjp0cnVlLCJMZXZlbCI6IjEiLCJBZG1pbmlzdHJhdG9yIjoi5L-h5oGv6YOofDE3Nzc2MjQ0NjcyIiwiZXhwIjoxNjk5MzI4NTU1fQ.jhP7N8K_gE_pH9RoESgYkRlAM5yoCkiQuiZy1WhQfO4'
    
    Taro.request({
      url: baseURL + url,
      method: method,
      timeout: 15000,
      data: (method.toString()).toLowerCase() === "post" ? JSON.stringify(data) : data,
      header: header,
      async success(res) {
        timeoutCnt = 0 // 重置超时请求计数
        //请求成功
        //判断状态码---errCode状态根据后端定义来判断
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          Taro.hideLoading();          
          if (res.statusCode === 401) {
            if (cnt > 5) return ;
             cnt++;
            await reLogin((res)=>{
              if(url.startsWith('/wx/')) {
                const { sessionKey = '' } = res.data || {}
                data.sessionKey = sessionKey
              }
              // Taro.setStorageSync(SessionKey,sessionKey);
              // request(method, url, data)
            })
            resolve(await request(method,url,data))
          } else if(res.statusCode === 403){
            Taro.showToast({title: '您当前角色权限无权操作此功能', icon: 'none'});
            reject({ msg: '您当前角色权限无权操作此功能',data: null, success:false});
          } else if(res.statusCode === 502){
            Taro.showToast({title: '接口服务未启动', icon: 'none'});
            reject('接口服务未启动');
          } else {
            //其他异常
            Taro.showToast({title: res.data.msg || '请求出错了~', icon: 'none'});
            reject({ msg: res.data.msg || '请求出错了~',data: null, success:false});
          }
        }
      },
      async fail(err) {
        Taro.hideLoading();
        if(err.errMsg === 'request:fail timeout') {
          timeoutCnt ++
          if(timeoutCnt>4){
            Taro.showToast({
              title: '网络请求超时，请稍后重试',
              icon: 'none',
              complete() {
                timeoutCnt = 0 // 重置超时请求计数
                Taro.navigateBack()
              }
            })
            // wxAlert('网络请求超时，请稍后重试',()=>{
            //   timeoutCnt = 0 // 重置超时请求计数
            //   Taro.navigateBack()
            // }) 
          }else {
            // Taro.showLoading({
            //   mask: true,
            //   title: '超时重试中'
            // });
            Taro.showToast({
              title: '超时重试中',
              icon: 'none'
            })
            resolve(await request(method,url,data))
          }
        } else {

          Taro.showToast({
            title: err.errMsg || "请求失败",
            icon: 'none'
          })
          // wxAlert({ msg: err.errMsg || "请求失败" });
          reject({ msg: err || '请求出错了~',data: null, success:false});
        }
      },
    });
  });
}

export default request;
