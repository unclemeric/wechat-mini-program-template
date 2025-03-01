<template>
  <view class="work-order-detail-page">
    <!-- <div :style="`height: ${navHeight}px`"></div> -->
    <div class="main-container">
      <scroll-view style="height: 100%;" scroll-y="true">
        <div class="tool-title">锂电池冲击角磨机01号</div>
        <div class="tool-img">
          <image style="width: 200rpx; height: 310rpx;" :src="ToolImg"/>
        </div>
        <div style="display: flex;justify-content: space-around;">
          <div class="info-card out-item">
            <div class="info-card-icon">
              <image :src="IconBattery" style="width: 70rpx;height: 68rpx;"/>
              <div class="battery-number" :style="`width:${battery / 100 * 46}rpx`"></div>
            </div>
            <div class="info-card-txt">{{battery}}%</div>
          </div>
          <div class="info-card out-item">
            <div class="info-card-icon">
              <image :src="IconWifi" style="width: 70rpx;height: 68rpx;"/>
            </div>
            <div class="info-card-txt">在线</div>
          </div>
        </div>
        <div class="battery-info-card info-card">
          <div class="info-header">
            <div>
              <image :src="IconBatteryPakStat" style="width: 48rpx;height: 48rpx" />
              <span>电池包状态</span>
            </div>
            <div class="state-txt">待机中</div>
          </div>
          <div class="battery-info-box">
            <div class="info-item" :class="{'red': i == 2}" v-for="(item, i) in list" :key="item">
              <div class="warning-icon" v-if="i == 2"><image style="width: 24rpx;height:24rpx;" :src="IconInfoW"/></div>
              <div class="info-text">
                <span>{{item}}</span>
                <image style="width: 30rpx;height: 30rpx;" :src="IconArrowRight"/>
              </div>
              <div class="info-value">{{ listValue[i] }}</div>
            </div>
            <div class="operation-item" v-for="(item, i) in operationList" :key="item">
              <span>{{ item }}</span>
              <nut-switch v-model="operationValueList[i]" active-color="#4E84FF" inactive-color="#8D8EA0" />
            </div>
            <div class="work-mode-operation">
              <div class="title">工作模式</div>
              <div class="mode-item" :class="{'on': item.value}" v-for="(item, i) in modeList" :key="item.label" @click="modeClickHandle(item)">
                {{ item.label }}
              </div>
            </div>
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
import ToolImg from '../../../assets/images/tool_demo.png'
import IconBattery from '../../../assets/images/icon-battery.png'
import IconWifi from '../../../assets/images/icon-wifi.png'
import IconBatteryPakStat from '../../../assets/images/icon-battery-state.png'
import IconArrowRight from '../../../assets/images/icon-arrow-right.png'
import IconInfo from '../../../assets/images/icon-info-b.png'
import IconInfoW from '../../../assets/images/icon-info-w.png'
import { ref } from 'vue';

const value = ref('1')
const battery = ref(100)
const list = ['温度', '电池保护电压','最大放电电流','电池保护电压', '充电次数', '放电次数', '短路次数', '过流次数','累计工时','电池电压']
const listValue = ['41℃', '3.2V','15A','3.2V', '250', '300', '0', '2','120h','20.8V']
const operationList = ['高温报警', '防盗锁', '寻找电池包', '充电']
const operationValueList = ref([true, false, false, false])
const infoList = ref([
  {label: '型号', value: 'W3111 IQV 20V 1/4"'},
  {label: '所在位置', value: 'XX车间'},
  {label: '负责人', value: '张三'},
  {label: '创建时间', value: '2025-02-24    10:20:30'},
  {label: '更新时间', value: '2025-02-24    10:20:30'},
])
const modeList = ref([
  {label: '标准', value: true},
  {label: '性能', value: true},
  {label: '省电', value: false},
])

const modeClickHandle = (item) => {
  item.value = !item.value
}
</script>
