<style lang="less">
.tool-tab-container {
  height: 100%;
  overflow: hidden;
}
.tool-items {
  padding: 0px;
  margin-top: 10px;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh - 115px - 50px - 10px - constant(safe-area-inset-bottom));
  height: calc(100vh - 115px - 50px - 10px - env(safe-area-inset-bottom));
  border-radius: 6px;
  .tool-item {
    width: 100%;
    background: #FFFFFF;
    border-radius: 6px;
    margin-bottom: 10px;
    padding: 15px;
    box-sizing: border-box;
    &:last-child {
      margin-bottom: 0;
    }
    .tool-info-box {
      display: flex;
      justify-content: space-between;
      .tool-img {
        display: inline-block;
        padding: 15px;
      }
      .tool-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title {
          font-size: 16px;
          font-weight: 400;
          width: 230px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          font-size: 16px;
          color: #222222;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .sub-infos {
          display: flex;
          flex-direction: column;
          .sub-info {
            font-size: 12px;
            width: 230px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: #898989;
            line-height: 24px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            &::before {
              content: '';
              display: inline-block;
              width: 6px;
              height: 6px;
              background: #D0D9EDFF;
              border-radius: 50%;
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
  .tool-state {
    display: flex; 
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    height: 30px;
    background: #F4F6FA;
    border-radius: 3px;
    margin-top: 10px;
    padding: 3px 10px;
    line-height: 24px;
    font-family: PingFangSC-Regular;
    color: #898989;
  }
}
</style>
<template>
   <div class="tool-tab-container">
    <nut-menu>
      <nut-menu-item v-model="searchOption.state" :options="stateOptions" />
      <nut-menu-item v-model="searchOption.workshop" :options="workshopOptions" />
      <nut-menu-item v-model="searchOption.createTime" :options="createTimeOptions" @change="onChange" />
    </nut-menu>
    <div class="tool-items">
      <div class="tool-item" v-for="item in 20" :key="item" @click="detailView()">
        <div class="tool-info-box">
          <div class="tool-img">
            <image style="width: 140rpx;height: 140rpx" :src="ToolImg"/>
          </div>
          <div class="tool-info">
            <div class="title">锂电池冲击角磨机01号</div>
            <div class="sub-infos">
              <div class="sub-info">工具编号: TW-001</div>
              <div class="sub-info">所在位置: XX车间</div>
              <div class="sub-info">负责人: 张三</div>
            </div>
          </div>
        </div>
        <div class="tool-state">
          <div>创建时间：2025-11-04</div>
          <div>工作状态：正常</div>
        </div>
      </div>
    </div>
   </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue';
import ToolImg from '../../../assets/images/tool_demo.png'
import Taro from '@tarojs/taro';

const searchOption = ref({
  state: '',
  workshop: '',
  createTime: ''
})
const stateOptions = ref([
  { text: '状态', value: ''},
  { text: '正常', value: '1' },
  { text: '异常', value: '2' },
])
const workshopOptions = ref([
  { text: '车间', value: '' },
  { text: '车间1', value: '1' },
  { text: '车间2', value: '2' },
])
const createTimeOptions = ref([
  { text: '创建时间', value: '' },
  { text: '升序', value: 'desc' },
  { text: '降序', value: 'asc' },
])
const onChange = ()=> {
  console.log('改变了')
}

const detailView = () =>{
  Taro.navigateTo({url: '/pages/index/detail/index'})
}
</script>
