<template>
  <div class="custom-input">
    <div class="icon-left" v-if="leftIcon"><image :src="leftIcon" style="width: 26px;height: 26px;"/></div>
    <div class="input-box"><input v-model="text" :placeholder="placeholder" :type="type"/></div>
    <div class="icon-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, watch } from "vue"
import "./index.scss"

export default {
  props: {
    type: {
      type: String,
      default: () => "text",
      validator: (val: string) => ["text", "password", "number", "digit", 'email'].includes(val),
    },
    title: {
      type: String,
      default: () => "",
    },
    value: {
      type: String,
      default: () => ''
    },
    leftIcon: {
      type: String,
    },
    placeholder: {
      type: String,
      default: () => '请输入'
    },
  },
  setup(props, _context) {
    const data = reactive({
      text: props.value,
      placeholder: props.placeholder,
      leftIcon: props.leftIcon,
    })

    watch(()=> data.text, (val)=> {
      _context.emit('update:modelValue', val)
    })

    return {
      ...toRefs(data)
    }
  },
}
</script>
<style lang="less"></style>
