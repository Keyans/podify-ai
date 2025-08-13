<template>
    <a-form layout="inline" :model="formState" @submit.prevent="handleSearch">
      <div class="flex items-center justify-between w-full">
        <slot name="prefix"></slot>
        <div class="flex items-center">
            <template v-for="field in fields" :key="field.key">
                <a-form-item :label="field.label">
                <component
                    :is="field.component"  
                    v-model:value="formState[field.key]"
                    v-bind="field.props" 
                />
                </a-form-item>
            </template>
            <slot name="suffix"></slot>
            <!-- 查询 / 重置按钮 -->
            <a-form-item>
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
  import { reactive, watch } from 'vue'
  
  const props = defineProps({
    fields: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: Object,
      default: () => ({})
    }
  })
  
  const emit = defineEmits(['update:modelValue', 'search', 'reset'])
  
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
  