<template>
  <view class="work-order-detail-page">
    <!-- <div :style="`height: ${navHeight}px`"></div> -->
    <div class="main-container">
      <scroll-view style="height: 100%;" scroll-y="true">
        <div style="padding: 0 10rpx;box-sizing: border-box;">
          <nut-cell-group>
            <nut-cell>
              <div style="display: flex;align-items: center;width: 100%;">
                <div style="width:180rpx">工单编号：</div>
                <div style="flex: 1; padding: 0 20rpx;font-size: 28rpx;">{{ 'TW-2025-0224-001' }}</div>
              </div>
            </nut-cell>
            <nut-cell>
              <div style="display: flex;align-items: center;width: 100%;">
                <div style="width:180rpx">工单名称：</div>
                <div style="flex: 1; padding: 0 20rpx;font-size: 28rpx;"><nut-input v-mode="orderName" :border="false" style="padding: 10rpx 0;" placeholder="请输入工单名称"/></div>
              </div>
            </nut-cell>
          </nut-cell-group>

          <nut-cell-group>
            <nut-cell>
              <div style="display: flex;align-items: center;width: 100%;">
                <div style="width:180rpx">车间名称</div>
                <div style="flex: 1; padding: 0 20rpx;font-size: 28rpx;"><nut-input v-mode="orderName" disabled :border="false" style="padding: 10rpx 0;" placeholder="请选择"/></div>
                <image style="width: 48rpx;height: 48rpx" :src="iconArrowDown"/>
              </div>
            </nut-cell>
            <nut-cell>
              <div style="display: flex;align-items: center;width: 100%;">
                <div style="width:180rpx">所在工位：</div>
                <div style="flex: 1; padding: 0 20rpx;font-size: 28rpx;"><nut-input v-mode="orderName" disabled :border="false" style="padding: 10rpx 0;" placeholder="请选择"/></div>
                <image style="width: 48rpx;height: 48rpx" :src="iconArrowDown"/>
              </div>
            </nut-cell>
          </nut-cell-group>

          <nut-cell-group>
            <nut-cell>
              <div style="width: 100%;display: flex;flex-direction: column;justify-content: flex-start;">
                <div style="display: flex;align-items: center;width: 100%;">
                  <div style="width:180rpx">选择工序：</div>
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
          <button style="width: 100%;height: 100rpx;line-height: 100rpx;background: #4B75E0FF;box-shadow: 0 5.84px 11.68px 0 #386aa56e;color: #fff;font-size: 28rpx;margin: 30rpx auto;">创建</button>
          <div style="height: 10rpx;"></div>
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
const orderName = ref('')
</script>
