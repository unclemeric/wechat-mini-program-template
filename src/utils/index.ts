import Taro from '@tarojs/taro'
export const AppId = 'wxf04c0357243ae27c'
export const UserInfoKey = '_user_info'
export const SessionKey = '_session_key'

export const isPro = true // isPro=true正式，isPro=false测试
export const api_prefix = 'https://www.hwagain.cn/childread' // 正式小程序  cn改为net，测试net改为cn
export const web_prefix  = 'https://www.hwagain.cn/wx_childread' // 正式webview  cn改为net，测试net改为cn

export const getApi_prefix = () : String => {
  // let val = `${api_prefix}${releaseType ? (isPro ? '' : '_dev') : '_tiyan'}`
  let val = `${api_prefix}${isPro ? '' : '_dev'}`
  return val
}

export const getWebview_prefix = (path = '') : String => {
  // let val = `${web_prefix}${releaseType ? (isPro ? '' : '_dev') : '_tiyan'}${path}`
  let val = `${web_prefix}${isPro ? '' : '_dev'}${path}`
  console.log(val)
  return val
}

export const getWebview_prefix_img = () : String => {
  return getWebview_prefix('/img')
}

export function setBirthday(date: String) {
  let user = Taro.getStorageSync(UserInfoKey)
  if (user.birthday !== date) {
    user.birthday = date
    Taro.setStorageSync(UserInfoKey, user)
  }
}

export const IsIPhoneX = function(cb: Function) {
  Taro.getSystemInfo({
    success: function(res: Taro.getSystemInfo.Result) {
      let flag = false
      var safeBottom = res.screenHeight - (res.safeArea?.bottom || 0)
      if (safeBottom !== 0) {
        flag = true
      }
      cb(flag, safeBottom)
    },
  })
}
interface WxToastOption {
  /** 提示的内容 */
  msg: string
  /** 提示的延迟时间 */
  duration?: number
  icon?: 'success' | 'loading' | 'none'
  /** 是否显示透明蒙层，防止触摸穿透 */
  mask?: boolean
}
export function wxToast({ msg, icon, mask = false, duration }: WxToastOption, cb?) {
  Taro.showToast({
    title: msg,
    duration: duration || 1500,
    icon: icon || 'none',
    mask: mask,
    complete() {
      cb && cb()
    },
  })
}

export function wxAlert(msg?, cb?) {
  Taro.showModal({
    title: '提示',
    content: msg || '',
    showCancel: false,
    success: cb || null,
  })
}
export function wxConfirm(msg: Object, cb1?, cb2?) {
  Taro.showModal({
    title: msg['title'] || '提示',
    content: msg['msg'] || '',
    showCancel: msg['showCancel'] || true,
    cancelText: msg['cancelText'] || '取消',
    confirmText: msg['confirmText'] || '确定',
  }).then((res) => {
    if (res.confirm) {
      cb1 && cb1()
    } else {
      cb2 && cb2()
    }
  })
}
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (_result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

//获取时间  @params day  传入的最近日期
export function getDay(day: number) {
  //这里的day是时间（列如：7，-7）
  let today = new Date()
  let targetday_milliseconds = today.getTime() - 1000 * 60 * 60 * 24 * day
  today.setTime(targetday_milliseconds) //注意，这行是关键代码，到这时间已经转行为毫秒
  return format(today)
}

//格式化日期
export function format(date) {
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  if (month >= 1 && month <= 9) {
    month = `0${month}`
  }
  if (day >= 1 && day <= 9) {
    day = `0${day}`
  }
  return `${year}-${month}-${day}`
}

export function formatDuration(value) {
  let theTime = parseInt(value) // 秒
  let middle = 0 // 分
  let hour = 0 // 小时

  if (theTime >= 60) {
    middle = Math.floor(theTime / 60)
    theTime = theTime % 60
    if (middle >= 60) {
      hour = Math.floor(middle / 60)
      middle = middle % 60
    }
  }
  let result = '' + theTime + '秒'
  if (middle > 0) {
    result = '' + middle + '分' + result
  }
  if (hour > 0) {
    result = '' + hour + '小时' + result
  }
  return result
}

export function formatProgressDuration(value) {
  const timeParseStr = (val) => {
    val = val + ''
    return val.length !== 1 ? val : '0' + val
  }
  let theTime = parseInt(value) // 秒
  let middle = 0 // 分
  let hour = 0 // 小时

  if (theTime >= 60) {
    middle = Math.floor(theTime / 60)
    theTime = theTime % 60
    if (middle >= 60) {
      hour = Math.floor(middle / 60)
      middle = middle % 60
    }
  }
  let result = '' + timeParseStr(theTime)
  // if (middle > 0) {
  result = '' + timeParseStr(middle) + ':' + result
  // }
  if (hour > 0) {
    result = '' + timeParseStr(hour) + ':' + result
  }
  return result
}

/**
 * 防抖函数
 *
 * @export
 * @param {*} fn  函数
 * @param {*} delay   防抖时间
 * @returns
 */
export function debounce(fn, delay) {
  let timer
  return function(...arg) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arg)
    }, delay)
  }
}

export function getDateToNow(day) {
  var dd = new Date()
  dd.setDate(dd.getDate() + day)
  let y = dd.getFullYear()
  let mon = dd.getMonth() + 1
  let m = mon < 10 ? '0' + mon : mon
  var days = dd.getDate()
  let d = days < 10 ? '0' + days : days
  return y + '-' + m + '-' + d
}

// 时间范围
export function getRangdate(sd, ed) {
  let now = new Date()
  let st = new Date(now.getTime() + sd * 24 * 60 * 60 * 1000)
  let et = new Date(now.getTime() + ed * 24 * 60 * 60 * 1000)
  let startdate = st.getFullYear() + '-' + (st.getMonth() + 1 < 10 ? '0' + (st.getMonth() + 1) : st.getMonth() + 1) + '-' + (st.getDate() < 10 ? '0' + st.getDate() : st.getDate())
  let enddate = et.getFullYear() + '-' + (et.getMonth() + 1 < 10 ? '0' + (et.getMonth() + 1) : et.getMonth() + 1) + '-' + (et.getDate() < 10 ? '0' + et.getDate() : et.getDate())
  return [startdate, enddate]
}

export function testMobile(mobile) {
  let reg = /^[1][3,4,5,7,8,9][0-9]{9}$/
  return reg.test(mobile)
}

// 用于设置有效时间的缓存信息，默认是24h
export const CacheUtil = {
  setCacheDataWithExpire(key: string, obj: object, time?: number) {
    Taro.setStorageSync(key, {
      data: obj,
      expire: new Date().getTime() + (time || 24 * 60 * 60 * 1000), // 设置有效时间当前日期毫秒数+24h毫秒数
    })
  },
  getCacheDataWithExpire(key: string) {
    let result = Taro.getStorageSync(key) || {}
    // 获取缓存对象，判断是否有设置有效时间，或者判断是否在有效时间内，否则删除缓存返回空对象
    if (!result.expire || result.expire < new Date().getTime()) {
      Taro.removeStorageSync(key)
      return null
    }
    // 判断有效时间内则返回数据
    return Object.keys(result.data).length !== 0 ? result.data : null
  },
}
