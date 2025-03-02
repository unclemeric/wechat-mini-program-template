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
      <nut-menu-item v-model="searchOption.workshopId" :options="workshopOptions" />
      <nut-menu-item v-model="searchOption.createTime" :options="createTimeOptions" />
    </nut-menu>
    <div class="tool-items">
      <div class="tool-item" v-for="item in toolList" :key="item.id" @click="detailView(item.id || '')">
        <div class="tool-info-box">
          <div class="tool-img">
            <image style="width: 140rpx;height: 140rpx" :src="item.icon"/>
          </div>
          <div class="tool-info">
            <div class="title">{{ item.name}}</div>
            <div class="sub-infos">
              <div class="sub-info">工具编号: {{ item.toolsSerialNumber }}</div>
              <div class="sub-info">所在位置: {{ item.workshop}}</div>
              <div class="sub-info">负责人: {{ item.master }}</div>
            </div>
          </div>
        </div>
        <div class="tool-state">
          <div>创建时间：{{ new Date(item.createTime || '').toLocaleDateString().substring(0, 12).replace(/\//g, '-') }}</div>
          <div>工作状态：{{ToolStateText[item.online || 0]}}</div>
        </div>
      </div>
    </div>
   </div>
</template>

<script lang="ts" setup>

import { ref, watch } from 'vue';
import Taro from '@tarojs/taro';
import { ToolList } from '../../../api/tools';
import { SearchOption, ToolInfo } from '../../../utils/types';
import { ToolStateText } from '../../../constant';
import { getWorkshops } from '../../../api/common';

const props = defineProps({
  name: {
    type: String,
    required: true
  }
})

const searchOption = ref<SearchOption>({
  state: '',
  workshopId: '',
  createTime: ''
})

const toolList = ref<ToolInfo[]>([])

const stateOptions = ref<{ text: string, value: string }[]>([])
const workshopOptions = ref<{ text: string, value: string }[]>([])
const createTimeOptions = ref([
  { text: '创建时间', value: '' },
  { text: '升序', value: 'desc' },
  { text: '降序', value: 'asc' },
])

const detailView = (id: string) =>{
  Taro.navigateTo({url: '/pages/index/detail/index?id=' + id})
}

const getList = async()=> {
  // const { name } = Taro.getCurrentInstance().router?.params || {}
  const res = await ToolList(searchOption.value, props.name)
  if(res.code === 0) {
    toolList.value = res.data.list
  }
}
const getWorkshopList = async () => {
  const res = await getWorkshops({})
  console.log(res)
  workshopOptions.value = [{ text: '车间', value: '' }, ...res.data.list.map((item: any) => ({ text: item.name, value: String(item.id) })) ]
}

const getStateList = () => {
  const keys = Object.keys(ToolStateText)
  const result = keys.map((item: any) => ({ text: ToolStateText[item], value: String(item) }))
  stateOptions.value = [{ text: '状态', value: ''}, ...result]
}
getStateList()
getWorkshopList()
getList()
watch(searchOption, () => {
  getList()
}, { deep: true })
</script>
