import Taro from "@tarojs/taro";
import { RefreshTokenKey, TokenKey, UserIdKey, wxAlert, wxConfirm } from "./index";
import { cacheLoginInfo, rejectLogin, reLogin } from "./login";
import { getApi_prefix } from './index'
import { ResponseBody } from "./types";
import type { RequestMethod } from "./types";
import { refreshToken } from "../api/common";

let cnt = 0;
let timeoutCnt = 0

function request<T>(method: RequestMethod, url: string, data: any, headerConfig?: { contentType?: string}) : Promise<ResponseBody<T>> {
  
  return new Promise(function (resolve, reject) {
    const baseURL = getApi_prefix()
    let header = {
      "content-type": headerConfig?.contentType || "application/json",
      "tenant-id": Taro.getStorageSync(UserIdKey)
    };
    const token = Taro.getStorageSync(TokenKey) || ''
    if(token) {
      header["Authorization"] = 'Bearer ' + token;
    }
    // header["X-Auth-Token"] ='eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxMjQ1NjIyMjM4Mjg0OTYzODQwIiwic3ViIjoiU1VQUExJRVIiLCJpYXQiOjE2Mzg4NDg1NTUsIkxvZ2lubmFtZSI6IuiwouaYpeiKsyIsIk1vYmlsZSI6IjE1OTcwODg0MDU4IiwiUGFyZW50SWQiOjEyNDU2MjIyMzgxMjEzODU5ODQsIk5pZCI6IjM2MjEzMjE5NzEwNDA2MjkxMSIsIlBhcmVudE5pZCI6IjM2MjEzMjE5NzEwNDA2MjkxMSIsIkFkbWluIjp0cnVlLCJMZXZlbCI6IjEiLCJBZG1pbmlzdHJhdG9yIjoi5L-h5oGv6YOofDE3Nzc2MjQ0NjcyIiwiZXhwIjoxNjk5MzI4NTU1fQ.jhP7N8K_gE_pH9RoESgYkRlAM5yoCkiQuiZy1WhQfO4'
    Taro.request({
      url: baseURL + url,
      method: method,
      timeout: 15000,
      data: (method.toString()).toLowerCase() === "post" ? headerConfig?.contentType === "application/json" ? JSON.stringify(data) : data : data,
      header: header,
      async success(res) {
        timeoutCnt = 0 // 重置超时请求计数
        //请求成功
        //判断状态码---errCode状态根据后端定义来判断
        if (res.statusCode === 200) {
          if(res.data.code === 401) {
            const refresh_token = Taro.getStorageSync(RefreshTokenKey)
            console.log(refresh_token)
            if(refresh_token) {
              const res = await refreshToken({refreshToken: refresh_token})
              if(res.code === 0) {
                cacheLoginInfo(res.data)
                // Taro.setStorageSync(TokenKey,accessToken);
                resolve(await request(method,url,data))
              } else {
                rejectLogin()
                reject({ msg: '登录已过期,请重新登录',data: null, success:false});
              }
              return
            } else {
              return
            }
          }
          resolve({
            code: res.data.code,
            msg: res.data.msg,
            data: res.data.data as T,
          });
        } else {
          Taro.hideLoading();          
          if (res.statusCode === 401) {
            if (cnt > 5) return ;
             cnt++;
            await reLogin((res)=>{
              if(url.startsWith('/wx/')) {
                const { accessToken = '' } = res.data || {}
                data.accessToken = accessToken
              }
              // Taro.setStorageSync(TokenKey,accessToken);
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
            reject({ msg: res.data.msg || '请求出错了~~',data: null, success:false});
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
