<template>
    <a-form :layout="layout" :model="formState" @submit.prevent="handleSearch">
      <div :class="containerClass">
        <slot name="prefix"></slot>
        <div :class="fieldsContainerClass">
            <template v-for="field in fields" :key="field.key">
                <a-form-item 
                  :label="field.label"
                  :name="field.key"
                  :rules="field.rules"
                >
                <component
                    :is="field.component"  
                    v-model:value="formState[field.key]"
                    v-bind="field.props"
                    class="w-full"
                    style="width: 100%;"
                />
                </a-form-item>
            </template>
            <slot name="suffix"></slot>
            <!-- 查询 / 重置按钮 -->
            <a-form-item v-if="hasSearchButton">
                <a-space>
                <a-button @click="handleSearch">查询</a-button>
                <a-button @click="handleReset">重置</a-button>
                </a-space>
            </a-form-item>
            <slot name="end"></slot>
        </div>
      </div>
    </a-form>
  </template>
  
  <script setup>
  import { reactive, watch, computed } from 'vue'
  
  const props = defineProps({
    fields: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: Object,
      default: () => ({})
    },
    layout:{
      type: String,
      default: 'inline'
    },
    hasSearchButton:{
      type: Boolean,
      default: true
    }
  })
  
  const emit = defineEmits(['update:modelValue', 'search', 'reset'])
  
  // 根据layout动态设置容器样式
  const containerClass = computed(() => {
    if (props.layout === 'vertical') {
      return 'flex flex-col w-full'
    }
    return 'flex items-center justify-between w-full'
  })
  
  const fieldsContainerClass = computed(() => {
    if (props.layout === 'vertical') {
      return 'flex flex-col w-full'
    }
    return 'flex items-center'
  })
  
  const formState = reactive({ ...props.modelValue })
  
  watch(() => props.modelValue, val => {
    Object.assign(formState, val)
  })
  
  // 查询
  const handleSearch = () => {
    emit('update:modelValue', { ...formState })
    emit('search', { ...formState })
  }
  
  // 重置
  const handleReset = () => {
    Object.keys(formState).forEach(k => formState[k] = undefined)
    emit('update:modelValue', { ...formState })
    emit('reset')
  }
  </script>
  
  <style scoped>
  /* 确保垂直布局下表单项占满全宽 */
  :deep(.ant-form-vertical .ant-form-item) {
    width: 100%;
    margin-bottom: 16px;
  }
  
  :deep(.ant-form-vertical .ant-form-item .ant-form-item-control) {
    width: 100%;
  }
  
  :deep(.ant-form-vertical .ant-input),
  :deep(.ant-form-vertical .ant-input-number),
  :deep(.ant-form-vertical .ant-select),
  :deep(.ant-form-vertical .ant-input-textarea) {
    width: 100% !important;
  }
  </style>
  