import Taro from '@tarojs/taro'
import { UserInfoKey, TokenKey, AppId, wxAlert, RefreshTokenKey, UserIdKey, wxConfirm } from './index';
import request from './request'
import { LoginRes } from './types';


export function reLogin(cb?: Function) {
    return new Promise((resolve, _reject) => {
      // Taro.removeStorageSync(UserInfoKey)
      Taro.removeStorageSync(TokenKey)
      Taro.login({
        success: (res) => {
          if (res.code) {
            let params = {
              code: res.code,
            }
            request('GET', `/wx/user/${AppId}/login`, params)
              .then((res: any) => {
                if (res.success) {
                  // const { sessionKey = '', info } = res.data || {}
                  const token = res.data.accessToken || ''
                  const info = res.data.info || {}
                  Taro.setStorageSync(TokenKey, token) // 存储token
                  // Taro.setStorageSync(UserInfoKey, info)
                  cb && cb(res)
                } else {
                  wxAlert(res)
                  Taro.hideLoading()
                }
                resolve(res)
              })
              .catch((err) => {
                wxAlert(err.msg || err.message || '获取登录信息失败')
                Taro.hideLoading()
              })
          } else {
            console.log('获取登录信息失败')
          }
        },
        fail(res) {
          console.log(res)
        },
      })
    }).catch(e=> {
      console.log('relogin',e)
    })
  }

  export const checkLoginStatus = () => {
    const token = Taro.getStorageSync(TokenKey)
    return !!token
  }

  export const cacheLoginInfo = (info: LoginRes) => {
    const { accessToken = '', refreshToken = '', userId = '' } = info || {}
    if(!accessToken || !refreshToken || !userId) return
    Taro.setStorageSync(TokenKey, accessToken)
    Taro.setStorageSync(RefreshTokenKey, refreshToken)
    Taro.setStorageSync(UserIdKey, userId)
  }

  export const emptyCacheLoginInfo = () => {
    Taro.removeStorageSync(TokenKey)
    Taro.removeStorageSync(RefreshTokenKey)
    Taro.removeStorageSync(UserIdKey)
  }

  export const rejectLogin = () => {
    // 获取当前路由url
    const pages = Taro.getCurrentPages();
    const currentPageUrl = pages[pages.length - 1].route;
    if(currentPageUrl != 'pages/mobile-login/index' && currentPageUrl != 'pages/login/index') {
      wxConfirm({ msg: '登录已过期,请重新登录!' }, () => {
        // emptyCacheLoginInfo()
        Taro.redirectTo({
          url: '/pages/login/index'
        })
      })
    }
  }