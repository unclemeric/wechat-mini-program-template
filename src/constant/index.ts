export const ToolState = Object.freeze({
  INACTIVE: 0,
  ONLINE: 1,
  OFFLINE: 2,
  DISABLED: 3
})
export const ToolStateText = Object.freeze({
  [ToolState.INACTIVE]: '未激活',
  [ToolState.ONLINE]: '在线',
  [ToolState.OFFLINE]: '离线',
  [ToolState.DISABLED]: '已禁用'
})

export const OrderState = Object.freeze({
  UN_START: 1,
  NORMAL: 2,
  FINISH: 3,
  ERROR: 10
})

export const OrderStateText = Object.freeze({
  [OrderState.UN_START]: '未开始',
  [OrderState.NORMAL]: '正在作业',
  [OrderState.FINISH]: '作业完成',
  [OrderState.ERROR]: '异常'
})

export const FunctionsCategory = Object.freeze({
  BASIC: "Basic",
  DEFAULT: "Default",
  CONTROL: "Control",
  TOP1: "Top1",
  DEVICETOP: "DeviceTop"
})

export const BatteryState = Object.freeze({
  IDLE: 0,
  CHARGING: 1,
  DISCHARGING: 2,
  COMPLETE: 3
})

export const BatteryStateText = Object.freeze({
  [BatteryState.IDLE]: '待机中',
  [BatteryState.CHARGING]: '充电中',
  [BatteryState.DISCHARGING]: '放电中',
  [BatteryState.COMPLETE]: '充电完成'
})