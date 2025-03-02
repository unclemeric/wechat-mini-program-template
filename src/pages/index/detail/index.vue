<template>
  <view class="tool-detail-page">
    <!-- <div :style="`height: ${navHeight}px`"></div> -->
    <CustomNav :title="`工具编号：${toolDetail.toolsSerialNumber}`" color="white" :font-size="15" show-back/>
    <div class="main-container">
      <scroll-view class="main-container" style="height: calc(100% - constant(safe-area-inset-bottom));height: calc(100% - env(safe-area-inset-bottom) - 30rpx);" scroll-y="true">
        <div class="tool-title">{{ toolDetail.name || ''}}</div>
        <div class="tool-img">
          <image style="width: 200rpx; height: 310rpx;" :src="toolDetail.icon"/>
        </div>
        <div style="display: flex;justify-content: space-around;">
          <div class="info-card out-item">
            <div class="info-card-icon">
              <image :src="IconBattery" style="width: 70rpx;height: 68rpx;"/>
              <div class="battery-number" :style="`width:${(funcInfos.DeviceTop?.[0].flagValue || 0) / 100 * 46}rpx`"></div>
            </div>
            <div class="info-card-txt">{{funcInfos.DeviceTop?.[0].flagValue || 0}}{{funcInfos.DeviceTop?.[0].unit}}</div>
          </div>
          <div class="info-card out-item">
            <div class="info-card-icon">
              <image :src="IconWifi" style="width: 70rpx;height: 68rpx;"/>
            </div>
            <div class="info-card-txt">{{ ToolStateText[toolDetail.online || 0] }}</div>
          </div>
        </div>
        <div class="battery-info-card info-card">
          <div class="info-header">
            <div>
              <image :src="IconBatteryPakStat" style="width: 48rpx;height: 48rpx" />
              <span>电池包状态</span>
            </div>
            <div class="state-txt">{{BatteryStateText[Number(funcInfos.DeviceTop?.[0].flagValue || 0)]}}</div>
          </div>
          <div class="battery-info-box">
            <div class="info-item" :class="{'red': i == -1}" v-for="(item, i) in (funcInfos.Basic || [])" :key="item">
              <div class="warning-icon" v-if="i == -1"><image style="width: 24rpx;height:24rpx;" :src="IconInfoW"/></div>
              <div class="info-text">
                <span>{{item.name}}</span>
                <image style="width: 30rpx;height: 30rpx;" :src="IconArrowRight"/>
              </div>
              <div class="info-value">{{ item.flagValue }}{{ item.unit }}</div>
            </div>
            <template  v-for="(item, i) in (funcInfos.Control || [])" :key="item.id">
              <div class="operation-item" v-if="item.displayModel === 3">
                <span>{{ item.name }}</span>
                <nut-switch v-model="item.flagValue" active-color="#4E84FF" inactive-color="#8D8EA0" />
              </div>
              <div class="work-mode-operation" v-else-if="item.displayModel === 4">
                <div class="title">{{item.name}}</div>
                <div class="mode-item" :class="{'on': cmd.value.toString() === item.flagValue.toString() }" v-for="(cmd, cmd_i) in (item.commands as Command[] || [])" :key="item.id+ '-'+ cmd_i" @click="modeClickHandle(item, cmd.value)">
                  {{ cmd.name }}
                </div>
              </div>
            </template>
          </div>
        </div>
        <div class="base-info info-card">
          <div class="info-header">
            <div>
              <image :src="IconInfo" style="width: 48rpx;height: 48rpx" />
              <span>基本信息</span>
            </div>
          </div>
          <div class="info-items">
            <div class="info-item" v-for="item in infoList" :key="item.label">
              <div class="item-label">{{item.label}}</div>
              <div class="item-value">{{item.value}}</div>
            </div>
          </div>
        </div>
        <button style="width: 85.6vw;height: 100rpx;line-height: 100rpx;border-radius: 52rpx;background: #4B75E0FF;box-shadow: 0 5.84px 11.68px 0 #386aa56e;color: #fff;font-size: 28rpx;margin: 30rpx auto;">删除设备</button>
        <div style="height: 10rpx;"></div>
      </scroll-view>
    </div>
  </view>
</template>

<script lang="ts" setup>
import './index.scss'
import IconBattery from '../../../assets/images/icon-battery.png'
import IconWifi from '../../../assets/images/icon-wifi.png'
import IconBatteryPakStat from '../../../assets/images/icon-battery-state.png'
import IconArrowRight from '../../../assets/images/icon-arrow-right.png'
import IconInfo from '../../../assets/images/icon-info-b.png'
import IconInfoW from '../../../assets/images/icon-info-w.png'
import { ref } from 'vue'
import { getToolDetail } from '../../../api/tools'
import Taro from '@tarojs/taro'
import { Command, ToolInfo } from '../../../utils/types'
import { BatteryStateText, FunctionsCategory, ToolStateText } from '../../../constant'
import { parseTime } from '../../../utils'

const toolDetail = ref<ToolInfo>({})
type FuncInfo = {
  [K in typeof FunctionsCategory[keyof typeof FunctionsCategory]]?: any
}
const funcInfos = ref<FuncInfo>({})
const infoList = ref([
  {label: '型号', value: '',key: 'toolsSerialNumber'},
  {label: '所在位置', value: '',key: 'workshop'},
  {label: '负责人', value: '',key: 'master'},
  {label: '创建时间', value: '',key: 'createTime'},
  {label: '更新时间', value: '',key: 'updateTime'},
])

const modeClickHandle = (item, value) => {
  item.flagValue = value
}
const getDetail = async () => {
  const { id = '' } = Taro.getCurrentInstance().router?.params || {}
  const res = await getToolDetail(id)
  if (res.code === 0) {
    toolDetail.value = res.data
    console.log(toolDetail.value.deviceFunctions)
    const funcs = toolDetail.value.deviceFunctions || []
    funcs.forEach(item => {
      let category = item.category || ''
      if(item.category === FunctionsCategory.CONTROL && item.displayModel === 4) {
        item.flagValue = Number(item.flagValue)
      }
      if(!funcInfos.value[category]) {
        funcInfos.value[category] = []
      }
      funcInfos.value[category].push(item)
      // if(list.includes(name)) {
      //   listValue[list.indexOf(name)] = item.flagValue || ''
      // }
    })
    infoList.value.forEach(item => {
      toolDetail.value[item.key] && (item.value = toolDetail.value[item.key])
      if(item.key === 'createTime' || item.key === 'updateTime') {
        item.value = item.value ? parseTime(item.value, '{y}-{m}-{d} {h}:{i}:{s}') : ''
      }
    })
  }
}

getDetail()
</script>
