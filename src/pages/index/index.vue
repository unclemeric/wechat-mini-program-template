<template>
  <view class="index">
    <view class="main-container">
      <view style="height: 60rpx">列表{{ counter.count }}</view>
      <scroll-view style="height:calc(100% - 60rpx)" scroll-y="true">
        <view v-if="counter.count!=0">
          <view style="height: 40px;line-height: 1.5;" v-for="item in counter.count" :key="item">第{{ item }}个</view>
        </view>
        <nut-empty v-else/>
      </scroll-view>
    </view>
    <nut-row class="fixed-bottom">
      <nut-col :span="12"><nut-button type="primary" @tap="onAdd(1)">增加</nut-button></nut-col>
      <nut-col :span="12"><nut-button type="danger" @tap="onAdd(-1)">减少</nut-button></nut-col>
    </nut-row>
  </view>
</template>

<script>
import './index.scss'
import { useCounterStore } from '../../stores/counter'
import { IsIPhoneX } from '../../utils'

export default {
  name: 'index-page',
  setup(){
    const counter = useCounterStore()
    IsIPhoneX((flag, bottom)=>{
      console.log(flag, bottom)
    })
    const onAdd = (count) => {
      if(counter.count<1 && count != 1) {
        return
      }
      counter.count += count
      // with autocompletion ✨
      // counter.$patch({count: counter.count + 1})

      // or using an action instead
      // counter.increment()
    }
    return {
      counter,
      onAdd
    }
  }
}
</script>
