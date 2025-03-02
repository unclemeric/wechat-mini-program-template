<style lang="less">
.work-order-tab-container {
  height: 100%;
  overflow: hidden;
}
.work-order-items {
  padding: 0px;
  margin-top: 10px;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh - 115px - 50px - 10px - constant(safe-area-inset-bottom));
  height: calc(100vh - 115px - 50px - 10px - env(safe-area-inset-bottom));
  border-radius: 6px;
  .work-order-item {
    width: 100%;
    background: #FFFFFF;
    border-radius: 6px;
    margin-bottom: 10px;
    padding: 15px;
    box-sizing: border-box;
    &:last-child {
      margin-bottom: 0;
    }
    .work-order-info-box {
      display: flex;
      justify-content: space-between;
      .work-order-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .info-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .title {
            display: flex;
            &>span {
              font-size: 16px;
              line-height: 24px;
              font-weight: 400;
              color: #202020;
              width: 245px;
              margin-right: 15px;
              padding: 0 10px;
              box-sizing: border-box;
              font-family: PingFangSC-Medium;
              font-size: 14px;
              color: #222222;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
            }
          }
          &>span {
            font-size: 12px;
            line-height: 18px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            &.normal {
              color: #4E84FF;
            }
            &.warning {
              color: #EC8D4B;
            }
          }
        }
        .sub-infos {
          display: flex;
          flex-direction: column;
          padding: 15px 0 0 0;
          .sub-info {
            font-size: 12px;
            width: 230px;
            margin-top: 5px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: #898989;
            line-height: 24px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            &:first-child {
              font-size: 16px;
              color: #222222;
              margin-top: 0;
            }
          }
        }
      }
    }
  }
}
</style>
<template>
   <div class="work-order-tab-container">
    <nut-menu>
      <nut-menu-item v-model="searchOption.state" :options="stateOptions" />
      <nut-menu-item v-model="searchOption.workshop" :options="workshopOptions" />
      <nut-menu-item v-model="searchOption.createTime" :options="createTimeOptions" @change="onChange" />
    </nut-menu>
    <div class="work-order-items">
      <div class="work-order-item" v-for="item in orderList" :key="item.id" @click="detailView()">
        <div class="work-order-info-box">
          <div class="work-order-info">
            <div class="info-header">
              <div class="title">
                <image :src="BillNolImg" style="width: 48rpx;height: 48rpx;"/>
                <span>{{ item.code }}</span>
              </div>
              <span :class="{'normal': true, 'warning': false}">{{ OrderStateText[item.status] }}</span>
            </div>
            <div class="sub-infos">
              <div class="sub-info">{{ item.name }}</div>
              <div class="sub-info">工位：{{ item.position || '' }}</div>
              <div class="sub-info">工单日期：{{ new Date(item.createTime).toLocaleDateString().substring(0, 12).replace(/\//g, '-') }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
   </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue';
import BillNolImg from '../../../assets/images/icon-bill-no.png'
import Taro from '@tarojs/taro';
import { getOrderList } from '../../../api/order';
import { OrderInfo } from '../../../utils/types';
import { OrderStateText } from '../../../constant';

const searchOption = ref({
  state: '',
  workshop: '',
  createTime: ''
})

const orderList = ref<OrderInfo[]>([])
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
  Taro.navigateTo({url: '/pages/work-order/detail/index'})
}

const getList = async () => {
  const res = await getOrderList()
  if(res.code === 0) {
    orderList.value = res.data.list
  }
}

getList()
</script>
