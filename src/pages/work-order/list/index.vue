<template>
  <view class="work-order-list-page">
    <!-- <div :style="`height: ${navHeight}px`"></div> -->
    <CustomNav title="工单列表"/>
    <div class="container main-container">
      <nut-tabs v-model="value" :animated-time="0">
        <nut-tab-pane title="角磨机" pane-key="1">
          <WorkOrderTabContainer />
        </nut-tab-pane>
        <nut-tab-pane title="扭力扳手" pane-key="2"> 
          <WorkOrderTabContainer />
        </nut-tab-pane>
      </nut-tabs>
    </div>
  </view>
</template>

<script lang="ts" setup>
import './index.scss'
// import lockIcon from '../../../assets/images/icon-lock.png'
import { ref } from 'vue';
import WorkOrderTabContainer from './work-order-list.vue';
import { getWorkshops } from '../../../api/common';

const getWorkshopList = async () => {
  const res = await getWorkshops({})
  console.log(res)
}

const value = ref('1')
</script>
