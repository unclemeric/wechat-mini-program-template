<template>
  <view class="tools-list-page">
    <!-- <div :style="`height: ${navHeight}px`"></div> -->
    <CustomNav title="工具列表"/>
    <div class="container main-container">
      <nut-tabs v-model="value" :animated-time="0">
        <nut-tab-pane :title="item" :pane-key="String(index)" v-for="(item, index) in toolList" :key="item">
          <ToolList :name="item"/>
        </nut-tab-pane>
      </nut-tabs>
    </div>
  </view>
</template>

<script lang="ts" setup>
import './index.scss'
// import lockIcon from '../../../assets/images/icon-lock.png'
import { ref } from 'vue';
import ToolList from './tool-list.vue';

const value = ref('0')
const toolList = ref(['角磨机', '扭力扳手'])
</script>
