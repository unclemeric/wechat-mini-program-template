<template>
  <view class="work-order-detail-page">
    <!-- <div :style="`height: ${navHeight}px`"></div> -->
    <div class="main-container">
      <scroll-view style="height: 100%;" scroll-y="true">
        <div style="padding: 0 10rpx;box-sizing: border-box;">
          <nut-cell-group style="padding: 20rpx 0;">
            <nut-cell class="no-border">
              <div style="width: 100%;display: flex;flex-direction: column;justify-content: flex-start;">
                <div style="display: flex;align-items: center;width: 100%;">
                  <div style="font-size: 28rpx;color:#202020;display: flex;align-items: center;width: 100%;"><image :src="iconInfoB" style="width: 48rpx;height: 48rpx;padding-right: 10rpx;"/>基本信息</div>
                </div>
              </div>
            </nut-cell>
            <nut-cell>
              <div style="display: flex;align-items: center;width: 100%;">
                <div style="width:180rpx">工单编号</div>
                <div style="flex: 1; padding: 0 20rpx;font-size: 28rpx;">{{ orderName }}</div>
              </div>
            </nut-cell>
            <nut-cell>
              <div style="display: flex;align-items: center;width: 100%;">
                <div style="width:180rpx">车间名称</div>
                <div style="flex: 1; padding: 0 20rpx;font-size: 28rpx;">{{ workerName }}</div>
              </div>
            </nut-cell>
            <nut-cell>
              <div style="display: flex;align-items: center;width: 100%;">
                <div style="width:180rpx">所在工位</div>
                <div style="flex: 1; padding: 0 20rpx;font-size: 28rpx;">{{ belong }}</div>
              </div>
            </nut-cell>
            <nut-cell>
              <div style="display: flex;align-items: center;width: 100%;">
                <div style="width:180rpx">车型</div>
                <div style="flex: 1; padding: 0 20rpx;font-size: 28rpx;">{{ carType }}</div>
              </div>
            </nut-cell>
            <nut-cell>
              <div style="display: flex;align-items: center;width: 100%;">
                <div style="width:180rpx">创建日期</div>
                <div style="flex: 1; padding: 0 20rpx;font-size: 28rpx;">{{ createDate }}</div>
              </div>
            </nut-cell>
            <nut-cell>
              <div style="display: flex;align-items: center;width: 100%;">
                <div style="width:180rpx">完成日期</div>
                <div style="flex: 1; padding: 0 20rpx;font-size: 28rpx;">{{ completeDate }}</div>
              </div>
            </nut-cell>
          </nut-cell-group>

          <nut-cell-group>
            <nut-cell>
              <div style="width: 100%;display: flex;flex-direction: column;justify-content: flex-start;">
                <div style="display: flex;align-items: center;width: 100%;">
                  <div style="display: flex;align-items: center;width: 100%;">
                    <div style="font-size: 28rpx;color:#202020;display: flex;align-items: center;width: 100%;">
                      <image :src="iconProcessStep" style="width: 48rpx;height: 48rpx;padding-right: 10rpx;"/>工序
                    </div>
                  </div>
                  <div style="flex: 1; padding: 0 20rpx;font-size: 28rpx;"><nut-input v-mode="orderName" disabled :border="false" style="padding: 10rpx 0;" placeholder="请选择"/></div>
                  <image style="width: 48rpx;height: 48rpx" :src="iconArrowDown"/>
                </div>
                <div style="margin: 10rpx 0;background-color: #F4F6FA;border-radius: 6rpx;padding: 30rpx 20rpx;box-sizing: border-box;">
                  <nut-steps direction="vertical" :current="0">
                    <nut-step v-for="item in 5">{{item}}
                      <template #title>
                        <div style="width: 100%;display: flex;justify-content: space-between;align-items: center;">
                          <div style="color: #222;">左前轮胎{{item}}轴螺母拧紧</div>
                          <image style="width: 48rpx;height: 48rpx" :src="iconArrowRight"/>
                        </div>
                      </template>
                      <template #content>
                        <p>点位名称: 左前轮胎2轴螺母拧紧(铝)</p>
                        <p>参考值中心值: 118.5</p>
                        <p>管理上限: 137.6</p>
                        <p>管理下限: 99.4</p>
                        <p>简称: 左前2</p>
                        <p>特性: 拧紧</p>
                        <p>重要度: S</p>
                        <p>&nbsp;</p>
                      </template>
                    </nut-step>
                  </nut-steps>
                </div>
              </div>
            </nut-cell>
          </nut-cell-group>
        </div>
      </scroll-view>
    </div>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import './index.scss'
import iconArrowDown from '../../../assets/images/icon-arrow-down.png'
import iconArrowRight from '../../../assets/images/icon-arrow-right.png'
import iconInfoB from '../../../assets/images/icon-info-b.png'
import iconProcessStep from '../../../assets/images/icon-process-step.png'
const orderName = ref('TW-2025-0224-00')
const createDate = ref('2025-02-24 10:20:20')
const completeDate = ref('2025-02-24 14:20:20')
const carType = ref('498W')
const belong = ref('拧紧工位A')
const workerName = ref('张三')
</script>
