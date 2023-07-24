import Taro from '@tarojs/taro'
import { UserInfoKey, SessionKey, AppId, wxAlert } from './index';
import request from './request'


export function reLogin(cb?: Function) {
    return new Promise((resolve, _reject) => {
      Taro.removeStorageSync(UserInfoKey)
      Taro.removeStorageSync(SessionKey)
      Taro.login({
        success: (res) => {
          if (res.code) {
            let params = {
              code: res.code,
            }
            request('get', `/wx/user/${AppId}/login`, params)
              .then((res: any) => {
                if (res.success) {
                  // const { sessionKey = '', info } = res.data || {}
                  const sessionKey = res.data.sessionKey || ''
                  const info = res.data.info || {}
                  Taro.setStorageSync(SessionKey, sessionKey) // 存储sessionKey
                  Taro.setStorageSync(UserInfoKey, info)
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